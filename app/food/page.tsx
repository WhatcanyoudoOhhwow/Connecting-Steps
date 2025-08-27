"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Plus, Search, Filter, Clock, ThumbsUp, ThumbsDown, Minus } from "lucide-react"
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

// Mock data for food entries
const foodEntries = [
  {
    id: 1,
    food: "Pasta with butter",
    category: "Main Meal",
    time: "12:30 PM",
    date: "Today",
    reaction: "positive",
    notes: "Ate the whole bowl! Seemed to really enjoy it.",
    amount: "full portion",
  },
  {
    id: 2,
    food: "Apple slices",
    category: "Snack",
    time: "3:15 PM",
    date: "Today",
    reaction: "neutral",
    notes: "Ate a few pieces, then lost interest.",
    amount: "partial",
  },
  {
    id: 3,
    food: "Broccoli",
    category: "Vegetable",
    time: "6:00 PM",
    date: "Yesterday",
    reaction: "negative",
    notes: "Pushed it away immediately. Made a face.",
    amount: "none",
  },
]

const foodCategories = ["Main Meal", "Snack", "Fruit", "Vegetable", "Dairy", "Protein", "Grain", "Beverage", "Treat"]

const reactionTypes = [
  { value: "positive", label: "Loved it", icon: ThumbsUp, color: "text-green-600" },
  { value: "neutral", label: "Neutral", icon: Minus, color: "text-yellow-600" },
  { value: "negative", label: "Disliked", icon: ThumbsDown, color: "text-red-600" },
]

export default function FoodTrackingPage() {
  const [isAddingFood, setIsAddingFood] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredEntries = foodEntries.filter((entry) => {
    const matchesSearch = entry.food.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || entry.category === selectedCategory
    return matchesSearch && matchesCategory
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
                <h1 className="text-xl font-semibold text-foreground">Food & Reactions</h1>
                <p className="text-sm text-muted-foreground">Track meals and dietary responses</p>
              </div>
            </div>
            <Dialog open={isAddingFood} onOpenChange={setIsAddingFood}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Food
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Log Food Entry</DialogTitle>
                  <DialogDescription>Record what Stink ate and how they responded</DialogDescription>
                </DialogHeader>
                <FoodEntryForm onClose={() => setIsAddingFood(false)} />
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
                  <ThumbsUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">8</p>
                  <p className="text-sm text-muted-foreground">Loved foods this week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full">
                  <Minus className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Neutral responses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                  <ThumbsDown className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">2</p>
                  <p className="text-sm text-muted-foreground">Disliked foods</p>
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
                placeholder="Search foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {foodCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Food Entries */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">Recent Entries</h2>
          {filteredEntries.map((entry) => {
            const reaction = reactionTypes.find((r) => r.value === entry.reaction)
            const ReactionIcon = reaction?.icon || Minus

            return (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-card-foreground">{entry.food}</h3>
                        <Badge variant="outline" className="text-xs">
                          {entry.category}
                        </Badge>
                        <div className={`flex items-center gap-1 ${reaction?.color}`}>
                          <ReactionIcon className="w-4 h-4" />
                          <span className="text-sm">{reaction?.label}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {entry.time}
                        </div>
                        <span>{entry.date}</span>
                        <span>Amount: {entry.amount}</span>
                      </div>
                      {entry.notes && <p className="text-sm text-muted-foreground">{entry.notes}</p>}
                    </div>
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

function FoodEntryForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    food: "",
    category: "",
    reaction: "",
    amount: "",
    time: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the data
    console.log("Food entry:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="food">Food Item</Label>
        <Input
          id="food"
          placeholder="e.g., Pasta with butter"
          value={formData.food}
          onChange={(e) => setFormData({ ...formData, food: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {foodCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
      </div>

      <div className="space-y-2">
        <Label>Reaction</Label>
        <div className="grid grid-cols-3 gap-2">
          {reactionTypes.map((reaction) => {
            const Icon = reaction.icon
            return (
              <Button
                key={reaction.value}
                type="button"
                variant={formData.reaction === reaction.value ? "default" : "outline"}
                className="flex items-center gap-2 h-auto py-3"
                onClick={() => setFormData({ ...formData, reaction: reaction.value })}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{reaction.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount Consumed</Label>
        <Select value={formData.amount} onValueChange={(value) => setFormData({ ...formData, amount: value })}>
          <SelectTrigger>
            <SelectValue placeholder="How much did they eat?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="few-bites">A few bites</SelectItem>
            <SelectItem value="partial">About half</SelectItem>
            <SelectItem value="most">Most of it</SelectItem>
            <SelectItem value="full">All of it</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          placeholder="Any additional observations..."
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
