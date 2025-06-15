// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "",
    "@nuxtjs/tailwindcss",
    "nuxt-charts",
    "vue3-carousel-nuxt",
    "@formkit/auto-animate",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate",
  ],
  css: ["~/assets/css/main.css", "leaflet/dist/leaflet.css"],
  vite: {
    server: {
      allowedHosts: ["*"],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "https://api-dabe.pejuangpemrograman.com",
    },
  },
});