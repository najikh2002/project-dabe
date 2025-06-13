<template>
  <div class="bg-slate-100 min-h-screen flex items-center justify-center p-4 font-sans">
    
    <div class="w-full max-w-xl animate-fade-in-up">
      
      <div class="mb-4">
        <NuxtLink to="/dashboard/withdraw" class="flex items-center text-gray-700 hover:text-gray-900 font-semibold transition-colors duration-300">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Kembali
        </NuxtLink>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-teal-400 p-8 sm:p-10">
        <div class="text-gray-700 leading-relaxed space-y-5">
          <p class="font-semibold">
            Terima Kasih.
          </p>
          <p>
            Penarikan dana Anda sedang diproses secara manual.
          </p>
          <p>
            Mohon menunggu hingga 3 hari kerja untuk penyelesaian transaksi.
          </p>
        </div>
      </div>

    </div>
  </div>
  <AppFooter />
</template>

<script setup>
// Pengaturan SEO untuk halaman
useHead({
  title: 'Status Transaksi - DABE',
  meta: [
    { name: 'description', content: 'Halaman status transaksi setelah pengajuan penarikan dana.' }
  ]
});
</script>

<style scoped>
/* Animasi sederhana untuk memunculkan konten */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
</style>