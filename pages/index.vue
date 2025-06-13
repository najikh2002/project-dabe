<template>
	<AppHeader />
	<div class="bg-white font-inter mt-12">
		<!-- mt-12 untuk memberi ruang di bawah header sticky -->

		<!-- Hero Section -->
		<section class="container mx-auto opacity-0 animate-fadeIn">
			<div class="px-4 sm:px-6 lg:px-8">
				<!-- Wrapper for horizontal padding, matching main content -->
				<div
					class="py-12 md:py-16 flex flex-col md:flex-row items-center bg-teal-500 text-white rounded-lg px-4 sm:px-6 lg:px-8 shadow-lg"
				>
					<!-- px-4 sm:px-6 lg:px-8 here is for the banner's internal content padding -->
					<div
						class="md:w-1/2 text-center md:text-left mb-8 md:mb-0 animate-slideInLeft"
					>
						<h1
							class="text-3xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4"
						>
							Beli Beras Lebih Murah Di DABE!
						</h1>
						<p class="text-2xl sm:text-3xl lg:text-4xl font-bold">
							Langsung Dari Petani, Cek!
						</p>
					</div>
					<div
						class="md:w-1/2 flex justify-center md:justify-end animate-slideInRight"
					>
						<!-- Ganti dengan URL gambar petani yang relevan -->
						<img
							src="https://placehold.co/400x300/a0aec0/ffffff?text=Petani+Panen"
							alt="Petani memegang padi"
							class="rounded-lg shadow-lg max-w-xs sm:max-w-sm md:max-w-md"
						/>
					</div>
				</div>
			</div>
		</section>

		<!-- Main Content Area -->
		<main
			class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 opacity-0 animate-fadeIn animation-delay-300"
		>
			<div class="flex flex-col lg:flex-row gap-8">
				<!-- Product Grid -->
				<section class="w-full">
					<h2 class="text-2xl font-semibold text-gray-800 mb-6">
						Semua Produk
					</h2>
					<div
						class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-fr"
					>
						<!-- Product Card Component atau Loop -->
						<ProductCard
							v-for="(product, index) in products"
							:key="product.id"
							:product="product"
							:index="index"
						/>
					</div>

					<!-- Tombol Muat Lebih Banyak -->
					<div class="mt-8 text-center" v-if="canLoadMore">
						<button
							@click="loadMore"
							:disabled="isLoading"
							class="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 transition duration-300"
						>
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
import { ref } from "vue";
import ProductCard from "~/components/app/ProductCard.vue";
import { productsData } from "~/src/api/products";

const isLoading = ref(false);
const allProducts = ref(productsData); // semua data
const displayCount = ref(15); // jumlah yang ditampilkan

const products = computed(() => allProducts.value.slice(0, displayCount.value));

const canLoadMore = computed(
	() => displayCount.value < allProducts.value.length && !isLoading.value
);

const loadMore = () => {
	isLoading.value = true;
	// Simulasi pemanggilan API atau proses loading
	setTimeout(() => {
		displayCount.value += 15;
		isLoading.value = false;
	}, 1000); // Ganti dengan logika pemanggilan data Anda
};

// const products = ref([
// 	{
// 		id: 1,
// 		name: "Beras Premium Maju Sari",
// 		price: 15000,
// 		rating: 4.8,
// 		location: "Kab. Nganjuk",
// 		image: "https://placehold.co/300x200/e2e8f0/333333?text=Beras+1",
// 	},
// 	{
// 		id: 2,
// 		name: "Beras Organik Sehat Jaya",
// 		price: 18500,
// 		rating: 4.9,
// 		location: "Kab. Sleman",
// 		image: "https://placehold.co/300x200/e2e8f0/333333?text=Beras+2",
// 	},
// 	{
// 		id: 3,
// 		name: "Beras Kepala Super Enak",
// 		price: 16000,
// 		rating: 4.7,
// 		location: "Kab. Klaten",
// 		image: "https://placehold.co/300x200/e2e8f0/333333?text=Beras+3",
// 	},
// 	{
// 		id: 4,
// 		name: "Beras Pulen Wangi Melati",
// 		price: 17000,
// 		rating: 4.8,
// 		location: "Kab. Cianjur",
// 		image: "https://placehold.co/300x200/e2e8f0/333333?text=Beras+4",
// 	},
// 	{
// 		id: 5,
// 		name: "Beras Merah Organik Sejahtera",
// 		price: 22000,
// 		rating: 4.6,
// 		location: "Kab. Boyolali",
// 		image: "https://placehold.co/300x200/e2e8f0/333333?text=Beras+5",
// 	},
// 	{
// 		id: 6,
// 		name: "Beras Hitam Asli Nusantara",
// 		price: 25000,
// 		rating: 4.9,
// 		location: "Kab. Magelang",
// 		image: "https://placehold.co/300x200/e2e8f0/333333?text=Beras+6",
// 	},
// ]);

const formatCurrency = (value: number): string => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})
		.format(value)
		.replace("Rp", "Rp "); // Menambahkan spasi setelah Rp dan memastikan tidak ada desimal
};

// Set judul halaman dan meta deskripsi
useHead({
	title: "Beranda - DABE | Beli Beras Langsung Dari Petani",
	meta: [
		{
			name: "description",
			content:
				"Temukan berbagai jenis beras berkualitas langsung dari petani dengan harga terbaik di DABE. Belanja mudah, aman, dan mendukung petani lokal.",
		},
	],
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
	animation: slideInLeft 0.7s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
		forwards;
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
	animation: slideInRight 0.7s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
		forwards;
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
