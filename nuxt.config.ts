// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    plugins: ['~/server/index.js']
  },

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI
  }
});
