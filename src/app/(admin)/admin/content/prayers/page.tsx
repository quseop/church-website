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
import { Plus, Edit, Trash2, MessageSquare } from "lucide-react"
import type { PrayerRequest } from "@/types/prayer"

export default function PrayersManagement() {
  const [items, setItems] = useState<PrayerRequest[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editing, setEditing] = useState<PrayerRequest | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
    isHandled: false,
  })

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/admin/prayers')
      setItems(await res.json())
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      await fetch(`/api/admin/prayers/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      setEditing(null)
    } else {
      await fetch('/api/admin/prayers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      setIsAdding(false)
    }
    setFormData({ name: "", email: "", content: "", isHandled: false })
    const res = await fetch('/api/admin/prayers')
    setItems(await res.json())
  }

  const handleEdit = (item: PrayerRequest) => {
    setEditing(item)
    setFormData({ name: item.name ?? "", email: item.email ?? "", content: item.content, isHandled: item.isHandled })
    setIsAdding(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this prayer request?")) {
      await fetch(`/api/admin/prayers/${id}`, { method: 'DELETE' })
      const res = await fetch('/api/admin/prayers')
      setItems(await res.json())
    }
  }

  const toggleHandled = async (id: string, isHandled: boolean) => {
    await fetch(`/api/admin/prayers/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isHandled }) })
    const res = await fetch('/api/admin/prayers')
    setItems(await res.json())
  }

  const cancelEdit = () => {
    setIsAdding(false)
    setEditing(null)
    setFormData({ name: "", email: "", content: "", isHandled: false })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prayer Requests</h1>
          <p className="text-gray-600 mt-2">Manage prayer requests</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="bg-[#8B0000] hover:bg-[#6B0000]">
          <Plus className="h-4 w-4 mr-2" />
          Add Request
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editing ? "Edit Request" : "Add New Request"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name (optional)</Label>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Request</Label>
                <Textarea id="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={5} required />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="handled" checked={formData.isHandled} onCheckedChange={(checked) => setFormData({ ...formData, isHandled: checked })} />
                <Label htmlFor="handled">Handled</Label>
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
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No prayer requests yet.</p>
            </CardContent>
          </Card>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-3">{item.content}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant={item.isHandled ? "default" : "secondary"}>{item.isHandled ? "Handled" : "Pending"}</Badge>
                      <span className="text-xs text-gray-500">{item.name || "Anonymous"}{item.email ? ` • ${item.email}` : ""}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Switch checked={item.isHandled} onCheckedChange={(checked) => toggleHandled(item.id, checked)} />
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
