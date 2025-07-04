<template>
  <div>
    <AppHeader />
    <div class="bg-gray-100 min-h-screen py-8">
      <div class="container mx-auto px-4 max-w-4xl">
        <!-- Produk Utama -->
        <div v-if="loading" class="text-center py-10">Loading...</div>
        <div v-else-if="error" class="text-center text-red-500 py-10">
          {{ error }}
        </div>
        <div v-else class="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div class="flex flex-col md:flex-row gap-6">
            <!-- Gambar/Files -->
            <div class="w-full md:w-1/3 flex-shrink-0">
              <img
                v-if="product.files.length"
                :src="product.files[0].url"
                alt="Gambar Produk"
                class="rounded-lg w-full object-cover aspect-square"
              />
              <div v-else class="h-48 bg-gray-200 rounded-lg"></div>
            </div>

            <!-- Detail Produk Dasar -->
            <div class="w-full md:w-2/3">
              <h1 class="text-2xl font-bold text-gray-800">
                {{ product.nama }}
              </h1>
              <div class="flex items-center mt-2">
                <StarRating :rating="product.rating" />
                <span class="text-sm text-gray-500 ml-2"
                  >({{ product.jumlah_penjualan }} Penjualan)</span
                >
              </div>
              <p class="text-3xl font-bold text-teal-600 my-4">
                {{ formatCurrency(basePrice) }}
              </p>

              <!-- Deskripsi List -->
              <h2 class="text-md font-semibold text-gray-700">
                Deskripsi Produk:
              </h2>
              <ul
                class="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1"
              >
                <li v-for="(desc, idx) in detailList" :key="idx">{{ desc }}</li>
              </ul>

              <!-- Tombol Aksi -->
              <div class="flex items-center gap-4 mt-6">
                <button
                  class="w-full border border-teal-600 text-teal-600 py-2 px-4 rounded-lg hover:bg-teal-50 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path
                      d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                    />
                    <!-- Tanda tambah di tengah troli -->
                    <line x1="14" y1="8" x2="14" y2="14" />
                    <line x1="11" y1="11" x2="17" y2="11" />
                  </svg>
                </button>

                <button
                  class="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 flex items-center justify-center"
                >
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Spesifikasi Berdasar Tipe Produk -->
        <div
          v-if="product && product.detail"
          class="bg-white p-6 rounded-lg shadow-sm mb-6"
        >
          <h2 class="text-xl font-bold text-gray-800 mb-4">
            Spesifikasi Produk
          </h2>
          <div class="space-y-3 text-sm">
            <template v-if="product.tipe_produk === 'beras'">
              <SpecRow name="Kualitas" :value="product.detail.kualitas" />
              <SpecRow
                name="Harga per Kg"
                :value="formatCurrency(product.detail.harga_kg)"
              />
              <SpecRow name="Stok (Kg)" :value="product.detail.stok_kg" />
              <SpecRow name="Deskripsi" :value="product.detail.deskripsi" />
              <template v-if="product.detail.produksi">
                <SpecRow
                  name="Tanggal Pengemasan"
                  :value="product.detail.produksi.tgl_pengemasan"
                />
                <SpecRow
                  name="Metode Pembersihan"
                  :value="product.detail.produksi.metode_pembersihan"
                />
                <SpecRow
                  name="Jenis Penggilingan"
                  :value="product.detail.produksi.jenis_penggilingan"
                />
                <SpecRow
                  name="Kondisi Penyimpanan"
                  :value="product.detail.produksi.kondisi_penyimpanan"
                />
              </template>
            </template>

            <template v-else-if="product.tipe_produk === 'gabah'">
              <SpecRow name="Kualitas" :value="product.detail.kualitas" />
              <SpecRow
                name="Harga per Kg"
                :value="formatCurrency(product.detail.harga_kg)"
              />
              <SpecRow name="Stok (Kg)" :value="product.detail.stok_kg" />
              <SpecRow name="Deskripsi" :value="product.detail.deskripsi" />
              <template v-if="product.detail.panen">
                <SpecRow
                  name="Teknik Panen"
                  :value="product.detail.panen.teknik_panen"
                />
                <SpecRow
                  name="Jenis Pengeringan"
                  :value="product.detail.panen.jenis_pengeringan"
                />
                <SpecRow
                  name="Durasi Pengeringan"
                  :value="product.detail.panen.durasi_pengeringan"
                />
              </template>
            </template>

            <template v-else-if="product.tipe_produk === 'tebas'">
              <SpecRow name="Umur Padi" :value="product.detail.umur_padi" />
              <SpecRow
                name="Harga"
                :value="formatCurrency(product.detail.harga)"
              />
              <SpecRow
                name="Rendemen Padi"
                :value="product.detail.rendeman_padi"
              />
              <SpecRow name="Stok Produk" :value="product.detail.stok_produk" />
              <SpecRow name="Deskripsi" :value="product.detail.deskripsi" />

              <template v-if="product.detail.lahan">
                <h3 class="mt-4 font-semibold text-gray-700">Detail Lahan:</h3>
                <SpecRow
                  name="Bentuk Lahan"
                  :value="product.detail.lahan.bentuk_lahan"
                />
                <SpecRow
                  name="Ukuran Lahan"
                  :value="product.detail.lahan.ukuran_lahan"
                />
                <SpecRow
                  name="pH Tanah"
                  :value="product.detail.lahan.ph_tanah"
                />
                <SpecRow
                  name="Ketersediaan Air"
                  :value="product.detail.lahan.ketersediaan_air"
                />

                <template v-if="product.detail.lahan.cuaca">
                  <h4 class="mt-3 font-medium text-gray-600">Data Cuaca:</h4>
                  <SpecRow
                    name="Curah Hujan Harian"
                    :value="product.detail.lahan.cuaca.curah_hujan_harian"
                  />
                  <SpecRow
                    name="Intensitas Cahaya Matahari"
                    :value="
                      product.detail.lahan.cuaca.intensitas_cahaya_matahari
                    "
                  />
                </template>

                <template v-if="product.detail.lahan.pertanian">
                  <h4 class="mt-3 font-medium text-gray-600">
                    Data Pertanian:
                  </h4>
                  <SpecRow
                    name="Metode Tanam"
                    :value="product.detail.lahan.pertanian.metode_tanam"
                  />
                  <SpecRow
                    name="Jenis Pupuk"
                    :value="product.detail.lahan.pertanian.jenis_pupuk"
                  />
                  <SpecRow
                    name="Dosis Pupuk per HA"
                    :value="product.detail.lahan.pertanian.dosis_pupuk_HA"
                  />
                  <SpecRow
                    name="Jumlah Gabah per Cabang"
                    :value="
                      product.detail.lahan.pertanian.jumlah_gabah_percabang
                    "
                  />
                  <SpecRow
                    name="Presentase Gabah Isi Hampa"
                    :value="
                      product.detail.lahan.pertanian.presentase_gabah_isi_hampa
                    "
                  />
                </template>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StarRating from "@/components/produk/StarRating.vue";
import SpecRow from "@/components/produk/SpecRow.vue";

export default {
  components: {
    AppHeader: () => import("@/components/produk/AppHeader.vue"),
    StarRating,
    SpecRow,
  },
  data() {
    return {
      product: null,
      loading: true,
      error: null,
      slug: this.$route.params.slug, // ambil dari route
    };
  },
  computed: {
    id() {
      // Ekstrak angka terakhir dari slug, contoh: "beras-premium-123"
      //   const match = this.slug.match(/-(\d+)$/);
      //   return match ? Number(match[1]) : null;
      return this.slug;
    },
    basePrice() {
      if (!this.product || !this.product.detail) return 0;

      const { tipe_produk, detail } = this.product;

      if (tipe_produk === "beras") return detail.harga_kg;
      if (tipe_produk === "gabah") return detail.harga_kg;
      if (tipe_produk === "tebas") return detail.harga;

      return 0;
    },
    detailList() {
      if (!this.product || !this.product.detail) return [];
      const desc = this.product.detail.deskripsi;

      return Array.isArray(desc)
        ? desc
        : typeof desc === "string"
        ? desc
            .split(/\n|,|·|•/)
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(value);
    },
  },
  async mounted() {
    if (!this.id) {
      this.error = "Produk tidak ditemukan (ID tidak valid)";
      this.loading = false;
      return;
    }

    try {
      const res = await axios.get(
        `https://api-dabe.pejuangpemrograman.com/api/produk/${this.id}`
      );
      this.product = res.data;
    } catch (e) {
      this.error = "Gagal mengambil data produk.";
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>
