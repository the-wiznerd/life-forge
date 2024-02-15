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
  const _appState = ref<AppState>(AppState.Loading)
  const appState = computed(() => _appState.value)

  /**
   * The user's profile.
   */
  const _userProfile = ref<UserProfile>({
    firstName: '',
    health: 0,
    cleanliness: 0,
    personalCare: 0
  })
  const userProfile = computed(
    () => _userProfile.value as Readonly<UserProfile>
  )

  /**
   * Whether or not the user has onboarded and has a profile.
   */
  const hasUserProfile = computed(() => Boolean(_userProfile.value.firstName))

  /**
   * Whether or not the app should currently be showing the user profile.
   */
  const _showUserProfile = ref(false)
  const showUserProfile = computed(() => _showUserProfile.value)

  /**
   * All cards in the game.
   */
  const allCards = computed(() => Cards.slice())
  /**
   * The current/active card.
   */
  const _currentCard = ref<Card>()
  const currentCard = computed(() => _currentCard.value)

  /**
   * The list of completed cards.
   */
  const _completedCards = ref<Card[]>([])
  const completedCards = computed(() => _completedCards.value.slice())

  /**
   * All cards that have not yet been completed.
   */
  const incompleteCards = computed(() => {
    const _cards: Card[] = []
    for (const card of allCards.value) {
      if (!_completedCards.value.find(x => x.id === card.id)) {
        console.log(card.id)
        _cards.push(card)
      }
    }
    return _cards
  })

  /**
   * Update the app state.
   */
  function setAppState(state: AppState) {
    _appState.value = state
  }

  /**
   * Set whether or not to show the user profile.
   */
  function setShowUserProfile(state: boolean) {
    _showUserProfile.value = state
  }

  /**
   * Mark a card complete.
   */
  function completeCard(card: Card) {
    if (card.id === _currentCard.value?.id) {
      unsetCurrentCard()
    }

    if (_completedCards.value.includes(card)) {
      return
    }

    _completedCards.value.push(card)
    setLocalStorageValue(
      StorageKey.CompletedCards,
      _completedCards.value.map(x => x.id)
    )
  }

  /**
   * Set the given card as the new current card.
   */
  function drawCard(card: Card) {
    _currentCard.value = card
    setLocalStorageValue(StorageKey.CurrentCard, card.id)
  }

  /**
   * Put the current card back in the deck.
   */
  function unsetCurrentCard() {
    _currentCard.value = undefined
    setLocalStorageValue(StorageKey.CurrentCard, '')
  }

  /**
   * Save the user's first name to their profile.
   */
  function setFirstName(firstName: string) {
    _userProfile.value.firstName = firstName
    setLocalStorageValue(StorageKey.FirstName, firstName)
  }

  /**
   * Save the user's health stat to their profile.
   */
  function setHealthStat(value: number) {
    _userProfile.value.health = value
    setLocalStorageValue(StorageKey.HealthStat, value)
  }

  /**
   * Save the user's cleanliness stat to their profile.
   */
  function setCleanlinessStat(value: number) {
    _userProfile.value.cleanliness = value
    setLocalStorageValue(StorageKey.CleanlinessStat, value)
  }

  /**
   * Save the user's personal care stat to their profile.
   */
  function setPersonalCareStat(value: number) {
    _userProfile.value.personalCare = value
    setLocalStorageValue(StorageKey.PersonalCareStat, value)
  }

  /**
   * Log current state info to the console.
   */
  function logState() {
    // eslint-disable-next-line no-console
    console.info(
      'all cards',
      allCards.value.map(x => getCardIdentifierString(x))
    )
    // eslint-disable-next-line no-console
    console.info(
      'completed cards',
      completedCards.value.map(x => getCardIdentifierString(x))
    )
    // eslint-disable-next-line no-console
    console.info(
      'incomplete cards',
      incompleteCards.value.map(x => getCardIdentifierString(x))
    )
    // eslint-disable-next-line no-console
    console.info('current card', getCardIdentifierString(currentCard.value))
  }

  // Pull in the current profile from local storage info, if any.
  const _firstName = getLocalStorageValue(StorageKey.FirstName)
  if (typeof _firstName === 'string') {
    _userProfile.value.firstName = _firstName
  }

  const _healthStat = getLocalStorageValue(StorageKey.HealthStat)
  if (typeof _healthStat === 'number') {
    _userProfile.value.health = Math.max(0, _healthStat)
  }

  const _cleanlinessStat = getLocalStorageValue(StorageKey.CleanlinessStat)
  if (typeof _cleanlinessStat === 'number') {
    _userProfile.value.cleanliness = Math.max(0, _cleanlinessStat)
  }

  const _personalCareStat = getLocalStorageValue(StorageKey.PersonalCareStat)
  if (typeof _personalCareStat === 'number') {
    _userProfile.value.personalCare = Math.max(0, _personalCareStat)
  }

  // Pull in the completed cards from local storage, if any.
  const _completedCardIds = getLocalStorageValue(StorageKey.CompletedCards)
  if (typeof _completedCardIds === 'object' && _completedCardIds !== null) {
    Object.values(_completedCardIds).forEach(id => {
      const _card = allCards.value.find(x => x.id === id)
      if (_card) {
        _completedCards.value.push(_card)
      }
    })
  }

  // Pull in the current card from local storage, if any.
  const _currentCardId = getLocalStorageValue(StorageKey.CurrentCard)
  _currentCard.value =
    allCards.value.find(x => x.id === _currentCardId) || undefined

  // Initialize the app state.
  _appState.value = hasUserProfile.value ? AppState.Deck : AppState.Onboarding
  logState()

  return {
    appState,
    setAppState,
    setHealthStat,
    setCleanlinessStat,
    setPersonalCareStat,
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
    unsetCurrentCard,
    logState,
    setShowUserProfile
  }
})
