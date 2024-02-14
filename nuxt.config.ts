export default defineNuxtConfig({
  css: ['@/assets/styles/styles.scss'],
  devtools: { enabled: true },
  ssr: false,
  typescript: {
    strict: true,
    typeCheck: true
  }
})
