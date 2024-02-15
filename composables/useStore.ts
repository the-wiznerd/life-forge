import { AppState } from '#imports'

const StorageKey = {
  FirstName: 'firstName',
  HealthStat: 'health',
  CleanlinessStat: 'cleanliness',
  PersonalCareStat: 'personalCare',
  CompletedCards: 'completedCards',
  CurrentCard: 'currentCard'
}

export const useStore = defineStore('store', () => {
  /**
   * The current state the app is in.
   */
  const appState = ref<AppState>(AppState.Loading)

  /**
   * The user's profile.
   */
  const userProfile = ref<UserProfile>({
    firstName: '',
    health: 0,
    cleanliness: 0,
    personalCare: 0
  })

  /**
   * Whether or not the user has onboarded and has a profile.
   */
  const hasUserProfile = computed(() => Boolean(userProfile.value.firstName))

  /**
   * Whether or not the app should currently be showing the user profile.
   */
  const showUserProfile = ref(false)

  /**
   * All cards in the game.
   */
  const allCards = computed(() => Cards)
  /**
   * The current/active card.
   */
  const currentCard = ref<Card>()

  /**
   * The list of completed cards.
   */
  const completedCards = ref<Card[]>([])

  /**
   * All cards that have not yet been completed.
   */
  const incompleteCards = computed(() => {
    const _cards: Card[] = []
    for (const card of allCards.value) {
      if (!completedCards.value.find(x => x.id === card.id)) {
        _cards.push(card)
      }
    }
    return _cards
  })

  /**
   * Mark a card complete.
   */
  function completeCard(card: Card) {
    if (completedCards.value.includes(card)) {
      return
    }

    completedCards.value.push(card)
    setLocalStorageValue(
      StorageKey.CompletedCards,
      completedCards.value.map(x => x.id)
    )
  }

  /**
   * Set the given card as the new current card.
   */
  function drawCard(card: Card) {
    currentCard.value = card
    setLocalStorageValue(StorageKey.CurrentCard, card.id)
  }

  /**
   * Put the current card back in the deck.
   */
  function discardCurrentCard() {
    currentCard.value = undefined
    setLocalStorageValue(StorageKey.CurrentCard, '')
  }

  /**
   * Save the user's first name to their profile.
   */
  function setFirstName(firstName: string) {
    userProfile.value.firstName = firstName
    setLocalStorageValue(StorageKey.FirstName, firstName)
  }

  // Pull in the current profile from local storage info, if any.
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

  // Pull in the completed cards from local storage, if any.
  const _completedCardIds = getLocalStorageValue(StorageKey.CompletedCards)
  if (typeof _completedCardIds === 'object' && _completedCardIds !== null) {
    Object.values(_completedCardIds).forEach(id => {
      const _card = allCards.value.find(x => x.id === id)
      if (_card) {
        completedCards.value.push(_card)
      }
    })
  }

  // Pull in the current card from local storage, if any.
  const _currentCardId = getLocalStorageValue(StorageKey.CurrentCard)
  const _currentCard = allCards.value.find(x => x.id === _currentCardId)
  if (_currentCard) {
    currentCard.value = _currentCard
  }

  // Initialize the app state.
  appState.value = hasUserProfile.value ? AppState.Deck : AppState.Onboarding

  return {
    appState,
    userProfile,
    hasUserProfile,
    showUserProfile,
    setFirstName,
    allCards,
    completedCards,
    incompleteCards,
    currentCard,
    completeCard,
    drawCard,
    discardCurrentCard
  }
})
