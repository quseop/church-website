"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, FileText } from "lucide-react"
import type { StudyGuide } from "@/types/study-guide"

export default function StudyGuidesManagement() {
  const [items, setItems] = useState<StudyGuide[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editing, setEditing] = useState<StudyGuide | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fileUrl: "",
    fileType: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/admin/study-guides')
        if (!res.ok) { setItems([]); return }
        const data = await res.json().catch(() => [])
        setItems(Array.isArray(data) ? data : [])
      } catch { setItems([]) }
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fileUrl && file) {
      try {
        setUploading(true)
        const fd = new FormData()
        fd.append('file', file)
        if (formData.title) fd.append('title', formData.title)
        if (formData.description) fd.append('description', formData.description)
        const up = await fetch('/api/admin/study-guides/upload', { method: 'POST', body: fd })
        if (up.ok) {
          const { url, fileType } = await up.json()
          formData.fileUrl = url
          formData.fileType = fileType
        } else {
          alert('Upload failed')
          setUploading(false)
          return
        }
      } finally { setUploading(false) }
    }

    if (editing) {
      await fetch(`/api/admin/study-guides/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }).catch(() => {})
      setEditing(null)
    } else {
      await fetch('/api/admin/study-guides', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }).catch(() => {})
      setIsAdding(false)
    }

    setFormData({ title: "", description: "", fileUrl: "", fileType: "" })
    try {
      const res = await fetch('/api/admin/study-guides')
      if (!res.ok) setItems([])
      else {
        const data = await res.json().catch(() => [])
        setItems(Array.isArray(data) ? data : [])
      }
    } catch { setItems([]) }
  }

  const handleEdit = (item: StudyGuide) => {
    setEditing(item)
    setFormData({ title: item.title, description: item.description ?? "", fileUrl: item.fileUrl, fileType: item.fileType })
    setIsAdding(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this file?")) {
      await fetch(`/api/admin/study-guides/${id}`, { method: 'DELETE' }).catch(() => {})
      try {
        const res = await fetch('/api/admin/study-guides')
        if (!res.ok) setItems([])
        else {
          const data = await res.json().catch(() => [])
          setItems(Array.isArray(data) ? data : [])
        }
      } catch { setItems([]) }
    }
  }

  const cancelEdit = () => {
    setIsAdding(false)
    setEditing(null)
    setFormData({ title: "", description: "", fileUrl: "", fileType: "" })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Study Guides & Notes</h1>
          <p className="text-gray-600 mt-2">Upload and manage study guides and notes (PDF, DOCX, PPT)</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="bg-[#8B0000] hover:bg-[#6B0000]">
          <Plus className="h-4 w-4 mr-2" />
          Add File
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editing ? "Edit File" : "Add New File"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <textarea id="description" className="w-full border rounded p-2 text-sm" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fileUrl">File URL</Label>
                <Input id="fileUrl" value={formData.fileUrl} onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })} placeholder="https://..." />
                <div className="text-xs text-gray-500">Or upload from your computer below (PDF, DOCX, PPT/PPTX)</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <Input id="file" type="file" accept=".pdf,.docx,.ppt,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="bg-[#8B0000] hover:bg-[#6B0000]" disabled={uploading}>{uploading ? 'Uploading...' : (editing ? "Update" : "Add")}</Button>
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
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No files yet.</p>
            </CardContent>
          </Card>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                    {item.description && <p className="text-sm text-gray-700 mb-2">{item.description}</p>}
                    <p className="text-sm text-gray-600 break-all mb-2">{item.fileUrl}</p>
                    <Badge variant="secondary">{item.fileType}</Badge>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
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
