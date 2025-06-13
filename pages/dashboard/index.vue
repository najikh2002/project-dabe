<template>
    <AppHeaderPenjual />
    <div class="bg-slate-100 min-h-screen p-4 sm:p-6 md:p-8 font-sans">
        <div class="max-w-7xl mx-auto space-y-8">

            <div class="card animate-fade-in-up">
                <h2 class="text-xl font-bold text-teal-600 mb-6">Keuangan</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="stat-card bg-violet-100 text-violet-800">
                        <div class="stat-icon bg-violet-200"><svg class="w-6 h-6" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z">
                                </path>
                            </svg></div>
                        <div>
                            <p class="text-sm opacity-80">Saldo</p>
                            <p class="stat-value">{{ formatCompactNumber(saldo) }} <span class="text-lg">IDR</span></p>
                        </div>
                    </div>
                    <div class="stat-card bg-rose-100 text-rose-800">
                        <div class="stat-icon bg-rose-200"><svg class="w-6 h-6" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z">
                                </path>
                            </svg></div>
                        <div>
                            <p class="text-sm opacity-80">Total Penjualan</p>
                            <p class="stat-value">{{ formatCompactNumber(totalPenjualan) }} <span
                                    class="text-lg">IDR</span></p>
                        </div>
                    </div>
                    <div class="stat-card bg-cyan-100 text-cyan-800">
                        <div class="stat-icon bg-cyan-200"><svg class="w-6 h-6" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                </path>
                            </svg></div>
                        <div>
                            <p class="text-sm opacity-80">Pendapatan/bln</p>
                            <p class="stat-value">{{ formatCompactNumber(pendapatanBulanan) }} <span
                                    class="text-lg">IDR</span></p>
                        </div>
                    </div>
                    <button @click="handleWithdraw" class="stat-card bg-orange-100 text-orange-800">
                        <div class="stat-icon bg-orange-200"><svg class="w-6 h-6" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z">
                                </path>
                            </svg></div>
                        <p class="text-lg font-bold">Withdraw</p>
                    </button>
                </div>
            </div>

            <div class="card animate-fade-in-up" style="animation-delay: 200ms;">
                <h2 class="text-xl font-bold text-teal-600 mb-6">Produk</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="info-card">
                        <p class="info-value">{{ pesanan }}</p>
                        <p class="info-label">Pesanan</p>
                    </div>
                    <div class="info-card">
                        <p class="info-value">{{ dalamProses }}</p>
                        <p class="info-label">Dalam Proses</p>
                    </div>
                    <div class="info-card">
                        <p class="info-value">{{ tersedia }}</p>
                        <p class="info-label">Tersedia</p>
                    </div>
                    <div class="info-card">
                        <p class="info-value">{{ formatCompactNumber(produkTerjual) }}</p>
                        <p class="info-label">Produk Terjual</p>
                    </div>
                </div>
            </div>

            <div class="card animate-fade-in-up" style="animation-delay: 400ms;">
                <h2 class="text-xl font-bold text-gray-800 mb-6 text-center">Penjualan 3 Bulan Terakhir</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div class="h-64 md:h-72">
                        <AppChartsDashboardDonut />
                    </div>
                    <div class="h-64 md:h-72">
                        <AppChartsDashboardBar />
                    </div>
                </div>
            </div>

        </div>
    </div>
    <AppFooter />
</template>

<script setup>
// Bagian script tetap sama
import { ref, onMounted } from 'vue';
import { navigateTo, useRuntimeConfig } from '#app'; // Import navigateTo untuk navigasi dan useRuntimeConfig

const config = useRuntimeConfig();

const saldo = ref(0);
const totalPenjualan = ref(0);
const pendapatanBulanan = ref(0);
const pesanan = ref(25);
const dalamProses = ref(10);
const tersedia = ref(7);
const produkTerjual = ref(1000);
const isLoading = ref(true);
const error = ref(null);

const fetchFinancialData = async () => {
    isLoading.value = true;
    error.value = null;
    try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('Token otentikasi tidak ditemukan. Silakan login kembali.');
        }

        // Ganti '/api/dashboard/keuangan' dengan endpoint API Anda yang sebenarnya
        const { data: financialData, error: fetchError } = await useFetch('/api/dashboard/keuangan', {
            baseURL: config.public.apiBase,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (fetchError.value) {
            throw new Error(fetchError.value.data?.message || fetchError.value.message || 'Gagal mengambil data keuangan.');
        }

        saldo.value = financialData.value?.saldo || 0;
        totalPenjualan.value = financialData.value?.totalPenjualan || 0;
        pendapatanBulanan.value = financialData.value?.pendapatanBulanan || 0;

    } catch (err) {
        error.value = err.message;
        console.error("Error mengambil data keuangan:", err);
        // Anda bisa menampilkan pesan error ini di template jika diperlukan
    } finally {
        isLoading.value = false;
    }
};

const formatCompactNumber = (num) => {
    if (num === null || num === undefined) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'Jt';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
};
const handleWithdraw = () => {
    navigateTo('/dashboard/withdraw'); // Arahkan ke halaman withdraw di dalam dashboard
};

onMounted(() => {
    fetchFinancialData();
});

useHead({ title: 'Dashboard - DABE' });
</script>

<style scoped>
.card {
    @apply bg-white p-6 rounded-xl shadow-sm;
}

.stat-card {
    @apply flex items-center p-4 rounded-xl space-x-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg;
}

.stat-icon {
    @apply p-3 rounded-lg;
}

.stat-value {
    @apply text-2xl font-bold;
}

.info-card {
    @apply bg-slate-50 border border-slate-200 rounded-xl p-4 text-center transition-shadow duration-300 hover:shadow-md;
}

.info-value {
    @apply text-4xl font-bold text-gray-800;
}

.info-label {
    @apply text-sm text-gray-500 mt-1;
}

/* Animasi */
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
    opacity: 0;
}
</style>