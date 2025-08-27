"use client"

import { TrendingUp, TrendingDown, Target, Lightbulb, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PatternInsight {
  type: "positive" | "attention" | "milestone"
  title: string
  description: string
  confidence: number
  trend?: "improving" | "declining" | "stable"
  value?: number
  suggestion?: string
}

interface PatternInsightsProps {
  insights: PatternInsight[]
  className?: string
}

const insightConfig = {
  positive: {
    icon: Lightbulb,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    badgeColor: "bg-green-100 text-green-800",
  },
  attention: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    badgeColor: "bg-yellow-100 text-yellow-800",
  },
  milestone: {
    icon: Target,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    badgeColor: "bg-blue-100 text-blue-800",
  },
}

const trendConfig = {
  improving: { icon: TrendingUp, color: "text-green-600" },
  declining: { icon: TrendingDown, color: "text-red-600" },
  stable: { icon: Target, color: "text-blue-600" },
}

export function PatternInsights({ insights, className = "" }: PatternInsightsProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {insights.map((insight, index) => {
        const config = insightConfig[insight.type]
        const Icon = config.icon
        const trendInfo = insight.trend ? trendConfig[insight.trend] : null
        const TrendIcon = trendInfo?.icon

        return (
          <Card key={index} className={`${config.bgColor} ${config.borderColor} border-2`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <CardTitle className="text-base">{insight.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  {trendInfo && TrendIcon && <TrendIcon className={`w-4 h-4 ${trendInfo.color}`} />}
                  <Badge className={config.badgeColor}>{insight.confidence}% confidence</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-card-foreground">{insight.description}</p>

              {insight.value && (
                <div className="space-y-1">
                  <Progress value={insight.value} className="h-2" />
                  <span className="text-xs text-muted-foreground">{insight.value}%</span>
                </div>
              )}

              {insight.suggestion && (
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
  )
}
