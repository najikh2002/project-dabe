<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const token = route.query.token;
  const role = route.query.role;
  const name = route.query.name;
  const foto = route.query.foto;

  if (token && role) {
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", name);
    localStorage.setItem("foto", foto);
    localStorage.setItem("userData", JSON.stringify({ role, nama: name }));

    // Redirect sesuai role
    if (role === "petani") {
      router.replace("/dashboard");
    } else {
      router.replace("/");
    }
  } else {
    // Jika error atau data kurang
    router.replace("/autentikasi/login?error=Login gagal. Data tidak lengkap.");
  }
});
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <p class="text-gray-600 text-sm">Memproses login...</p>
  </div>
</template>
