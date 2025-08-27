"use client"

import { useState } from "react"
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Clock, Calendar, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock pattern analysis data
const patternAnalysis = {
  foodPatterns: {
    preferences: [
      { food: "Pasta", successRate: 95, trend: "stable", lastWeek: 4, thisWeek: 4 },
      { food: "Bananas", successRate: 85, trend: "improving", lastWeek: 2, thisWeek: 4 },
      { food: "Broccoli", successRate: 20, trend: "declining", lastWeek: 1, thisWeek: 0 },
      { food: "Cheese", successRate: 90, trend: "stable", lastWeek: 3, thisWeek: 3 },
    ],
    timePatterns: {
      bestTimes: ["12:00 PM - 1:00 PM", "6:00 PM - 7:00 PM"],
      worstTimes: ["8:00 AM - 9:00 AM"],
      insight:
        "Stink shows better food acceptance during lunch and dinner times, with breakfast being more challenging.",
    },
  },
  behaviorPatterns: {
    moodTrends: [
      { mood: "Happy", percentage: 65, change: "+5%", trend: "improving" },
      { mood: "Calm", percentage: 25, change: "0%", trend: "stable" },
      { mood: "Fussy", percentage: 10, change: "-5%", trend: "improving" },
    ],
    triggers: [
      { trigger: "Hunger", frequency: 8, impact: "high", trend: "stable" },
      { trigger: "Tired", frequency: 6, impact: "high", trend: "declining" },
      { trigger: "Overstimulated", frequency: 3, impact: "medium", trend: "improving" },
    ],
    timePatterns: {
      happiest: "10:00 AM - 12:00 PM",
      mostChallenging: "4:00 PM - 6:00 PM",
      insight:
        "Morning hours after breakfast tend to be the happiest, while late afternoon shows more challenging behaviors.",
    },
  },
  calmingStrategies: {
    effectiveness: [
      { strategy: "Teether", successRate: 90, usage: 12, trend: "stable" },
      { strategy: "Soft music", successRate: 75, usage: 8, trend: "improving" },
      { strategy: "Gentle rocking", successRate: 85, usage: 6, trend: "stable" },
      { strategy: "Quiet space", successRate: 70, usage: 4, trend: "improving" },
    ],
  },
  insights: [
    {
      type: "positive",
      title: "Improved Sleep Patterns",
      description:
        "Stink's sleep-related fussiness has decreased by 30% this week, likely due to consistent bedtime routine.",
      confidence: 85,
      actionable: true,
      suggestion: "Continue the current bedtime routine and consider extending quiet time before sleep.",
    },
    {
      type: "attention",
      title: "Afternoon Energy Dips",
      description: "Challenging behaviors peak between 4-6 PM, coinciding with typical toddler energy crashes.",
      confidence: 92,
      actionable: true,
      suggestion: "Try offering a healthy snack around 3:30 PM and consider an earlier dinner time.",
    },
    {
      type: "milestone",
      title: "Communication Development",
      description: "Increased positive responses to verbal cues suggest developing language comprehension.",
      confidence: 78,
      actionable: false,
      suggestion: "Continue talking through daily activities and reading together regularly.",
    },
  ],
}

const trendIcons = {
  improving: { icon: TrendingUp, color: "text-green-600" },
  declining: { icon: TrendingDown, color: "text-red-600" },
  stable: { icon: Target, color: "text-blue-600" },
}

const insightTypes = {
  positive: { icon: Lightbulb, color: "border-green-200 bg-green-50", badgeColor: "bg-green-100 text-green-800" },
  attention: {
    icon: AlertTriangle,
    color: "border-yellow-200 bg-yellow-50",
    badgeColor: "bg-yellow-100 text-yellow-800",
  },
  milestone: { icon: Target, color: "border-blue-200 bg-blue-50", badgeColor: "bg-blue-100 text-blue-800" },
}

export default function PatternsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")

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
                <h1 className="text-xl font-semibold text-foreground">Pattern Analysis</h1>
                <p className="text-sm text-muted-foreground">AI-powered insights and trends</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Calendar className="w-4 h-4" />
                This Week
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Key Insights Alert */}
        <Alert className="border-blue-200 bg-blue-50">
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>New Insights Available</AlertTitle>
          <AlertDescription>
            We've detected 3 new patterns in Stink's behavior this week. Check the insights tab for detailed analysis.
          </AlertDescription>
        </Alert>

        {/* Pattern Analysis Tabs */}
        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="food">Food Patterns</TabsTrigger>
            <TabsTrigger value="behavior">Behavior Trends</TabsTrigger>
            <TabsTrigger value="calming">Calming Strategies</TabsTrigger>
          </TabsList>

          {/* Key Insights Tab */}
          <TabsContent value="insights" className="space-y-4">
            <div className="grid gap-4">
              {patternAnalysis.insights.map((insight, index) => {
                const insightType = insightTypes[insight.type as keyof typeof insightTypes]
                const Icon = insightType.icon

                return (
                  <Card key={index} className={`${insightType.color} border-2`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <CardTitle className="text-base">{insight.title}</CardTitle>
                        </div>
                        <Badge className={insightType.badgeColor}>{insight.confidence}% confidence</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-card-foreground">{insight.description}</p>
                      {insight.actionable && (
                        <div className="p-3 bg-white/50 rounded-lg">
                          <p className="text-sm font-medium text-card-foreground mb-1">Suggested Action:</p>
                          <p className="text-sm text-muted-foreground">{insight.suggestion}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Food Patterns Tab */}
          <TabsContent value="food" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Food Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Food Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {patternAnalysis.foodPatterns.preferences.map((food, index) => {
                    const trendInfo = trendIcons[food.trend as keyof typeof trendIcons]
                    const TrendIcon = trendInfo.icon

                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{food.food}</span>
                          <div className="flex items-center gap-2">
                            <TrendIcon className={`w-4 h-4 ${trendInfo.color}`} />
                            <span className="text-sm text-muted-foreground">{food.successRate}%</span>
                          </div>
                        </div>
                        <Progress value={food.successRate} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Last week: {food.lastWeek} times</span>
                          <span>This week: {food.thisWeek} times</span>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Time Patterns */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Meal Time Patterns</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-600 mb-2">Best Meal Times</h4>
                    {patternAnalysis.foodPatterns.timePatterns.bestTimes.map((time, index) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2 text-green-700 border-green-200">
                        <Clock className="w-3 h-3 mr-1" />
                        {time}
                      </Badge>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-red-600 mb-2">Challenging Times</h4>
                    {patternAnalysis.foodPatterns.timePatterns.worstTimes.map((time, index) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2 text-red-700 border-red-200">
                        <Clock className="w-3 h-3 mr-1" />
                        {time}
                      </Badge>
                    ))}
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">{patternAnalysis.foodPatterns.timePatterns.insight}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Behavior Trends Tab */}
          <TabsContent value="behavior" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mood Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Mood Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {patternAnalysis.behaviorPatterns.moodTrends.map((mood, index) => {
                    const trendInfo = trendIcons[mood.trend as keyof typeof trendIcons]
                    const TrendIcon = trendInfo.icon

                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{mood.mood}</span>
                          <div className="flex items-center gap-2">
                            <TrendIcon className={`w-4 h-4 ${trendInfo.color}`} />
                            <span className="text-sm text-muted-foreground">{mood.change}</span>
                          </div>
                        </div>
                        <Progress value={mood.percentage} className="h-2" />
                        <span className="text-xs text-muted-foreground">{mood.percentage}% of time</span>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Common Triggers */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Behavior Triggers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {patternAnalysis.behaviorPatterns.triggers.map((trigger, index) => {
                    const trendInfo = trendIcons[trigger.trend as keyof typeof trendIcons]
                    const TrendIcon = trendInfo.icon
                    const impactColor =
                      trigger.impact === "high"
                        ? "text-red-600"
                        : trigger.impact === "medium"
                          ? "text-yellow-600"
                          : "text-green-600"

                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{trigger.trigger}</p>
                          <p className="text-xs text-muted-foreground">
                            {trigger.frequency} times this week •{" "}
                            <span className={impactColor}>{trigger.impact} impact</span>
                          </p>
                        </div>
                        <TrendIcon className={`w-4 h-4 ${trendInfo.color}`} />
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Time Patterns */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Daily Behavior Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-600 mb-2">Happiest Time</h4>
                    <Badge variant="outline" className="text-green-700 border-green-200">
                      <Clock className="w-3 h-3 mr-1" />
                      {patternAnalysis.behaviorPatterns.timePatterns.happiest}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-red-600 mb-2">Most Challenging Time</h4>
                    <Badge variant="outline" className="text-red-700 border-red-200">
                      <Clock className="w-3 h-3 mr-1" />
                      {patternAnalysis.behaviorPatterns.timePatterns.mostChallenging}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {patternAnalysis.behaviorPatterns.timePatterns.insight}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calming Strategies Tab */}
          <TabsContent value="calming" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Calming Strategy Effectiveness</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {patternAnalysis.calmingStrategies.effectiveness.map((strategy, index) => {
                  const trendInfo = trendIcons[strategy.trend as keyof typeof trendIcons]
                  const TrendIcon = trendInfo.icon

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{strategy.strategy}</span>
                        <div className="flex items-center gap-2">
                          <TrendIcon className={`w-4 h-4 ${trendInfo.color}`} />
                          <span className="text-sm text-muted-foreground">{strategy.successRate}%</span>
                        </div>
                      </div>
                      <Progress value={strategy.successRate} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Used {strategy.usage} times this week</span>
                        <span>Success rate: {strategy.successRate}%</span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
