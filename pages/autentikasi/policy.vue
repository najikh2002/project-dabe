<template>
  <div
    class="bg-teal-100 min-h-screen flex items-center justify-center p-4 font-sans"
  >
    <!-- Logo -->
    <NuxtLink
      v-if="!isOauth"
      to="/"
      class="absolute top-6 left-6 sm:top-8 sm:left-8"
    >
      <img
        src="/assets/img/logo/dabe_hijau.png"
        alt="DABE Logo"
        class="h-10 sm:h-12 w-auto"
      />
    </NuxtLink>

    <div
      class="policy-card relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-xl p-10 sm:p-14"
    >
      <h1 class="text-center text-3xl font-bold text-gray-800 mb-10">
        Kebijakan Privasi
      </h1>

      <h2 class="text-xl font-semibold text-teal-500 mb-4">
        Syarat & Ketentuan
      </h2>

      <div
        class="max-h-[45vh] overflow-y-auto pr-4 custom-scrollbar"
        ref="scrollContainer"
      >
        <div class="text-gray-600 leading-relaxed space-y-5">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </p>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
            enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
          </p>
        </div>
      </div>

      <!-- Tombol Navigasi -->
      <div class="mt-10 flex justify-between items-center">
        <!-- Tombol Kembali (hanya untuk register manual) -->
        <NuxtLink v-if="!isOauth" to="/autentikasi/register">
          <button
            class="bg-teal-400 hover:bg-teal-500 text-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
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
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

useHead({
  title: "Kebijakan Privasi - DABE",
  meta: [
    {
      name: "description",
      content:
        "Halaman kebijakan privasi dan syarat ketentuan penggunaan layanan DABE.",
    },
  ],
});

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
    const res = await axios.post("http://127.0.0.1:8000/api/privacy-confirm", {
      pending_id: pendingId,
    });

    const token = res.data.token;
    localStorage.setItem("token", token);

    router.push("/");
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
