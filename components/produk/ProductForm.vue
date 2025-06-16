<template>
  <form @submit.prevent="onSubmit" class="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-xl mx-auto">
    <h2 class="text-2xl font-semibold text-gray-800 mb-8 pb-4 border-b border-gray-200">
      {{ mode === "edit" ? "Edit Informasi Produk" : "Informasi Produk Baru" }}
    </h2>

    <div class="space-y-6">
      <div>
        <label for="namaProduk" class="form-label">Nama Produk</label>
        <input id="namaProduk" v-model="form.nama" class="input-style" type="text" placeholder="Contoh: Beras Premium Super" required />
      </div>

      <!-- Input Tipe Produk -->
      <div>
        <label for="tipeProduk" class="form-label">Tipe Produk</label>
        <select id="tipeProduk" v-model="form.tipe_produk" class="input-style" required>
          <option value="" disabled>Pilih tipe produk</option>
          <option value="beras">Beras</option>
          <option value="tebas">tebas</option>
          <option value="gabah">gabah</option>
        </select>
      </div>

      <div>
        <label class="form-label">Foto Produk</label>
        <div class="mt-1 flex items-start space-x-4">
          <label
            for="fotoProdukInput"
            class="relative w-28 h-28 sm:w-32 sm:h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-emerald-500 transition-colors cursor-pointer bg-gray-50 overflow-hidden group"
          >
            <img v-if="form.foto" :src="form.foto" alt="Preview Foto Produk" class="object-cover w-full h-full" />
            <div v-else class="text-center p-2">
              <svg
                class="mx-auto h-10 w-10 text-gray-400 group-hover:text-emerald-500 transition-colors"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span class="mt-1 block text-xs font-medium group-hover:text-emerald-500 transition-colors">Unggah Foto</span>
            </div>
            <input
              id="fotoProdukInput"
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              @change="onFileChange"
            />
          </label>
          <button
            v-if="form.foto"
            type="button"
            @click="removeImage"
            class="mt-2 text-xs text-red-600 hover:text-red-700 font-medium py-1 px-2 rounded hover:bg-red-50 transition-colors"
          >
            Hapus Foto
          </button>
        </div>
        <p class="text-xs text-gray-500 mt-2">Format: JPG, PNG, WEBP. Ukuran maks: 2MB.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
        <div>
          <label for="hargaProduk" class="form-label">Harga (Rp)</label>
          <input id="hargaProduk" v-model.number="form.harga" class="input-style" type="number" placeholder="Contoh: 15000" min="0" required />
        </div>

        <div>
          <label for="stokProduk" class="form-label">Stok</label>
          <input id="stokProduk" v-model.number="form.stok" class="input-style" type="number" placeholder="Contoh: 100" min="0" required />
        </div>
      </div>

      <div>
        <label for="deskripsiProduk" class="form-label">Deskripsi Produk</label>
        <textarea id="deskripsiProduk" v-model="form.deskripsi" class="input-style" rows="5" placeholder="Jelaskan detail produk Anda..." required></textarea>
      </div>

      <div class="pt-2 overflow-hidden">
        <button
          :disabled="loading"
          type="submit"
          class="w-full sm:w-auto sm:float-right px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 ease-in-out"
        >
          {{ loading ? "Menyimpan..." : mode === "edit" ? "Simpan Perubahan" : "Tambah Produk" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, reactive } from "vue";

const props = defineProps({
  mode: { type: String, default: "tambah" },
  modelValue: Object,
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(["submit"]);

const fileInputRef = ref(null);

const form = reactive({
  nama: "",
  harga: null,
  stok: null,
  deskripsi: "",
  foto: "", // Base64 preview or existing URL
  file: null, // Actual File object
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      form.nama = val.nama || "";
      form.harga = val.harga === undefined ? null : Number(val.harga);
      form.stok = val.stok === undefined ? null : Number(val.stok);
      form.deskripsi = val.deskripsi || "";
      form.foto = val.foto || ""; // Existing image URL/path for preview
      form.file = null; // Reset file object when modelValue changes
    } else {
      form.nama = "";
      form.harga = null;
      form.stok = null;
      form.deskripsi = "";
      form.foto = "";
      form.file = null;
    }
  },
  { immediate: true, deep: true }
);

function onFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      // 2MB limit
      alert("Ukuran file terlalu besar. Maksimal 2MB.");
      if (fileInputRef.value) {
        fileInputRef.value.value = "";
      }
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      form.foto = event.target.result; // Update preview
    };
    reader.readAsDataURL(file);
    form.file = file; // Store the actual file object
  }
}

function removeImage() {
  form.foto = "";
  form.file = null;
  if (fileInputRef.value) {
    fileInputRef.value.value = ""; // Reset file input to allow re-selection of the same file
  }
}

function onSubmit() {
  const dataToSubmit = {
    nama: form.nama,
    tipe_produk: form.tipe_produk , // Default to "beras" if not set
    harga: form.harga,
    stok: form.stok,
    deskripsi: form.deskripsi,
    foto_file: form.file, // New File object, or null
  };

  if (props.mode === "edit" && !form.file && props.modelValue && props.modelValue.foto) {
    // If editing, no new file selected, and there was an original photo
    dataToSubmit.existing_foto_path = props.modelValue.foto;
    if (!form.foto) {
      // User explicitly cleared the preview, meaning remove existing photo
      dataToSubmit.remove_existing_foto = true;
    }
  }
  emit("submit", dataToSubmit);
}
</script>

<style scoped>
.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1.5;
}
.input-style {
  @apply block w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg shadow-sm
         placeholder-gray-400 text-gray-900
         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
         transition duration-150 ease-in-out sm:text-sm;
}
</style>
