<template>
  <div
    id="faq"
    class="py-f-24 space-y-10 max-w-6xl mx-auto px-4 bg-">
    <h2 class="font-serif font-medium text-f-4xl">
      FAQ
    </h2>
    <ul 
      v-if="items.length > 0"
      class="border-b-2 border-secondary max-w-3xl">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="border-t-2 border-secondary">
        <h3>
          <!-- Button zum Auf- und Zuklappen -->
          <button
            type="button"
            :id="id + '-button-' + index"
            :aria-expanded="openIndex === index"
            :aria-controls="id + '-panel-' + index"
            class="w-full py-3 flex cursor-pointer items-center justify-between text-left text-lg font-medium"
            @click="toggle(index)">
            <span>
              {{ item.title }}
            </span>
            <Icon
              name="ChevronDown"
              :size="20"
              :class="{ 'rotate-180': openIndex === index }"/>
          </button>
        </h3>

        <!-- Inhalt: grid-rows 0fr/1fr sorgt für die Auf- und Zuklapp-Animation -->
        <div
          :id="id + '-panel-' + index"
          role="region"
          :aria-labelledby="id + '-button-' + index"
          :inert="openIndex !== index"
          class="grid transition-all duration-300 ease-in-out"
          :class="openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
          <div class="overflow-hidden">
            <p class="pb-3">
              {{ item.text }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, useId } from 'vue';

  defineProps({
    items: Array
  })

  // eindeutige ID, damit mehrere Accordions auf einer Seite sich nicht in die Quere kommen
  const id = useId();

  // Index des geöffneten Eintrags, null = alle zu
  const openIndex = ref(null);

  function toggle(index) {
    openIndex.value = openIndex.value === index ? null : index;
  }
</script>

<style scoped>

</style>
