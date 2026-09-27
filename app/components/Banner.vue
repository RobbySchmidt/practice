<template>
  <div
    class="py-f-24 bg-background">
    <div class="max-w-6xl mx-auto px-4 space-y-10">
      <div class="bg-primary p-6 md:p-16 rounded-main text-background">
        <div class="space-y-6">
          <h2
            v-if="data.title" 
            class="font-serif font-medium text-f-4xl">
            {{ data.title }}
          </h2>
          <p class="text-xl max-w-3xl">
            {{ data.text }}
          </p>
          <NuxtLink 
            :to="data.button.link"
            class="text-lg bg-secondary py-3 px-6 flex items-center gap-1.5 font-medium w-fit group rounded-main mt-12">
            <span>
              {{ data.button.label }}
            </span>
            <Icon 
              name="ArrowRight"
              :size="20"
              class="group-hover:translate-x-1 duration-300 ease-in-out"/>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    data: Object
  })
</script>

<style scoped>

</style>