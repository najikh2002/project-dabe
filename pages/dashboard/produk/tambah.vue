<template>
  <AppHeaderPenjual />
  <div class="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-3xl mx-auto">
      <!-- Breadcrumb atau Navigasi Kembali -->
      <div class="mb-6">
        <NuxtLink to="/dashboard/produk" class="flex items-center text-sm text-gray-600 hover:text-emerald-600 transition-colors">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          Kembali ke Daftar Produk
        </NuxtLink>
      </div>

      <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Tambah Produk Baru</h1>
        
        <ProductForm @submit="handleTambah" :loading="isLoading" />

        <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          <p class="font-medium">Oops! Terjadi kesalahan:</p>
          <p>{{ error }}</p>
        </div>
        <div v-if="success" class="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
          {{ success }}
        </div>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<script setup>
import { ref } from 'vue';
import ProductForm from "~/components/produk/ProductForm.vue";
import { useRuntimeConfig, navigateTo } from '#app';

const config = useRuntimeConfig();
const isLoading = ref(false);
const error = ref('');
const success = ref('');

async function handleTambah(productDataFromForm) {
  isLoading.value = true;
  error.value = '';
  success.value = '';

  // Buat objek FormData jika ada file, atau gunakan objek biasa jika tidak
  let bodyToSend;
  if (productDataFromForm.foto_file instanceof File) {
    bodyToSend = new FormData();
    for (const key in productDataFromForm) {
      bodyToSend.append(key, productDataFromForm[key]);
    }
  } else {
    bodyToSend = productDataFromForm;
  }

  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      error.value = 'Otentikasi gagal. Silakan login kembali.';
      // Opsional: Arahkan ke halaman login
      // navigateTo('/autentikasi/login');
      return;
    }

    // Menggunakan $fetch karena ini adalah aksi sisi klien setelah komponen terpasang
    const response = await $fetch('api/produk', { // Sesuaikan endpoint
      baseURL: config.public.apiBase,
      method: 'POST',
      body: bodyToSend, // Kirim FormData atau objek biasa
      headers: { 
        'Authorization': `Bearer ${authToken}`
        // Jika bodyToSend adalah FormData, browser akan mengatur Content-Type: multipart/form-data secara otomatis.
        // Jika bodyToSend adalah objek JSON, $fetch akan mengatur Content-Type: application/json secara otomatis.
        // 'Content-Type': 'application/json', 
      }
    });

    success.value = response.message || 'Produk berhasil ditambahkan!'; // Asumsikan API mengembalikan pesan sukses
    console.log("Produk baru berhasil ditambahkan:", response);
    // Opsional: Arahkan ke halaman daftar produk setelah sukses
    setTimeout(() => {
      navigateTo('/dashboard/produk');
    }, 1500);
  } catch (err) {
    console.error("Error saat menambah produk:", err);
    error.value = err.data?.message || err.message || 'Gagal menambahkan produk. Silakan coba lagi.';
  } finally {
    isLoading.value = false;
  }
}

useHead({
  title: 'Tambah Produk Baru - DABE'
});
</script>
