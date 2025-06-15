<template>
  <section class="w-full min-h-screen flex flex-col md:flex-row justify-center items-center bg-white font-[Poppins] py-8 md:py-0">
    <NuxtLink to="/" class="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <img src="/assets/img/logo/dabe_hijau.png" alt="DABE Logo" class="h-10 sm:h-12 w-auto">
        <!-- Logo DABE Hijau -->
    </NuxtLink>

    <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-4 sm:px-8 md:px-16 items-center">
      <!-- KIRI: Gambar + Teks -->
      <div class="hidden md:flex flex-col items-center justify-center text-center order-2 md:order-1 mt-8 md:mt-0">
        <img src="/assets/img/register.png" alt="Register" class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain mb-4 sm:mb-6 md:mb-8" />
        <p class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 leading-snug">
          Yuk, Beli Beras Langsung Dari Sawah,<br />
          Harga Adil Untuk Semua
        </p>
      </div>

      <!-- KANAN: Formulir -->
      <div class="bg-white p-5 sm:p-6 md:p-8 lg:p-12 border rounded-xl shadow-xl w-full max-w-md md:max-w-lg order-1 md:order-2 mx-auto">
        <h1 class="text-2xl sm:text-3xl font-bold text-center">Daftar Sekarang</h1>
        <p class="text-center text-sm sm:text-base mb-4 sm:mb-6">
          Sudah punya akun DABE? <NuxtLink to="/autentikasi/login" class="text-[#22AB97] font-semibold">Masuk</NuxtLink>
        </p>

        <!-- Tombol Google (opsional, bisa aktifkan nanti) -->
        <button
          @click="registerWithGoogle"
          class="py-2 sm:py-2.5 w-full shadow-md border border-gray-300 font-semibold rounded-md flex items-center justify-center text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors mb-4 sm:mb-5">
          <img src="/assets/img/logo/google.png" alt="Google logo" class="mr-2 h-8 w-8 sm:h-9 sm:w-9" />Daftar dengan Google
        </button>

        <div class="relative mb-4 sm:mb-6">
          <hr />
          <p class="absolute bg-white px-3 text-sm left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500">atau</p>
        </div>

        <!-- Formulir -->
        <form @submit.prevent="registerUser" class="space-y-5">
          <div>
            <label for="name" class="text-xs sm:text-sm text-gray-500">Nama Pengguna</label>
            <input v-model="name" type="text" placeholder="Contoh: Dabeyy"
              class="w-full p-2.5 sm:p-3 rounded-md border shadow-sm bg-[#48967E0F] text-sm sm:text-base font-medium outline-none focus:border-[#22AB97] focus:ring-1 focus:ring-[#22AB97]" id="name" required />
          </div>
          <div>
            <label for="email" class="text-xs sm:text-sm text-gray-500">Email</label>
            <input v-model="email" type="email" placeholder="contoh@dabe.com"
              class="w-full p-2.5 sm:p-3 rounded-md border shadow-sm bg-[#48967E0F] text-sm sm:text-base font-medium outline-none focus:border-[#22AB97] focus:ring-1 focus:ring-[#22AB97]" id="email" required />
          </div>
          <div>
            <label for="password" class="text-xs sm:text-sm text-gray-500">Kata Sandi</label>
            <input v-model="password" type="password" placeholder="********"
              class="w-full p-2.5 sm:p-3 rounded-md border shadow-sm bg-[#48967E0F] text-sm sm:text-base font-medium outline-none focus:border-[#22AB97] focus:ring-1 focus:ring-[#22AB97]" id="password" required />
          </div>
          <div>
            <label class="text-xs sm:text-sm text-gray-500">Konfirmasi Kata Sandi</label>
            <input v-model="password_confirmation" type="password" placeholder="********"
              class="w-full p-2.5 sm:p-3 rounded-md border shadow-sm bg-[#48967E0F] text-sm sm:text-base font-medium outline-none focus:border-[#22AB97] focus:ring-1 focus:ring-[#22AB97]" />
          </div>

          <button type="submit"
            class="mt-5 sm:mt-6 w-full py-2.5 sm:py-3 bg-[#22AB97] text-white text-sm sm:text-base font-bold rounded-md shadow-md hover:bg-[#1b9786] transition-all">
            Daftar
          </button>
        </form>

        <p class="text-center text-xs sm:text-sm mt-4">
          Dengan mendaftar, saya menyetujui
          <NuxtLink to="/autentikasi/policy" class="text-[#22AB97] font-bold">Syarat & Ketentuan</NuxtLink> serta
          <NuxtLink to="/autentikasi/policy" class="text-[#22AB97] font-bold">Kebijakan Privasi DABE</NuxtLink>
        </p>

        <p v-if="error" class="text-red-600 text-center mt-4">{{ error }}</p>
        <p v-if="success" class="text-green-600 text-center mt-4">{{ success }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo } from '#app' // Import navigateTo

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const error = ref('')
const success = ref('')

const config = useRuntimeConfig()

const registerUser = async () => {
  error.value = '' // Reset error message
  success.value = '' // Reset success message

  try {
    const { data, error: fetchError } = await useFetch('api/user/register', { // Hapus 'api/' jika apiBase sudah lengkap
      baseURL: config.public.apiBase,
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        password: password.value,
        konfirmasi_password: password_confirmation.value // Umumnya backend mengharapkan 'password_confirmation'
      }
    })

    if (fetchError.value) {
      // Tangani error dari API, misalnya validasi atau error server
      let errorMessage = 'Registrasi gagal. Silakan coba lagi.';
      if (fetchError.value.data && typeof fetchError.value.data.message === 'string') {
        errorMessage = fetchError.value.data.message;
      } else if (fetchError.value.data && typeof fetchError.value.data.errors === 'object') {
        errorMessage = Object.values(fetchError.value.data.errors).flat().join(' ');
      } else if (fetchError.value.message) {
        errorMessage = fetchError.value.message;
      }
      error.value = errorMessage;
    } else {
      success.value = 'Registrasi berhasil! Aktifkan akun Anda di email Anda.'
      // Langsung arahkan ke halaman aktivasi email.
      // Menggunakan 'await' memastikan bahwa proses navigasi dimulai
      // dan ditunggu sebelum fungsi registerUser dianggap selesai.
      await navigateTo({
        path: '/autentikasi/aktifasi-email',
      });
    }
  } catch (err) {
    // Ini menangkap error yang tidak terduga dari useFetch atau error javascript lainnya
    error.value = err.message || 'Terjadi kesalahan saat melakukan registrasi.'
  }
};

const registerWithGoogle = () => {
  // Endpoint API backend Anda yang akan memulai alur OAuth Google
  // Gantilah '/api/auth/google/redirect' dengan endpoint Anda yang sebenarnya jika berbeda
  const googleLoginUrl = `${config.public.apiBase}/api/register/google`;
  // Mengarahkan pengguna ke URL otentikasi Google yang ditangani oleh backend
  window.location.href = googleLoginUrl;
}
</script>
