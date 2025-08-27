import { Heart, Plus, Calendar, TrendingUp, Mic, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                <Heart className="w-6 h-6 text-primary-foreground" fill="currentColor" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Stink's Journey</h1>
                <p className="text-sm text-muted-foreground">Progress Tracker</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/insights">
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Insights
                </Button>
              </Link>
              <Link href="/patterns">
                <Button variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Patterns
                </Button>
              </Link>
              <Link href="/timeline">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Timeline
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-medium text-foreground mb-4">Quick Log</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/voice">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full">
                      <Mic className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-card-foreground">Voice Log</h3>
                      <p className="text-sm text-muted-foreground">Quick voice note</p>
                    </div>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-card-foreground">Manual Entry</h3>
                    <p className="text-sm text-muted-foreground">Add detailed log</p>
                  </div>
                  <Button size="sm">Add</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tracking Categories */}
        <section>
          <h2 className="text-lg font-medium text-foreground mb-4">Tracking Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/food">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">🍎 Food & Reactions</CardTitle>
                  <CardDescription>Track meals and responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      3 today
                    </Badge>
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/behavior">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">😊 Behaviors & Moods</CardTitle>
                  <CardDescription>Log emotional episodes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      2 today
                    </Badge>
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">🧸 Calming Tools</CardTitle>
                <CardDescription>Track soothing strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    5 today
                  </Badge>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">🌟 Milestones</CardTitle>
                <CardDescription>Celebrate achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    1 this week
                  </Badge>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-lg font-medium text-foreground mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-3 border-b border-border last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full flex-shrink-0">
                    🍎
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">Lunch - Loved the pasta!</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Food
                  </Badge>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-border last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-full flex-shrink-0">
                    🧸
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">Teether helped during fussy time</p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Calming
                  </Badge>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-full flex-shrink-0">
                    😊
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">Happy and playful after nap</p>
                    <p className="text-xs text-muted-foreground">6 hours ago</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Behavior
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
