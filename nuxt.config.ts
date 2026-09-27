// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  fonts: {
    defaults: {
      weights: [400, 500, 600],
      styles: ['normal']
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
})
