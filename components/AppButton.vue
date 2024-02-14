<template>
  <button :class="`button button--${variant}`" type="button">
    <slot />
  </button>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      variant?: 'default' | 'link'
    }>(),
    {
      variant: 'default'
    }
  )
</script>
