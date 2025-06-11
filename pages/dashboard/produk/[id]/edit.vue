<template>
  <ProductForm mode="edit" :modelValue="produk" @submit="handleUpdate" />
</template>

<script setup>
import ProductForm from "@/components/produk/ProductForm.vue";
import { ref } from "vue";

const produk = ref({
  nama: "Tani Makmur - Beras Premium Grade A",
  harga: 17000,
  stok: 131,
  deskripsi: `Beras berkualitas tinggi langsung dari petani. Pulen, harum alami, bebas bahan kimia.\n\n✓ Aman untuk segala usia\n✓ Wangi khas\n✓ Putih bersih\n✓ Tidak mudah basi`,
  foto: "/dummy/beras.jpg", // atau base64
});

function handleUpdate(data) {
  console.log("Update produk:", data);
  // Kirim ke API
}
</script>
