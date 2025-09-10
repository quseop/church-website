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
import { Plus, Edit, Trash2, Calendar } from "lucide-react"
import type { Service } from "@/types/service"

export default function ServicesManagement() {
  const [items, setItems] = useState<Service[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startsAt: "",
    location: "",
    isPublished: true,
  })

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/admin/services')
      setItems(await res.json())
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { ...formData, startsAt: new Date(formData.startsAt).toISOString() }
    if (editing) {
      await fetch(`/api/admin/services/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      setEditing(null)
    } else {
      await fetch('/api/admin/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      setIsAdding(false)
    }
    setFormData({ title: "", description: "", startsAt: "", location: "", isPublished: true })
    const res = await fetch('/api/admin/services')
    setItems(await res.json())
  }

  const handleEdit = (item: Service) => {
    setEditing(item)
    setFormData({
      title: item.title,
      description: item.description ?? "",
      startsAt: new Date(item.startsAt).toISOString().slice(0,16),
      location: item.location ?? "",
      isPublished: item.isPublished,
    })
    setIsAdding(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
      const res = await fetch('/api/admin/services')
      setItems(await res.json())
    }
  }

  const togglePublished = async (id: string, isPublished: boolean) => {
    await fetch(`/api/admin/services/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isPublished }) })
    const res = await fetch('/api/admin/services')
    setItems(await res.json())
  }

  const cancelEdit = () => {
    setIsAdding(false)
    setEditing(null)
    setFormData({ title: "", description: "", startsAt: "", location: "", isPublished: true })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-2">Schedule upcoming services</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="bg-[#8B0000] hover:bg-[#6B0000]">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editing ? "Edit Service" : "Add New Service"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startsAt">Start Time</Label>
                  <Input id="startsAt" type="datetime-local" value={formData.startsAt} onChange={(e) => setFormData({ ...formData, startsAt: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="published" checked={formData.isPublished} onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })} />
                <Label htmlFor="published">Published</Label>
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
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No services scheduled yet.</p>
            </CardContent>
          </Card>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    {item.description && <p className="text-sm text-gray-700 mb-2">{item.description}</p>}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{new Date(item.startsAt).toLocaleString()}</span>
                      {item.location && (<><span>•</span><span>{item.location}</span></>)}
                      <Badge variant={item.isPublished ? "default" : "secondary"}>{item.isPublished ? "Published" : "Draft"}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Switch checked={item.isPublished} onCheckedChange={(checked) => togglePublished(item.id, checked)} />
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
