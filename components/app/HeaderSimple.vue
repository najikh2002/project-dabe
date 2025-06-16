<template>
    <nav class="bg-teal-500 shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between h-20">
                <div class="flex-shrink-0">
                    <NuxtLink to="/" class="text-white text-3xl font-bold flex items-center">
                        <img src="/assets/img/logo/dabe_putih.png" alt="DABE Logo" class="h-10 w-auto mr-2">
                        <!-- Tambahkan tag img di sini -->
                        DABE
                    </NuxtLink>
                </div>

                <div class="hidden md:flex items-center space-x-4 ml-6">
                    <NuxtLink to="/transaksi/checkout" class="text-white hover:text-teal-200">
                        <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </NuxtLink>
                    <div class="relative">
                        <button @click="userDropdownOpen = !userDropdownOpen"
                            class="flex items-center text-white hover:text-teal-200 focus:outline-none" v-if="isLoggedIn">
                            
                            <span class="ml-2 font-medium">{{ loggedInUsername }}</span>
                            <svg class="w-4 h-4 ml-1 fill-current" viewBox="0 0 20 20">
                                <path
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </button>
                        <transition name="fade">
                            <div v-if="userDropdownOpen" @click.away="userDropdownOpen = false"
                                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 py-1">
                                <NuxtLink to="/profil"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-100 hover:text-teal-700">
                                    Profil Saya</NuxtLink>
                                <a @click="logout" href="#"
                                    class="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700">Log
                                    Out</a>
                            </div>
                        </transition>
                    </div>
                    <div v-if="!isLoggedIn" class="flex items-center space-x-2">
                        <NuxtLink to="/autentikasi/login"
                            class="px-4 py-2 text-sm font-medium text-teal-500 bg-white rounded-md hover:bg-gray-100 transition-colors">
                            Login
                        </NuxtLink>
                    </div>
                </div>
                <div class="md:hidden flex items-center">
                    <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-white focus:outline-none">
                        <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16m-4 6h4"></path>
                        </svg>
                        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <transition name="slide-fade">
            <div v-if="mobileMenuOpen" class="md:hidden bg-teal-500 pb-3 shadow-lg">
                <NuxtLink to="/" class="block px-4 py-3 text-white hover:bg-teal-600 transition-colors duration-150">
                    Beranda</NuxtLink> <!-- Perbaiki typo Infografis menjadi Grafik -->
                <NuxtLink to="/grafik"
                    class="block px-4 py-3 text-white hover:bg-teal-600 transition-colors duration-150">Grafik
                </NuxtLink>
                <NuxtLink to="/peta"
                    class="block px-4 py-3 text-white hover:bg-teal-600 transition-colors duration-150">Peta</NuxtLink>
                <div class="border-t border-teal-400 mt-2 pt-2">
                    <NuxtLink to="/transaksi/checkout"
                        class="flex items-center px-4 py-3 text-white hover:bg-teal-600 transition-colors duration-150">
                        <svg class="w-6 h-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Keranjang
                    </NuxtLink>
                    <NuxtLink v-if="isLoggedIn" to="/profil"
                        class="flex items-center px-4 py-3 text-white hover:bg-teal-600 transition-colors duration-150">
                        <img class="w-8 h-8 rounded-full border-2 border-white object-cover mr-3"
                            src="https://via.placeholder.com/100" alt="User Avatar" />
                        <span class="font-medium">{{ loggedInUsername }}</span>
                    </NuxtLink>
                    <a v-if="isLoggedIn" @click="logout" href="#"
                        class="block px-4 py-3 text-white hover:bg-teal-600 transition-colors duration-150">Log Out</a>
                    <NuxtLink v-if="!isLoggedIn" to="/autentikasi/login"
                        class="block px-4 py-3 text-white hover:bg-teal-600 transition-colors duration-150">
                        Login
                    </NuxtLink>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            mobileMenuOpen: false,
            userDropdownOpen: false,
            isLoggedIn: false,
            loggedInUsername: 'Pengguna'
        };
    },
    watch: {
        '$route'() {
            // Panggil checkLoginStatus setiap kali rute berubah.
            // Ini memastikan header diperbarui setelah navigasi, misalnya setelah login.
            this.checkLoginStatus();
        }
    },
    mounted() {
        this.checkLoginStatus();
        // Dengar perubahan localStorage dari tab/jendela lain
        window.addEventListener('storage', this.checkLoginStatus);
    },
    beforeUnmount() {
        // Hapus event listener saat komponen dihancurkan
        window.removeEventListener('storage', this.checkLoginStatus);
    },
    methods: {
        checkLoginStatus() {
            const token = localStorage.getItem('authToken');
            if (token) {
                this.isLoggedIn = true;
                // Asumsikan username juga disimpan di localStorage saat login
                this.loggedInUsername = localStorage.getItem('username') || 'Pengguna';
            } else {
                this.isLoggedIn = false;
                this.loggedInUsername = 'Pengguna'; // Perbaiki typo, konsistenkan default username
            }
        },
        logout() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('username'); // Hapus juga username jika disimpan
            this.isLoggedIn = false;
            this.loggedInUsername = 'Pengguna';
            this.userDropdownOpen = false;
            console.log('User logged out');
            // Arahkan ke halaman login
            this.$router.push('/autentikasi/login'); 
        }
    }
};
</script>

<style scoped>
/* Style kustom bisa ditambahkan di sini jika diperlukan */
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>