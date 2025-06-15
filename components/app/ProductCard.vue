<template>
  <NuxtLink :to="`/produk/${product.id}`" class="block">
    <div class="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-transform hover:scale-[1.02]">
      <img :src="product.image" :alt="product.nama" class="w-full h-44 object-cover" />
      <div class="p-3 flex flex-col flex-grow">
        <h3 class="text-sm font-medium text-gray-800 truncate mb-1">
          {{ product.nama }}
        </h3>
        <p class="text-[15px] font-semibold text-teal-500 mb-2">
          {{ formattedPrice }}
        </p>
        <div class="flex items-center text-xs text-gray-600 mt-auto gap-2">
          <div class="flex items-center text-yellow-500">
            <svg class="w-4 h-4 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <span>{{ product.rating }}</span>
          </div>
          <div class="flex items-center text-gray-500">
            <svg class="w-3.5 h-3.5 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5c-1.379 0-2.5-1.121-2.5-2.5S10.621 6.5 12 6.5s2.5 1.121 2.5 2.5S13.379 11.5 12 11.5z"
              />
            </svg>
            <span>{{ product.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Product {
  id: string | number;
  nama: string;
  tipe: string;
  harga: number;
  image: string;
  rating: number | string;
  location: string;
}

const props = defineProps<{
  product: Product;
}>();

const formattedPrice = computed(() => {
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(props.product.harga);
});
</script>
