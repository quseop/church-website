"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Heart } from "lucide-react"
import type { Testimony } from "@/types/testimony"

export default function TestimoniesManagement() {
  const [items, setItems] = useState<Testimony[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editing, setEditing] = useState<Testimony | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    isApproved: true,
  })

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/admin/testimonies')
      setItems(await res.json())
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      await fetch(`/api/admin/testimonies/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      setEditing(null)
    } else {
      await fetch('/api/admin/testimonies', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      setIsAdding(false)
    }
    setFormData({ title: "", content: "", author: "", isApproved: true })
    const res = await fetch('/api/admin/testimonies')
    setItems(await res.json())
  }

  const handleEdit = (item: Testimony) => {
    setEditing(item)
    setFormData({ title: item.title, content: item.content, author: item.author, isApproved: item.isApproved })
    setIsAdding(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimony?")) {
      await fetch(`/api/admin/testimonies/${id}`, { method: 'DELETE' })
      const res = await fetch('/api/admin/testimonies')
      setItems(await res.json())
    }
  }

  const toggleApproved = async (id: string, isApproved: boolean) => {
    await fetch(`/api/admin/testimonies/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isApproved }) })
    const res = await fetch('/api/admin/testimonies')
    setItems(await res.json())
  }

  const cancelEdit = () => {
    setIsAdding(false)
    setEditing(null)
    setFormData({ title: "", content: "", author: "", isApproved: true })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonies</h1>
          <p className="text-gray-600 mt-2">Review and manage testimonies</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="bg-[#8B0000] hover:bg-[#6B0000]">
          <Plus className="h-4 w-4 mr-2" />
          Add Testimony
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editing ? "Edit Testimony" : "Add New Testimony"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={6} required />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="approved" checked={formData.isApproved} onCheckedChange={(checked) => setFormData({ ...formData, isApproved: checked })} />
                <Label htmlFor="approved">Approved</Label>
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="bg-[#8B0000] hover:bg-[#6B0000]">{editing ? "Update" : "Add"}</Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {items.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No testimonies yet.</p>
            </CardContent>
          </Card>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-700 mb-3">{item.content}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant={item.isApproved ? "default" : "secondary"}>{item.isApproved ? "Approved" : "Pending"}</Badge>
                      <span className="text-xs text-gray-500">By {item.author} • {new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Switch checked={item.isApproved} onCheckedChange={(checked) => toggleApproved(item.id, checked)} />
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
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
