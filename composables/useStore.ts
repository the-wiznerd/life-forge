const StorageKey = {
  FirstName: 'firstName',
  HealthStat: 'health',
  CleanlinessStat: 'cleanliness',
  PersonalCareStat: 'personalCare',
  CompletedCards: 'completedCards',
  CurrentCard: 'currentCard'
}

export const useStore = defineStore('store', () => {
  const completedCards = ref<Card[]>([])

  const currentCard = ref<Card>()

  const userProfile = ref<UserProfile>({
    firstName: '',
    health: 0,
    cleanliness: 0,
    personalCare: 0
  })

  const showUserProfile = ref(false)

  const hasUserProfile = computed(() => Boolean(userProfile.value.firstName))

  const allCards = computed(() => Cards)

  const incompleteCards = computed(() => {
    const _cards: Card[] = []
    for (const card of allCards.value) {
      if (!completedCards.value.find(x => x.id === card.id)) {
        _cards.push(card)
      }
    }
    return _cards
  })

  function flipCard(card: Card) {
    currentCard.value = card
    setLocalStorageValue(StorageKey.CurrentCard, card.id)
  }

  function setFirstName(firstName: string) {
    userProfile.value.firstName = firstName
    setLocalStorageValue(StorageKey.FirstName, firstName)
  }

  function importDataFromLocalStorage() {
    // Pull in the current profile info, if any.
    const _firstName = getLocalStorageValue(StorageKey.FirstName)
    if (typeof _firstName === 'string') {
      userProfile.value.firstName = _firstName
    }

    const _healthStat = getLocalStorageValue(StorageKey.HealthStat)
    if (typeof _healthStat === 'number') {
      userProfile.value.health = Math.max(0, _healthStat)
    }

    const _cleanlinessStat = getLocalStorageValue(StorageKey.CleanlinessStat)
    if (typeof _cleanlinessStat === 'number') {
      userProfile.value.cleanliness = Math.max(0, _cleanlinessStat)
    }

    const _personalCareStat = getLocalStorageValue(StorageKey.PersonalCareStat)
    if (typeof _personalCareStat === 'number') {
      userProfile.value.personalCare = Math.max(0, _personalCareStat)
    }

    // Pull in the completed cards, if any.
    // const _completedCards = getLocalStorageValue(StorageKey.CompletedCards)
    // if (typeof _completedCards === 'array') {
    //   // userProfile.value.personalCare = Math.max(0, _personalCareStat)
    // }

    // Pull in the current card, if any.
    const _currentCardId = getLocalStorageValue(StorageKey.CurrentCard)
    const _currentCard = allCards.value.find(x => x.id === _currentCardId)
    if (_currentCard) {
      currentCard.value = _currentCard
    }
  }

  importDataFromLocalStorage()

  return {
    allCards,
    showUserProfile,
    completedCards,
    incompleteCards,
    currentCard,
    flipCard,
    setFirstName,
    hasUserProfile,
    userProfile
  }
})
