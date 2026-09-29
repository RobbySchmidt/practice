<template>
  <!--
    Der Themer überschreibt die Tailwind-Farbvariablen (--color-primary usw.) direkt am <html>-Element.
    Dadurch färben sich auch Navigation und Footer mit ein, die Startseite selbst bleibt unverändert.
    Das Panel nutzt bewusst neutrale Tailwind-Farben, damit es nicht mitgefärbt wird.
  -->
  <div class="fixed bottom-4 right-4 z-60 flex flex-col items-end gap-3">
    <div
      v-show="isOpen"
      id="color-themer"
      class="w-[min(23rem,calc(100vw-2rem))] max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-main bg-neutral-900 text-neutral-100 p-5 space-y-6 shadow-2xl">
      <h2 class="font-serif text-f-2xl font-medium">
        Farbtheorie
      </h2>

      <!-- Primärfarbe -->
      <label class="flex items-center gap-3">
        <input
          v-model="primary"
          type="color"
          :disabled="scheme.key === 'original'"
          class="size-12 cursor-pointer rounded-lg bg-transparent disabled:cursor-not-allowed disabled:opacity-50">
        <span class="grid">
          <span class="font-medium">Primärfarbe</span>
          <span class="text-sm text-neutral-400 font-mono">{{ primary }}</span>
        </span>
      </label>

      <!-- Farbharmonie -->
      <fieldset class="space-y-2">
        <legend class="font-medium mb-2">Farbharmonie</legend>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="item in colorSchemes"
            :key="item.key"
            type="button"
            :aria-pressed="scheme.key === item.key"
            class="rounded-lg px-3 py-2 text-sm text-left cursor-pointer duration-300 ease-in-out"
            :class="scheme.key === item.key ? 'bg-neutral-100 text-neutral-900' : 'bg-neutral-800 hover:bg-neutral-700'"
            @click="selectScheme(item)">
            {{ item.label }}
          </button>
        </div>
      </fieldset>

      <!-- Farbkreis-Modell -->
      <fieldset
        v-if="scheme.key !== 'original'"
        class="space-y-2">
        <legend class="font-medium mb-2">Farbkreis</legend>
        <div class="grid grid-cols-2 gap-1 rounded-lg bg-neutral-800 p-1">
          <button
            v-for="item in wheels"
            :key="item.key"
            type="button"
            :aria-pressed="wheel === item.key"
            class="rounded-md px-3 py-1.5 text-sm cursor-pointer duration-300 ease-in-out"
            :class="wheel === item.key ? 'bg-neutral-100 text-neutral-900' : 'hover:bg-neutral-700'"
            @click="wheel = item.key">
            {{ item.label }}
          </button>
        </div>
      </fieldset>

      <!-- Farbkreis mit Markierungen -->
      <div class="flex gap-4 items-start">
        <ColorWheel
          :harmony="palette.harmony"
          :wheel="wheel"
          class="size-32 shrink-0"/>
        <p class="text-sm text-neutral-300">
          {{ scheme.text }}
        </p>
      </div>

      <!-- Harmoniefarben -->
      <div class="space-y-2">
        <h3 class="font-medium">Harmoniefarben</h3>
        <ul class="flex gap-2">
          <li
            v-for="(color, index) in palette.harmony"
            :key="index"
            class="flex-1 space-y-1">
            <span
              class="block h-10 rounded-lg"
              :style="{ background: color.hex }"/>
            <span class="block text-xs text-neutral-400 font-mono">{{ color.hex }}</span>
          </li>
        </ul>
      </div>

      <!-- Rollen auf der Seite -->
      <div class="space-y-2">
        <h3 class="font-medium">Auf der Seite</h3>
        <ul class="grid grid-cols-2 gap-2">
          <li
            v-for="(hex, role) in palette.colors"
            :key="role"
            class="flex items-center gap-2">
            <span
              class="size-8 shrink-0 rounded-md ring-1 ring-white/20"
              :style="{ background: hex }"/>
            <span class="grid text-sm">
              <span>{{ role }}</span>
              <span class="text-xs text-neutral-400 font-mono">{{ hex }}</span>
            </span>
          </li>
        </ul>
      </div>

      <!-- Kontrast -->
      <div class="space-y-2">
        <h3 class="font-medium">Kontrast (WCAG AA ≥ 4.5)</h3>
        <ul class="space-y-1 text-sm">
          <li
            v-for="check in contrastChecks"
            :key="check.label"
            class="flex justify-between gap-4">
            <span class="text-neutral-300">{{ check.label }}</span>
            <span
              class="font-mono"
              :class="check.ratio >= 4.5 ? 'text-green-400' : 'text-red-400'">
              {{ check.ratio.toFixed(2) }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <button
      type="button"
      class="size-14 rounded-full bg-neutral-900 text-neutral-100 flex items-center justify-center shadow-xl cursor-pointer"
      :aria-expanded="isOpen"
      aria-controls="color-themer"
      :aria-label="isOpen ? 'Farbtheorie schließen' : 'Farbtheorie öffnen'"
      @click="isOpen = !isOpen">
      <Icon
        :name="isOpen ? 'X' : 'Palette'"
        :size="24"/>
    </button>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';

  const wheels = [
    { key: 'ryb', label: 'RYB (Malerfarben)' },
    { key: 'rgb', label: 'RGB (Lichtfarben)' }
  ]

  const isOpen = ref(true);
  const primary = ref(originalColors.primary);
  const scheme = ref(colorSchemes[0]);
  const wheel = ref('ryb');

  function selectScheme(item) {
    scheme.value = item;
    if (item.key === 'original') {
      primary.value = originalColors.primary;
    }
  }

  const palette = computed(() => buildPalette(primary.value, scheme.value, wheel.value));

  const contrastChecks = computed(() => {
    const { primary, secondary, background, white } = palette.value.colors;
    return [
      { label: 'Text auf Primary (Jobs)', ratio: contrastRatio(white, primary) },
      { label: 'Text auf Secondary', ratio: contrastRatio(background, secondary) },
      { label: 'Text auf Background', ratio: contrastRatio(secondary, background) }
    ];
  });

  useHead({
    htmlAttrs: {
      style: computed(() => Object.entries(palette.value.colors)
        .map(([role, hex]) => `--color-${role}: ${hex}`)
        .join('; '))
    }
  })
</script>

<style scoped>

</style>
