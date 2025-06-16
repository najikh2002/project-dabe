<template>
  <div class="bg-teal-100 min-h-screen flex items-center justify-center p-4 font-sans">
    <!-- Logo -->
    <NuxtLink v-if="!isOauth" to="/" class="absolute top-6 left-6 sm:top-8 sm:left-8">
      <img src="/assets/img/logo/dabe_hijau.png" alt="DABE Logo" class="h-10 sm:h-12 w-auto" />
    </NuxtLink>

    <div class="policy-card relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-xl p-10 sm:p-14">
      <h1 class="text-center text-3xl font-bold text-gray-800 mb-10">Kebijakan Privasi</h1>

      <h2 class="text-xl font-semibold text-teal-500 mb-4">Syarat & Ketentuan</h2>

      <div class="max-h-[45vh] overflow-y-auto pr-4 custom-scrollbar" ref="scrollContainer">
        <div class="text-gray-600 leading-relaxed space-y-5">
          <p>
            DABE adalah platform terdesentralisasi yang menghubungkan petani beras langsung dengan pembeli tanpa perantara. Dalam menyediakan layanan ini, kami mengumpulkan informasi pribadi seperti nama, nomor telepon, alamat, dan data transaksi untuk memastikan proses pembelian, pengiriman, dan komunikasi berjalan lancar. Data lokasi Anda juga dapat kami gunakan, dengan izin, untuk mencocokkan Anda dengan petani terdekat.
          </p>
          <p>
            Kami menjaga informasi pribadi Anda dengan standar keamanan tinggi dan tidak pernah menjual atau membagikannya kepada pihak yang tidak berkepentingan. Data hanya dibagikan kepada petani dan mitra logistik untuk keperluan pengiriman, serta layanan pihak ketiga terpercaya seperti penyedia pembayaran. Anda memiliki hak penuh atas data Anda, termasuk hak untuk mengakses, mengubah, atau menghapusnya dari sistem kami kapan saja.
          </p>
          <p>
            DABE berkomitmen terhadap transparansi dan perlindungan privasi pengguna. Kami hanya menyimpan data selama diperlukan untuk layanan dan kepatuhan hukum. Jika terdapat pembaruan kebijakan privasi, kami akan memberitahukannya melalui aplikasi. Untuk pertanyaan atau permintaan terkait data pribadi, silakan hubungi kami melalui email resmi: support@dabe.id.
          </p>
        </div>
      </div>

      <!-- Tombol Navigasi -->
      <div class="mt-10 flex justify-between items-center">
        <!-- Tombol Kembali (hanya untuk register manual) -->
        <NuxtLink v-if="!isOauth" to="/autentikasi/register">
          <button class="bg-teal-400 hover:bg-teal-500 text-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
          </button>
        </NuxtLink>

        <!-- Tombol Setuju & Lanjutkan (hanya untuk OAuth & setelah scroll) -->
        <button
          v-if="isOauth && showAgreeButton"
          @click="konfirmasi"
          class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300"
        >
          Saya Setuju & Lanjutkan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter, useRuntimeConfig } from "#app"; // Menggunakan useRouter dari Nuxt dan useRuntimeConfig

useHead({
  title: "Kebijakan Privasi - DABE",
  meta: [
    {
      name: "description",
      content: "Halaman kebijakan privasi dan syarat ketentuan penggunaan layanan DABE.",
    },
  ],
});

const config = useRuntimeConfig(); // Untuk mengakses baseURL API
const route = useRoute();
const router = useRouter();
const scrollContainer = ref(null);

const isOauth = ref(false);
const showAgreeButton = ref(false);

onMounted(() => {
  const pendingId = route.query.pending_id;
  isOauth.value = !!pendingId;

  // Deteksi scroll hanya jika OAuth
  if (isOauth.value && scrollContainer.value) {
    scrollContainer.value.addEventListener("scroll", () => {
      const el = scrollContainer.value;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
        showAgreeButton.value = true;
      }
    });
  }
});

const konfirmasi = async () => {
  const pendingId = route.query.pending_id;

  try {
    const response = await $fetch("/api/privacy-confirm", {
      // Sesuaikan endpoint jika berbeda
      baseURL: config.public.apiBase, // Menggunakan baseURL dari runtime config
      method: "POST",
      body: {
        pending_id: pendingId,
      },
    });

    // Asumsikan respons API memiliki struktur seperti: { token: '...', user: { name: '...', role: '...' } }
    const token = response?.token;
    const userName = response?.user?.name || "Pengguna"; // Ambil nama pengguna
    const userRole = response?.user?.role; // Ambil peran pengguna

    if (token) {
      localStorage.setItem("authToken", token); // Simpan token dengan kunci 'authToken'
      localStorage.setItem("username", userName); // Simpan nama pengguna
      // Anda mungkin juga ingin menyimpan userData jika API mengembalikannya
      if (userRole) {
        localStorage.setItem("userData", JSON.stringify({ role: userRole, nama: userName }));
      }
    }

    router.push("/"); // Arahkan ke halaman utama setelah konfirmas;
  } catch (err) {
    console.error(err);
    alert("Gagal menyetujui kebijakan. Coba lagi nanti.");
  }
};
</script>

<style scoped>
.policy-card::before,
.policy-card::after {
  content: "";
  position: absolute;
  background-color: #2dd4bf;
  width: 10px;
  border-radius: 9999px;
  top: 2rem;
  bottom: 2rem;
  z-index: -1;
}

.policy-card::before {
  left: -20px;
}

.policy-card::after {
  right: -20px;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #5eead4;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #2dd4bf;
}
</style>
