"use client"

import { useState } from "react"
import { ArrowLeft, TrendingUp, Heart, Calendar, Mic, Plus, Star, Target, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

// Mock comprehensive dashboard data
const dashboardData = {
  weeklyOverview: {
    totalEntries: 47,
    positiveRatio: 78,
    milestonesReached: 2,
    newInsights: 5,
    weeklyChange: "+12%",
  },
  recentMilestones: [
    {
      title: "First Independent Clapping",
      date: "2 days ago",
      category: "Motor Skills",
      description: "Stink clapped hands together without prompting during playtime",
    },
    {
      title: "Improved Sleep Pattern",
      date: "1 week ago",
      category: "Sleep",
      description: "Consistently sleeping through the night for 5 consecutive days",
    },
  ],
  topInsights: [
    {
      title: "Afternoon Energy Management",
      priority: "high",
      description: "Challenging behaviors peak at 4-6 PM. Consider earlier snack time.",
      actionTaken: false,
      category: "Behavior",
    },
    {
      title: "Food Preference Patterns",
      priority: "medium",
      description: "Pasta and cheese show 90%+ acceptance rate. Great base foods.",
      actionTaken: true,
      category: "Food",
    },
    {
      title: "Calming Strategy Success",
      priority: "low",
      description: "Teether effectiveness increased to 90% this week.",
      actionTaken: false,
      category: "Calming",
    },
  ],
  weeklyTrends: {
    happiness: { current: 78, previous: 65, trend: "up" },
    foodAcceptance: { current: 82, previous: 79, trend: "up" },
    sleepQuality: { current: 85, previous: 72, trend: "up" },
    calmingSuccess: { current: 88, previous: 85, trend: "stable" },
  },
  quickStats: [
    { label: "Happy Moments", value: 34, icon: "😊", color: "text-green-600" },
    { label: "Food Wins", value: 12, icon: "🍎", color: "text-blue-600" },
    { label: "Voice Logs", value: 8, icon: "🎤", color: "text-purple-600" },
    { label: "Calm Periods", value: 15, icon: "🧸", color: "text-orange-600" },
  ],
  upcomingReminders: [
    { task: "Log afternoon snack", time: "3:30 PM", type: "food" },
    { task: "Evening behavior check", time: "6:00 PM", type: "behavior" },
    { task: "Bedtime routine note", time: "7:30 PM", type: "general" },
  ],
}

const priorityColors = {
  high: "border-red-200 bg-red-50 text-red-800",
  medium: "border-yellow-200 bg-yellow-50 text-yellow-800",
  low: "border-green-200 bg-green-50 text-green-800",
}

export default function InsightsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

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
                <h1 className="text-xl font-semibold text-foreground">Insights Dashboard</h1>
                <p className="text-sm text-muted-foreground">Comprehensive progress overview</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                This Week
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Weekly Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-700">{dashboardData.weeklyOverview.totalEntries}</p>
                  <p className="text-sm text-blue-600">Total Entries</p>
                </div>
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-700" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
                <TrendingUp className="w-3 h-3" />
                <span>{dashboardData.weeklyOverview.weeklyChange} from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-700">{dashboardData.weeklyOverview.positiveRatio}%</p>
                  <p className="text-sm text-green-600">Positive Moments</p>
                </div>
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-700" fill="currentColor" />
                </div>
              </div>
              <Progress value={dashboardData.weeklyOverview.positiveRatio} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-700">{dashboardData.weeklyOverview.milestonesReached}</p>
                  <p className="text-sm text-purple-600">New Milestones</p>
                </div>
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-700" />
                </div>
              </div>
              <p className="text-xs text-purple-600 mt-2">Celebrating progress!</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-700">{dashboardData.weeklyOverview.newInsights}</p>
                  <p className="text-sm text-orange-600">New Insights</p>
                </div>
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-700" />
                </div>
              </div>
              <p className="text-xs text-orange-600 mt-2">AI-powered discoveries</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/voice">
                <Button variant="outline" className="w-full h-16 flex-col gap-2 bg-transparent">
                  <Mic className="w-5 h-5" />
                  <span className="text-sm">Voice Log</span>
                </Button>
              </Link>
              <Link href="/food">
                <Button variant="outline" className="w-full h-16 flex-col gap-2 bg-transparent">
                  <Plus className="w-5 h-5" />
                  <span className="text-sm">Add Food Entry</span>
                </Button>
              </Link>
              <Link href="/behavior">
                <Button variant="outline" className="w-full h-16 flex-col gap-2 bg-transparent">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Log Behavior</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="insights">Top Insights</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* This Week's Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">This Week's Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData.quickStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{stat.icon}</span>
                        <span className="text-sm font-medium">{stat.label}</span>
                      </div>
                      <span className={`text-lg font-semibold ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Reminders */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Today's Reminders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dashboardData.upcomingReminders.map((reminder, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{reminder.task}</p>
                        <p className="text-xs text-muted-foreground">{reminder.type}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {reminder.time}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Top Insights Tab */}
          <TabsContent value="insights" className="space-y-4">
            {dashboardData.topInsights.map((insight, index) => (
              <Alert key={index} className={priorityColors[insight.priority as keyof typeof priorityColors]}>
                <Zap className="h-4 w-4" />
                <AlertTitle className="flex items-center justify-between">
                  <span>{insight.title}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {insight.category}
                    </Badge>
                    <Badge variant={insight.actionTaken ? "default" : "secondary"} className="text-xs">
                      {insight.actionTaken ? "Action Taken" : "Pending"}
                    </Badge>
                  </div>
                </AlertTitle>
                <AlertDescription className="mt-2">{insight.description}</AlertDescription>
              </Alert>
            ))}
          </TabsContent>

          {/* Milestones Tab */}
          <TabsContent value="milestones" className="space-y-4">
            {dashboardData.recentMilestones.map((milestone, index) => (
              <Card key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-yellow-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-yellow-800">{milestone.title}</h3>
                        <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                          {milestone.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-yellow-700 mb-2">{milestone.description}</p>
                      <p className="text-xs text-yellow-600">{milestone.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(dashboardData.weeklyTrends).map(([key, trend]) => (
                <Card key={key}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base capitalize">{key.replace(/([A-Z])/g, " $1")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{trend.current}%</span>
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          trend.trend === "up"
                            ? "text-green-600"
                            : trend.trend === "down"
                              ? "text-red-600"
                              : "text-blue-600"
                        }`}
                      >
                        {trend.trend === "up" && <TrendingUp className="w-4 h-4" />}
                        {trend.trend === "down" && <TrendingUp className="w-4 h-4 rotate-180" />}
                        {trend.trend === "stable" && <Target className="w-4 h-4" />}
                        <span>
                          {trend.current - trend.previous > 0 ? "+" : ""}
                          {trend.current - trend.previous}%
                        </span>
                      </div>
                    </div>
                    <Progress value={trend.current} className="h-2" />
                    <p className="text-xs text-muted-foreground">Previous week: {trend.previous}%</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
