<template>
  <div class="screen screen--deck">
    <div
      v-if="shuffledCards.length && !currentCard?.value"
      class="card-deck"
      @click="drawCard"
    >
      <AppCard v-for="card in shuffledCards" :key="card.id" :card="card" />
    </div>
    <AppCard
      v-if="currentCard"
      :card="currentCard"
      class="card--current"
      is-face-up
    />

    <h1 v-if="!shuffledCards.length" class="screen__title">Done!</h1>

    <div class="button-list">
      <template v-if="currentCard">
        <AppButton @click="completeCard">Complete</AppButton>
        <AppButton variant="link" @click="skipCard">Skip</AppButton>
      </template>
      <AppButton v-else-if="shuffledCards.length" @click="drawCard">
        Draw Card
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  const store = useStore()

  const shuffledCards = ref<Card[]>([])

  const currentCard = computed(() => store.currentCard)

  const topCard = computed(() =>
    shuffledCards.value.length
      ? shuffledCards.value[shuffledCards.value.length - 1]
      : null
  )

  watch(
    () => store.incompleteCards,
    () => {
      shuffleCards()
    },
    {
      immediate: true
    }
  )

  function shuffleCards() {
    const _cards: Card[] = []
    for (const id of shuffleArray(store.incompleteCards.map(x => x.id))) {
      const _card = store.incompleteCards.find(x => x.id === id)
      if (_card) {
        _cards.push(_card)
      }
    }
    shuffledCards.value = _cards
  }

  function drawCard() {
    if (topCard.value && !currentCard.value) {
      store.drawCard(topCard.value)
    }
  }

  function skipCard() {
    if (currentCard.value) {
      store.unsetCurrentCard()
      shuffleCards()
    }
  }

  function completeCard() {
    if (!currentCard.value) {
      return
    }

    // @todo Add up stats
    store.completeCard(currentCard.value)
    store.currentCard = undefined
  }
</script>
