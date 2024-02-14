export default defineNuxtConfig({
  css: ['@/assets/styles/styles.scss'],
  devtools: { enabled: true },
  imports: {
    dirs: ['types', 'store', 'utilities']
  },
  plugins: ['~/plugins/Store.ts'],
  ssr: false,
  typescript: {
    strict: true,
    typeCheck: true
  }
})
