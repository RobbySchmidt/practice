<template>
  <header class="sticky top-0 z-50 bg-secondary text-background">
    <nav class="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
      <NuxtLink
        to="/"
        class="font-serif text-f-2xl font-medium">
        Musterfirma
      </NuxtLink>

      <!-- Desktop -->
      <ul class="hidden lg:flex items-center gap-8">
        <li
          v-for="link in links"
          :key="link.to">
          <NuxtLink
            :to="link.to"
            class="font-medium hover:text-primary duration-300 ease-in-out">
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Mobil: Menü-Button -->
      <button
        type="button"
        class="lg:hidden"
        :aria-expanded="isOpen"
        aria-controls="mobile-menu"
        :aria-label="isOpen ? 'Menü schließen' : 'Menü öffnen'"
        @click="isOpen = !isOpen">
        <Icon
          :name="isOpen ? 'X' : 'Menu'"
          :size="28"/>
      </button>
    </nav>

    <!-- Mobil: Menü -->
    <ul
      v-show="isOpen"
      id="mobile-menu"
      class="lg:hidden max-w-6xl mx-auto px-4 pb-6 grid gap-4">
      <li
        v-for="link in links"
        :key="link.to">
        <NuxtLink
          :to="link.to"
          class="block text-f-xl font-medium"
          @click="isOpen = false">
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </header>
</template>

<script setup>
  import { ref } from 'vue';

  const isOpen = ref(false);

  const links = [
    { label: 'Stellenangebote', to: '/#stellenangebote' },
    { label: 'Team', to: '/#team' },
    { label: 'FAQ', to: '/#faq' },
    { label: 'Design-Guide', to: '/design-guide' },
    { label: 'Farbtheorie', to: '/farbtheorie' },
    { label: 'Farbpraxis', to: '/farbtheorie-praxis' }
  ]
</script>

<style scoped>

</style>
