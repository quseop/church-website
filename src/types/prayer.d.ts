export interface PrayerRequest {
  id: string
  name?: string
  email?: string
  content: string
  isHandled: boolean
  createdAt: string
  updatedAt: string
}
