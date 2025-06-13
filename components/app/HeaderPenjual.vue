<template>
    <header class="bg-white p-4 border-b border-gray-200">
        <div class="container mx-auto flex items-center justify-between">

            <h1 class="text-xl font-semibold text-gray-700">
                Seller Operation
            </h1>

            <div class="relative" ref="dropdownRef">

                <button @click="toggleDropdown"
                    class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <span class="inline-block w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </span>
                    <span class="font-semibold text-gray-800">{{ user.name }}</span>
                </button>

                <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <div v-if="isDropdownOpen"
                        class="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                        <div
                            class="absolute -top-1.5 right-4 w-3 h-3 bg-white border-t border-l border-gray-200 transform rotate-45">
                        </div>

                        <ul class="py-1">
                            <li>
                                <NuxtLink to="/profil" class="dropdown-item">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                        </path>
                                    </svg>
                                    Profil Saya
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/penjual/produk" class="dropdown-item">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                                        </path>
                                    </svg>
                                    Produk Saya
                                </NuxtLink>
                            </li>
                            <hr class="my-1 border-gray-100">
                            <li>
                                <button @click="handleLogout"
                                    class="dropdown-item text-red-500 hover:bg-red-50 w-full text-left">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                                        </path>
                                    </svg>
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </transition>

            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const user = ref({ name: 'Pengguna' }); // Default name
const isDropdownOpen = ref(false);
const dropdownRef = ref(null); // Ref untuk elemen pembungkus dropdown

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const handleLogout = async () => {
    isDropdownOpen.value = false; // Tutup dropdown saat logout diklik
    // Hapus data pengguna dari localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    console.log('Logout berhasil, data pengguna dihapus.');
    // Arahkan ke halaman login
    // Pastikan navigateTo diimpor jika belum: import { navigateTo } from '#app';
    // Jika navigateTo tidak tersedia di sini, Anda mungkin perlu menggunakan this.$router.push jika ini adalah Options API
    // atau mencari cara lain untuk navigasi dalam konteks <script setup> jika navigateTo tidak diimpor.
    // Untuk Nuxt 3, navigateTo harusnya tersedia jika diimpor.
    // Asumsikan navigateTo sudah diimpor atau tersedia secara global.
    await navigateTo('/autentikasi/login'); 
};

// --- LOGIKA "CLICK OUTSIDE" ---
const handleClickOutside = (event) => {
    // Jika dropdown terbuka dan target klik BUKAN di dalam elemen dropdown
    if (isDropdownOpen.value && dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isDropdownOpen.value = false; // Tutup dropdown
    }
};

// Daftarkan event listener saat komponen dimuat
onMounted(() => {
    // Ambil data pengguna dari localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        try {
            const parsedUserData = JSON.parse(storedUserData);
            // Asumsikan data pengguna memiliki properti 'name'
            if (parsedUserData && parsedUserData.name) {
                user.value.name = parsedUserData.name;
            } else if (parsedUserData && parsedUserData.role) {
                // Fallback ke role jika nama tidak ada, atau sesuaikan
                user.value.name = parsedUserData.role.charAt(0).toUpperCase() + parsedUserData.role.slice(1);
            }
        } catch (e) {
            console.error('Gagal mem-parsing data pengguna dari localStorage:', e);
        }
    }
    document.addEventListener('click', handleClickOutside);
});

// Hapus event listener saat komponen dihancurkan untuk mencegah memory leak
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.dropdown-item {
    @apply flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100;
}
</style>