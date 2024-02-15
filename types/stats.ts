declare global {
  type StatCategory = 'health' | 'cleanliness' | 'personalCare'
}

export const StatLabel: Record<StatCategory, string> = {
  health: 'Health',
  cleanliness: 'Cleanlinesss',
  personalCare: 'Personal Care'
}
