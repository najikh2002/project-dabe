<template>
  <div class="bg-slate-100 min-h-screen flex items-center justify-center p-4 font-sans">
    <div class="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
      
      <div class="mx-auto mb-6 w-24 h-24">
        <img src="/assets/img/logo/dabe_hijau.png"" alt="Email Verification Icon" class="w-full h-full" />
          <defs>
            <linearGradient id="emailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#5eead4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#14b8a6;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#a7f3d0;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#34d399;stop-opacity:1" />
            </linearGradient>
          </defs>
          <g transform="translate(0, 5)">
            <path d="M10 25 H90 V70 H10 Z" fill="#f0fdfa" stroke="url(#emailGradient)" stroke-width="4" rx="5"></path>
            <path d="M10 28 L50 55 L90 28" fill="none" stroke="url(#emailGradient)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="75" cy="75" r="20" fill="white" stroke="#34d399" stroke-width="3"></circle>
            <path d="M65 75 L73 83 L85 68" stroke="url(#checkGradient)" stroke-width="5" fill="none" stroke-linecap="round"></path>
          </g>
      </div>

      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        Verifikasi Email Anda
      </h1>

      <p class="text-gray-600 mb-8 px-4">
        Terima kasih <strong class="font-semibold text-gray-900">{{ usernameFromRoute }}</strong> telah mendaftar. Kami telah mengirimkan email verifikasi ke 
        <strong class="font-semibold text-gray-900">{{ emailFromRoute }}</strong>. 
        Silakan periksa kotak masuk dan klik tautan untuk mengaktifkan akun Anda.
      </p>

      <NuxtLink 
        to="/autentikasi/register"
        class="block w-full bg-teal-500 text-white font-bold py-3 rounded-lg hover:bg-teal-600 transition-colors duration-300"
      >
        Kembali
      </NuxtLink>

      <div class="mt-8 text-sm text-gray-500">
        <span>Belum menerima email? </span>
        <button @click="resendEmail" class="font-semibold text-teal-600 hover:underline focus:outline-none">
          Kirim Ulang Email
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from '#app'; // Import useRoute

const route = useRoute();

// Ambil email dan username dari query parameter
const emailFromRoute = ref(route.query.email || 'alamat email Anda'); // Default jika tidak ada query param
const usernameFromRoute = ref(route.query.username || 'Pengguna Baru'); // Default jika tidak ada query param

// --- FUNGSI ---
// Aksi untuk tombol kirim ulang email
const resendEmail = () => {
  // Di sini Anda akan memanggil API untuk mengirim ulang email
  console.log(`Mengirim ulang email verifikasi ke ${emailFromRoute.value}...`);
  alert(`Email verifikasi baru telah dikirimkan ke ${emailFromRoute.value}!`);
};

// Pengaturan SEO untuk halaman
useHead({
  title: 'Verifikasi Email Anda',
  meta: [
    { name: 'description', content: 'Halaman verifikasi email setelah pendaftaran.' }
  ]
});
</script>

<style scoped>
/* Menambahkan sedikit gaya untuk tombol agar terlihat seperti link */
button.font-semibold {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}
</style>