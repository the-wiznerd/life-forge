<template>
  <div class="screen screen--profile">
    <div v-if="store.hasUserProfile" class="user-profile">
      <h1 class="screen__title">
        {{ store.userProfile.firstName }}
      </h1>

      <h2>Stats</h2>
      <div class="user-profile__stats">
        <div class="user-profile__stat">
          <h3>Health</h3>
          <div class="user-profile__stat-value">
            {{ store.userProfile.health }}
          </div>
        </div>
      </div>
    </div>
    <template v-else>
      <h1 class="screen__title">Welcome!</h1>
      <form @submit.prevent="submit">
        <label class="form-field">
          <div class="form-field__label">What's your first name?</div>
          <input v-model="firstName" required type="text" />
        </label>
        <AppButton :disabled="!firstName" type="submit">Ready!</AppButton>
      </form>
    </template>
  </div>
</template>

<script setup lang="ts">
  const store = useStore()

  const firstName = ref<string>('')

  function submit() {
    if (firstName.value) {
      store.setFirstName(firstName.value)
    }
  }
</script>
