<template>
  <div>
    <Hero :data="hero"/>
    <Text :data="textModule"/>
    <JobsCards :jobs="jobs"/>
    <TeamCards :team="team"/>
    <Accordion :items="accordion"/>
    <Banner :data="banner"/>
    <ColorThemer/>
  </div>
</template>

<script setup>
  const hero = {
    image: 'https://picsum.photos/id/1067/1920/1080',
    title: 'Gemeinsam bauen wir die Zukunft',
    text: 'Wir sind ein Team aus Entwicklern, Designern und Kreativen, das digitale Produkte mit Leidenschaft und Präzision umsetzt.'
  }

  const textModule = {
    title: 'Über uns',
    text: 'Seit über zehn Jahren entwickeln wir digitale Lösungen für Unternehmen aller Größen. Dabei stehen für uns Qualität, Transparenz und eine partnerschaftliche Zusammenarbeit an erster Stelle. Unser Team vereint technisches Know-how mit einem Gespür für gutes Design – so entstehen Produkte, die nicht nur funktionieren, sondern auch Freude machen.'
  }

  const accordion = [
    {
      id: 1,
      title: 'Wie läuft der Bewerbungsprozess ab?',
      text: 'Nach deiner Bewerbung melden wir uns innerhalb einer Woche bei dir. Es folgt ein kurzes Kennenlerngespräch per Video und anschließend ein persönliches Gespräch mit dem Team.'
    },
    {
      id: 2,
      title: 'Kann ich remote arbeiten?',
      text: 'Bei vielen Stellen ist remote oder hybrides Arbeiten möglich. Ob das für eine Stelle gilt, steht direkt in der jeweiligen Stellenanzeige.'
    },
    {
      id: 3,
      title: 'Welche Unterlagen brauche ich für die Bewerbung?',
      text: 'Ein Lebenslauf reicht uns für den Anfang völlig aus. Ein Anschreiben ist optional – erzähl uns lieber im Gespräch, warum du zu uns passt.'
    },
    {
      id: 4,
      title: 'Gibt es Weiterbildungsmöglichkeiten?',
      text: 'Ja, jede Mitarbeiterin und jeder Mitarbeiter hat ein jährliches Weiterbildungsbudget für Kurse, Konferenzen oder Bücher.'
    },
    {
      id: 5,
      title: 'Wie sind die Arbeitszeiten?',
      text: 'Wir arbeiten mit flexiblen Arbeitszeiten und einer Kernzeit von 10 bis 15 Uhr. Wann du anfängst und aufhörst, kannst du weitgehend selbst entscheiden.'
    }
  ]

  const banner = {
    title: 'Nichts Passendes dabei?',
    text: 'Dann bewirb dich einfach initiativ. Wir freuen uns immer über neue Talente, die Lust haben, mit uns etwas zu bewegen.',
    button: {
      label: 'Initiativ bewerben',
      link: 'mailto:jobs@example.com'
    }
  }

  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      gender: 'm/w/d',
      department: 'Entwicklung',
      location: 'Berlin',
      type: 'Vollzeit',
      remote: true,
      postedAt: '2026-09-15',
      description: 'Du entwickelst moderne Web-Oberflächen mit Vue und Nuxt.'
    },
    {
      id: 2,
      title: 'Backend Developer',
      gender: 'm/w/d',
      department: 'Entwicklung',
      location: 'München',
      type: 'Vollzeit',
      remote: false,
      postedAt: '2026-09-10',
      description: 'Du baust skalierbare APIs und betreust unsere Datenbanken.'
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      gender: 'm/w/d',
      department: 'Design',
      location: 'Hamburg',
      type: 'Teilzeit',
      remote: true,
      postedAt: '2026-09-05',
      description: 'Du gestaltest intuitive Nutzererlebnisse vom Wireframe bis zum Prototyp.'
    },
    {
      id: 4,
      title: 'Werkstudent Marketing',
      gender: 'm/w/d',
      department: 'Marketing',
      location: 'Köln',
      type: 'Werkstudent',
      remote: true,
      postedAt: '2026-08-28',
      description: 'Du unterstützt unser Team bei Social Media und Content-Erstellung.'
    },
    {
      id: 5,
      title: 'Ausbildung Fachinformatiker',
      gender: 'm/w/d',
      department: 'IT',
      location: 'Berlin',
      type: 'Ausbildung',
      remote: false,
      postedAt: '2026-08-20',
      description: 'Starte deine Karriere in der IT mit einer fundierten Ausbildung.'
    }
  ]

  const team = [
    {
      id: 1,
      name: 'Anna Müller',
      role: 'Geschäftsführung',
      image: 'https://i.pravatar.cc/300?img=47',
      email: 'anna.mueller@example.com'
    },
    {
      id: 2,
      name: 'Lukas Schneider',
      role: 'Head of Development',
      image: 'https://i.pravatar.cc/300?img=12',
      email: 'lukas.schneider@example.com'
    },
    {
      id: 3,
      name: 'Sophie Weber',
      role: 'Lead Designerin',
      image: 'https://i.pravatar.cc/300?img=45',
      email: 'sophie.weber@example.com'
    },
    {
      id: 4,
      name: 'Jonas Fischer',
      role: 'Marketing Manager',
      image: 'https://i.pravatar.cc/300?img=33',
      email: 'jonas.fischer@example.com'
    },
    {
      id: 5,
      name: 'Laura Becker',
      role: 'HR & Recruiting',
      image: 'https://i.pravatar.cc/300?img=44',
      email: 'laura.becker@example.com'
    },
    {
      id: 6,
      name: 'Max Hoffmann',
      role: 'IT-Administrator',
      image: 'https://i.pravatar.cc/300?img=15',
      email: 'max.hoffmann@example.com'
    }
  ]
</script>
