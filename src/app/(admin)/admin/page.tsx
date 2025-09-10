"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Heart, Calendar, Quote, Camera, Newspaper, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    testimonies: 0,
    prayers: 0,
    services: 0,
    news: 0,
    quotes: 0,
    outreach: 0,
  })

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/admin/stats')
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch {
        // noop
      }
    })()
  }, [])

  const cards = [
    { title: "Total Testimonies", value: stats.testimonies, icon: Heart, color: "text-green-600" },
    { title: "Prayer Requests", value: stats.prayers, icon: MessageSquare, color: "text-blue-600" },
    { title: "Upcoming Services", value: stats.services, icon: Calendar, color: "text-purple-600" },
    { title: "News Articles", value: stats.news, icon: Newspaper, color: "text-orange-600" },
  ]

  const quickActions = [
    {
      title: "Manage Quotes",
      description: "Add daily inspirational quotes",
      href: "/admin/content/quotes",
      icon: Quote,
    },
    {
      title: "Testimonies",
      description: "Review and manage testimonies",
      href: "/admin/content/testimonies",
      icon: Heart,
    },
    {
      title: "Prayer Requests",
      description: "View and respond to prayer requests",
      href: "/admin/content/prayers",
      icon: MessageSquare,
    },
    {
      title: "Outreach Photos",
      description: "Upload and organize outreach photos",
      href: "/admin/content/outreach",
      icon: Camera,
    },
    {
      title: "News & Updates",
      description: "Publish church news and updates",
      href: "/admin/content/news",
      icon: Newspaper,
    },
    { title: "Services", description: "Schedule upcoming services", href: "/admin/content/services", icon: Calendar },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to the Original Seed Ministries admin dashboard. Manage your church content and engage with your
          community.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Card key={action.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <action.icon className="h-6 w-6 text-[#8B0000]" />
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </div>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href={action.href}>
                  <Button className="w-full bg-[#8B0000] hover:bg-[#6B0000]">Manage</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600">New testimony submitted</span>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600">Prayer request received</span>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Service scheduled for Sunday</span>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
