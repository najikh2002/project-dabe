<template>
  <div class="flex flex-col md:flex-row text-sm">
    <p class="w-full md:w-1/3 text-gray-500">{{ name }}</p>
    <p class="w-full md:w-2/3 text-gray-800 font-medium">{{ value }}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    value: [String, Number],
  },
};
</script>
