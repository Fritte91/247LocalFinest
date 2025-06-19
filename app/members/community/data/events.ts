export interface Event {
  id: number
  title: string
  date: string
  endDate: string
  location: string
  type: string
  status: "past" | "upcoming"
  description: string
  longDescription: string
  images: string[]
  highlights: string[]
  attendees: string[]
  awards?: string[]
  expectedOutcomes?: string[]
}

export const events: Event[] = [
    {
      id: 1,
      title: "Thailand 420 Festival 2024",
      date: "2024-04-20",
      endDate: "2024-04-20",
      location: "Bangkok, Thailand",
      type: "Festival",
      status: "past",
      description:
        "Thailand's biggest cannabis celebration, bringing together growers, users, and enthusiasts in the heart of Bangkok.",
      longDescription:
        "The Thailand 420 Festival celebrated cannabis culture with live music, educational panels, product exhibitions, and community activities. Vendors from all over Thailand showcased premium products and cannabis innovations.",
      images: [
        "/images/weed1.jpg",
        "/images/weed2.jg",
        "/images/weed3.jpg"
      ],
      highlights: [
        "Live concert featuring Thai reggae bands",
        "Panel discussion: Future of Cannabis in Thai Law",
        "150+ cannabis product vendors",
        "Free workshops on home growing and CBD oils"
      ],
      attendees: ["Nattapon Lek", "Maya Chen", "Dr. Anucha Weedsuwan"],
      awards: ["Best Booth Presentation"]
    },
    {
      id: 2,
      title: "Chiang Mai Cannabis Expo 2024",
      date: "2024-08-09",
      endDate: "2024-08-11",
      location: "Chiang Mai International Exhibition Center",
      type: "Expo",
      status: "upcoming",
      description:
        "Northern Thailand’s premier cannabis expo focusing on cultivation, wellness, and legal business opportunities.",
      longDescription:
        "This three-day event will explore Thailand’s cannabis industry with expert speakers, cultivation seminars, CBD wellness brands, and networking with cultivators and investors from across Southeast Asia.",
      images: [
        "/images/weed4.jpg",
        "/images/weed5.jpg"
      ],
      highlights: [
        "Talk: ‘Cannabis & Thai Traditional Medicine’",
        "Grower’s competition - Best Organic Bud",
        "Investor roundtable for cannabis startups",
        "Over 5,000 attendees expected"
      ],
      attendees: ["Dr. Chalerm Yod", "Northern Growers Association"],
      expectedOutcomes: [
        "Promote local Chiang Mai cannabis brands",
        "Bridge connections between growers and investors"
      ]
    },
    {
      id: 3,
      title: "Ganjastic Market Pattaya",
      date: "2024-06-01",
      endDate: "2024-06-02",
      location: "Pattaya Cannabis Street, Pattaya",
      type: "Market",
      status: "past",
      description:
        "A cannabis lifestyle market with street stalls, food, music, and premium weed products from local dispensaries.",
      longDescription:
        "Ganjastic Market brings a fun, beachside vibe to Pattaya with local dispensaries showing off their best buds, infused food vendors, street music, and community growing tips. A great spot for tourists and locals.",
      images: [
        "/images/weed6.jpg",
        "/images/weed7.jpg"
      ],
      highlights: [
        "Live DJ and open mic stage",
        "First-ever 'Weed & Food Pairing' challenge",
        "Pet-friendly cannabis accessories booth",
        "Discounted deals from 30+ dispensaries"
      ],
      attendees: ["Local shop owners", "Cannabis tourists"],
      awards: ["Best Cannabis Edibles (Ganja Bites)"]
    },
    {
      id: 4,
      title: "PeaceWorld Grand Opening",
      date: "2024-05-15",
      endDate: "2024-05-17",
      location: "Rangsit, Klong Luang, Thailand",
      type: "Business",
      status: "past",
      description:
        "The largest cannabis business event in Pathum Thani celebrating the launch of PeaceWorld dispensary and cultivation brand.",
      longDescription:
        "Three days of networking, premium flower showcases, educational sessions, and grower spotlights. PeaceWorld introduced their Reserve Collection and signed key partnerships with Thai distributors.",
      images: ["/images/weed12.jpg"],
      highlights: [
        "Launch of Premium Reserve Collection",
        "Meet-and-greet with local master growers",
        "Educational talk: ‘Terpenes and Effects’",
        "Industry matchmaking and investment corner"
      ],
      attendees: ["Full Executive Team", "Industry Partners"],
      expectedOutcomes: [
        "$500K in new partnerships",
        "Distribution deals across Bangkok and Hua Hin"
      ]
    }
  ]