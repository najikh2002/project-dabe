<template>
  <section class="w-full min-h-screen flex flex-col justify-center items-center bg-gray-50 font-[Poppins] p-4">
    <NuxtLink to="/" class="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
      <img src="/assets/img/logo/dabe_hijau.png" alt="DABE Logo" class="h-10 sm:h-12 w-auto" />
    </NuxtLink>

    <div class="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-xl w-full max-w-md">
      <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Reset Kata Sandi Anda</h1>

      <form @submit.prevent="submitNewPassword" class="space-y-5">
        <div>
          <label for="password" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Kata Sandi Baru</label>
          <input
            v-model="password"
            type="password"
            placeholder="Masukkan kata sandi baru"
            class="w-full p-3 sm:p-3.5 rounded-md border shadow-sm bg-gray-50 text-sm sm:text-base font-medium outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            id="password"
            required
          />
        </div>
        <div>
          <label for="password_confirmation" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Konfirmasi Kata Sandi Baru</label>
          <input
            v-model="password_confirmation"
            type="password"
            placeholder="Konfirmasi kata sandi baru"
            class="w-full p-3 sm:p-3.5 rounded-md border shadow-sm bg-gray-50 text-sm sm:text-base font-medium outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            id="password_confirmation"
            required
          />
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-2.5 sm:py-3 bg-teal-500 text-white text-sm sm:text-base font-bold rounded-md shadow-md hover:bg-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? "Menyimpan..." : "Simpan Kata Sandi Baru" }}
        </button>
      </form>

      <p v-if="message" :class="messageType === 'success' ? 'text-green-600' : 'text-red-600'" class="mt-4 text-sm text-center">{{ message }}</p>

      <p v-if="messageType === 'success'" class="mt-6 text-center">
        <NuxtLink to="/autentikasi/login" class="text-teal-600 hover:text-teal-700 font-semibold">Masuk dengan kata sandi baru</NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRuntimeConfig, navigateTo, useHead } from "#app";

const route = useRoute();
const config = useRuntimeConfig();
const password = ref("");
const password_confirmation = ref("");
const message = ref("");
const messageType = ref(""); // 'success' or 'error'
const isLoading = ref(false);
const token = route.params.token;

const submitNewPassword = async () => {
  if (password.value !== password_confirmation.value) {
    message.value = "Kata sandi dan konfirmasi kata sandi tidak cocok.";
    messageType.value = "error";
    return;
  }
  isLoading.value = true;
  message.value = "";
  try {
    const { error: fetchError } = await useFetch("/api/user/reset-password", {
      // Sesuaikan endpoint
      baseURL: config.public.apiBase,
      method: "POST",
      body: {
        token: token,
        password: password.value,
        password_confirmation: password_confirmation.value,
      },
    });

    if (fetchError.value) {
      message.value = fetchError.value.data?.message || "Gagal mereset kata sandi. Token mungkin tidak valid atau kedaluwarsa.";
      messageType.value = "error";
    } else {
      message.value = "Kata sandi Anda berhasil direset!";
      messageType.value = "success";
      setTimeout(() => {
        navigateTo("/autentikasi/login");
      }, 3000);
    }
  } catch (err) {
    message.value = "Terjadi kesalahan. Silakan coba lagi.";
    messageType.value = "error";
  } finally {
    isLoading.value = false;
  }
};

useHead({
  title: "Reset Kata Sandi - DABE",
  meta: [{ name: "description", content: "Masukkan kata sandi baru untuk akun DABE Anda." }],
});
</script>
