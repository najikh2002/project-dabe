<template>
  <AppHeader />
  <div
    class="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans"
  >
    <div class="max-w-2xl w-full space-y-8">
      <div class="bg-white shadow-xl rounded-xl p-8 sm:p-10">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        >
          <div>
            <h1 class="text-3xl font-bold text-gray-800">Profil Saya</h1>
            <p class="mt-1 text-sm text-gray-600">
              Kelola informasi profil Anda untuk mengontrol, melindungi, dan
              mengamankan akun.
            </p>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
            <img
              class="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover shadow-md border-4 border-white cursor-pointer"
              :src="previewImage || userProfile.foto || defaultAvatar"
              alt="Avatar Pengguna"
              @click="triggerFileInput"
            />
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              accept="image/png, image/jpeg"
              @change="handleImageChange"
            />
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label
              for="username"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Pengguna
            </label>
            <input
              type="text"
              name="username"
              id="username"
              v-model="userProfile.username"
              class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition duration-150"
              placeholder="Masukkan nama pengguna"
              required
            />
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="userProfile.email"
              class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 bg-gray-100 cursor-not-allowed sm:text-sm transition duration-150"
              disabled
            />
          </div>

          <div class="pt-4">
            <button
              type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 transform hover:scale-105"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<script setup lang="ts">
import { ref } from "vue";
import auth from "~/middleware/auth";

definePageMeta({
  middleware: auth,
});

interface UserProfile {
  username: string;
  email: string;
  foto?: string | null;
}

// Default avatar url placeholder
const defaultAvatar = "https://placehold.co/150x150/EBF4FF/3B82F6?text=Profil";

const userProfile = ref<UserProfile>({
  username: "Dabeyy",
  email: "context@dabe.com",
  foto: null,
});

const previewImage = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

function triggerFileInput() {
  fileInput.value?.click();
}

function handleImageChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  const file = target.files[0];
  // Optional: Validasi tipe file di sini

  // Preview gambar
  previewImage.value = URL.createObjectURL(file);

  // Kalau mau simpan file untuk upload, bisa simpan ke reactive variable atau formdata saat submit
  // Contoh: userProfile.value.foto = file; // tapi tipe harus disesuaikan
}

async function handleSubmit() {
  try {
    // TODO: Ganti dengan API call update profil
    console.log("Submitting profile:", {
      username: userProfile.value.username,
      email: userProfile.value.email, // walaupun disabled, tetap bisa dikirim kalau mau
      foto: previewImage.value,
    });

    alert("Profil berhasil disimpan!");
  } catch (error) {
    alert("Gagal menyimpan profil");
    console.error(error);
  }
}

// Set judul halaman
useHead({
  title: "Profil Saya - DABE",
  meta: [
    { name: "description", content: "Kelola informasi profil akun DABE Anda." },
  ],
});
</script>

<style scoped>
/* Jika kamu ingin cursor pointer di avatar supaya user tahu bisa klik */
.cursor-pointer {
  cursor: pointer;
}
</style>
