"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Plus, Search, Filter, Clock, Heart, Zap, Smile, Frown, Meh } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for behavior entries
const behaviorEntries = [
  {
    id: 1,
    behavior: "Happy and playful",
    mood: "positive",
    intensity: 4,
    duration: "30 minutes",
    time: "2:00 PM",
    date: "Today",
    triggers: ["After nap", "Favorite toy"],
    calmingTools: [],
    notes: "Giggling and clapping hands. Very engaged with blocks.",
  },
  {
    id: 2,
    behavior: "Fussy and irritable",
    mood: "negative",
    intensity: 3,
    duration: "15 minutes",
    time: "4:30 PM",
    date: "Today",
    triggers: ["Hungry", "Tired"],
    calmingTools: ["Teether", "Soft music"],
    notes: "Crying and pushing things away. Teether helped calm down.",
  },
  {
    id: 3,
    behavior: "Calm and focused",
    mood: "neutral",
    intensity: 2,
    duration: "45 minutes",
    time: "10:00 AM",
    date: "Yesterday",
    triggers: ["Morning routine"],
    calmingTools: [],
    notes: "Quietly playing with sensory toys. Very focused.",
  },
]

const behaviorTypes = [
  "Happy and playful",
  "Calm and focused",
  "Excited and energetic",
  "Fussy and irritable",
  "Crying/upset",
  "Overstimulated",
  "Withdrawn/quiet",
  "Aggressive behavior",
  "Self-soothing",
]

const commonTriggers = [
  "Hungry",
  "Tired",
  "Overstimulated",
  "Change in routine",
  "Loud noises",
  "New environment",
  "Separation anxiety",
  "Physical discomfort",
  "After nap",
  "Before meal",
]

const calmingStrategies = [
  "Teether",
  "Soft blanket",
  "Favorite toy",
  "Soft music",
  "Dim lights",
  "Gentle rocking",
  "Quiet space",
  "Deep pressure",
  "Sensory toy",
  "Pacifier",
]

const moodTypes = [
  { value: "positive", label: "Positive", icon: Smile, color: "text-green-600 bg-green-100" },
  { value: "neutral", label: "Neutral", icon: Meh, color: "text-yellow-600 bg-yellow-100" },
  { value: "negative", label: "Negative", icon: Frown, color: "text-red-600 bg-red-100" },
]

export default function BehaviorTrackingPage() {
  const [isAddingBehavior, setIsAddingBehavior] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMood, setSelectedMood] = useState("all")

  const filteredEntries = behaviorEntries.filter((entry) => {
    const matchesSearch = entry.behavior.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMood = selectedMood === "all" || entry.mood === selectedMood
    return matchesSearch && matchesMood
  })

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
                <h1 className="text-xl font-semibold text-foreground">Behaviors & Moods</h1>
                <p className="text-sm text-muted-foreground">Track emotional episodes and responses</p>
              </div>
            </div>
            <Dialog open={isAddingBehavior} onOpenChange={setIsAddingBehavior}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Log Behavior
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Log Behavior Entry</DialogTitle>
                  <DialogDescription>Record Stink's behavior and emotional state</DialogDescription>
                </DialogHeader>
                <BehaviorEntryForm onClose={() => setIsAddingBehavior(false)} />
              </DialogContent>
            </Dialog>
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
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                  <Smile className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Positive moments this week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full">
                  <Meh className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">5</p>
                  <p className="text-sm text-muted-foreground">Neutral episodes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                  <Frown className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Challenging moments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search behaviors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedMood} onValueChange={setSelectedMood}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All moods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All moods</SelectItem>
              {moodTypes.map((mood) => (
                <SelectItem key={mood.value} value={mood.value}>
                  {mood.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Behavior Entries */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">Recent Entries</h2>
          {filteredEntries.map((entry) => {
            const mood = moodTypes.find((m) => m.value === entry.mood)
            const MoodIcon = mood?.icon || Meh

            return (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-card-foreground">{entry.behavior}</h3>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${mood?.color}`}>
                            <MoodIcon className="w-3 h-3" />
                            <span>{mood?.label}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {entry.time}
                          </div>
                          <span>{entry.date}</span>
                          <span>Duration: {entry.duration}</span>
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            <span>Intensity: {entry.intensity}/5</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {entry.triggers.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-card-foreground mb-2">Possible Triggers:</p>
                        <div className="flex flex-wrap gap-2">
                          {entry.triggers.map((trigger, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {entry.calmingTools.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-card-foreground mb-2">Calming Tools Used:</p>
                        <div className="flex flex-wrap gap-2">
                          {entry.calmingTools.map((tool, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              <Heart className="w-3 h-3 mr-1" />
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {entry.notes && (
                      <div>
                        <p className="text-sm font-medium text-card-foreground mb-1">Notes:</p>
                        <p className="text-sm text-muted-foreground">{entry.notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}

function BehaviorEntryForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    behavior: "",
    mood: "",
    intensity: [3],
    duration: "",
    time: "",
    triggers: [] as string[],
    calmingTools: [] as string[],
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Behavior entry:", formData)
    onClose()
  }

  const handleTriggerChange = (trigger: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, triggers: [...formData.triggers, trigger] })
    } else {
      setFormData({ ...formData, triggers: formData.triggers.filter((t) => t !== trigger) })
    }
  }

  const handleCalmingToolChange = (tool: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, calmingTools: [...formData.calmingTools, tool] })
    } else {
      setFormData({ ...formData, calmingTools: formData.calmingTools.filter((t) => t !== tool) })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="behavior">Behavior Type</Label>
        <Select value={formData.behavior} onValueChange={(value) => setFormData({ ...formData, behavior: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select behavior type" />
          </SelectTrigger>
          <SelectContent>
            {behaviorTypes.map((behavior) => (
              <SelectItem key={behavior} value={behavior}>
                {behavior}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Overall Mood</Label>
        <div className="grid grid-cols-3 gap-2">
          {moodTypes.map((mood) => {
            const Icon = mood.icon
            return (
              <Button
                key={mood.value}
                type="button"
                variant={formData.mood === mood.value ? "default" : "outline"}
                className="flex items-center gap-2 h-auto py-3"
                onClick={() => setFormData({ ...formData, mood: mood.value })}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{mood.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
            <SelectTrigger>
              <SelectValue placeholder="How long?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="few-minutes">A few minutes</SelectItem>
              <SelectItem value="15-minutes">15 minutes</SelectItem>
              <SelectItem value="30-minutes">30 minutes</SelectItem>
              <SelectItem value="1-hour">1 hour</SelectItem>
              <SelectItem value="longer">Longer than 1 hour</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Intensity Level: {formData.intensity[0]}/5</Label>
        <Slider
          value={formData.intensity}
          onValueChange={(value) => setFormData({ ...formData, intensity: value })}
          max={5}
          min={1}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Very mild</span>
          <span>Moderate</span>
          <span>Very intense</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Possible Triggers (select all that apply)</Label>
        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          {commonTriggers.map((trigger) => (
            <div key={trigger} className="flex items-center space-x-2">
              <Checkbox
                id={trigger}
                checked={formData.triggers.includes(trigger)}
                onCheckedChange={(checked) => handleTriggerChange(trigger, checked as boolean)}
              />
              <Label htmlFor={trigger} className="text-sm">
                {trigger}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Calming Tools Used (select all that helped)</Label>
        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          {calmingStrategies.map((tool) => (
            <div key={tool} className="flex items-center space-x-2">
              <Checkbox
                id={tool}
                checked={formData.calmingTools.includes(tool)}
                onCheckedChange={(checked) => handleCalmingToolChange(tool, checked as boolean)}
              />
              <Label htmlFor={tool} className="text-sm">
                {tool}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          placeholder="Any additional observations or context..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Save Entry
        </Button>
      </div>
    </form>
  )
}
