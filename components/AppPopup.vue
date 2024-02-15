<template>
  <div :class="{ popup: true, 'popup--is-showing': isShowing }">
    <div class="popup__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineExpose({ show, hide, toggle })

  const isShowing = ref(false)

  function show() {
    isShowing.value = true
  }

  function hide() {
    isShowing.value = false
  }

  function toggle() {
    isShowing.value = !isShowing.value
  }
</script>
