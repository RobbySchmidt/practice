<template>
  <div class="max-w-6xl mx-auto px-4 py-f-24 space-y-10">
    <h2
      v-if="data.title" 
      class="font-serif font-medium text-f-4xl">
      {{ data.title }}
    </h2>
    <p
      v-if="data.text"
      class="text-xl max-w-3xl">
      {{ data.text }}
    </p>
  </div>
</template>

<script setup>
  defineProps({
    data: Object
  })
</script>

<style scoped>

</style>