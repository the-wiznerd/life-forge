import { defineStore } from 'pinia'
import { Cards } from '~/types/cards'

export default defineNuxtPlugin(() => {
  const store = defineStore('store', () => {
    const allCards = computed(() => Cards)

    return {
      allCards
    }
  })
  store()
})
