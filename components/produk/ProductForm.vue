<template>
  <form @submit.prevent="onSubmit" class="bg-white p-6 rounded-xl shadow-md w-full max-w-xl mx-auto">
    <h2 class="text-lg font-semibold bg-emerald-500 text-white px-4 py-2 rounded mb-6 inline-block">
      Informasi Produk
    </h2>

    <div class="space-y-4">
      <div>
        <label class="block mb-1 text-sm">Nama Produk</label>
        <input v-model="form.nama" class="input-style" type="text" required />
      </div>

      <div>
        <label class="block mb-1 text-sm">Foto Produk</label>
        <div class="relative w-32 h-32 border rounded flex items-center justify-center overflow-hidden">
          <img v-if="form.foto" :src="form.foto" class="object-cover w-full h-full" />
          <label v-else class="text-center text-sm text-gray-400">
            <span class="block">📷</span> Tambah
          </label>
          <input type="file" accept="image/*" class="absolute inset-0 opacity-0" @change="onFileChange" />
        </div>
        <button v-if="form.foto" type="button" @click="removeImage" class="text-xs text-red-500 mt-2">
          Ganti
        </button>
      </div>

      <div>
        <label class="block mb-1 text-sm">Harga</label>
        <input v-model="form.harga" class="input-style" type="number" required />
      </div>

      <div>
        <label class="block mb-1 text-sm">Stok</label>
        <input v-model="form.stok" class="input-style" type="number" required />
      </div>

      <div>
        <label class="block mb-1 text-sm">Deskripsi Produk</label>
        <textarea v-model="form.deskripsi" class="input-style" rows="4" required></textarea>
      </div>

      <button :disabled="loading"
        class="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 disabled:opacity-50">
        {{ loading ? 'Menyimpan...' : (mode === "edit" ? "Simpan" : "Tambah") }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, reactive } from "vue";

const props = defineProps({
  mode: { type: String, default: "tambah" }, // 'edit' atau 'tambah'
  modelValue: Object,
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(["submit"]);

const form = reactive({
  nama: "",
  harga: "",
  stok: "",
  deskripsi: "",
  foto: "",
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) Object.assign(form, val);
  },
  { immediate: true }
);

function onFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      form.foto = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function removeImage() {
  form.foto = "";
}

function onSubmit() {
  emit("submit", { ...form });
}
</script>

<style scoped>
.input-style {
  @apply w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-emerald-300;
}
</style>
