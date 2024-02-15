<template>
  <div
    :class="[
      'card',
      `card--face-${isFaceUp ? 'up' : 'down'}`,
      `stat-category--${card.statCategory}`
    ]"
  >
    <div v-if="!isFaceUp" class="card__back"></div>
    <div v-else class="card__face">
      <div class="card__header">
        <h2 class="card__title">{{ card.title }}</h2>
        <div class="card__value">{{ card.value }}<small>XP</small></div>
      </div>
      <div class="card__body">
        <div class="card__description">
          <p>{{ card.description }}</p>
          <p></p>
        </div>
        <div v-if="card.bonuses.length" class="card__bonuses">
          <p v-for="(bonus, index) in card.bonuses" :key="index">
            <span class="card-bonus">
              <span
                :class="`card-bonus__value stat-category--${bonus.statCategory}`"
              >
                {{ bonus.value }}<small>XP</small>
              </span>
              <span class="card-bonus__description">
                &nbsp;{{ bonus.description }}
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      card: Card
      isFaceUp?: boolean
    }>(),
    {
      isFaceUp: false
    }
  )
</script>
