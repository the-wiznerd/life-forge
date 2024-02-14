<template>
  <div class="screen screen--deck">
    <div
      v-if="shuffledCards.length && !currentCard?.value"
      class="card-deck"
      @click="flipCard"
    >
      <AppCard v-for="card in shuffledCards" :key="card.id" :card="card" />
    </div>
    <AppCard
      v-if="currentCard"
      :card="currentCard"
      class="card--current"
      is-face-up
    />

    <div class="button-list">
      <AppButton>Done</AppButton>
      <AppButton variant="link">Skip</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  const store = useStore()

  const shuffledCards = computed(() => shuffleArray(store.incompleteCards))
  const currentCard = computed(() => store.currentCard)

  const topCard = computed(() =>
    shuffledCards.value.length
      ? shuffledCards.value[shuffledCards.value.length - 1]
      : null
  )

  function flipCard() {
    if (topCard.value && currentCard.value) {
      store.flipCard(topCard.value)
    }
  }

  function skipCard() {
    if (topCard.value) {
      store.flipCard(topCard.value)
    }
  }
</script>
