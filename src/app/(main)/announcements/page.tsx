import { Announcements } from "@/components/pages/announcements/announcements"

export const revalidate = 60

export default async function AnnouncementsPage() {

  return (
    <div>
      <Announcements />
    </div>
  )
}
