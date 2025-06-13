<template>
    <div class="bg-slate-50 min-h-screen p-4 sm:p-8 flex flex-col items-center font-sans">
        <div class="w-full max-w-2xl mb-4">
            <NuxtLink to="/dashboard"
                class="flex items-center text-gray-600 hover:text-gray-900 font-semibold transition-colors">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Kembali
            </NuxtLink>
        </div>

        <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl animate-fade-in-up">
            <h1 class="text-2xl font-bold text-gray-800 mb-8">Withdraw Tarik Dana</h1>

            <form @submit.prevent="submitWithdrawal">
                <div class="space-y-6">
                    <div class="form-group">
                        <label for="bank" class="form-label">Tarik Dana ke</label>
                        <select id="bank" v-model="form.bank" class="form-input">
                            <option disabled :value="null">Pilih Bank</option>
                            <option v-for="bank in availableBanks" :key="bank.code" :value="bank.code">{{ bank.name }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="accountNumber" class="form-label">No Rekening</label>
                        <input type="text" id="accountNumber" v-model="form.accountNumber" class="form-input"
                            placeholder="Masukkan nomor rekening">
                        <p v-if="errors.accountNumber" class="text-red-500 text-xs mt-1">{{ errors.accountNumber }}</p>
                    </div>

                    <div class="form-group">
                        <label for="amount" class="form-label">Jumlah Penarikan</label>
                        <input type="number" id="amount" v-model.number="form.amount" class="form-input"
                            placeholder="Contoh: 50000">
                        <div class="text-xs text-gray-500 mt-2 space-y-1">
                            <p>Saldo saat ini: {{ formatCurrency(currentBalance) }}</p>
                            <p>Batas penarikan harian: {{ formatCurrency(dailyLimit) }}</p>
                        </div>
                        <p v-if="errors.amount" class="text-red-500 text-xs mt-1">{{ errors.amount }}</p>
                    </div>
                </div>

                <div class="mt-8 flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="terms" type="checkbox" v-model="form.agreeToTerms"
                            class="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500">
                        <label for="terms" class="ml-2 text-sm text-gray-600">
                            Dengan ini saya menyetujui
                            <NuxtLink to="/syarat-ketentuan" class="font-semibold text-teal-600 hover:underline">S&K
                            </NuxtLink>
                            penarikan
                        </label>
                    </div>

                    <button type="submit" :disabled="isSubmitDisabled"
                        class="bg-teal-500 text-white font-bold py-2 px-8 rounded-lg hover:bg-teal-600 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none shadow-md hover:shadow-lg">
                        Tarik
                    </button>
                </div>
            </form>
        </div>
    </div>
    <AppFooter />
</template>

<script setup>
import { ref, computed } from 'vue';

import { navigateTo } from '#app'; // Import navigateTo untuk navigasi
// --- DATA SIMULASI (Dalam aplikasi nyata, ini datang dari API) ---
const currentBalance = ref(512000);
const dailyLimit = ref(100000000);
const availableBanks = ref([
    { name: 'Bank Central Asia (BCA)', code: 'BCA' },
    { name: 'Bank Mandiri', code: 'MANDIRI' },
    { name: 'Bank Rakyat Indonesia (BRI)', code: 'BRI' },
    { name: 'Bank Negara Indonesia (BNI)', code: 'BNI' },
    { name: 'CIMB Niaga', code: 'CIMB' },
]);

// --- STATE MANAGEMENT UNTUK FORM ---
const form = ref({
    bank: null,
    accountNumber: '',
    amount: '',
    agreeToTerms: false,
});

const errors = ref({});

// --- LOGIKA & FUNGSI ---
const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

// Computed property untuk menonaktifkan tombol submit secara dinamis
const isSubmitDisabled = computed(() => {
    return !form.value.bank || !form.value.accountNumber || !form.value.amount || form.value.amount < 10000 || form.value.amount > currentBalance.value || !form.value.agreeToTerms;
});

// Fungsi validasi
const validateForm = () => {
    errors.value = {};
    if (form.value.amount < 10000) {
        errors.value.amount = 'Jumlah penarikan minimal Rp10.000';
    }
    if (form.value.amount > currentBalance.value) {
        errors.value.amount = 'Saldo Anda tidak mencukupi.';
    }
    if (form.value.accountNumber.length < 5 || !/^\d+$/.test(form.value.accountNumber)) {
        errors.value.accountNumber = 'Nomor rekening tidak valid.';
    }
    return Object.keys(errors.value).length === 0;
};

// Fungsi untuk menangani proses penarikan
const submitWithdrawal = async () => {
    if (!validateForm()) return;

    // alert('Memproses permintaan penarikan dana...'); // Bisa dihapus atau diganti dengan UI loading

    // Simulasi panggilan API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Setelah berhasil
    // const withdrawnAmount = form.value.amount; // Tidak perlu lagi di sini jika statusnya ditampilkan di halaman lain
    // currentBalance.value -= withdrawnAmount; // Pengurangan saldo sebaiknya dikonfirmasi dari backend

    // Reset form
    form.value = { bank: null, accountNumber: '', amount: '', agreeToTerms: false };

    // Arahkan ke halaman status
    navigateTo('/dashboard/withdraw/withdraw-sukses');
};

useHead({
    title: 'Tarik Dana - DABE',
});
</script>

<style scoped>
.form-label {
    @apply block text-sm font-medium text-gray-700 mb-1;
}

.form-input {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-shadow;
}

.form-group {
    @apply relative;
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
}
</style>