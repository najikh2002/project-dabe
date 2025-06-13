<template>
  <div class="w-screen h-screen bg-[conic-gradient(from_22deg,#41b49f_50%,#22AB97_50%)]">
    <NuxtLink to="/" class="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
        <img src="/assets/img/logo/dabe_putih.png" alt="DABE Logo" class="h-10 sm:h-12 w-auto">
    </NuxtLink>

    <div class="min-h-screen flex justify-center items-center font-[Poppins]">
      <form @submit.prevent="resetPassword"
        class="p-8 bg-white flex flex-col gap-4 z-10 rounded-md w-full max-w-[430px]">
        <div class="flex flex-col gap-4">
          <h1 class="text-xl font-bold text-center">Atur Ulang Kata Sandi</h1>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">{{ error }}</div>
        <div v-if="success" class="text-green-600 text-sm text-center">{{ success }}</div>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-500">Password</label>
            <input v-model="password" type="password"
              class="bg-[#48967E0F] border p-3 font-semibold rounded-md shadow-md outline-none focus:border-[#22AB97]"
              placeholder="*********" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-500">Konfirmasi Password</label>
            <input v-model="passwordConfirmation" type="password"
              class="bg-[#48967E0F] border p-3 font-semibold rounded-md shadow-md outline-none focus:border-[#22AB97]"
              placeholder="*********" />
          </div>
          <div class="flex flex-col gap-4">
            <button type="submit" class="py-2 w-full font-bold rounded-md bg-[#22AB97] text-white">
              Atur ulang
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRuntimeConfig, navigateTo } from '#app'

const route = useRoute()
const config = useRuntimeConfig()

const token = ref(route.query.token || '')
const email = ref(route.query.email || '')
const password = ref('')
const passwordConfirmation = ref('')
const success = ref('')
const error = ref('')
console.log('Token:', token.value)
console.log('Email:', email.value)
console.log('Password:', password.value)
console.log('Password Confirmation:', passwordConfirmation.value)


const resetPassword = async () => {
  try {
    const { data, error: fetchError, status } = await useFetch('api/password/reset', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: {
        email: email.value,
        token: token.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value
      }
    })

    if (fetchError.value) throw new Error(fetchError.value.data?.message || 'Gagal reset password')

    success.value = 'Password berhasil direset!'
    error.value = ''
    // Arahkan ke halaman login setelah beberapa saat
    setTimeout(() => {
      navigateTo('/autentikasi/login')
    }, 2000) // Tunggu 2 detik sebelum redirect
  } catch (err) {
    error.value = err.message
    success.value = ''
  }
}
</script>
