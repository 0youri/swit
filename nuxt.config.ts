// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  app: {
    baseURL: '/swit/',
    head: {
      title: "Swit 🏋️‍♂️",
    },
  },
  nitro: {
    prerender: {
      routes: [
        '/',                     
        '/workout',              
        '/workout/beginner',     
        '/workout/intermediate',
        '/workout/advanced',    
        '/workout/beginner/exercises',
        '/workout/intermediate/exercises',
        '/workout/advanced/exercises',
      ]
    }
  },
})