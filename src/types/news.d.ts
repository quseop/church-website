export interface NewsArticle {
  id: string
  title: string
  content: string
  summary?: string | null
  bodyMd?: string | null
  eventItems?: { date: string; startTime: string; venue?: string; note?: string }[] | null
  author: string
  imageUrl?: string
  posterUrl?: string | null
  venue?: string | null
  isPublished: boolean
  date: string
  createdAt: string
  updatedAt: string
}
