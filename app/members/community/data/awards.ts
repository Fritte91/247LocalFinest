export interface Award {
  id: number
  title: string
  category: string
  year: string
  event: string
  winner: string
  strain: string
  description: string
  certificateImage: string
  eventImages: string[]
  significance: string
  judgeComments: string
  competitionStats: {
    totalEntries?: number
    totalVotes?: number
    categories: number
    judges?: number
    participants?: number
  }
}

export const awards: Award[] = [
    {
      id: 1,
      title: "Made in Thailand Cannabis Cup Winner 2023",
      category: "Overall Best in Show",
      year: "2023",
      event: "Made in Thailand Cannabis Cup",
      winner: "Weedbox (Natthapon Moss Khammaphol)",
      strain: "unknown (award is brand-based)",
      description:
        "Recognized as the top overall entry in Thailand's first Made in Thailand Cannabis Cup held December 8–10, 2023 in Bangkok.",
      certificateImage: "/images/cert1.jpg",
      eventImages: ["/images/award1.jpg", "/images/award1.jpg"],
      significance:
        "The inaugural award highlighting excellence in Thai-grown cannabis across all categories.",
      judgeComments: "",
      competitionStats: {
        totalEntries: 140,
        categories: 6,
        judges: 10
      }
    },
    {
      id: 2,
      title: "Siam Cannabis Cup 2024 – Best Indoor Strain",
      category: "Best Indoor Flower",
      year: "2024",
      event: "Siam Cannabis Cup",
      winner: "Neung Thanatorn (Another Level BKK)",
      strain: "Siam Mango Sticky Rice",
      description:
        "Awarded to the top indoor-grown strain at the cruise-based competition held May 18, 2024 aboard Viva Alangka in Bangkok.",
      certificateImage: "/images/cert2.jpg",
      eventImages: ["/images/award2.jpg"],
      significance:
        "Showcases the best quality controlled indoor ventures in Thailand.",
      judgeComments:
        "Exceptionally clean indoor cultivation with rich aroma and terpene complexity.",
      competitionStats: {
        totalEntries: 50,
        categories: 4,
        judges: 12
      }
    },
    {
      id: 3,
      title: "Phuket Cannabis Cup 2024 – Best Indoor Indica",
      category: "Best Indoor Indica",
      year: "2024",
      event: "Phuket Cannabis Cup",
      winner: "PB Biomed",
      strain: "Biscotti Mints",
      description:
        "Recognized at the inaugural Phuket Cannabis Cup on January 2024 for excellence in indoor indica cultivation.",
      certificateImage: "/images/cert1.jpg",
      eventImages: ["/images/award2.jpg", "/images/award1.jpg"],
      significance:
        "Highlights top-tier indoor indica standards in southern Thailand.",
      judgeComments:
        "",
      competitionStats: {
        totalEntries: 50,
        categories: 4,
        judges: 8
      }
    },
    {
      id: 4,
      title: "Budtender Cup 2024 – Highest THC",
      category: "Highest THC Content",
      year: "2024",
      event: "Budtender Cup (Bangkok/Pattaya)",
      winner: "Teratera‑Actera",
      strain: "OMG Burger (approx 33.4% THC)",
      description:
        "Awarded during the second Budtender Cup in December 2024, for the highest measured THC content among flower entries.",
      certificateImage: "/images/cert1.jpg",
      eventImages: ["/images/award2.jpg"],
      significance:
        "Demonstrated Thailand’s capacity to cultivate high-potency genetics domestically.",
      judgeComments: "",
      competitionStats: {
        totalEntries: 76,
        categories: 3,
        judges: 15
      }
    }
  ] 