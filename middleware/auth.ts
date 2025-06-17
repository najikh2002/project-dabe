export default defineNuxtRouteMiddleware(() => {
  if (import.meta.client) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return navigateTo("/autentikasi/login");
    }
  }
});
