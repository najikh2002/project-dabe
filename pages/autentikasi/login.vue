<template>
  <div class="w-screen h-screen bg-[conic-gradient(from_22deg,#41b49f_50%,#22AB97_50%)]">
    <NuxtLink to="/" class="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
      <img src="/assets/img/logo/dabe_putih.png" alt="DABE Logo" class="h-10 sm:h-12 w-auto">
    </NuxtLink>

    <div class="min-h-screen flex justify-center items-center font-[Poppins]">
      <div class="p-6 sm:p-8 bg-white flex flex-col gap-3 sm:gap-4 z-10 rounded-xl shadow-xl w-full max-w-md">
        <div class="flex flex-col gap-3 sm:gap-4">
          <h1 class="text-lg sm:text-xl font-bold text-center">
            Selamat Datang di <span class="text-[#22AB97]">DABE!</span>
          </h1>

          <button
            @click="loginWithGoogle"
            class="py-2 sm:py-2.5 w-full shadow-md border border-gray-300 font-semibold rounded-md flex items-center justify-center text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors mb-1 sm:mb-2">
            <img src="/assets/img/logo/google.png" alt="Google logo" class="mr-2 h-7 w-7 sm:h-8 sm:w-8" />Masuk dengan Google
          </button>

          <div class="relative mb-2 sm:mb-4">
            <hr />
            <p
              class="absolute bg-white px-2 sm:px-3 text-xs sm:text-sm left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500">
              atau</p>
          </div>
        </div>

        <form @submit.prevent="loginUser" class="space-y-4 sm:space-y-5">
          <div class="flex flex-col gap-0.5 sm:gap-1">
            <label for="email" class="text-xs sm:text-sm text-gray-500">Email</label>
            <input v-model="email" type="email"
              class="bg-[#48967E0F] border p-2.5 sm:p-3 text-sm sm:text-base font-semibold rounded-md shadow-sm outline-none focus:border-[#22AB97] focus:ring-1 focus:ring-[#22AB97]"
              placeholder="contoh@dabe.com" id="email" required />
          </div>

          <div class="flex flex-col gap-0.5 sm:gap-1">
            <label for="password" class="text-xs sm:text-sm text-gray-500">Kata Sandi</label>
            <input v-model="password" type="password"
              class="bg-[#48967E0F] border p-2.5 sm:p-3 text-sm sm:text-base font-semibold rounded-md shadow-sm outline-none focus:border-[#22AB97] focus:ring-1 focus:ring-[#22AB97]"
              placeholder="*********" id="password" required />
            <NuxtLink to="/autentikasi/ganti" class="text-right text-xs sm:text-sm text-[#22AB97] hover:underline">Lupa Kata Sandi?</NuxtLink>
          </div>

          <div class="flex flex-col gap-3 sm:gap-4 pt-2">
            <button type="submit" :disabled="isLoading"
              class="py-2 sm:py-2.5 w-full font-bold rounded-md bg-[#22AB97] text-white hover:bg-[#1b9786] transition-colors text-sm sm:text-base disabled:opacity-70">
              Masuk
            </button>

            <p class="text-sm text-center">
              Belum punya akun DABE? <NuxtLink to="/autentikasi/register" class="text-[#22AB97]">Buat</NuxtLink>
            </p>
          </div>
        </form>

        <p v-if="error" class="text-xs sm:text-sm text-red-500 text-center mt-1 sm:mt-2">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo, useRuntimeConfig } from '#app' // Pastikan navigateTo diimpor

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false) // Tambahkan state isLoading
const config = useRuntimeConfig()
const loginUser = async () => {
  try {
    error.value = ''

    const res = await $fetch('api/user/login', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      },
      credentials: 'include' // Penting untuk Sanctum jika menggunakan cookies. Jika token eksplisit di body, ini mungkin tidak selalu relevan.
    })

    // Langsung ekstrak token dan role dari respons API
    // Berdasarkan contoh respons: { message: '...', token: '...', role: '...' }
    const nama = res?.name; // Ambil nama pengguna jika tersedia, atau gunakan default
    const token = res?.token;
    const userRole = res?.role; // Contoh: 'petani' atau 'pembeli'

    if (token && userRole) {
      localStorage.setItem('authToken', token);
      // Simpan nama dari API sebagai 'username' di localStorage
      localStorage.setItem('username', nama || 'Pengguna'); 
      localStorage.setItem('userData', JSON.stringify({ role: userRole, nama: nama }));

      console.log('Login berhasil. Token:', token, 'Peran pengguna:', userRole, 'Nama pengguna:', nama);

      // Arahkan berdasarkan peran pengguna yang telah diidentifikasi
      if (userRole === 'petani') {
        navigateTo('/dashboard'); // Arahkan ke dashboard untuk petani
      } else { // Asumsikan perazn lain adalah 'pembeli' atau default
        navigateTo('/'); // Arahkan ke halaman utama untuk pembeli
      }
    } else {
      // Jika token atau data pengguna tidak ada dalam respons yang diharapkan
      console.error('Login response missing token or user role. Full API Response:', res);
      let errMsg = 'Login berhasil, namun data dari server tidak lengkap atau tidak sesuai format.';
      if (!token) errMsg = 'Token otentikasi tidak ditemukan dalam respons server.';
      else if (!userRole) errMsg = 'Peran pengguna tidak dapat diidentifikasi dari data server.';
      error.value = errMsg;
    }
  } catch (err) {
    let errorMessage = 'Login gagal. Periksa kembali email dan password.'; // Pesan default
    if (err?.data?.message) {
      if (typeof err.data.message === 'string') {
        errorMessage = err.data.message;
      } else if (Array.isArray(err.data.message)) {
        errorMessage = err.data.message.join('; '); // Gabungkan jika array
      } else if (typeof err.data.message === 'object' && err.data.message !== null) {
        // Coba ekstrak dari struktur objek error umum atau stringify
        errorMessage = err.data.message.detail || err.data.message.error || JSON.stringify(err.data.message);
      }
    } else if (err?.message && typeof err.message === 'string') { // Fallback ke err.message
        errorMessage = err.message;
    }
    error.value = errorMessage;
  }
}

const loginWithGoogle = () => {
  // Endpoint API backend Anda yang akan memulai alur OAuth Google
  const googleLoginUrl = `${config.public.apiBase}/api/login/google`; // Sesuaikan jika endpoint berbeda
  window.location.href = googleLoginUrl;
}
</script>
