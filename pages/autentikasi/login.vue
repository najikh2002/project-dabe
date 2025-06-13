<template>
  <div class="w-screen h-screen bg-[conic-gradient(from_22deg,#41b49f_50%,#22AB97_50%)]">
    <NuxtLink to="/" class="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
      <img src="/assets/img/logo/dabe_putih.png" alt="DABE Logo" class="h-10 sm:h-12 w-auto">
    </NuxtLink>

    <div class="min-h-screen flex justify-center items-center font-[Poppins]">
      <div class="p-8 bg-white flex flex-col gap-4 z-10 rounded-md w-full max-w-[430px]">
        <div class="flex flex-col gap-4">
          <h1 class="text-xl font-bold text-center">
            Selamat Datang di <span class="text-[#22AB97]">DABE!</span>
          </h1>

          <button
            class="py-2 w-full shadow-md border border-gray-300 font-bold rounded-md flex items-center justify-center text-[#7C817FC2] mb-2">
            <img src="/assets/img/logo/google.png" alt="" />Google
          </button>

          <div class="relative mb-4">
            <hr />
            <p
              class="absolute bg-white px-3 text-sm left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500">
              atau</p>
          </div>
        </div>

        <div class="space-y-5">
          <div class="flex flex-col gap-1">
            <label class="text-sm text-gray-500">Email</label>
            <input v-model="email" type="email"
              class="bg-[#48967E0F] border p-3 font-semibold rounded-md shadow-md outline-none focus:border-[#22AB97]"
              placeholder="context@dabe.com" />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm text-gray-500">Kata Sandi</label>
            <input v-model="password" type="password"
              class="bg-[#48967E0F] border p-3 font-semibold rounded-md shadow-md outline-none focus:border-[#22AB97]"
              placeholder="*********" />
            <NuxtLink to="/autentikasi/ganti" class="text-right text-xs text-[#22AB97]">Lupa Kata Sandi?</NuxtLink>
          </div>

          <div class="flex flex-col gap-4">
            <button @click="loginUser"
              class="py-2 w-full font-bold rounded-md bg-[#22AB97] text-white hover:bg-[#1b9786]">
              Masuk
            </button>

            <p class="text-sm text-center">
              Belum punya akun DABE? <NuxtLink to="/autentikasi/register" class="text-[#22AB97]">Buat</NuxtLink>
            </p>
          </div>
        </div>

        <p v-if="error" class="text-sm text-red-500 text-center mt-2">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const email = ref('')
const password = ref('')
const error = ref('')
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
    const name = res?.name; // Ambil nama pengguna jika tersedia, atau gunakan default
    const token = res?.token;
    const userRole = res?.role; // Contoh: 'petani' atau 'pembeli'

    if (token && userRole) {
      localStorage.setItem('authToken', token);
      // Jika Anda memerlukan data pengguna lain di localStorage,
      // Anda bisa membuat objek minimal di sini.
      // Untuk saat ini, kita hanya menyimpan peran jika itu yang utama.
      // Atau, jika backend bisa mengirimkan objek user lengkap, itu lebih baik.
      localStorage.setItem('userData', JSON.stringify({ role: userRole, name: name }));

      console.log('Login berhasil. Token:', token, 'Peran pengguna:', userRole, 'Nama pengguna:', name);

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
    error.value = err?.data?.message || 'Login gagal. Periksa kembali email dan password.'
  }
}
</script>
