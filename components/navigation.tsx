"use client"

import { useState } from "react"
import { Heart, Home, Calendar, BarChart3, Settings, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/", active: true },
  { icon: Calendar, label: "Timeline", href: "/timeline" },
  { icon: BarChart3, label: "Insights", href: "/insights" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="font-semibold text-foreground">Stink's Journey</span>
            </div>
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.href}
                  variant={item.active ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1">
        {navigationItems.map((item) => (
          <Button key={item.href} variant={item.active ? "default" : "ghost"} size="sm" className="gap-2">
            <item.icon className="w-4 h-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </>
  )
}
