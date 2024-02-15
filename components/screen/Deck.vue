<template>
  <div class="screen screen--deck">
    <!-- Deck -->
    <div
      v-if="shuffledCards.length && !currentCard?.value"
      class="card-deck"
      @click="drawCard"
    >
      <AppCard v-for="card in shuffledCards" :key="card.id" :card="card" />
    </div>

    <!-- Current card -->
    <AppCard
      v-if="currentCard"
      :card="currentCard"
      class="card--current"
      is-face-up
    />

    <!-- Done message -->
    <h1 v-if="!shuffledCards.length" class="screen__title">Done!</h1>

    <!-- Bonus confirmation -->
    <AppPopup ref="popup">
      <BonusInfoForm
        v-if="currentCard"
        :card="currentCard"
        @submit="addStats"
      />
    </AppPopup>

    <!-- Actions -->
    <div class="button-list">
      <template v-if="currentCard">
        <AppButton @click="onComplete">Complete</AppButton>
        <AppButton variant="link" @click="skipCard">Skip</AppButton>
      </template>
      <AppButton v-else-if="shuffledCards.length" @click="drawCard">
        Draw Card
      </AppButton>
    </div>

    <!-- Power up emitter -->
    <PowerUpEmitter ref="emitter" />
  </div>
</template>

<script setup lang="ts">
  const store = useStore()

  const shuffledCards = ref<Card[]>([])
  const popup = ref()
  const emitter = ref()

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

  function onComplete() {
    if (!currentCard.value) {
      return
    }

    // If the card had bonuses, ask about them. Otherwise, go right to completion.
    if (currentCard.value.bonuses?.length) {
      popup.value.show()
    } else {
      const scores: Record<StatCategory, number> = {
        health: 0,
        cleanliness: 0,
        personalCare: 0
      }
      scores[currentCard.value.statCategory] += currentCard.value.value
      addStats(scores)
    }
  }

  function addStats(stats: Record<StatCategory, number>) {
    popup.value.hide()
    if (!currentCard.value) {
      return
    }

    // Add bonuses.
    store.setHealthStat(store.userProfile.health + stats.health)
    store.setCleanlinessStat(store.userProfile.cleanliness + stats.cleanliness)
    store.setPersonalCareStat(
      store.userProfile.personalCare + stats.personalCare
    )

    // Show powerups.
    for (const category in stats) {
      const score = stats[category as keyof typeof stats]
      if (score) {
        emitter.value.showPowerUp(category, score)
      }
    }

    // Mark the card complete.
    store.completeCard(currentCard.value)
    store.logState()
  }
</script>
