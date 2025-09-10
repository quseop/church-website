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
import { Plus, Edit, Trash2, QuoteIcon } from "lucide-react"
import type { Quote } from "@/types/quote"

export default function QuotesManagement() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isAddingQuote, setIsAddingQuote] = useState(false)
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null)
  const [formData, setFormData] = useState({
    text: "",
    author: "",
    isActive: true,
  })

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/admin/quotes')
        if (!res.ok) {
          setQuotes([])
          return
        }
        const data = await res.json().catch(() => [])
        setQuotes(Array.isArray(data) ? data : [])
      } catch {
        setQuotes([])
      }
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingQuote) {
      await fetch(`/api/admin/quotes/${editingQuote.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      setEditingQuote(null)
    } else {
      await fetch('/api/admin/quotes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      setIsAddingQuote(false)
    }

    setFormData({ text: "", author: "", isActive: true })
    try {
      const res = await fetch('/api/admin/quotes')
      if (!res.ok) {
        setQuotes([])
      } else {
        const data = await res.json().catch(() => [])
        setQuotes(Array.isArray(data) ? data : [])
      }
    } catch {
      setQuotes([])
    }
  }

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote)
    setFormData({
      text: quote.text,
      author: quote.author,
      isActive: quote.isActive,
    })
    setIsAddingQuote(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this quote?")) {
      await fetch(`/api/admin/quotes/${id}`, { method: 'DELETE' })
      try {
        const res = await fetch('/api/admin/quotes')
        if (!res.ok) {
          setQuotes([])
        } else {
          const data = await res.json().catch(() => [])
          setQuotes(Array.isArray(data) ? data : [])
        }
      } catch {
        setQuotes([])
      }
    }
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    await fetch(`/api/admin/quotes/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive }) })
    try {
      const res = await fetch('/api/admin/quotes')
      if (!res.ok) {
        setQuotes([])
      } else {
        const data = await res.json().catch(() => [])
        setQuotes(Array.isArray(data) ? data : [])
      }
    } catch {
      setQuotes([])
    }
  }

  const cancelEdit = () => {
    setIsAddingQuote(false)
    setEditingQuote(null)
    setFormData({ text: "", author: "", isActive: true })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Quotes</h1>
          <p className="text-gray-600 mt-2">Manage inspirational quotes for your community</p>
        </div>
        <Button onClick={() => setIsAddingQuote(true)} className="bg-[#8B0000] hover:bg-[#6B0000]">
          <Plus className="h-4 w-4 mr-2" />
          Add Quote
        </Button>
      </div>

      {/* Add/Edit Quote Form */}
      {isAddingQuote && (
        <Card>
          <CardHeader>
            <CardTitle>{editingQuote ? "Edit Quote" : "Add New Quote"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Quote Text</Label>
                <Textarea
                  id="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Enter the inspirational quote..."
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Quote author (e.g., Pastor John, Bible verse)"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="active">Active (will be shown on website)</Label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-[#8B0000] hover:bg-[#6B0000]">
                  {editingQuote ? "Update Quote" : "Add Quote"}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Quotes List */}
      <div className="grid gap-4">
        {quotes.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <QuoteIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No quotes added yet. Add your first inspirational quote!</p>
            </CardContent>
          </Card>
        ) : (
          quotes.map((quote) => (
            <Card key={quote.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
<blockquote className="text-lg italic text-gray-700 mb-2">&quot;{quote.text}&quot;</blockquote>
                    <p className="text-sm text-gray-600 mb-3">— {quote.author}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant={quote.isActive ? "default" : "secondary"}>
                        {quote.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <span className="text-xs text-gray-500">Added {new Date(quote.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Switch checked={quote.isActive} onCheckedChange={(checked) => toggleActive(quote.id, checked)} />
                    <Button variant="outline" size="sm" onClick={() => handleEdit(quote)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(quote.id)}
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
