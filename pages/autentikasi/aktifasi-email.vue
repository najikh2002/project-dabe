<template>
  <div class="bg-slate-100 min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans">
    <div class="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-md w-full text-center">
      
      <div class="mx-auto mb-4 sm:mb-6 w-20 h-20 sm:w-24 sm:h-24">
        <img src="/assets/img/logo/dabe_hijau.png" alt="DABE Logo Verifikasi" class="w-full h-full object-contain" />
      </div>

      <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
        Verifikasi Email Anda
      </h1>

      <p class="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-2 sm:px-4">
        Terima kasih <strong class="font-semibold text-gray-900">{{ usernameFromRoute }}</strong> telah mendaftar. Kami telah mengirimkan email verifikasi ke 
        <strong class="font-semibold text-gray-900">{{ emailFromRoute }}</strong>. 
        Silakan periksa kotak masuk dan klik tautan untuk mengaktifkan akun Anda.
      </p>

      <NuxtLink 
        to="/autentikasi/register"
        class="block w-full bg-teal-500 text-white font-semibold sm:font-bold py-2.5 sm:py-3 rounded-lg hover:bg-teal-600 transition-colors duration-300 text-sm sm:text-base"
      >
        Kembali
      </NuxtLink>

      <div class="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
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