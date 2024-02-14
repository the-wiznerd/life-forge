export default defineNuxtConfig({
  css: ['@/assets/styles/styles.scss'],
  devtools: { enabled: false },
  imports: {
    dirs: ['types', 'store', 'utilities']
  },
  modules: ['@pinia/nuxt'],
  plugins: ['~/plugins/Store.ts'],
  ssr: false,
  typescript: {
    strict: true,
    typeCheck: true
  }
})
