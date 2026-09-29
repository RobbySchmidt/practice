<template>
  <!-- Farbkreis mit Markierungen der Harmoniefarben. Linienfarbe = aktuelle Textfarbe (currentColor) -->
  <div class="relative aspect-square">
    <div
      class="absolute inset-0 rounded-full mask-[radial-gradient(circle_closest-side,transparent_52%,black_53%)]"
      :style="{ background: gradient }"/>
    <svg
      viewBox="0 0 100 100"
      class="absolute inset-0 size-full"
      aria-hidden="true">
      <polygon
        v-if="markers.length > 2"
        :points="markers.map(m => m.x + ',' + m.y).join(' ')"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-opacity="0.8"/>
      <line
        v-if="markers.length === 2"
        :x1="markers[0].x" :y1="markers[0].y"
        :x2="markers[1].x" :y2="markers[1].y"
        stroke="currentColor"
        stroke-width="1"
        stroke-opacity="0.8"/>
      <circle
        v-for="(marker, index) in markers"
        :key="index"
        :cx="marker.x"
        :cy="marker.y"
        :r="index === 0 ? 6 : 4.5"
        :fill="marker.hex"
        stroke="white"
        stroke-width="1.5"/>
    </svg>
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    harmony: Array,
    wheel: {
      type: String,
      default: 'ryb'
    }
  })

  // conic-gradient: bei RYB werden die Winkel auf echte Farbtöne umgerechnet
  const gradient = computed(() => {
    const stops = [];
    for (let angle = 0; angle <= 360; angle += 15) {
      stops.push(`hsl(${wheelToHue(angle, props.wheel)} 85% 55%) ${angle}deg`);
    }
    return `conic-gradient(${stops.join(', ')})`;
  });

  // Position auf dem Kreis (0° = oben, im Uhrzeigersinn)
  const markers = computed(() => props.harmony.map(color => {
    const rad = color.angle * Math.PI / 180;
    return {
      x: 50 + 38 * Math.sin(rad),
      y: 50 - 38 * Math.cos(rad),
      hex: color.hex
    };
  }));
</script>
