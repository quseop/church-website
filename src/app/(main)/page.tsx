import { Home } from "@/components/pages/home/home"
import {Footer} from "@/components/sub-components/footer";

export const revalidate = 60

export default async function HomePage() {

  return (
    <div>
      <Home />
      <Footer />
    </div>
  )
}
