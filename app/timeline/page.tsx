"use client"

import { useState } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for calendar entries
const calendarData = {
  "2024-01-15": [
    { type: "food", title: "Loved pasta lunch", time: "12:30 PM", mood: "positive" },
    { type: "behavior", title: "Happy after nap", time: "3:00 PM", mood: "positive" },
    { type: "voice", title: "Voice log about playtime", time: "4:15 PM", mood: "neutral" },
  ],
  "2024-01-14": [
    { type: "food", title: "Tried new vegetables", time: "6:00 PM", mood: "neutral" },
    { type: "behavior", title: "Fussy before bedtime", time: "7:30 PM", mood: "negative" },
    { type: "calming", title: "Teether helped calm down", time: "7:45 PM", mood: "positive" },
  ],
  "2024-01-13": [
    { type: "milestone", title: "First time clapping hands", time: "10:00 AM", mood: "positive" },
    { type: "food", title: "Breakfast went well", time: "8:30 AM", mood: "positive" },
    { type: "behavior", title: "Very playful morning", time: "9:00 AM", mood: "positive" },
  ],
  "2024-01-12": [
    { type: "food", title: "Refused broccoli", time: "6:00 PM", mood: "negative" },
    { type: "voice", title: "Quick note about nap time", time: "2:00 PM", mood: "neutral" },
  ],
  "2024-01-11": [
    { type: "behavior", title: "Calm and focused play", time: "10:30 AM", mood: "positive" },
    { type: "food", title: "Enjoyed snack time", time: "3:00 PM", mood: "positive" },
  ],
}

const entryTypes = {
  food: { label: "Food", color: "bg-green-500", icon: "🍎" },
  behavior: { label: "Behavior", color: "bg-blue-500", icon: "😊" },
  voice: { label: "Voice Log", color: "bg-purple-500", icon: "🎤" },
  calming: { label: "Calming", color: "bg-orange-500", icon: "🧸" },
  milestone: { label: "Milestone", color: "bg-yellow-500", icon: "🌟" },
}

const moodColors = {
  positive: "border-green-400 bg-green-50",
  neutral: "border-yellow-400 bg-yellow-50",
  negative: "border-red-400 bg-red-50",
}

export default function TimelinePage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 15)) // January 15, 2024
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState("month")
  const [filterType, setFilterType] = useState("all")

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const getEntriesForDay = (day: number) => {
    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day)
    const entries = calendarData[dateKey as keyof typeof calendarData] || []

    if (filterType === "all") return entries
    return entries.filter((entry) => entry.type === filterType)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleDayClick = (day: number) => {
    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDay(dateKey)
  }

  const selectedDayEntries = selectedDay ? calendarData[selectedDay as keyof typeof calendarData] || [] : []

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

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
                <h1 className="text-xl font-semibold text-foreground">Timeline Calendar</h1>
                <p className="text-sm text-muted-foreground">View progress over time</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All entries</SelectItem>
                  {Object.entries(entryTypes).map(([key, type]) => (
                    <SelectItem key={key} value={key}>
                      {type.icon} {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Calendar Navigation */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Week day headers */}
              {weekDays.map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {getDaysInMonth(currentDate).map((day, index) => {
                if (day === null) {
                  return <div key={index} className="p-2 h-24" />
                }

                const entries = getEntriesForDay(day)
                const hasEntries = entries.length > 0
                const isToday = day === 15 // Mock today as 15th for demo

                return (
                  <div
                    key={day}
                    className={`p-2 h-24 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                      isToday ? "bg-primary/10 border-primary" : ""
                    }`}
                    onClick={() => handleDayClick(day)}
                  >
                    <div className="flex flex-col h-full">
                      <span className={`text-sm font-medium ${isToday ? "text-primary" : "text-foreground"}`}>
                        {day}
                      </span>
                      <div className="flex-1 mt-1 space-y-1">
                        {entries.slice(0, 3).map((entry, entryIndex) => {
                          const entryType = entryTypes[entry.type as keyof typeof entryTypes]
                          return (
                            <div
                              key={entryIndex}
                              className={`w-full h-1.5 rounded-full ${entryType.color}`}
                              title={entry.title}
                            />
                          )
                        })}
                        {entries.length > 3 && (
                          <div className="text-xs text-muted-foreground">+{entries.length - 3} more</div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Entry Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {Object.entries(entryTypes).map(([key, type]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${type.color}`} />
                  <span className="text-sm">
                    {type.icon} {type.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">This Week's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-semibold text-green-600">12</p>
                <p className="text-sm text-muted-foreground">Positive moments</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-blue-600">8</p>
                <p className="text-sm text-muted-foreground">Food entries</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-purple-600">5</p>
                <p className="text-sm text-muted-foreground">Voice logs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-yellow-600">2</p>
                <p className="text-sm text-muted-foreground">Milestones</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Day Detail Modal */}
      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {selectedDay &&
                new Date(selectedDay).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </DialogTitle>
            <DialogDescription>{selectedDayEntries.length} entries for this day</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedDayEntries.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No entries for this day</p>
            ) : (
              selectedDayEntries.map((entry, index) => {
                const entryType = entryTypes[entry.type as keyof typeof entryTypes]
                return (
                  <Card key={index} className={`${moodColors[entry.mood as keyof typeof moodColors]}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-full ${entryType.color} flex items-center justify-center text-white text-sm`}
                        >
                          {entryType.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {entryType.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{entry.time}</span>
                          </div>
                          <p className="text-sm font-medium text-card-foreground">{entry.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => setSelectedDay(null)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
