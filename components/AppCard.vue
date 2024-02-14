<template>
  <div :class="['card', `card--face-${isFaceUp ? 'up' : 'down'}`]">
    <div v-if="!isFaceUp" class="card__back"></div>
    <div v-else class="card__face">Card</div>
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
