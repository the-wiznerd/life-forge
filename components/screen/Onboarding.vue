<template>
  <div class="screen screen--onboarding">
    <h1 class="screen__title">Welcome!</h1>
    <form @submit.prevent="submit">
      <label class="form-field">
        <div class="form-field__label">What's your first name?</div>
        <input v-model="firstName" required type="text" />
      </label>
      <AppButton :disabled="!firstName" type="submit">Ready!</AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
  const store = useStore()

  const firstName = ref<string>('')

  watch(
    () => store.hasUserProfile,
    () => {
      if (store.hasUserProfile) {
        store.showUserProfile = true
        store.appState = AppState.Deck
      }
    }
  )

  function submit() {
    if (firstName.value) {
      store.setFirstName(firstName.value)
    }
  }
</script>
