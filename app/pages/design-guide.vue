<template>
  <div>
    <!-- Intro -->
    <div class="bg-secondary text-background py-f-24">
      <div class="max-w-6xl mx-auto px-4 space-y-4">
        <p class="text-lg font-medium opacity-75">
          Nachschlagewerk
        </p>
        <h1 class="font-serif text-f-6xl font-medium leading-tight">
          Design-Guide
        </h1>
        <p class="text-xl max-w-3xl">
          Was bei diesem Projekt wichtig war – Prinzipien, Fehler und Lösungen, die sich auf jedes andere Projekt übertragen lassen.
        </p>
      </div>
    </div>

    <div class="bg-background py-f-24">
      <div class="max-w-6xl mx-auto px-4 space-y-f-24">
        <!-- Inhaltsverzeichnis -->
        <nav aria-label="Inhalt">
          <ul class="flex flex-wrap gap-3">
            <li
              v-for="section in sections"
              :key="section.id">
              <NuxtLink
                :to="'#' + section.id"
                class="block rounded-main border-2 border-secondary px-4 py-2 font-medium hover:bg-secondary hover:text-background duration-300 ease-in-out">
                {{ section.title }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="#checkliste"
                class="block rounded-main border-2 border-secondary px-4 py-2 font-medium hover:bg-secondary hover:text-background duration-300 ease-in-out">
                Checkliste
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Abschnitte -->
        <section
          v-for="(section, index) in sections"
          :id="section.id"
          :key="section.id"
          class="space-y-8">
          <div class="space-y-4 max-w-3xl">
            <p class="font-medium text-primary">
              {{ String(index + 1).padStart(2, '0') }}
            </p>
            <h2 class="font-serif font-medium text-f-4xl leading-tight">
              {{ section.title }}
            </h2>
            <p
              v-if="section.intro"
              class="text-xl">
              {{ section.intro }}
            </p>
          </div>

          <div class="grid lg:grid-cols-2 gap-6">
            <!-- Regeln -->
            <div
              v-if="section.rules?.length"
              class="rounded-main border-2 border-secondary p-6 space-y-4">
              <h3 class="text-lg font-medium">
                Regeln
              </h3>
              <ul class="space-y-3">
                <li
                  v-for="(rule, ruleIndex) in section.rules"
                  :key="ruleIndex"
                  class="flex gap-3">
                  <span
                    class="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"/>
                  <div class="space-y-1">
                    <p>
                      {{ rule.text }}
                    </p>
                    <code
                      v-if="rule.code"
                      class="inline-block font-mono text-sm px-1.5 py-0.5 rounded bg-secondary/10">
                      {{ rule.code }}
                    </code>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Beispiele aus dem Projekt -->
            <div
              v-if="section.examples?.length"
              class="rounded-main bg-white p-6 space-y-4">
              <h3 class="text-lg font-medium text-primary">
                {{ section.examplesTitle || 'Aus dem Projekt' }}
              </h3>
              <ul class="space-y-3">
                <li
                  v-for="(example, exampleIndex) in section.examples"
                  :key="exampleIndex"
                  class="flex gap-3">
                  <span
                    class="mt-2.5 size-1.5 shrink-0 rounded-full bg-secondary/40"
                    aria-hidden="true"/>
                  <div class="space-y-1">
                    <p>
                      {{ example.text }}
                    </p>
                    <code
                      v-if="example.code"
                      class="inline-block font-mono text-sm px-1.5 py-0.5 rounded bg-secondary/10">
                      {{ example.code }}
                    </code>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Checkliste -->
        <section
          id="checkliste"
          class="space-y-8">
          <div class="space-y-4 max-w-3xl">
            <p class="font-medium text-primary">
              Zum Schluss
            </p>
            <h2 class="font-serif font-medium text-f-4xl leading-tight">
              Kurz-Checkliste
            </h2>
            <p class="text-xl">
              Vor dem Abschluss eines Designs einmal durchgehen.
            </p>
          </div>
          <ul class="rounded-main border-2 border-secondary p-6 grid md:grid-cols-2 gap-x-8 gap-y-3">
            <li
              v-for="(item, itemIndex) in checklist"
              :key="itemIndex"
              class="flex gap-3">
              <Icon
                name="Check"
                :size="20"
                class="mt-0.5 shrink-0 text-primary"/>
              <span>
                {{ item }}
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
  useSeoMeta({
    title: 'Design-Guide'
  })

  const sections = [
    {
      id: 'weniger-ist-mehr',
      title: 'Weniger ist mehr',
      intro: 'Gutes Design entsteht selten durch mehr Elemente, sondern durch wenige, bewusste Entscheidungen. Die Wirkung kommt aus Abständen, Schriftgrößen und gezielten Akzenten.',
      rules: [
        { text: 'Bevor du etwas hinzufügst, frag dich: Löst es ein Problem? Wenn nicht, lass es weg.' },
        { text: 'Wenn etwas nicht stimmt, versuch es zuerst mit Weglassen statt mit Hinzufügen.' },
        { text: 'Erst übertreiben und dann reduzieren ist ein legitimer Weg. Mit der Zeit startest du automatisch reduzierter.' },
        { text: 'Konsistenz schlägt Kreativität: lieber ein Effekt, der überall gleich ist, als fünf verschiedene.' }
      ],
      examples: [
        { text: 'Der Pfeil, der beim Hover nach rechts rutscht, zeigt „klickbar“ – er löst ein Problem und darf bleiben.', code: 'group-hover:translate-x-1' },
        { text: 'Ein zusätzlicher Schatten auf einer farbigen Kachel trennt nichts, was nicht schon getrennt ist – er darf weg.' },
        { text: 'Im FAQ reichen Linien statt Boxen. So wird es der ruhige Abschnitt der Seite, statt eine weitere Wand aus Flächen.' }
      ]
    },
    {
      id: 'hierarchie',
      title: 'Hierarchie',
      intro: 'Frag dich bei jedem Element: Wie wichtig ist das? Wichtiges wird groß, kräftig und kontrastreich – Unwichtiges kleiner, heller oder transparenter.',
      rules: [
        { text: 'Die Überschrift ist immer die größte Schrift in ihrem Block.' },
        { text: 'Nebeninfos über Transparenz zurücknehmen statt über neue Farben.', code: 'opacity-75' },
        { text: 'Der Blick braucht einen klaren Weg: Überschrift → Text → Aktion.' },
        { text: 'Die Aktion (Button) bekommt den einzigen Farbakzent im Block.' }
      ],
      examples: [
        { text: '(m/w/d) war genauso groß wie der Jobtitel und wirkte dadurch fast gleich wichtig. Kleiner und leicht transparent tritt es zurück.', code: 'text-xl opacity-75' },
        { text: 'Im Banner stand die Überschrift außerhalb der Box, der Fließtext darin war groß – die Hierarchie war verdreht. Lösung: Überschrift in die Box, Text kleiner.' },
        { text: 'Bei den Team-Karten ist der Name die Hauptsache, die Rolle tritt zurück.', code: 'opacity-75' }
      ]
    },
    {
      id: 'typografie',
      title: 'Schriftgrößen & Typografie',
      intro: 'Wenige Größen mit klaren Sprüngen wirken ruhiger und professioneller als viele ähnliche Größen.',
      rules: [
        { text: '3–4 Schriftgrößen pro Seite reichen. Große Sprünge zwischen den Stufen wirken klarer als viele kleine.' },
        { text: 'Große Überschriften eng setzen, sonst fällt der Block auseinander.', code: 'leading-tight' },
        { text: 'Neben einer sehr großen Überschrift wirkt zu kleiner Fließtext verloren – der Sprung darf nicht zu groß sein.' },
        { text: 'Gleiche Elemente bekommen gleiche Klassen: Alle Abschnitts-Überschriften sind identisch.', code: 'font-medium text-f-4xl' },
        { text: 'Fluid Font Sizes wachsen mit der Bildschirmbreite mit.', code: 'text-f-*' },
        { text: 'Eine eigene Schrift statt Systemschrift – die Systemschrift sieht auf jedem Gerät anders aus.' },
        { text: 'Zwei Schriftstärken reichen meistens: normal und medium.' }
      ],
      examples: [
        { text: 'Im Hero war zwischen den Zeilen der Überschrift viel Luft, zwischen Überschrift und Text kaum. Mit engem Zeilenabstand und etwas Abstand zum Text wurde ein kompakter Block daraus.', code: 'leading-tight + space-y-4' },
        { text: 'Der Hero-Text war mit text-lg zu klein neben der großen Überschrift – eine Stufe größer war ausgewogener.', code: 'text-xl' },
        { text: 'Fraunces als Serif für Überschriften wurde ausprobiert und wieder verworfen. Ausprobieren gehört dazu – mit einer Variable ist der Wechsel eine Zeile.', code: '--font-serif' }
      ]
    },
    {
      id: 'abstaende',
      title: 'Abstände',
      intro: 'Abstände zeigen, was zusammengehört. Sie sind das wichtigste Werkzeug, um Ordnung zu schaffen – ganz ohne Linien oder Boxen.',
      rules: [
        { text: 'Was zusammengehört, steht eng beieinander. Zwischen Gruppen kommt mehr Luft.' },
        { text: 'Eine Aktion bekommt mehr Abstand als die Texte untereinander – so wirkt sie wie ein eigener Schritt.' },
        { text: 'Abstände nie doppelt vergeben: gap und space-y gleichzeitig addieren sich.', code: 'gap-6 statt gap-6 space-y-6' },
        { text: 'Steht ein Element zwischen zwei Linien, oben und unten gleich viel Abstand geben.' },
        { text: 'Bei Animationen mit overflow-hidden das Padding ans innere Element hängen, nicht an den animierten Container.' },
        { text: 'Boxen nicht größer machen, als ihr Inhalt es braucht.' }
      ],
      examples: [
        { text: 'Im Accordion addierten sich space-y-3 an der Liste und py-3 am Button: oben 12px, unten 24px. Nur py-3 am Button plus pb-3 am Text ist symmetrisch.' },
        { text: 'Die Team-Liste hatte gap-6 und space-y-6 – die Reihenabstände wurden ungleichmäßig.' },
        { text: 'Im Banner war p-20 zu viel Innenabstand, die Box wirkte schwer und leer.', code: 'p-20 → p-16' },
        { text: 'Hero: Überschrift → Text 16px, Text → Button 48px.', code: 'space-y-4 + mt-12' }
      ]
    },
    {
      id: 'ausrichtung',
      title: 'Ausrichtung & Layout',
      intro: 'Elemente, die aufeinander folgen oder sich wiederholen, liegen auf einer gemeinsamen Linie. Das Auge merkt jede Abweichung.',
      rules: [
        { text: 'Eine gemeinsame Content-Linie für alle Abschnitte.', code: 'max-w-6xl mx-auto px-4' },
        { text: 'Auch Sonderlayouts – etwa ein Bild bis zum Bildschirmrand – richten den Text an der Content-Linie aus.' },
        { text: 'In Kachel-Reihen gleiche Elemente auf gleiche Höhe bringen.', code: 'h-full flex flex-col + mt-auto' },
        { text: 'Eine linksbündige Seite bleibt linksbündig – ein zentrierter Ausreißer wirkt zufällig.' },
        { text: 'Leere Fläche ist in Ordnung, wenn sie gewollt aussieht.' }
      ],
      examples: [
        { text: 'Hero mit 4-Spalten-Grid: Der Text startet auf der Content-Linie, das Bild läuft bis zum Rand.', code: 'grid-cols-[1fr_minmax(0,36rem)_minmax(0,36rem)_1fr]' },
        { text: '„mehr erfahren“ sitzt in jeder Job-Kachel unten, egal wie lang der Titel ist.' },
        { text: 'Der Banner bleibt linksbündig wie der Rest der Seite, obwohl rechts Platz frei ist.' }
      ]
    },
    {
      id: 'farbe',
      title: 'Farbe',
      intro: 'Wenige Farben, als Variablen angelegt und konsequent eingesetzt. Farbe lenkt Aufmerksamkeit – sie ist Werkzeug, nicht Dekoration.',
      rules: [
        { text: 'Farben als Variablen anlegen – dann änderst du das ganze Design an einer Stelle.', code: '--color-primary' },
        { text: 'Eine Akzentfarbe, sparsam eingesetzt, vor allem für Aktionen wie Buttons und Links.' },
        { text: 'Hell und dunkel im Wechsel gibt der Seite Rhythmus und trennt Abschnitte ganz ohne Linien.' },
        { text: 'Kein reines Weiß und kein reines Schwarz – leicht getönt wirkt hochwertiger.' },
        { text: 'Alle Farben einer Palette haben dieselbe Temperatur: warm zu warm, kühl zu kühl.' },
        { text: 'Kontrast prüfen: Text muss auf jedem Hintergrund gut lesbar bleiben – auch im Hover.' },
        { text: 'Nicht zwei gleiche Akzentflächen direkt untereinander.' }
      ],
      examples: [
        { text: 'Rhythmus der Seite: Hero dunkel → Jobs hell → Team dunkel → FAQ hell → Footer dunkel.' },
        { text: 'Nach dem Wechsel auf die warme Braun-Palette wirkte das neutrale Grau zu kühl – es wurde leicht wärmer.', code: '#ebebea → #eeebe7' },
        { text: 'Braun auf fast schwarzem Grund hat nur etwa 2:1 Kontrast – als Hover-Farbe in der Navigation kaum lesbar.' },
        { text: 'Kein farbiger Button in der Navigation, weil direkt darunter schon der Hero-Button sitzt.' }
      ]
    },
    {
      id: 'konsistenz',
      title: 'Konsistenz',
      intro: 'Ein Design wirkt professionell, wenn es wenigen Regeln folgt und diese überall durchzieht. Gleiche Aktion, gleiches Aussehen.',
      rules: [
        { text: 'Gleiche Aktionen sehen gleich aus: gleiche Schriftstärke, gleicher Hover.' },
        { text: 'Ein Radius für alles, als Variable.', code: 'rounded-main' },
        { text: 'Bewusste Stil-Entscheidungen konsequent durchziehen – dann werden sie zum Merkmal statt zum Zufall.' },
        { text: 'Rechtschreibung gehört dazu: Buttons am Satzanfang großschreiben, Verben klein.' },
        { text: 'Bei Unsicherheit fragen: Warum habe ich das ursprünglich so gemacht? Gab es einen guten Grund, dabei bleiben.' }
      ],
      examples: [
        { text: '2px-Linien statt 1px – bewusst gewählt, weil es mehr Charakter hat. Dann aber überall 2px.', code: 'border-2' },
        { text: 'font-medium am Hero-Button wurde entfernt und wieder hinzugefügt – weil „mehr erfahren“ dieselbe Aktion ist und auch medium hat.' },
        { text: 'Überschriften mit text-4xl statt text-f-4xl wurden angeglichen.' }
      ]
    },
    {
      id: 'arbeiten-auf-weiss',
      title: 'Arbeiten auf Weiß',
      intro: 'Ohne Farbe muss alles über Schrift, Abstände und Ausrichtung funktionieren – deshalb sieht man dort jeden Fehler sofort. Typisch bei seriösen Kunden wie einer Arztpraxis.',
      rules: [
        { text: 'Hierarchie über 3–4 feste Grautöne: Überschrift, Fließtext, Nebeninfo, Linien und Flächen.' },
        { text: 'Leicht getöntes Weiß statt reinem Weiß.' },
        { text: 'Bereiche über Abstand, sehr hellgraue Flächen oder feine Linien trennen statt über farbige Boxen.' },
        { text: 'Eine Akzentfarbe nur für Buttons und Links – dann zieht sie den Blick genau dorthin.' },
        { text: 'Die Schrift trägt das Design, echte Fotos bringen die Wärme.' },
        { text: 'Bei Arzt & Co.: Vertrauen vor Kreativität. Größere Schrift, guter Kontrast, das Wichtigste sofort sichtbar – Telefon, Öffnungszeiten, Termin, Anfahrt.' }
      ],
      examplesTitle: 'Übung',
      examples: [
        { text: 'Gestalte eine Seite zuerst komplett in Schwarz, Weiß und Grau.' },
        { text: 'Wenn sie so schon klar gegliedert ist und funktioniert, kommt die Akzentfarbe ganz zum Schluss dazu.' },
        { text: 'Dabei merkst du, wie wenig Farbe du eigentlich brauchst.' }
      ]
    },
    {
      id: 'technik',
      title: 'Technik',
      intro: 'Kleine Dinge im Code, die leicht übersehen werden.',
      rules: [
        { text: ':key gehört auf das Element mit dem v-for.', code: '<li v-for="…" :key="item.id">' },
        { text: 'Listen als Array-Prop, einzelne Datensätze als Object.', code: 'items: Array / data: Object' },
        { text: 'Eine ID darf pro Seite nur einmal vorkommen – beim Kopieren von Komponenten prüfen.' },
        { text: 'Sprünge zu Abschnitten sind Links, keine Buttons – aussehen dürfen sie wie Buttons.', code: '<NuxtLink to="/#stellenangebote">' },
        { text: 'Bei sticky Navigation einen Scroll-Abstand setzen, sonst verdeckt sie die Überschriften.', code: 'scroll-pt-20' },
        { text: 'Telefon und E-Mail klickbar machen.', code: 'tel: / mailto:' }
      ],
      examplesTitle: 'Gut zu wissen',
      examples: [
        { text: 'Accordion: echter <button> mit aria-expanded und aria-controls, geschlossene Inhalte per inert sperren.' },
        { text: 'Auf- und Zuklappen ohne bekannte Höhe animieren.', code: 'grid-rows-[0fr] → grid-rows-[1fr]' },
        { text: 'Schriften mit @nuxt/fonts lokal ausliefern – Google Fonts direkt von Google zu laden ist in Deutschland datenschutzrechtlich problematisch.' },
        { text: 'Nicht alle Icons auf einmal importieren – nuxt-lucide-icons lädt nur die genutzten.', code: '<LucideArrowRight />' }
      ]
    },
    {
      id: 'figma',
      title: 'Figma',
      intro: 'Figma folgt denselben Prinzipien wie der Code. Wer Tailwind kann, kann Auto Layout.',
      rules: [
        { text: 'Zuerst das Fundament: Variables für Farben und Radius, Text Styles für Schriften.' },
        { text: 'Variables statt Color Styles – sie können auch Zahlen speichern, etwa Radius und Abstände.' },
        { text: 'Kostenloser Plan: beliebig viele Variablen, aber nur ein Mode und drei Dateien.' },
        { text: 'Von innen nach außen bauen: Elemente markieren, Shift + A packt sie in ein Auto Layout.' },
        { text: '„Fill container“ gibt es nur innerhalb eines Auto Layouts.' },
        { text: 'Container wie im Code: Fill container, Max width 1152, Padding 16 – außen mittig ausrichten.' },
        { text: 'Texte auf Auto height und Rahmen auf Hug, sonst überlappen längere Inhalte.' },
        { text: 'Varianten über Ebenennamen anlegen.', code: 'Color=primary, State=hover' },
        { text: 'Der Layout Guide zeigt die Content-Linie nur an – er schiebt nichts dorthin.' },
        { text: 'Icons über das offizielle Plugin „Lucide Icons“. Einfärben über Stroke, nicht Fill.' }
      ],
      examplesTitle: 'Tailwind → Figma',
      examples: [
        { text: 'Auto Layout mit Gap', code: 'flex, gap-*' },
        { text: 'Auto Layout vertikal', code: 'space-y-*' },
        { text: 'Padding im Auto Layout', code: 'p-*, px-*, py-*' },
        { text: 'Grid-Flow oder horizontal mit Wrap', code: 'grid-cols-*' },
        { text: 'Fill container', code: 'w-full' },
        { text: 'Hug contents', code: 'w-fit' },
        { text: 'Gap „Auto“', code: 'justify-between' },
        { text: 'Max width', code: 'max-w-*' },
        { text: 'Variante der Komponente', code: 'hover:' }
      ]
    }
  ]

  const checklist = [
    'Ist sofort klar, was das Wichtigste auf der Seite ist?',
    'Liegen alle Abschnitte auf derselben Content-Linie?',
    'Höchstens 3–4 Schriftgrößen – und alle Überschriften gleich?',
    'Abstände eng innerhalb, weit zwischen Gruppen – nichts doppelt?',
    'Eine Akzentfarbe, vor allem für Aktionen?',
    'Sehen gleiche Aktionen überall gleich aus?',
    'Ist Text auf jedem Hintergrund gut lesbar – auch im Hover?',
    'Gibt es etwas, das ich weglassen könnte?'
  ]
</script>

<style scoped>

</style>
