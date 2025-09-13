"use client"

import Image from "next/image"
import { useState } from "react"
import { MoreVertical, Download } from "lucide-react"

export function Poster({ posterUrl, title }: { posterUrl: string; title: string }) {
  const [open, setOpen] = useState(false)

  async function handleDownload() {
    try {
      const res = await fetch(posterUrl, { mode: 'cors' })
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      const nameFromUrl = (() => {
        try {
          const u = new URL(posterUrl)
          const parts = u.pathname.split('/')
          return parts[parts.length - 1] || 'poster.jpg'
        } catch {
          return 'poster.jpg'
        }
      })()
      link.href = blobUrl
      link.download = nameFromUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
    } catch {
      // Fallback: open in new tab if direct download fails
      window.open(posterUrl, '_blank')
    } finally {
      setOpen(false)
    }
  }

  return (
    <div className="relative inline-block mt-3">
      <Image
        src={posterUrl}
        alt={title}
        width={1000}
        height={1500}
        sizes="(max-width: 640px) 95vw, (max-width: 768px) 50vw, 17vw"
        className="w-[95vw] sm:w-[50vw] md:w-[17vw] h-auto rounded shadow"
      />
      <button
        type="button"
        aria-label="More actions"
        className="absolute top-2 right-2 rounded bg-black/50 hover:bg-black/70 p-1 text-white"
        onClick={() => setOpen((v) => !v)}
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute right-2 top-9 z-10 min-w-40 rounded-md border bg-white text-[#222] shadow">
          <button
            type="button"
            className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" /> Download image
          </button>
        </div>
      )}
    </div>
  )
}
