<template>
  <!--
    Ab lg: 4 Spalten -> [Rand] [Text 36rem] [Bild 36rem] [Rand]
    Die beiden mittleren Spalten ergeben zusammen 72rem = max-w-6xl,
    dadurch startet der Text auf derselben Linie wie die anderen Komponenten.
    Das Bild läuft über die rechte Randspalte bis an den Bildschirmrand.
  -->
  <div class="grid lg:grid-cols-[1fr_minmax(0,36rem)_minmax(0,36rem)_1fr] lg:min-h-144 bg-secondary text-background">
    <div class="relative lg:col-start-3 lg:col-end-5 lg:row-start-1">
      <img
        :src="data.image"
        :alt="data.title"
        class="block w-full aspect-video object-cover lg:absolute lg:inset-0 lg:h-full lg:aspect-auto">
    </div>
    <div class="px-4 py-f-24 lg:pr-12 lg:col-start-2 lg:row-start-1 lg:self-center space-y-4">
      <h1
        v-if="data.title"
        class="font-serif text-f-6xl font-medium leading-tight">
        {{ data.title }}
      </h1>
      <p
        v-if="data.text"
        class="text-xl">
        {{ data.text }}
      </p>
      <NuxtLink 
        :to="'#stellenangebote'"
        class="bg-primary py-3 px-6 text-lg flex items-center gap-1.5 font-medium w-fit group rounded-main mt-12">
        <span>
          komm ins Team
        </span>
        <Icon 
          name="ArrowRight"
          :size="20"
          class="group-hover:translate-x-1 duration-300 ease-in-out"/>
      </NuxtLink>
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
