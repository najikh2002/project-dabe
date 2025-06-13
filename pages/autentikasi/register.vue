<template>
  <section class="w-full h-screen flex justify-center items-center bg-white font-[Poppins]">
    <NuxtLink to="/" class="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
        <img src="/assets/img/logo/dabe_hijau.png" alt="DABE Logo" class="h-10 sm:h-12 w-auto">
        <!-- Logo DABE Hijau -->
    </NuxtLink>

    <div class="w-full max-w-[1400px] grid grid-cols-2 gap-12 px-16">
      <!-- KIRI: Gambar + Teks -->
      <div class="flex flex-col items-center justify-center text-center">
        <img src="/assets/img/register.png" alt="Register" class="w-full max-w-[600px] h-auto object-contain mb-8" />
        <p class="text-2xl font-semibold text-gray-800 leading-snug">
          Yuk, Beli Beras Langsung Dari Sawah,<br />
          Harga Adil Untuk Semua
        </p>
      </div>

      <!-- KANAN: Formulir -->
      <div class="bg-white p-12 border rounded-xl shadow-xl w-full max-w-[520px]">
        <h1 class="text-3xl font-bold text-center">Daftar Sekarang</h1>
        <p class="text-center text-base mb-6 text-md">
          Sudah punya akun DABE? <NuxtLink to="/autentikasi/login" class="text-[#22AB97] font-semibold">Masuk</NuxtLink>
        </p>

        <!-- Tombol Google (opsional, bisa aktifkan nanti) -->
        <button
          @click="registerWithGoogle"
          class="py-2 w-full shadow-md border border-gray-300 font-bold rounded-md flex items-center justify-center text-[#7C817FC2] mb-5">
          <img src="/assets/img/logo/google.png" alt="Google logo" class="mr-2 h-10 w-10" />Daftar dengan Google
        </button>

        <div class="relative mb-6">
          <hr />
          <p class="absolute bg-white px-3 text-sm left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500">atau</p>
        </div>

        <!-- Formulir -->
        <form @submit.prevent="registerUser" class="space-y-5">
          <div>
            <label for="name" class="text-sm text-gray-500">Nama Pengguna</label>
            <input v-model="name" type="text" placeholder="Dabeyy"
              class="w-full p-4 rounded-md border shadow-md bg-[#48967E0F] font-medium outline-none focus:border-[#22AB97]" id="name" required />
          </div>
          <div>
            <label for="email" class="text-sm text-gray-500">Email</label>
            <input v-model="email" type="email" placeholder="context@dabe.com"
              class="w-full p-4 rounded-md border shadow-md bg-[#48967E0F] font-medium outline-none focus:border-[#22AB97]" id="email" required />
          </div>
          <div>
            <label for="password" class="text-sm text-gray-500">Kata Sandi</label>
            <input v-model="password" type="password" placeholder="********"
              class="w-full p-4 rounded-md border shadow-md bg-[#48967E0F] font-medium outline-none focus:border-[#22AB97]" id="password" required />
          </div>
          <div>
            <label class="text-sm text-gray-500">Konfirmasi Kata Sandi</label>
            <input v-model="password_confirmation" type="password" placeholder="********"
              class="w-full p-4 rounded-md border shadow-md bg-[#48967E0F] font-medium outline-none focus:border-[#22AB97]" />
          </div>

          <button type="submit"
            class="mt-6 w-full py-3 bg-[#22AB97] text-white text-lg font-bold rounded-md shadow-md hover:bg-[#1b9786] transition-all">
            Daftar
          </button>
        </form>

        <p class="text-center text-sm mt-4">
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
