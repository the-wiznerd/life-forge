export const useStore = defineStore('store', () => {
  const completedCards = ref<Card[]>([])

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

  return {
    allCards,
    completedCards,
    incompleteCards
  }
})
