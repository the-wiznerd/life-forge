<template>
  <div>
    <ScreenLoading v-if="appState === AppState.Loading" />
    <ScreenProfile v-else-if="appState === AppState.Profile" />
    <ScreenDeck v-else-if="appState === AppState.Deck" />

    <UserProfile
      :class="{ 'is-showing': store.hasUserProfile && store.showUserProfile }"
    />
    <AppButton
      v-if="store.hasUserProfile"
      class="button--open-profile"
      size="sm"
      variant="link"
      @click="store.showUserProfile = true"
    >
      Profile
    </AppButton>
  </div>
</template>

<script setup lang="ts">
  enum AppState {
    Loading,
    Profile,
    Deck
  }

  const store = useStore()
  const appState = ref<AppState>(AppState.Loading)

  onMounted(() => {
    if (!store.hasUserProfile) {
      appState.value = AppState.Profile
    } else {
      appState.value = AppState.Deck
    }
  })
</script>
