<template>
  <div>
    <ScreenLoading v-if="store.appState === AppState.Loading" />
    <ScreenOnboarding v-else-if="store.appState === AppState.Onboarding" />
    <ScreenDeck v-else-if="store.appState === AppState.Deck" />

    <AppPopup ref="profile">
      <UserProfile />
      <AppButton
        class="button--reset-app"
        size="sm"
        variant="link"
        @click="resetApp"
      >
        Reset app data
      </AppButton>
    </AppPopup>

    <AppButton
      v-if="store.hasUserProfile"
      class="button--open-profile"
      size="sm"
      variant="link"
      @click="store.setShowUserProfile(true)"
    >
      Profile
    </AppButton>
  </div>
</template>

<script setup lang="ts">
  const store = useStore()

  const profile = ref()

  const showProfilePopup = computed(
    () => store.hasUserProfile && store.showUserProfile
  )

  watch(
    () => showProfilePopup,
    () => {
      if (showProfilePopup.value) {
        profile.value.show()
      } else {
        profile.value.hide()
      }
    },
    {
      deep: true
    }
  )

  function resetApp() {
    store.resetApp()
  }
</script>
