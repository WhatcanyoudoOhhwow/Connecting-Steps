"use client"

import { useState, useRef, useEffect } from "react"
import { Mic, Square, Save, X, Loader2, AlertCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface VoiceLoggerProps {
  isOpen: boolean
  onClose: () => void
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  addEventListener(type: "result", listener: (event: SpeechRecognitionEvent) => void): void
  addEventListener(type: "error", listener: (event: SpeechRecognitionErrorEvent) => void): void
  addEventListener(type: "start", listener: () => void): void
  addEventListener(type: "end", listener: () => void): void
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

const categories = [
  { value: "food", label: "Food & Reactions", color: "bg-green-100 text-green-800" },
  { value: "behavior", label: "Behavior & Mood", color: "bg-blue-100 text-blue-800" },
  { value: "calming", label: "Calming Tools", color: "bg-purple-100 text-purple-800" },
  { value: "milestone", label: "Milestone", color: "bg-yellow-100 text-yellow-800" },
  { value: "general", label: "General Note", color: "bg-gray-100 text-gray-800" },
]

export function VoiceLogger({ isOpen, onClose }: VoiceLoggerProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [bulletPoints, setBulletPoints] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isSupported, setIsSupported] = useState(false)
  const [isMicrophoneSupported, setIsMicrophoneSupported] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [permissionState, setPermissionState] = useState<"unknown" | "granted" | "denied" | "requesting">("unknown")
  const [errorMessage, setErrorMessage] = useState("")

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const speechSupported = !!SpeechRecognition

    const micSupported = !!(
      navigator &&
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === "function"
    )

    setIsSupported(speechSupported)
    setIsMicrophoneSupported(micSupported)

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.addEventListener("result", (event: SpeechRecognitionEvent) => {
        let finalTranscript = ""
        let interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript((prev) => prev + finalTranscript + interimTranscript)
      })

      recognition.addEventListener("error", (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error)
        setIsRecording(false)
        if (event.error === "not-allowed") {
          setPermissionState("denied")
          setErrorMessage("Microphone access was denied. Please allow microphone access and try again.")
        } else if (event.error === "no-speech") {
          setErrorMessage("No speech detected. Please try speaking closer to your microphone.")
        } else if (event.error === "network") {
          setErrorMessage("Network error occurred. Please check your internet connection.")
        } else {
          setErrorMessage(`Speech recognition error: ${event.error}`)
        }

        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      })

      recognition.addEventListener("start", () => {
        setPermissionState("granted")
        setErrorMessage("")
      })

      recognition.addEventListener("end", () => {
        setIsRecording(false)
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      })

      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const requestMicrophonePermission = async () => {
    try {
      setPermissionState("requesting")
      setErrorMessage("")

      if (!navigator) {
        throw new Error("Navigator not available")
      }

      if (!navigator.mediaDevices) {
        throw new Error("MediaDevices API not supported")
      }

      if (typeof navigator.mediaDevices.getUserMedia !== "function") {
        throw new Error("getUserMedia not supported")
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      stream.getTracks().forEach((track) => track.stop())

      setPermissionState("granted")
      return true
    } catch (error) {
      console.error("Microphone permission error:", error)
      setPermissionState("denied")

      if (error instanceof Error) {
        if (error.message.includes("not supported") || error.message.includes("not available")) {
          setErrorMessage(
            "Your browser doesn't support microphone access. Please try using Chrome, Edge, or Safari on a secure (HTTPS) connection.",
          )
        } else {
          setErrorMessage(
            "Microphone access is required for voice logging. Please allow access in your browser settings.",
          )
        }
      } else {
        setErrorMessage(
          "Microphone access is required for voice logging. Please allow access in your browser settings.",
        )
      }
      return false
    }
  }

  const startRecording = async () => {
    if (!recognitionRef.current) return

    if (permissionState !== "granted") {
      const hasPermission = await requestMicrophonePermission()
      if (!hasPermission) return
    }

    setIsRecording(true)
    setTranscript("")
    setRecordingTime(0)
    setErrorMessage("")

    try {
      recognitionRef.current.start()

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Failed to start recording:", error)
      setIsRecording(false)
      setErrorMessage("Failed to start recording. Please try again.")
    }
  }

  const stopRecording = () => {
    if (!recognitionRef.current) return

    setIsRecording(false)
    recognitionRef.current.stop()

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    if (transcript.trim()) {
      processTranscript(transcript)
    }
  }

  const processTranscript = async (text: string) => {
    setIsProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
    const bullets = sentences.map((sentence) => sentence.trim()).filter((s) => s.length > 0)

    setBulletPoints(bullets)
    setIsProcessing(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSave = () => {
    if (!selectedCategory || bulletPoints.length === 0) return

    console.log("Saving voice log:", {
      category: selectedCategory,
      transcript,
      bulletPoints,
      timestamp: new Date().toISOString(),
    })

    setTranscript("")
    setBulletPoints([])
    setSelectedCategory("")
    setRecordingTime(0)
    onClose()
  }

  const handleClose = () => {
    if (isRecording) {
      stopRecording()
    }
    setTranscript("")
    setBulletPoints([])
    setSelectedCategory("")
    setRecordingTime(0)
    setErrorMessage("")
    onClose()
  }

  if (!isSupported || !isMicrophoneSupported) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Voice Recording Not Available</DialogTitle>
            <DialogDescription>
              {!isSupported &&
                !isMicrophoneSupported &&
                "Your browser doesn't support voice recording or microphone access. Please try using Chrome, Edge, or Safari on a secure (HTTPS) connection."}
              {!isSupported &&
                isMicrophoneSupported &&
                "Your browser doesn't support speech recognition. Please try using Chrome, Edge, or Safari."}
              {isSupported &&
                !isMicrophoneSupported &&
                "Your browser doesn't support microphone access. Please try using a secure (HTTPS) connection or a different browser."}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleClose}>Close</Button>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Voice Logger
          </DialogTitle>
          <DialogDescription>Record a voice note and we'll convert it to structured bullet points</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {permissionState === "denied" && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <h3 className="font-medium text-orange-900">Microphone Permission Required</h3>
                </div>
                <p className="text-sm text-orange-800 mb-4">
                  Voice logging needs access to your microphone to record and transcribe your notes. This helps you
                  quickly capture important moments with your child.
                </p>
                <Button onClick={requestMicrophonePermission} className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Allow Microphone Access
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-4">
                  {!isRecording ? (
                    <Button
                      onClick={startRecording}
                      size="lg"
                      className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600"
                      disabled={isProcessing || permissionState === "requesting"}
                    >
                      {permissionState === "requesting" ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <Mic className="w-6 h-6" />
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={stopRecording}
                      size="lg"
                      className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 animate-pulse"
                    >
                      <Square className="w-6 h-6" />
                    </Button>
                  )}
                </div>

                <div className="text-center">
                  {permissionState === "requesting" && (
                    <Badge variant="secondary">Requesting microphone access...</Badge>
                  )}
                  {isRecording && (
                    <div className="space-y-2">
                      <Badge variant="destructive" className="animate-pulse">
                        Recording... {formatTime(recordingTime)}
                      </Badge>
                      <p className="text-sm text-muted-foreground">Tap the square to stop recording</p>
                    </div>
                  )}
                  {!isRecording && !transcript && permissionState !== "denied" && permissionState !== "requesting" && (
                    <p className="text-sm text-muted-foreground">Tap the microphone to start recording</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {transcript && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Live Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Your speech will appear here..."
                  rows={4}
                  className="resize-none"
                />
              </CardContent>
            </Card>
          )}

          {isProcessing && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm text-muted-foreground">Converting to bullet points...</span>
                </div>
              </CardContent>
            </Card>
          )}

          {bulletPoints.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Generated Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {bulletPoints.length > 0 && (
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category for this entry" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!selectedCategory || bulletPoints.length === 0} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Save Entry
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
