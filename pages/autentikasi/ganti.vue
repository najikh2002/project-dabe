<template>
  <div
    class="w-screen h-screen bg-[conic-gradient(from_22deg,#41b49f_50%,#22AB97_50%)]"
  >
    <NuxtLink to="/" class="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
      <img
        src="/assets/img/logo/dabe_putih.png"
        alt="DABE Logo"
        class="h-10 sm:h-12 w-auto"
      />
    </NuxtLink>

    <div
      class="min-h-screen flex justify-center items-center font-[Poppins] p-4"
    >
      <div
        class="p-6 sm:p-8 bg-white flex flex-col gap-3 sm:gap-4 z-10 rounded-xl shadow-xl w-full max-w-md"
      >
        <div class="flex flex-col gap-2 sm:gap-3">
          <h1 class="text-lg sm:text-xl font-bold text-center">
            Lupa Kata Sandi?
          </h1>
          <p class="text-center text-xs sm:text-sm mb-2 sm:mb-4 text-gray-500">
            Masukkan email Anda untuk atur ulang kata sandi
          </p>
        </div>

        <form
          @submit.prevent="sendResetLink"
          class="flex flex-col gap-4 sm:gap-5"
        >
          <div class="flex flex-col gap-0.5 sm:gap-1">
            <label for="email" class="text-xs sm:text-sm text-gray-500"
              >Email</label
            >
            <input
              v-model="email"
              type="email"
              class="bg-[#48967E0F] border p-2.5 sm:p-3 text-sm sm:text-base font-semibold rounded-md shadow-sm outline-none focus:border-[#22AB97] focus:ring-1 focus:ring-[#22AB97]"
              placeholder="contoh@dabe.com"
              id="email"
              required
            />
          </div>

          <div class="flex flex-col gap-3 sm:gap-4 pt-1 sm:pt-2">
            <button
              type="submit"
              :disabled="isLoading"
              class="py-2 sm:py-2.5 w-full font-bold rounded-md bg-[#22AB97] text-white hover:bg-[#1b9786] transition-colors text-sm sm:text-base disabled:cursor-not-allowed flex items-center justify-center"
            >
              <span v-if="isLoading">
                <svg
                  class="animate-spin mr-2 h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="none"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l5-5-5-5v4a12 12 0 00-12 12h4z"
                  />
                </svg>
              </span>
              <span v-else>Kirim</span>
            </button>
            <p
              v-if="success"
              class="text-green-600 text-xs sm:text-sm text-center"
            >
              {{ success }}
            </p>
            <p v-if="error" class="text-red-600 text-xs sm:text-sm text-center">
              {{ error }}
            </p>
            <!-- <NuxtLink
              to="/autentikasi/login"
              class="text-xs sm:text-sm text-center text-[#22AB97] hover:underline"
              >Kembali ke Halaman Masuk</NuxtLink> -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const email = ref("");
const success = ref("");
const error = ref("");
const config = useRuntimeConfig();
const isLoading = ref(false);

const sendResetLink = async () => {
  isLoading.value = true;
  try {
    success.value = "";
    error.value = "";

    await $fetch("api/password/forgot", {
      baseURL: config.public.apiBase,
      // headers: { 'Accept': 'application/json' }, // Tambahkan jika backend memerlukan
      method: "POST",
      body: { email: email.value },
    });

    success.value = "Link reset berhasil dikirim. Silakan cek email Anda.";
  } catch (err) {
    error.value = err?.data?.message || "Gagal mengirim link reset.";
  } finally {
    isLoading.value = false;
  }
};
</script>
