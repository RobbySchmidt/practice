<template>
  <section
    :id="scheme.key"
    class="py-f-24 even:bg-background">
    <div class="max-w-6xl mx-auto px-4 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-f-12 items-start">
      <!-- Erklärung -->
      <div class="space-y-6">
        <p class="text-sm font-medium uppercase tracking-wider text-primary">
          {{ scheme.label }}
        </p>
        <h2 class="font-serif font-medium text-f-4xl">
          {{ title }}
        </h2>
        <p class="text-lg">
          {{ text }}
        </p>
        <ul class="space-y-2">
          <li
            v-for="point in points"
            :key="point"
            class="flex gap-2">
            <Icon
              name="Check"
              :size="20"
              class="shrink-0 mt-0.5 text-primary"/>
            <span>{{ point }}</span>
          </li>
        </ul>
        <p class="text-sm">
          <span class="font-medium">Typisch für:</span> {{ examples }}
        </p>

        <!-- Farbkreis + Grundfarbe -->
        <div class="flex items-center gap-4">
          <ColorWheel
            :harmony="palette.harmony"
            class="size-24 shrink-0"/>
          <div class="space-y-2">
            <label class="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input
                v-model="color"
                type="color"
                class="size-8 cursor-pointer rounded bg-transparent">
              Grundfarbe ändern
            </label>
            <ul class="flex flex-wrap gap-x-3 gap-y-1.5">
              <li
                v-for="(item, index) in palette.harmony"
                :key="index"
                class="flex items-center gap-1.5">
                <span
                  class="size-5 shrink-0 rounded-full ring-1 ring-secondary/20"
                  :style="{ background: item.hex }"/>
                <span class="text-sm font-mono">{{ item.hex }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Farbanteile -->
        <div class="space-y-2">
          <p class="text-sm font-medium">
            Farbanteile im Beispiel
          </p>
          <div class="flex h-4 rounded-full overflow-hidden ring-1 ring-secondary/20">
            <span
              v-for="part in usage"
              :key="part.label"
              :style="{ width: part.share + '%', background: colors[part.color] }"/>
          </div>
          <ul class="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <li
              v-for="part in usage"
              :key="part.label"
              class="flex items-center gap-2">
              <span
                class="size-3 shrink-0 rounded-full ring-1 ring-secondary/20"
                :style="{ background: colors[part.color] }"/>
              <span class="opacity-75">{{ part.share }} % {{ part.label }}</span>
              <span class="font-mono opacity-75">{{ colors[part.color] }}</span>
            </li>
          </ul>
        </div>

        <!-- Neutraltöne -->
        <div class="space-y-2">
          <p class="text-sm font-medium">
            Neutraltöne (leicht in Richtung Grundfarbe getönt)
          </p>
          <ul class="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <li
              v-for="key in neutrals"
              :key="key"
              class="flex items-center gap-2">
              <span
                class="size-3 shrink-0 rounded-full ring-1 ring-secondary/20"
                :style="{ background: colors[key] }"/>
              <span class="opacity-75">{{ neutralLabels[key] }}</span>
              <span class="font-mono opacity-75">{{ colors[key] }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Beispiel im Browserfenster -->
      <div
        class="rounded-main overflow-hidden shadow-xl ring-1 ring-secondary/10"
        :style="cssVars">
        <div class="flex gap-1.5 px-4 py-3 bg-(--n-border)">
          <span class="size-2.5 rounded-full bg-(--n-muted) opacity-50"/>
          <span class="size-2.5 rounded-full bg-(--n-muted) opacity-50"/>
          <span class="size-2.5 rounded-full bg-(--n-muted) opacity-50"/>
        </div>
        <slot/>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref, computed } from 'vue';

  const props = defineProps({
    schemeKey: String,
    baseColor: String,
    title: String,
    text: String,
    points: Array,
    examples: String,
    // [{ label, color, share }] – color ist ein Schlüssel aus "colors", z. B. 'h0' oder 'n-bg'
    usage: Array,
    // Neutraltöne, die im Beispiel vorkommen
    neutrals: {
      type: Array,
      default: () => ['n-bg', 'n-surface', 'n-text', 'n-muted']
    }
  })

  const neutralLabels = {
    'n-bg': 'Hintergrund',
    'n-surface': 'Karten',
    'n-text': 'Text',
    'n-muted': 'Text gedämpft',
    'n-dark': 'Hintergrund dunkel',
    'n-dark-2': 'Karten dunkel'
  }

  const color = ref(props.baseColor);
  const scheme = colorSchemes.find(item => item.key === props.schemeKey);
  const palette = computed(() => buildPalette(color.value, scheme, 'ryb'));

  /*
    Farben für das Beispiel, als CSS-Variablen verfügbar (z. B. bg-(--h1)):
    h0–h3   Harmoniefarben
    on0–3   lesbare Textfarbe auf der Harmoniefarbe
    t0–3    helle Tönung (für Flächen)
    d0–3    dunkle Variante (für Text auf der Tönung)
    n-*     Neutraltöne, leicht in Richtung Grundfarbe getönt
  */
  const colors = computed(() => {
    const base = hexToHsl(color.value);
    const result = {
      'n-bg': hslToHex({ h: base.h, s: 15, l: 97 }),
      'n-surface': '#ffffff',
      'n-border': hslToHex({ h: base.h, s: 12, l: 88 }),
      'n-text': hslToHex({ h: base.h, s: 15, l: 14 }),
      'n-muted': hslToHex({ h: base.h, s: 8, l: 40 }),
      'n-dark': hslToHex({ h: base.h, s: 18, l: 10 }),
      'n-dark-2': hslToHex({ h: base.h, s: 14, l: 16 })
    };

    palette.value.harmony.forEach((item, index) => {
      const onWhite = contrastRatio(item.hex, '#ffffff');
      const onDark = contrastRatio(item.hex, result['n-text']);
      result['h' + index] = item.hex;
      result['on' + index] = onWhite >= onDark ? '#ffffff' : result['n-text'];
      result['t' + index] = hslToHex({ h: item.hue, s: 70, l: 93 });
      result['d' + index] = hslToHex({ h: item.hue, s: 60, l: 28 });
    });

    return result;
  });

  const cssVars = computed(() => Object.fromEntries(
    Object.entries(colors.value).map(([key, value]) => ['--' + key, value])
  ));
</script>

<style scoped>

</style>
