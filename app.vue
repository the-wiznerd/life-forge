<template>
  <div>
    <ScreenLoading v-if="store.appState === AppState.Loading" />
    <ScreenOnboarding v-else-if="store.appState === AppState.Onboarding" />
    <ScreenDeck v-else-if="store.appState === AppState.Deck" />

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
  const store = useStore()
</script>
