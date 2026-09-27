<template>
  <div
    id="team"
    class="py-f-24 space-y-10 text-background bg-secondary">
    <h2 class="max-w-6xl mx-auto px-4 font-serif font-medium text-f-4xl">
      Team
    </h2>
    <ul
      v-if="team.length > 0"
      class="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
      <li
        v-for="member in team"
        :key="member.id"
        class="space-y-3">
        <img
          :src="member.image"
          :alt="member.name"
          class="block w-full aspect-[3/4] rounded-main object-cover">
        <div
          class="grid">
          <span class="text-lg font-medium">
            {{ member.name }}
          </span>
          <span class="opacity-75">
            {{ member.role }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  defineProps({
    team: Array
  })
</script>

<style scoped>

</style>