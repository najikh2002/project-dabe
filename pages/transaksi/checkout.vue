<template>
  <AppHeaderSimple />
  <div class="bg-gray-100 min-h-screen py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="flex justify-between items-center mb-4">
        <div class="flex border-b">
          <button class="py-2 px-4 text-teal-600 border-b-2 border-teal-600 font-semibold">Belum dibayar</button>
          <button class="py-2 px-4 text-gray-500 hover:text-teal-600">Beri penilaian</button>
        </div>
        <div class="relative w-1/3">
          <input type="search" placeholder="Cari..." class="w-full pl-4 pr-10 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-teal-300" />
          <button class="absolute top-0 right-0 h-full px-3 text-white bg-teal-500 rounded-r-md">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div v-if="cart.length > 0" class="space-y-6">
          <div v-for="(seller, sellerIndex) in cart" :key="seller.id">
            <div class="border-b pb-4">
              <div class="flex items-center mb-4">
                <input type="checkbox" class="h-5 w-5 rounded text-teal-600 focus:ring-teal-500" v-model="sellerCheckboxes[sellerIndex]" />
                <h2 class="ml-3 font-bold text-gray-800">{{ seller.name }}</h2>
              </div>

              <div class="space-y-4">
                <div v-for="item in seller.items" :key="item.id" class="flex flex-col md:flex-row items-center gap-4 pl-8">
                  <input type="checkbox" class="h-5 w-5 rounded text-teal-600 focus:ring-teal-500" v-model="item.selected" />

                  <img :src="item.imageUrl" alt="Produk" class="w-20 h-20 object-cover rounded-md border" />

                  <div class="flex-grow text-center md:text-left">
                    <p class="text-gray-700">{{ item.name }}</p>
                  </div>

                  <p class="w-24 text-center font-semibold text-gray-800">{{ formatCurrency(item.price) }}</p>

                  <div class="flex items-center border rounded-md">
                    <button @click="decreaseQuantity(item)" class="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                    <input type="text" class="w-12 text-center border-l border-r focus:outline-none" :value="item.quantity" readonly />
                    <button @click="increaseQuantity(item)" class="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                  </div>

                  <button @click="removeItem(seller, item)" class="text-gray-400 hover:text-red-500">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 py-10">
          <p>Keranjang belanja Anda kosong.</p>
        </div>
      </div>

      <div v-if="cart.length > 0" class="sticky bottom-0 mt-6 bg-white shadow-lg p-4 border-t rounded-lg flex justify-end items-center">
        <div class="flex items-center">
          <span class="text-gray-600 mr-2">Total</span>
          <span class="text-2xl font-bold text-teal-600">{{ formatCurrency(totalPrice) }}</span>
        </div>
        <button class="ml-6 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-8 rounded-lg">Checkout</button>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRuntimeConfig } from "#app";
import AppHeaderSimple from "~/components/app/HeaderSimple.vue"; // Pastikan path import benar
import AppFooter from "~/components/app/Footer.vue"; // Pastikan path import benar

const config = useRuntimeConfig();
const cart = ref([]);
const isLoading = ref(true);
const fetchError = ref(null);

onMounted(async () => {
  await fetchCartData();
});

const fetchCartData = async () => {
  isLoading.value = true;
  fetchError.value = null;
  try {
    const response = await $fetch("/api/keranjang", {
      // Sesuaikan dengan endpoint API Anda
      baseURL: config.public.apiBase,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }, // Jika perlu otentikasi
    });

    console.log("API Response for /api/keranjang:", response); // Log respons untuk debugging

    // Periksa apakah respons memiliki properti 'data' dan merupakan array
    // atau jika respons itu sendiri adalah array (beberapa API mengembalikan array langsung)
    const cartData = Array.isArray(response) ? response : response && Array.isArray(response.data) ? response.data : null;

    if (cartData) {
      cart.value = cartData.map((seller) => ({
        ...seller,
        items: seller.items.map((item) => ({
          ...item,
          selected: true, // Default semua item terpilih, atau sesuaikan dengan logika Anda/API
        })),
      }));
    } else {
      console.error("Unexpected API response structure:", response);
      fetchError.value = "Format data keranjang dari server tidak sesuai.";
      cart.value = []; // Kosongkan keranjang jika data tidak sesuai
    }
  } catch (error) {
    console.error("Error fetching cart data:", error);
    fetchError.value = error.data?.message || error.message || "Gagal memuat keranjang belanja.";
  } finally {
    isLoading.value = false;
  }
};

// --- LOGIKA & FUNGSI ---

// Computed property untuk menghitung total harga dari item yang dipilih
const totalPrice = computed(() => {
  return cart.value.reduce((total, seller) => {
    const sellerTotal = seller.items.reduce((sellerAcc, item) => {
      return item.selected ? sellerAcc + item.price * item.quantity : sellerAcc;
    }, 0);
    return total + sellerTotal;
  }, 0);
});

// Helper untuk format mata uang
const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(value);
};

// Fungsi untuk menambah kuantitas
const increaseQuantity = async (item) => {
  try {
    // Asumsi endpoint: PUT /api/keranjang/item/{itemId} dengan body { quantity: newQuantity }
    // atau POST /api/keranjang/item/{itemId}/increase
    await $fetch(`/api/keranjang/${item.id}`, {
      // Ganti dengan endpoint yang sesuai
      method: "PUT", // atau 'POST' jika endpointnya untuk increment
      baseURL: config.public.apiBase,
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      body: { quantity: item.quantity + 1 },
    });
    item.quantity++;
    console.log(`Increased quantity for ${item.name} to ${item.quantity}`);
  } catch (error) {
    console.error(`Error increasing quantity for ${item.name}:`, error);
    // Tambahkan notifikasi error ke pengguna jika perlu
    alert(`Gagal menambah kuantitas ${item.name}. Silakan coba lagi.`);
  }
};

// Fungsi untuk mengurangi kuantitas
const decreaseQuantity = async (item) => {
  if (item.quantity > 1) {
    try {
      // Asumsi endpoint: PUT /api/keranjang/item/{itemId} dengan body { quantity: newQuantity }
      // atau POST /api/keranjang/item/{itemId}/decrease
      await $fetch(`/api/keranjang/item/${item.id}`, {
        // Ganti dengan endpoint yang sesuai
        method: "PUT", // atau 'POST' jika endpointnya untuk decrement
        baseURL: config.public.apiBase,
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        body: { quantity: item.quantity - 1 },
      });
      item.quantity--;
      console.log(`Decreased quantity for ${item.name} to ${item.quantity}`);
    } catch (error) {
      console.error(`Error decreasing quantity for ${item.name}:`, error);
      alert(`Gagal mengurangi kuantitas ${item.name}. Silakan coba lagi.`);
    }
  }
};

// Fungsi untuk menghapus item
const removeItem = async (seller, itemToRemove) => {
  try {
    // Asumsi endpoint: DELETE /api/keranjang/item/{itemId}
    await $fetch(`/api/keranjang/item/${itemToRemove.id}`, {
      method: "DELETE",
      baseURL: config.public.apiBase,
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });

    seller.items = seller.items.filter((item) => item.id !== itemToRemove.id);
    if (seller.items.length === 0) {
      cart.value = cart.value.filter((s) => s.id !== seller.id);
    }
    console.log(`Removed item ${itemToRemove.name}`);
  } catch (error) {
    console.error(`Error removing item ${itemToRemove.name}:`, error);
    alert(`Gagal menghapus item ${itemToRemove.name}. Silakan coba lagi.`);
  }
};

// Computed property untuk mengelola checkbox per toko
// Perhatikan: logika set pada computed property ini akan memodifikasi state lokal.
// Jika perubahan checkbox juga harus disimpan di backend, Anda perlu memanggil API di sini.
const sellerCheckboxes = computed(() => {
  return cart.value.map((seller) => {
    const allSelected = seller.items.length > 0 && seller.items.every((item) => item.selected);
    return {
      get: () => allSelected,
      set: (value) => {
        seller.items.forEach((item) => {
          item.selected = value;
          // TODO: Jika perubahan selection perlu disimpan ke backend per item
          // updateItemSelectionOnApi(item.id, value);
        });
      },
    };
  });
});

const checkout = async () => {
  const selectedItems = [];
  cart.value.forEach((seller) => {
    seller.items.forEach((item) => {
      if (item.selected) {
        selectedItems.push({ id: item.id, quantity: item.quantity }); // Kirim id dan kuantitas, atau sesuai kebutuhan API
      }
    });
  });

  if (selectedItems.length === 0) {
    alert("Pilih setidaknya satu item untuk checkout.");
    return;
  }

  console.log("Proceeding to checkout with:", selectedItems);
  // TODO: Panggil API untuk proses checkout
  // Contoh: await $fetch('/api/checkout', { method: 'POST', baseURL: config.public.apiBase, body: { items: selectedItems } });
  // Setelah berhasil, mungkin arahkan ke halaman pembayaran atau ringkasan pesanan
  // navigateTo('/transaksi/pembayaran');
};
</script>
