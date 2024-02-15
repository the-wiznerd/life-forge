<template>
  <button
    :class="`button button--${variant} button--size-${size}`"
    type="button"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      variant?: 'default' | 'link'
      size?: 'default' | 'sm'
    }>(),
    {
      variant: 'default',
      size: 'default'
    }
  )
</script>
