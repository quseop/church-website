"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Newspaper } from "lucide-react"
import type { NewsArticle } from "@/types/news"

export default function NewsManagement() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isAddingArticle, setIsAddingArticle] = useState(false)
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    bodyMd: "",
    eventItems: [] as { date: string; startTime: string; venue: string; note?: string }[],
    author: "",
    imageUrl: "",
    isPublished: true,
  })

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/admin/news')
        if (!res.ok) {
          setArticles([])
          return
        }
        const data = await res.json().catch(() => [])
        setArticles(Array.isArray(data) ? data : [])
      } catch {
        setArticles([])
      }
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingArticle) {
      await fetch(`/api/admin/news/${editingArticle.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      setEditingArticle(null)
    } else {
      await fetch('/api/admin/news', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      setIsAddingArticle(false)
    }

    setFormData({ title: "", content: "", summary: "", bodyMd: "", eventItems: [], author: "", imageUrl: "", isPublished: true })
    try {
      const res = await fetch('/api/admin/news')
      if (!res.ok) {
        setArticles([])
      } else {
        const data = await res.json().catch(() => [])
        setArticles(Array.isArray(data) ? data : [])
      }
    } catch {
      setArticles([])
    }
  }

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article)
    setFormData({
      title: article.title,
      content: article.content,
      summary: article.summary ?? "",
      bodyMd: article.bodyMd ?? "",
      eventItems: (article.eventItems ?? []) as { date: string; startTime: string; venue: string; note?: string }[],
      author: article.author,
      imageUrl: article.imageUrl || "",
      isPublished: article.isPublished,
    })
    setIsAddingArticle(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      await fetch(`/api/admin/news/${id}`, { method: 'DELETE' })
      try {
        const res = await fetch('/api/admin/news')
        if (!res.ok) {
          setArticles([])
        } else {
          const data = await res.json().catch(() => [])
          setArticles(Array.isArray(data) ? data : [])
        }
      } catch {
        setArticles([])
      }
    }
  }

  const togglePublished = async (id: string, isPublished: boolean) => {
    await fetch(`/api/admin/news/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isPublished }) })
    try {
      const res = await fetch('/api/admin/news')
      if (!res.ok) {
        setArticles([])
      } else {
        const data = await res.json().catch(() => [])
        setArticles(Array.isArray(data) ? data : [])
      }
    } catch {
      setArticles([])
    }
  }

  const cancelEdit = () => {
    setIsAddingArticle(false)
    setEditingArticle(null)
    setFormData({ title: "", content: "", summary: "", bodyMd: "", eventItems: [], author: "", imageUrl: "", isPublished: true })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News & Updates</h1>
          <p className="text-gray-600 mt-2">Publish church news and keep your community informed</p>
        </div>
        <Button onClick={() => setIsAddingArticle(true)} className="bg-[#8B0000] hover:bg-[#6B0000]">
          <Plus className="h-4 w-4 mr-2" />
          Add Article
        </Button>
      </div>

      {/* Add/Edit Article Form */}
      {isAddingArticle && (
        <Card>
          <CardHeader>
            <CardTitle>{editingArticle ? "Edit Article" : "Add New Article"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Article Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter article title..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Article author"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary (teaser)</Label>
                <Input
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Short teaser shown in lists..."
                />
              </div>

              <div className="space-y-2">
                <Label>Event Schedule (optional)</Label>
                <div className="space-y-2">
                  {formData.eventItems.map((ev, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
                      <div>
                        <Label className="text-xs">Date</Label>
                        <Input type="date" value={ev.date} onChange={(e) => {
                          const next = [...formData.eventItems]; next[idx] = { ...next[idx], date: e.target.value }; setFormData({ ...formData, eventItems: next })
                        }} />
                      </div>
                      <div>
                        <Label className="text-xs">Start Time</Label>
                        <Input type="time" value={ev.startTime} onChange={(e) => {
                          const next = [...formData.eventItems]; next[idx] = { ...next[idx], startTime: e.target.value }; setFormData({ ...formData, eventItems: next })
                        }} />
                      </div>
                      <div>
                        <Label className="text-xs">Venue</Label>
                        <Input value={ev.venue} onChange={(e) => {
                          const next = [...formData.eventItems]; next[idx] = { ...next[idx], venue: e.target.value }; setFormData({ ...formData, eventItems: next })
                        }} />
                      </div>
                      <div className="flex gap-2">
                        <Input placeholder="Note (optional)" value={ev.note || ""} onChange={(e) => {
                          const next = [...formData.eventItems]; next[idx] = { ...next[idx], note: e.target.value }; setFormData({ ...formData, eventItems: next })
                        }} />
                        <Button type="button" variant="outline" onClick={() => {
                          const next = formData.eventItems.filter((_, i) => i !== idx); setFormData({ ...formData, eventItems: next })
                        }}>Remove</Button>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => setFormData({ ...formData, eventItems: [...formData.eventItems, { date: "", startTime: "", venue: "" }] })}>Add Event</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bodyMd">Additional Details (Markdown, optional)</Label>
                <Textarea
                  id="bodyMd"
                  value={formData.bodyMd}
                  onChange={(e) => setFormData({ ...formData, bodyMd: e.target.value })}
                  placeholder="You can use basic markdown here..."
                  rows={8}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.isPublished}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                />
                <Label htmlFor="published">Published (visible on website)</Label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-[#8B0000] hover:bg-[#6B0000]">
                  {editingArticle ? "Update Article" : "Publish Article"}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Articles List */}
      <div className="grid gap-4">
        {articles.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No articles published yet. Share your first news update!</p>
            </CardContent>
          </Card>
        ) : (
          articles.map((article) => (
            <Card key={article.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-3">{(article.summary ?? article.content).toString().slice(0, 200)}...</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>By {article.author}</span>
                      <span>•</span>
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                      <Badge variant={article.isPublished ? "default" : "secondary"}>
                        {article.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Switch
                      checked={article.isPublished}
                      onCheckedChange={(checked) => togglePublished(article.id, checked)}
                    />
                    <Button variant="outline" size="sm" onClick={() => handleEdit(article)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
