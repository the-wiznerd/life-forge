declare global {
  type CardBonus = {
    description: string
    statCategory: StatCategory
    value: number
  }

  type Card = {
    id: number
    title: string
    description: string
    statCategory: StatCategory
    value: number
    bonuses?: CardBonus[]
  }
}

export const Cards: Card[] = [
  {
    id: 1,
    title: 'Boil Em, Mash Em',
    description: 'Eat a serving of vegetables.',
    statCategory: 'health',
    value: 1,
    bonuses: []
  },
  {
    id: 2,
    title: 'Light the Forge',
    description: 'Light a candle. Site with it for 1 minute.',
    statCategory: 'personal-care',
    value: 1,
    bonuses: []
  },
  {
    id: 3,
    title: 'Spell Casting',
    description: 'Meditate for 5 minutes.',
    statCategory: 'personal-care',
    value: 1,
    bonuses: [
      {
        description: 'if you start levitating.',
        statCategory: 'personal-care',
        value: 23
      }
    ]
  },
  {
    id: 4,
    title: 'Pumping Up',
    description: 'Do 5 pushups in a row.',
    statCategory: 'health',
    value: 1,
    bonuses: [
      {
        description: 'per 10 pushups in a row after.',
        statCategory: 'health',
        value: 1
      }
    ]
  },
  {
    id: 5,
    title: 'Clean Quick Save',
    description: 'Wash your bedsheets.',
    statCategory: 'cleanliness',
    value: 1,
    bonuses: []
  },
  {
    id: 6,
    title: 'A Noble Steed',
    description: 'Clean out your car.',
    statCategory: 'cleanliness',
    value: 1,
    bonuses: [
      {
        description: 'if you detail it.',
        statCategory: 'cleanliness',
        value: 2
      },
      {
        description: 'if you wash the outside.',
        statCategory: 'cleanliness',
        value: 2
      }
    ]
  },
  {
    id: 7,
    title: 'A Grand Adventure',
    description: 'Walk outside for 5 minutes.',
    statCategory: 'health',
    value: 1,
    bonuses: [
      {
        description: 'per adventurer.',
        statCategory: 'health',
        value: 1
      }
    ]
  },
  {
    id: 8,
    title: 'Right Under Your Feet',
    description: 'Clean a room floor.',
    statCategory: 'cleanliness',
    value: 1,
    bonuses: [
      {
        description: 'if you clean all room floors.',
        statCategory: 'cleanliness',
        value: 2
      }
    ]
  },
  {
    id: 9,
    title: 'Feral',
    description: 'Walk on all fours for 2 minutes.',
    statCategory: 'health',
    value: 1,
    bonuses: [
      {
        description: 'if you do it for 5 minutes.',
        statCategory: 'health',
        value: 1
      }
    ]
  },
  {
    id: 10,
    title: "A Hobbit's View",
    description: 'Lay on the floor for 2 minutes.',
    statCategory: 'personal-care',
    value: 1,
    bonuses: []
  },
  {
    id: 11,
    title: 'Tidying Up',
    description: 'Organize a space that needs it.',
    statCategory: 'cleanliness',
    value: 1,
    bonuses: []
  },
  {
    id: 12,
    title: 'Sweet Rolls',
    description: 'Get a sweet treat.',
    statCategory: 'personal-care',
    value: 1,
    bonuses: []
  },
  {
    id: 13,
    title: 'Potion Brewing',
    description: 'Cook a new recipe.',
    statCategory: 'personal-care',
    value: 1,
    bonuses: [
      {
        description: "If it's healthy.",
        statCategory: 'health',
        value: 1
      }
    ]
  },
  {
    id: 14,
    title: 'Giant',
    description: 'Jump as high as you can 5 times.',
    statCategory: 'health',
    value: 1,
    bonuses: [
      {
        description: 'if you touch the ceiling.',
        statCategory: 'health',
        value: 1
      }
    ]
  },
  {
    id: 15,
    title: 'Fount of Youth',
    description: 'Drink a glass of water.',
    statCategory: 'health',
    value: 1,
    bonuses: [
      {
        description: 'per quart of water you drank today.',
        statCategory: 'health',
        value: 1
      }
    ]
  },
  {
    id: 16,
    title: 'Clearing the Forge',
    description: 'Clean your oven.',
    statCategory: 'cleanliness',
    value: 1,
    bonuses: []
  },
  {
    id: 17,
    title: 'Ancient Texts',
    description: 'Read 2 pages of a book.',
    statCategory: 'personal-care',
    value: 1,
    bonuses: [
      {
        description: 'if you read a chapter.',
        statCategory: 'personal-care',
        value: 2
      }
    ]
  },
  {
    id: 18,
    title: 'Crystal Ball Polishing',
    description: 'Dust all your screens.',
    statCategory: 'cleanliness',
    value: 1,
    bonuses: [
      {
        description: 'if you dust the windows.',
        statCategory: 'cleanliness',
        value: 1
      }
    ]
  }
]
