"use client"

import { useState } from "react"
import { ArrowLeft, Mic, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VoiceLogger } from "@/components/voice-logger"

// Mock data for voice entries
const voiceEntries = [
  {
    id: 1,
    category: "food",
    categoryLabel: "Food & Reactions",
    bulletPoints: [
      "Had pasta for lunch around 12:30",
      "Ate the whole bowl enthusiastically",
      "Made happy sounds while eating",
      "No negative reactions observed",
    ],
    timestamp: "2 hours ago",
    duration: "45 seconds",
  },
  {
    id: 2,
    category: "behavior",
    categoryLabel: "Behavior & Mood",
    bulletPoints: [
      "Fussy period started around 4 PM",
      "Crying and pushing toys away",
      "Teether helped calm him down",
      "Back to normal after 15 minutes",
    ],
    timestamp: "4 hours ago",
    duration: "1 minute 20 seconds",
  },
  {
    id: 3,
    category: "milestone",
    categoryLabel: "Milestone",
    bulletPoints: [
      "First time clapping hands together",
      "Happened during playtime this morning",
      "Seemed very proud of himself",
      "Repeated it several times",
    ],
    timestamp: "Yesterday",
    duration: "30 seconds",
  },
]

const categoryColors = {
  food: "bg-green-100 text-green-800",
  behavior: "bg-blue-100 text-blue-800",
  calming: "bg-purple-100 text-purple-800",
  milestone: "bg-yellow-100 text-yellow-800",
  general: "bg-gray-100 text-gray-800",
}

export default function VoiceLogPage() {
  const [isVoiceLoggerOpen, setIsVoiceLoggerOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Voice Logs</h1>
                <p className="text-sm text-muted-foreground">Quick voice notes and summaries</p>
              </div>
            </div>
            <Button onClick={() => setIsVoiceLoggerOpen(true)} className="gap-2">
              <Mic className="w-4 h-4" />
              New Voice Log
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                  <Mic className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">23</p>
                  <p className="text-sm text-muted-foreground">Voice logs this week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-full">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">12m</p>
                  <p className="text-sm text-muted-foreground">Total recording time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full">
                  <Tag className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">5</p>
                  <p className="text-sm text-muted-foreground">Categories tracked</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Voice Entries */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">Recent Voice Logs</h2>
          {voiceEntries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className={categoryColors[entry.category as keyof typeof categoryColors]}>
                      {entry.categoryLabel}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {entry.duration}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{entry.timestamp}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {entry.bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-card-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Voice Logger Modal */}
      <VoiceLogger isOpen={isVoiceLoggerOpen} onClose={() => setIsVoiceLoggerOpen(false)} />
    </div>
  )
}
