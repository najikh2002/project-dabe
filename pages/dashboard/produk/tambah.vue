<template>
  <div class="p-4 md:p-8">
    <h1 class="text-2xl font-semibold mb-6">Tambah Produk Baru</h1>
    <ProductForm @submit="handleTambah" :loading="isLoading" />
    <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
      {{ error }}
    </div>
    <div v-if="success" class="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
      {{ success }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductForm from "~/components/produk/ProductForm.vue";
import { useRuntimeConfig, navigateTo } from '#app';

const config = useRuntimeConfig();
const isLoading = ref(false);
const error = ref('');
const success = ref('');

async function handleTambah(productData) {
  isLoading.value = true;
  error.value = '';
  success.value = '';

  try {
    // Ganti '/api/produk' dengan endpoint API Anda yang sebenarnya untuk membuat produk
    const { data, error: fetchError } = await useFetch('api/produk', { // Sesuaikan endpoint
      baseURL: config.public.apiBase,
      method: 'POST',
      body: productData,
      // headers: { 'Authorization': `Bearer ${yourAuthToken}` } // Jika API memerlukan otentikasi
    });

    if (fetchError.value) {
      error.value = fetchError.value.data?.message || fetchError.value.message || 'Gagal menambahkan produk.';
    } else {
      success.value = 'Produk berhasil ditambahkan!';
      console.log("Produk baru berhasil ditambahkan:", data.value);
      // Opsional: Arahkan ke halaman daftar produk atau detail produk
      // await navigateTo('/dashboard/produk'); 
    }
  } catch (err) {
    console.error("Error saat menambah produk:", err);
    error.value = 'Terjadi kesalahan tak terduga saat menambahkan produk.';
  } finally {
    isLoading.value = false;
  }
}
</script>
