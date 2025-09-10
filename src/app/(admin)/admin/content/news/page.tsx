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

    setFormData({ title: "", content: "", author: "", imageUrl: "", isPublished: true })
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
    setFormData({ title: "", content: "", author: "", imageUrl: "", isPublished: true })
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
                <Label htmlFor="content">Article Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your article content here..."
                  required
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
                    <p className="text-gray-600 mb-3 line-clamp-3">{article.content.substring(0, 200)}...</p>
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
