<template>
	<AppHeader />
	<div class="bg-slate-100 font-inter mt-12">
		<!-- mt-12 untuk memberi ruang di bawah header sticky -->

		<!-- Hero Section -->
		<section class="container mx-auto opacity-0 animate-fadeIn">
			<div class="p-4">
				<DynamicCarousel :items="carouselItems" :autoplay="3000"" />
			</div>

		</section>

		<!-- Main Content Area -->
		<main class=" container mx-auto px-4 sm:px-6 lg:px-8 py-8 opacity-0 animate-fadeIn animation-delay-300">
					<div class="flex flex-col lg:flex-row gap-8">
						<!-- Product Grid -->
						<section class="w-full">
							<h2 class="text-2xl font-semibold text-gray-800 mb-6">
								Semua Produk
							</h2>

							<div v-if="fetchError" class="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
								Terjadi kesalahan saat memuat produk: {{ fetchError }}
							</div>
							<div v-if="isLoading && !allProducts.length" class="text-center py-10">
								Memuat produk...
							</div>
							<div v-if="!isLoading && !fetchError && !allProducts.length" class="text-center py-10">
								Belum ada produk yang tersedia.
							</div>

							<div
								class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-fr">
								<!-- Product Card Component atau Loop -->
								<ProductCard v-for="(product, index) in products" :key="product.id" :product="product"
									:index="index" />
							</div>

							<!-- Tombol Muat Lebih Banyak -->
							<div class="mt-8 text-center" v-if="canLoadMore">
								<button @click="loadMore" :disabled="isLoading"
									class="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 transition duration-300">
									{{ isLoading ? "Memuat..." : "Muat Lebih Banyak" }}
								</button>
							</div>
						</section>
					</div>
					</main>
			</div>
			<AppFooter />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRuntimeConfig, useHead } from "#app";
import ProductCard from "~/components/app/ProductCard.vue";
import DynamicCarousel from "~/components/app/Carousel.vue";

const config = useRuntimeConfig();

const isLoading = ref(true);
const fetchError = ref<string | null>(null);
const fetchedProducts = ref<any[]>([]); // Tipe bisa disesuaikan

onMounted(async () => {
  try {
    const response = await fetch(`${config.public.apiBase}/api/produk/list`, {
      method: "GET",
      redirect: "follow"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    fetchedProducts.value = Array.isArray(result.data) ? result.data : [];
  } catch (error: any) {
    fetchError.value = error.message || "Terjadi kesalahan saat mengambil data.";
    console.error("Fetch Error:", error);
  } finally {
    isLoading.value = false;
  }
});

const allProducts = computed(() =>
  Array.isArray(fetchedProducts.value) ? fetchedProducts.value : []
);
const displayCount = ref(10);
const products = computed(() => allProducts.value.slice(0, displayCount.value));
const canLoadMore = computed(() => displayCount.value < allProducts.value.length && !isLoading.value);

const loadMore = () => {
  displayCount.value += 15;
};

const carouselItems = [
  {
    title: "Promo Beras Diskon 20%",
    image: "/carousel/beras-1.jpg"
  },
  {
    title: "Beras Organik Langsung dari Petani",
    image: "/carousel/petani-1.jpg"
  },
  {
    title: "Gratis Ongkir Seluruh Jawa!",
    image: "/carousel/petani-2.jpg"
  },
  {
    title: "Panen Raya! Harga Spesial Beras Premium",
    image: "/carousel/petani-3.jpg"
  }
];

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
    .format(value)
    .replace("Rp", "Rp ");
};

useHead({
  title: "Beranda - DABE | Beli Beras Langsung Dari Petani",
  meta: [
    {
      name: "description",
      content:
        "Temukan berbagai jenis beras berkualitas langsung dari petani dengan harga terbaik di DABE. Belanja mudah, aman, dan mendukung petani lokal."
    }
  ]
});

</script>


<style scoped>
/* Gaya spesifik untuk komponen ini jika diperlukan,
   namun usahakan semaksimal mungkin menggunakan kelas Tailwind */
/* Pastikan font Inter sudah diimpor di file CSS utama Anda atau di index.html */
.font-inter {
	font-family: "Inter", sans-serif;
}

.product-card {
	transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.product-card:hover {
	transform: translateY(-8px) scale(1.02);
	box-shadow: 0 12px 20px -3px rgba(0, 0, 0, 0.15),
		0 6px 10px -4px rgba(0, 0, 0, 0.1);
}

/* Animasi Kustom */
@keyframes fadeIn {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

.animate-fadeIn {
	animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fadeInUp {
	animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes slideInLeft {
	from {
		opacity: 0;
		transform: translateX(-30px);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
}

.animate-slideInLeft {
	animation: slideInLeft 0.7s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
	/* Added delay */
}

@keyframes slideInRight {
	from {
		opacity: 0;
		transform: translateX(30px);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
}

.animate-slideInRight {
	animation: slideInRight 0.7s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
	/* Added delay */
}

.animation-delay-300 {
	animation-delay: 300ms;
}

.animation-delay-500 {
	animation-delay: 500ms;
}
</style>
/* Tambahkan kelas delay lain jika diperlukan */
