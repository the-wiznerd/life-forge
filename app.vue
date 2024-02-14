<template>
  <div>
    <ScreenLoading v-if="appState === AppState.Loading" />
    <ScreenTitle v-else-if="appState === AppState.Welcome" />
    <ScreenDeck v-else-if="appState === AppState.Deck" />
  </div>
</template>

<script setup lang="ts">
  enum AppState {
    Loading,
    Welcome,
    Deck
  }

  const appState = ref<AppState>(AppState.Loading)

  onBeforeMount(() => {
    // @todo: Check for a save file.
    appState.value = AppState.Deck
  })
</script>
