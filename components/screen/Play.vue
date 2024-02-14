<template>
  <div class="screen screen--play">
    <div v-if="shuffledCards.length" class="card-deck" @click="shuffle">
      <AppCard
        v-for="card in shuffledCards"
        :key="card.id"
        :card="card"
        :is-face-up="card.id === topCard?.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const store = useStore()

  const shuffledCards = computed(() => shuffleArray(store.incompleteCards))

  const topCard = computed(() =>
    shuffledCards.value.length
      ? shuffledCards.value[shuffledCards.value.length - 1]
      : null
  )

  function shuffle() {
    if (topCard.value) {
      store.completedCards.push(topCard.value)
    }
  }
</script>
