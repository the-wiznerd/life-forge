<template>
  <div class="user-profile">
    <div class="user-profile__content">
      <h2 class="screen__title">
        {{ store.userProfile.firstName }}
      </h2>

      <h3>Stats</h3>
      <div class="user-profile__stats">
        <UserProfileStat stat="health" :value="store.userProfile.health" />
        <UserProfileStat
          stat="cleanliness"
          :value="store.userProfile.cleanliness"
        />
        <UserProfileStat
          stat="personalCare"
          :value="store.userProfile.personalCare"
        />
      </div>

      <AppButton @click="store.showUserProfile = false">Close</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  const store = useStore()
</script>
