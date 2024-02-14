export const useStore = defineStore('store', () => {
  const completedCards = ref<Card[]>([])
  const currentCard = ref<Card>()

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
    setLocalStorageValue('currentCard', card.id)
  }

  /**
   * Initialize our state from local storage.
   */
  const _currentCardId = getLocalStorageValue('currentCard')
  const _currentCard = allCards.value.find(x => x.id === _currentCardId)
  if (_currentCard) {
    currentCard.value = _currentCard
  }

  return {
    allCards,
    completedCards,
    incompleteCards,
    currentCard,
    flipCard
  }
})
