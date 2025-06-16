<template>
    <div class="bg-slate-100 min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans">
        <NuxtLink to="/autentikasi/register" class="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
            <img src="/assets/img/logo/dabe_hijau.png" alt="DABE Logo" class="h-10 sm:h-12 w-auto">
            <!-- Menggunakan logo DABE hijau -->
        </NuxtLink>

        <div class="policy-card relative w-full max-w-xl lg:max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-14">
            <h1 class="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 md:mb-10">
                Kebijakan Privasi
            </h1>

            <h2 class="text-lg sm:text-xl font-semibold text-teal-600 mb-3 sm:mb-4">
                Syarat & Ketentuan
            </h2>

            <div class="max-h-[50vh] sm:max-h-[45vh] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar">
                <div class="text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </p>
                    <p>
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                        sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
                        laboriosam, nisi ut aliquid ex ea commodi consequatur?
                    </p>
                </div>
            </div>

            <div class="mt-6 sm:mt-8 md:mt-10 text-center sm:text-left">
                <NuxtLink 
                    to="/autentikasi/register"
                    class="inline-block bg-teal-500 hover:bg-teal-600 text-white rounded-full p-2.5 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300"
                    aria-label="Kembali ke halaman registrasi">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: 'Kebijakan Privasi - DABE',
    meta: [
        { name: 'description', content: 'Halaman kebijakan privasi dan syarat ketentuan penggunaan layanan DABE.' }
    ]
})
</script>

<style scoped>
.policy-card::before,
.policy-card::after {
    content: '';
    position: absolute;
    background-color: #14b8a6; /* Warna teal-500 atau sesuaikan */
    width: 8px; /* Lebar aksen garis untuk layar kecil */
    border-radius: 9999px;
    top: 1.5rem; /* Jarak dari atas untuk layar kecil */
    bottom: 1.5rem; /* Jarak dari bawah untuk layar kecil */
    z-index: -1;
}

.policy-card::before {
    left: -15px; /* Posisi garis kiri untuk layar kecil */
}

.policy-card::after {
    right: -15px; /* Posisi garis kanan untuk layar kecil */
}

@media (min-width: 640px) { /* sm breakpoint */
    .policy-card::before,
    .policy-card::after {
        width: 10px;
        top: 2rem;
        bottom: 2rem;
    }
    .policy-card::before { left: -20px; }
    .policy-card::after { right: -20px; }
}

/* Styling untuk custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #2dd4bf; /* teal-400 */
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #14b8a6; /* teal-500 */
}
</style>