<template>
  <div
    id="stellenangebote" 
    class="py-f-24 bg-background space-y-10">
    <h2 class="max-w-6xl mx-auto px-4 font-serif font-medium text-f-4xl">
      Stellenangebote
    </h2>
    <ul 
      v-if="jobs.length > 0"
      class="grid md:grid-cols-2 2xl:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
      <li
        v-for="job in jobs"
        :key="job.id">
        <NuxtLink
          :to="'/jobs/' + job.id"
          class="rounded-main h-full flex flex-col gap-6 bg-primary hover:bg-secondary duration-300 ease-in-out group text-white p-6">
          <h3 class="grid">
            <span
              v-if="job.title"
              class="font-serif text-3xl mb-1">
              {{ job.title }}
            </span>
            <span
              v-if="job.gender"
              class="text-xl opacity-75">
              ({{ job.gender }})
            </span>
          </h3>
          <div class="flex flex-wrap gap-x-2 text-lg">
            <span
              v-if="job.location">
              {{ job.location }}
            </span>
            <span
              v-if="job.location && job.type"
              class="opacity-50">
              ·
            </span>
            <span
              v-if="job.type">
              {{ job.type }}
            </span>
          </div>
          <div class="mt-auto flex items-center gap-1.5 font-medium">
            <span>
              mehr erfahren
            </span>
            <Icon 
              name="ArrowRight"
              :size="20"
              class="group-hover:translate-x-1 duration-300 ease-in-out"/>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
  defineProps({
    jobs: Array
  })
</script>

<style scoped>

</style>