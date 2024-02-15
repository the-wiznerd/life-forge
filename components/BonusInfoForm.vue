<template>
  <form v-if="card" class="bonus-info-form" @submit.prevent="submit">
    <h2>
      Did you complete a bonus for <em>{{ card.title }}</em
      >?
    </h2>

    <div class="bonus-info-form__card-bonuses">
      <label
        v-for="(bonus, index) in card.bonuses"
        :key="index"
        class="card-bonus form-input form-field--checkbox"
      >
        <input type="checkbox" @change="change($event, bonus)" />
        <span class="checkbox"></span>
        <span class="form-field">
          <span
            :class="`card-bonus__value stat-category--${bonus.statCategory}`"
          >
            {{ bonus.value }}<small>XP</small>
          </span>
          <span class="card-bonus__description">
            &nbsp;{{ bonus.description }}
          </span>
        </span>
      </label>
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

  const scores = ref<Record<StatCategory, number>>({
    health: 0,
    cleanliness: 0,
    personalCare: 0
  })

  function change(event: Event, bonus: CardBonus) {
    if ((event.target as HTMLInputElement).checked) {
      scores.value[bonus.statCategory] += bonus.value
    }
  }

  function submit() {
    scores.value[props.card.statCategory] += props.card.value
    emit('submit', scores.value)
  }
</script>
