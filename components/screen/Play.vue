<template>
  <div class="screen screen--play">
    <div class="card-deck">
      <AppCard
        v-for="card in store.incompleteCards"
        :key="card.id"
        :card="card"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const store = useStore()
</script>
