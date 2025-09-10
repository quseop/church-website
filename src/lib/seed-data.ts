import { DataStore } from "../../../../../Downloads/sourcefile/src/lib/data-store"

export function seedInitialData() {
  // Check if data already exists
  const existingQuotes = DataStore.getQuotes()

  if (existingQuotes.length === 0) {
    // Add some initial quotes
    const initialQuotes = [
      {
        text: "Faith is not believing that God can, but that God will.",
        author: "William Marrion Branham",
        date: new Date().toISOString(),
        isActive: true,
      },
      {
        text: "The Word of God is the will of God.",
        author: "William Marrion Branham",
        date: new Date().toISOString(),
        isActive: true,
      },
      {
        text: "God's love never fails, and His promises never break.",
        author: "Pastor's Message",
        date: new Date().toISOString(),
        isActive: true,
      },
      {
        text: "In every trial, God is preparing us for greater glory.",
        author: "Original Seed Ministries",
        date: new Date().toISOString(),
        isActive: true,
      },
      {
        text: "The Bride of Christ must be ready, for the hour is at hand.",
        author: "End Time Message",
        date: new Date().toISOString(),
        isActive: true,
      },
    ]

    initialQuotes.forEach((quote) => {
      DataStore.saveQuote(quote)
    })
  }

  // Add initial testimonies if none exist
  const existingTestimonies = DataStore.getTestimonies()
  if (existingTestimonies.length === 0) {
    const initialTestimonies = [
      {
        title: "Healing Through Prayer",
        content:
          "I was diagnosed with a serious illness, but through the prayers of the church and faith in God's Word, I was completely healed. The doctors were amazed at my recovery.",
        author: "Sister Mary",
        date: new Date().toISOString(),
        isApproved: true,
      },
      {
        title: "Financial Breakthrough",
        content:
          "After months of financial struggle, I trusted in God's provision. Within weeks, I received an unexpected job offer that exceeded all my expectations.",
        author: "Brother John",
        date: new Date().toISOString(),
        isApproved: true,
      },
    ]

    initialTestimonies.forEach((testimony) => {
      DataStore.saveTestimony(testimony)
    })
  }

  // Add initial news if none exist
  const existingNews = DataStore.getNews()
  if (existingNews.length === 0) {
    const initialNews = [
      {
        title: "Special Revival Service This Sunday",
        content:
          "Join us for a special revival service this Sunday at 10 AM. We will have guest speakers and extended worship time. Come expecting God to move in a mighty way!",
        author: "Pastor",
        date: new Date().toISOString(),
        isPublished: true,
      },
      {
        title: "Community Outreach Program",
        content:
          "Our church is organizing a community outreach program next month. We will be providing food and clothing to families in need. Volunteers are welcome to join us in this ministry.",
        author: "Ministry Team",
        date: new Date().toISOString(),
        isPublished: true,
      },
    ]

    initialNews.forEach((news) => {
      DataStore.saveNews(news)
    })
  }
}
