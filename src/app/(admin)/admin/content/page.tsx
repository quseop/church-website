"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, Heart, MessageSquare, Camera, Newspaper, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ContentManagement() {
  const [stats, setStats] = useState({
    quotes: 0,
    testimonies: 0,
    prayers: 0,
    outreach: 0,
    news: 0,
    services: 0,
  })

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    })()
  }, [])

  const contentTypes = [
    {
      title: "Daily Quotes",
      description: "Manage inspirational daily quotes",
      href: "/admin/content/quotes",
      icon: Quote,
      count: stats.quotes,
      color: "text-blue-600",
    },
    {
      title: "Testimonies",
      description: "Review and approve testimonies",
      href: "/admin/content/testimonies",
      icon: Heart,
      count: stats.testimonies,
      color: "text-green-600",
    },
    {
      title: "Prayer Requests",
      description: "Manage prayer requests",
      href: "/admin/content/prayers",
      icon: MessageSquare,
      count: stats.prayers,
      color: "text-purple-600",
    },
    {
      title: "Outreach Photos",
      description: "Upload and organize outreach photos",
      href: "/admin/content/outreach",
      icon: Camera,
      count: stats.outreach,
      color: "text-orange-600",
    },
    {
      title: "News & Updates",
      description: "Publish church news and updates",
      href: "/admin/content/news",
      icon: Newspaper,
      count: stats.news,
      color: "text-red-600",
    },
    {
      title: "Services",
      description: "Schedule upcoming services",
      href: "/admin/content/services",
      icon: Calendar,
      count: stats.services,
      color: "text-indigo-600",
    },
    {
      title: "Study Guides & Notes",
      description: "Manage PDFs, DOCX and PPT(X)",
      href: "/admin/content/study-guides",
      icon: FileText,
      count: 0,
      color: "text-amber-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-600 mt-2">Manage all your church content from one central location.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentTypes.map((type) => (
          <Card key={type.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <type.icon className={`h-6 w-6 ${type.color}`} />
                  <div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${type.color}`}>{type.count}</div>
                  <div className="text-xs text-gray-500">items</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href={type.href}>
                <Button className="w-full bg-[#8B0000] hover:bg-[#6B0000]">Manage {type.title}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/content/quotes">
              <Button variant="outline" size="sm">
                <Quote className="h-4 w-4 mr-2" />
                Add Daily Quote
              </Button>
            </Link>
            <Link href="/admin/content/news">
              <Button variant="outline" size="sm">
                <Newspaper className="h-4 w-4 mr-2" />
                Publish News
              </Button>
            </Link>
            <Link href="/admin/content/services">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Service
              </Button>
            </Link>
            <Link href="/admin/content/outreach">
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
