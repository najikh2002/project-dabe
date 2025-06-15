<template>
  <AppHeaderPenjual />
  <div class="max-w-5xl mx-auto p-6">
    <!-- Breadcrumb & Tombol -->
    <div class="flex justify-between items-center mb-4">
      <span class="text-sm text-gray-600"
        >Dashboard &gt; <b>Produk Saya</b></span
      >
      <NuxtLink
        to="/dashboard/produk/tambah"
        class="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
      >
        + Tambah Produk
      </NuxtLink>
    </div>

    <!-- Tabel Produk -->
    <div class="bg-white rounded shadow overflow-x-auto">
      <table class="w-full table-auto">
        <thead class="bg-gray-100 text-left text-sm text-gray-600">
          <tr>
            <th class="px-4 py-3">Produk</th>
            <th class="px-4 py-3">Stok</th>
            <th class="px-4 py-3">Harga</th>
            <th class="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="4" class="text-center py-4">Memuat data produk...</td>
          </tr>
          <tr v-else-if="error">
            <td colspan="4" class="text-center py-4 text-red-500">{{ error }}</td>
          </tr>
          <tr v-else-if="produkList.length === 0">
            <td colspan="4" class="text-center py-4">Belum ada produk.</td>
          </tr>
          <tr v-else v-for="produk in produkList" :key="produk.id_produk" class="border-t text-sm">
            <td class="px-4 py-3 flex items-center gap-3">
              <img :src="produk.gambar_produk || '/dummy/beras.jpg'" :alt="produk.nama_produk" class="w-12 h-12 object-cover rounded" />
              <span>{{ produk.nama_produk }}</span>
            </td>
            <td class="px-4 py-3">{{ produk.stok_produk }}</td>
            <td class="px-4 py-3">
              Rp{{ (produk.harga_produk || 0).toLocaleString("id-ID") }}
            </td>
            <td class="px-4 py-3 flex gap-2">
              <NuxtLink
                :to="`/dashboard/produk/${produk.id_produk}/edit`"
                class="text-gray-600 hover:text-emerald-500"
              >
                ✏️
              </NuxtLink>
              <button
                @click="hapusProduk(produk.id_produk)"
                class="text-red-500 hover:text-red-600"
              >
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="!isLoading && !error && produkList.length > 0" class="flex justify-center items-center gap-2 mt-6">
      <button class="text-gray-400" disabled>&lt;</button>
      <button class="bg-emerald-500 text-white px-3 py-1 rounded">1</button>
      <button class="text-gray-500 hover:underline">2</button>
      <button class="text-gray-500 hover:underline">3</button>
      <span class="text-gray-400">...</span>
      <button class="text-gray-500 hover:underline">&gt;</button>
    </div>
  </div>
  <AppFooter />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRuntimeConfig, navigateTo } from '#app';

const config = useRuntimeConfig();
const produkList = ref([]);
const isLoading = ref(true);
const error = ref(null);

const fetchProduk = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // Arahkan ke login jika tidak ada token
      // navigateTo('/autentikasi/login'); // Anda mungkin ingin mengaktifkan ini
      throw new Error('Token otentikasi tidak ditemukan.');
    }

    // Ganti '/api/produk' dengan endpoint API Anda yang sebenarnya untuk mengambil daftar produk
    // Asumsikan API mengembalikan array produk dalam `data.value.data` atau langsung `data.value`
    const { data, error: fetchError } = await useFetch('/api/produk', { // Sesuaikan endpoint
      baseURL: config.public.apiBase,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (fetchError.value) {
      console.error("Error saat mengambil produk:", fetchError.value);
      error.value = fetchError.value.data?.message || fetchError.value.message || 'Gagal mengambil data produk.';
    } else {
      // Sesuaikan ini berdasarkan struktur respons API Anda
      // Jika API mengembalikan { success: true, data: [...] }, maka:
      // produkList.value = data.value?.data || [];
      // Jika API langsung mengembalikan array produk:
      produkList.value = data.value || [];
      console.log("Produk berhasil diambil:", produkList.value);
    }
  } catch (err) {
    console.error("Error internal saat mengambil produk:", err);
    error.value = err.message || 'Terjadi kesalahan tak terduga.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProduk();
});

function hapusProduk(id) {
  console.log("Hapus produk ID:", id);
  // Tampilkan konfirmasi dan hapus dari backend atau state
  // Setelah berhasil, panggil fetchProduk() lagi untuk memperbarui daftar
}

useHead({ title: 'Produk Saya - DABE' });
</script>
