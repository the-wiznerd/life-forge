<template>
  <div>
    <ScreenLoading v-if="appState === AppState.Loading" />
    <ScreenTitle v-else-if="appState === AppState.Welcome" />
    <ScreenPlay v-else-if="appState === AppState.Play" />
  </div>
</template>

<script setup lang="ts">
  enum AppState {
    Loading,
    Welcome,
    Play
  }

  const appState = ref<AppState>(AppState.Loading)

  onMounted(() => {
    // @todo: Check for a save file.
    appState.value = AppState.Play
  })
</script>
