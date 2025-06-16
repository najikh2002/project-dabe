<template>
    <AppHeader /> <!-- Menggunakan AppHeader standar -->
    <div class="bg-gray-50 min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <div class="mb-6 bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center">
                <!-- Input pencarian bisa ditambahkan di sini jika ingin pengguna mengubah query di halaman ini -->
                <h1 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 md:mb-0">
                    Hasil Pencarian untuk: <span class="text-teal-600">{{ displayQuery }}</span>
                </h1>
                <div class="flex items-center gap-4 mt-2 md:mt-0">
                    <span class="text-sm text-gray-500">Urutkan:</span>
                    <select class="text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500">
                        <option>Relevansi</option>
                        <option>Terbaru</option>
                        <option>Harga Terendah</option>
                        <option>Harga Tertinggi</option>
                    </select>
                </div>
            </div>

            <div v-if="isLoading" class="text-center py-10">
                <p class="text-lg text-gray-500">Mencari produk...</p>
                <!-- Anda bisa menambahkan spinner di sini -->
            </div>

            <div v-else-if="fetchError" class="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                Terjadi kesalahan saat melakukan pencarian: {{ fetchError }}
            </div>

            <div v-else-if="searchResults.length > 0"
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

                <NuxtLink v-for="product in searchResults" :key="product.id_produk || product.id" :to="`/produk/${product.id_produk || product.id}`"
                    class="block">
                    <div
                        class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 group h-full">
                        <img :src="product.imageUrl" :alt="product.name" class="h-40 w-full object-cover">
                        <div class="p-4 flex flex-col">
                            <p class="text-sm text-gray-800 font-medium truncate group-hover:text-teal-600">{{
                                product.name }}</p>
                            <p class="text-lg font-bold text-gray-900 mt-1">{{ formatCurrency(product.price) }}</p>
                            <div class="mt-2 flex items-center">
                                <StarRating :rating="product.rating" />
                                <span class="text-xs text-gray-500 ml-2">({{ product.sold }})</span>
                            </div>
                            <div class="mt-3 flex items-center text-xs text-gray-500">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                    </path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span>{{ product.sellerLocation }}</span>
                            </div>
                        </div>
                    </div>
                </NuxtLink>

            </div>
            <div v-else-if="!isLoading && displayQuery" class="text-center bg-white p-10 rounded-lg shadow-sm">
                <p class="text-xl text-gray-700 mb-2">Oops! Produk tidak ditemukan.</p>
                <p class="text-gray-500">Coba kata kunci lain atau periksa kembali ejaan Anda.</p>
            </div>
            <div v-else-if="!isLoading && !displayQuery" class="text-center bg-white p-10 rounded-lg shadow-sm">
                <p class="text-xl text-gray-700">Silakan masukkan kata kunci pada kolom pencarian di atas.</p>
            </div>

            <div class="mt-8 flex justify-center">
                <div class="flex items-center justify-center space-x-1">
                    <button
                        class="p-2 w-10 h-10 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-200">
                        &lt;
                    </button>
                    <button
                        class="p-2 w-10 h-10 flex items-center justify-center rounded-md text-white bg-teal-600">1</button>
                    <button
                        class="p-2 w-10 h-10 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-200">2</button>
                    <button
                        class="p-2 w-10 h-10 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-200">3</button>
                    <button
                        class="p-2 w-10 h-10 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-200">
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRuntimeConfig, useHead } from '#app';
import AppHeader from '~/components/app/Header.vue'; // Sesuaikan path jika perlu
// import ProductCard from '~/components/app/ProductCard.vue'; // Jika Anda memiliki komponen ProductCard terpisah

const StarRating = { props: { rating: { type: Number, default: 0 } }, template: `<div class="flex items-center"><svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg></div>` };

const route = useRoute();
const config = useRuntimeConfig();

const displayQuery = ref(''); // Untuk menampilkan query di judul
const searchResults = ref([]);
const isLoading = ref(false);
const fetchError = ref(null);

const performSearch = async (query) => {
    if (!query || query.trim() === '') {
        searchResults.value = [];
        isLoading.value = false;
        displayQuery.value = '';
        return;
    }

    displayQuery.value = query;
    isLoading.value = true;
    fetchError.value = null;
    searchResults.value = [];

    try {
        // Ganti '/api/search' dengan endpoint API pencarian Anda yang sebenarnya
        const response = await $fetch('/api/search', { // Endpoint API pencarian
            baseURL: config.public.apiBase,
            method: 'POST',
            body: { q: query }, // Mengirim query dalam body untuk POST
            // headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } 
        });
        // Asumsikan API mengembalikan array produk dalam properti 'data' atau langsung array
        // Sesuaikan 'response.data.produk' jika struktur API berbeda
        searchResults.value = Array.isArray(response.data?.produk) ? response.data.produk : Array.isArray(response.data) ? response.data : Array.isArray(response) ? response : [];
        
        // Pastikan imageUrl ada dan valid
        searchResults.value = searchResults.value.map(product => ({
            ...product,
            // Ganti 'gambar_produk' dengan nama field gambar dari API Anda
            imageUrl: product.gambar_produk || 'https://via.placeholder.com/400?text=No+Image' 
        }));

    } catch (error) {
        console.error('Error fetching search results:', error);
        fetchError.value = error.data?.message || error.message || 'Gagal melakukan pencarian.';
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    const queryFromUrl = route.query.q || '';
    performSearch(queryFromUrl);
});

watch(() => route.query.q, (newQuery) => {
    performSearch(newQuery || '');
});

const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

useHead({
    title: computed(() => displayQuery.value ? `Hasil Pencarian untuk "${displayQuery.value}" - DABE` : 'Pencarian Produk - DABE'),
    meta: [
        { name: 'description', content: 'Cari produk pertanian berkualitas langsung dari petani di DABE.' }
    ]
});
</script>