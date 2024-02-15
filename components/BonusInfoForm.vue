<template>
  <form v-if="card" class="bonus-info-form" @submit.prevent="submit">
    <h2>
      Did you complete a bonus for <em>{{ card.title }}</em
      >?
    </h2>

    <div class="bonus-info-form__card-bonuses">
      <div
        v-for="(bonus, index) in card.bonuses"
        :key="index"
        class="bonus-info-form__card-bonus"
      >
        <!-- Checkbox -->
        <label v-if="!bonus.multiplierLabel" class="form-field--checkbox">
          <input type="checkbox" @change="toggleCheckbox($event, index)" />
          <span class="checkbox"></span>
          <span class="card-bonus">
            <span
              :class="`card-bonus__value stat-category--${bonus.statCategory}`"
            >
              {{ bonus.value }}<small>xp</small>
            </span>
            <span class="card-bonus__description">
              &nbsp;{{ bonus.description }}
            </span>
          </span>
        </label>

        <!-- Number -->
        <div v-else>
          <div class="card-bonus">
            <span
              :class="`card-bonus__value stat-category--${bonus.statCategory}`"
            >
              {{ bonus.value }}<small>xp</small>
            </span>
            <span class="card-bonus__description">
              &nbsp;{{ bonus.description }}
            </span>
          </div>
          <label class="form-field form-field--number">
            <div class="form-field__label">{{ bonus.multiplierLabel }}</div>
            <input
              min="0"
              type="number"
              value="0"
              @change="changeNumber($event, index)"
            />
          </label>
        </div>
      </div>
    </div>

    <AppButton type="submit"> Done </AppButton>
  </form>
</template>

<script setup lang="ts">
  const emit = defineEmits<{
    (event: 'submit', value: Record<StatCategory, number>): void
  }>()

  const props = defineProps<{
    card: Card
  }>()

  const bonusMultipliers = ref<Record<number, number>>({})

  function toggleCheckbox(event: Event, bonusIndex: number) {
    bonusMultipliers.value[bonusIndex] = (event.target as HTMLInputElement)
      .checked
      ? 1
      : 0
  }

  function changeNumber(event: Event, bonusIndex: number) {
    bonusMultipliers.value[bonusIndex] = parseInt(
      (event.target as HTMLInputElement).value
    )
  }

  function submit() {
    const stats: Record<StatCategory, number> = {
      health: 0,
      cleanliness: 0,
      personalCare: 0
    }

    // Add bonuses.
    for (const bonusIndex in bonusMultipliers.value) {
      const bonus = props.card.bonuses[bonusIndex]
      stats[bonus.statCategory] +=
        bonus.value * bonusMultipliers.value[bonusIndex]
    }

    // Add base card value.
    stats[props.card.statCategory] += props.card.value

    emit('submit', stats)
  }
</script>
