<template>
  <footer class="bg-secondary text-background">
    <div class="max-w-6xl mx-auto px-4 py-f-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      <!-- Firma -->
      <div class="space-y-4 lg:col-span-2">
        <NuxtLink
          to="/"
          class="font-serif text-f-2xl font-medium">
          Musterfirma
        </NuxtLink>
        <p class="max-w-sm opacity-75">
          Wir entwickeln digitale Produkte mit Leidenschaft und Präzision.
        </p>
      </div>

      <!-- Navigation -->
      <div class="space-y-4">
        <h2 class="font-medium">
          Navigation
        </h2>
        <ul class="space-y-2">
          <li
            v-for="link in links"
            :key="link.to">
            <NuxtLink
              :to="link.to"
              class="opacity-75 hover:opacity-100 duration-300 ease-in-out">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Kontakt -->
      <div class="space-y-4">
        <h2 class="font-medium">
          Kontakt
        </h2>
        <address class="not-italic space-y-2">
          <p class="opacity-75">
            {{ contact.street }}<br>
            {{ contact.city }}
          </p>
          <a
            :href="'tel:' + contact.phone.replaceAll(' ', '')"
            class="block opacity-75 hover:opacity-100 duration-300 ease-in-out">
            {{ contact.phone }}
          </a>
          <a
            :href="'mailto:' + contact.email"
            class="block opacity-75 hover:opacity-100 duration-300 ease-in-out">
            {{ contact.email }}
          </a>
        </address>
      </div>
    </div>

    <!-- Unterste Zeile -->
    <div class="max-w-6xl mx-auto px-4">
      <div class="py-6 border-t-2 border-background/20 flex flex-col md:flex-row md:justify-between gap-4 text-sm">
        <p class="opacity-75">
          © {{ year }} Musterfirma
        </p>
        <ul class="flex gap-6">
          <li
            v-for="link in legalLinks"
            :key="link.to">
            <NuxtLink
              :to="link.to"
              class="opacity-75 hover:opacity-100 duration-300 ease-in-out">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
  const year = new Date().getFullYear();

  const links = [
    { label: 'Stellenangebote', to: '/#stellenangebote' },
    { label: 'Team', to: '/#team' },
    { label: 'FAQ', to: '/#faq' }
  ]

  const legalLinks = [
    { label: 'Impressum', to: '/impressum' },
    { label: 'Datenschutz', to: '/datenschutz' }
  ]

  const contact = {
    street: 'Musterstraße 12',
    city: '10115 Berlin',
    phone: '+49 30 123 456 78',
    email: 'info@example.com'
  }
</script>

<style scoped>

</style>
