<template>
  <div :class="`user-profile__stat stat-category--${stat}`">
    <h4>{{ StatLabel[stat] }}</h4>
    <div class="user-profile__stat-value">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    stat: StatCategory
    value: number
  }>()
</script>
