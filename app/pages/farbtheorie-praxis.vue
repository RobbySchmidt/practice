<template>
  <div>
    <div class="max-w-6xl mx-auto px-4 py-f-24 space-y-6">
      <h1 class="font-serif font-medium text-f-6xl leading-tight max-w-4xl">
        Farbharmonien in der Praxis
      </h1>
      <p class="text-xl max-w-3xl">
        Auf der Startseite wirken kontrastreiche Harmonien schnell unruhig, weil große Flächen eingefärbt werden.
        Richtig eingesetzt sind sie aber stark: Die Fläche gehört den Neutraltönen, die Harmoniefarben bekommen eine klare Aufgabe.
        Sie lenken Aufmerksamkeit, unterscheiden Kategorien oder erzeugen Stimmung.
      </p>
      <p class="max-w-3xl opacity-75">
        In jedem Beispiel lässt sich die Grundfarbe ändern. Die übrigen Farben werden im RYB-Farbkreis berechnet.
      </p>
    </div>

    <!-- Komplementär: Onlineshop -->
    <SchemeShowcase
      scheme-key="complementary"
      base-color="#2563eb"
      title="Den Blick auf eine Aktion lenken"
      text="Komplementärfarben sind der stärkste Kontrast im Farbkreis. Genau deshalb eignen sie sich für das eine Element, das niemand übersehen soll: den Kaufen-Button, einen Rabatt oder einen wichtigen Hinweis."
      :points="[
        'Die Grundfarbe trägt die Marke: Logo, Sterne, Links.',
        'Die Komplementärfarbe erscheint nur beim wichtigsten Element und wird so zum Signal.',
        'Je seltener der Akzent, desto stärker wirkt er.'
      ]"
      examples="Onlineshops, Landingpages, Sale-Aktionen"
      :neutrals="['n-bg', 'n-text', 'n-muted']"
      :usage="[
        { label: 'Neutral', color: 'n-bg', share: 70 },
        { label: 'Grundfarbe', color: 'h0', share: 22 },
        { label: 'Komplementär', color: 'h1', share: 8 }
      ]">
      <div class="bg-(--n-bg) text-(--n-text) p-6 md:p-8 space-y-6">
        <div class="flex items-center justify-between">
          <span class="text-xl font-semibold text-(--h0)">Nordpfad</span>
          <Icon
            name="ShoppingBag"
            :size="22"
            class="text-(--n-muted)"/>
        </div>
        <div class="grid sm:grid-cols-2 gap-6 items-center">
          <div class="relative aspect-square rounded-main bg-(--t0) flex items-center justify-center">
            <Icon
              name="Backpack"
              :size="96"
              :stroke-width="1.25"
              class="text-(--h0)"/>
            <span class="absolute top-3 left-3 rounded-full px-3 py-1 text-sm font-semibold bg-(--h1) text-(--on1)">
              −20 %
            </span>
          </div>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-(--n-muted)">Wanderrucksack · 28 Liter</p>
              <h3 class="text-2xl font-semibold">Alpin Trail 28</h3>
            </div>
            <div class="flex items-center gap-0.5 text-(--h0)">
              <Icon
                v-for="star in 5"
                :key="star"
                name="Star"
                :size="16"
                fill="currentColor"/>
              <span class="ml-1.5 text-sm text-(--n-muted)">(128)</span>
            </div>
            <p class="flex items-baseline gap-2">
              <span class="text-2xl font-semibold">119,90 €</span>
              <span class="line-through text-(--n-muted)">149,90 €</span>
            </p>
            <div class="space-y-2">
              <span class="block w-full rounded-lg py-3 text-center font-semibold bg-(--h1) text-(--on1)">
                In den Warenkorb
              </span>
              <span class="block w-full rounded-lg py-2.5 text-center font-semibold border-2 border-(--h0) text-(--h0)">
                Merken
              </span>
            </div>
          </div>
        </div>
      </div>
    </SchemeShowcase>

    <!-- Split-Komplementär: Preistabelle -->
    <SchemeShowcase
      scheme-key="split"
      base-color="#7c3aed"
      title="Ein Akzent, der nicht schreit"
      text="Split-Komplementär hat fast so viel Spannung wie Komplementär, ist aber weicher und liefert zwei Akzentfarben statt einer. Ideal, wenn es eine Hauptaktion gibt und zusätzlich kleine Hinweise."
      :points="[
        'Die Grundfarbe hebt das empfohlene Angebot hervor.',
        'Akzent 1 für Badge und Hauptbutton.',
        'Akzent 2 nur für kleine Details wie die Häkchen.'
      ]"
      examples="Preistabellen, SaaS-Websites, Apps mit Statusanzeigen"
      :usage="[
        { label: 'Neutral', color: 'n-bg', share: 65 },
        { label: 'Grundfarbe', color: 'h0', share: 25 },
        { label: 'Akzent 1', color: 'h1', share: 6 },
        { label: 'Akzent 2', color: 'h2', share: 4 }
      ]">
      <div class="bg-(--n-bg) text-(--n-text) p-6 md:p-8 space-y-8">
        <div class="text-center space-y-1">
          <h3 class="text-2xl font-semibold">Wähle deinen Plan</h3>
          <p class="text-(--n-muted)">Monatlich kündbar</p>
        </div>
        <ul class="grid sm:grid-cols-3 gap-6 sm:gap-4">
          <li
            v-for="plan in plans"
            :key="plan.name"
            class="relative rounded-main p-5 flex flex-col gap-4"
            :class="plan.featured ? 'bg-(--h0) text-(--on0)' : 'bg-(--n-surface) ring-1 ring-(--n-border)'">
            <span
              v-if="plan.featured"
              class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap bg-(--h1) text-(--on1)">
              Beliebt
            </span>
            <div>
              <p class="font-semibold">{{ plan.name }}</p>
              <p class="text-3xl font-semibold">
                {{ plan.price }}<span class="text-sm font-normal opacity-75"> / Monat</span>
              </p>
            </div>
            <ul class="space-y-2 text-sm">
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="flex gap-2">
                <Icon
                  name="CircleCheck"
                  :size="18"
                  class="shrink-0"
                  :class="plan.featured ? 'text-(--h2)' : 'text-(--d2)'"/>
                {{ feature }}
              </li>
            </ul>
            <span
              class="mt-auto rounded-lg py-2.5 text-center font-semibold"
              :class="plan.featured ? 'bg-(--h1) text-(--on1)' : 'border-2 border-(--h0) text-(--h0)'">
              Auswählen
            </span>
          </li>
        </ul>
      </div>
    </SchemeShowcase>

    <!-- Triadisch: Lernplattform -->
    <SchemeShowcase
      scheme-key="triadic"
      base-color="#e63946"
      title="Kategorien auf einen Blick unterscheiden"
      text="Drei gleich weit entfernte Farben wirken fröhlich und ausgewogen. Die Stärke: Jede Farbe bekommt eine eigene Bedeutung, hier ein Schulfach. So findet man sich zurecht, ohne zu lesen."
      :points="[
        'Jede Kategorie hat genau eine Farbe und behält sie überall.',
        'Flächen nur als helle Tönung, die volle Farbe nur für Icon und Fortschritt.',
        'Ein neutraler Hintergrund hält die bunte Mischung zusammen.'
      ]"
      examples="Lern- und Kinderangebote, Spiele, Kategorien und Filter"
      :usage="[
        { label: 'Neutral', color: 'n-bg', share: 55 },
        { label: 'Farbe 1', color: 'h0', share: 15 },
        { label: 'Farbe 2', color: 'h1', share: 15 },
        { label: 'Farbe 3', color: 'h2', share: 15 }
      ]">
      <div class="bg-(--n-bg) text-(--n-text) p-6 md:p-8 space-y-6">
        <div class="flex items-center gap-3">
          <span class="size-11 rounded-full flex items-center justify-center font-semibold bg-(--h0) text-(--on0)">
            M
          </span>
          <div>
            <p class="text-sm text-(--n-muted)">Hallo Mia!</p>
            <h3 class="text-xl font-semibold">Was lernst du heute?</h3>
          </div>
        </div>
        <ul class="grid sm:grid-cols-3 gap-4">
          <li
            v-for="(course, index) in courses"
            :key="course.title"
            class="rounded-main p-5 space-y-4"
            :style="{ background: `var(--t${index})`, color: `var(--d${index})` }">
            <span
              class="size-12 rounded-xl flex items-center justify-center"
              :style="{ background: `var(--h${index})`, color: `var(--on${index})` }">
              <Icon
                :name="course.icon"
                :size="24"/>
            </span>
            <div>
              <p class="text-lg font-semibold">{{ course.title }}</p>
              <p class="text-sm opacity-80">{{ course.lessons }} Lektionen</p>
            </div>
            <div class="h-2 rounded-full bg-(--n-surface) overflow-hidden">
              <div
                class="h-full rounded-full"
                :style="{ width: course.progress + '%', background: `var(--h${index})` }"/>
            </div>
            <p class="text-sm font-semibold flex items-center gap-1">
              Weiterlernen
              <Icon
                name="ArrowRight"
                :size="16"/>
            </p>
          </li>
        </ul>
      </div>
    </SchemeShowcase>

    <!-- Tetradisch: Festivalprogramm -->
    <SchemeShowcase
      scheme-key="tetradic"
      base-color="#db2777"
      title="Viele Kategorien, eine klare Ordnung"
      text="Tetradisch liefert vier gut unterscheidbare Farben, mehr als die meisten Seiten brauchen. Wo aber vier Dinge klar getrennt werden müssen, etwa Bühnen, Linien oder Datenreihen, ist dieses Schema genau richtig."
      :points="[
        'Ein dunkler, neutraler Hintergrund lässt alle vier Farben gleich stark leuchten.',
        'Farbe dient nur als Kennzeichnung: Streifen, Punkte, Labels.',
        'Eine Legende erklärt die Bedeutung. Farbe allein reicht nie.'
      ]"
      examples="Veranstaltungsprogramme, Liniennetzpläne, Diagramme"
      :neutrals="['n-dark', 'n-dark-2']"
      :usage="[
        { label: 'Dunkel', color: 'n-dark', share: 76 },
        { label: 'Farbe 1', color: 'h0', share: 6 },
        { label: 'Farbe 2', color: 'h1', share: 6 },
        { label: 'Farbe 3', color: 'h2', share: 6 },
        { label: 'Farbe 4', color: 'h3', share: 6 }
      ]">
      <div class="bg-(--n-dark) text-white p-6 md:p-8 space-y-6">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="text-sm opacity-60">Samstag, 14. Juni</p>
            <h3 class="text-2xl font-semibold">Sommerklang Festival</h3>
          </div>
          <ul class="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <li
              v-for="(stage, index) in stages"
              :key="stage"
              class="flex items-center gap-1.5">
              <span
                class="size-2.5 rounded-full"
                :style="{ background: `var(--h${index})` }"/>
              {{ stage }}
            </li>
          </ul>
        </div>
        <ul class="space-y-2">
          <li
            v-for="act in acts"
            :key="act.name"
            class="grid grid-cols-[3rem_1fr_auto] items-center gap-3 rounded-lg bg-(--n-dark-2) py-3 pr-3 pl-4 border-l-4"
            :style="{ borderColor: `var(--h${act.stage})` }">
            <span class="font-mono text-sm opacity-60">{{ act.time }}</span>
            <span class="font-semibold">{{ act.name }}</span>
            <span
              class="rounded-full px-2.5 py-0.5 text-xs font-semibold"
              :style="{ background: `var(--h${act.stage})`, color: `var(--on${act.stage})` }">
              {{ stages[act.stage] }}
            </span>
          </li>
        </ul>
      </div>
    </SchemeShowcase>

    <Banner :data="banner"/>
  </div>
</template>

<script setup>
  const plans = [
    {
      name: 'Basis',
      price: '9 €',
      features: ['1 Projekt', '5 GB Speicher', 'E-Mail-Support']
    },
    {
      name: 'Pro',
      price: '19 €',
      featured: true,
      features: ['10 Projekte', '50 GB Speicher', 'Priorisierter Support', 'Team-Funktionen']
    },
    {
      name: 'Business',
      price: '49 €',
      features: ['Unbegrenzte Projekte', '1 TB Speicher', 'Persönlicher Ansprechpartner']
    }
  ]

  const courses = [
    { title: 'Mathe', icon: 'Calculator', lessons: 24, progress: 70 },
    { title: 'Lesen', icon: 'BookOpen', lessons: 18, progress: 45 },
    { title: 'Kunst', icon: 'Palette', lessons: 12, progress: 20 }
  ]

  const stages = ['Hauptbühne', 'Zelt', 'Waldbühne', 'Strand']

  const acts = [
    { time: '16:00', name: 'Die Pelikane', stage: 2 },
    { time: '17:30', name: 'Lina Sommer', stage: 1 },
    { time: '18:00', name: 'Kaltfront', stage: 3 },
    { time: '19:15', name: 'Neonwald', stage: 0 },
    { time: '20:30', name: 'The Paper Kites', stage: 1 },
    { time: '22:00', name: 'Sternschnuppe', stage: 0 }
  ]

  const banner = {
    title: 'Selbst ausprobieren',
    text: 'Im Farbtheorie-Themer kannst du jede Harmonie auf die komplette Seite anwenden und direkt vergleichen.',
    button: {
      label: 'Zum Themer',
      link: '/farbtheorie'
    }
  }
</script>
