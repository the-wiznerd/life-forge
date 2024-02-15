<template>
  <div class="power-up-emitter">
    <div
      v-for="powerUp in powerUps"
      :key="powerUp.id"
      :class="`power-up stat-category--${powerUp.category}`"
      :style="{ left: powerUp.left, top: powerUp.top }"
    >
      {{ powerUp.value }}<small>xp</small>
    </div>
  </div>
</template>

<script setup lang="ts">
  type PowerUp = {
    id: number
    category: StatCategory
    ttl: number
    value: number
    left: string
    top: string
  }

  defineExpose({ showPowerUp })

  const powerUpId = ref(1)
  const powerUps = ref<PowerUp[]>([])
  const interval = ref()

  function showPowerUp(category: StatCategory, value: number) {
    powerUpId.value++

    powerUps.value.push({
      id: powerUpId.value,
      category,
      value,
      ttl: new Date().getTime(),
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    })
  }

  onBeforeUnmount(() => {
    clearInterval(interval.value)
  })

  onMounted(() => {
    interval.value = setInterval(() => {
      const now = new Date().getTime()
      for (let i = powerUps.value.length - 1; i >= 0; i--) {
        if (now - powerUps.value[i].ttl > 500) {
          powerUps.value.splice(i, 1)
        }
      }
    }, 50)
  })
</script>
