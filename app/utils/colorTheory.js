// Farbkreis-Umrechnung zwischen RGB (Lichtfarben, HSL-Farbton) und RYB (klassischer Malerfarbkreis).
// Stützpunkte [RYB-Winkel, RGB-Winkel], dazwischen wird linear interpoliert.
// Beispiel: Gelb liegt im RYB-Kreis bei 120°, im RGB-Kreis aber bei 60°.
const RYB_RGB = [
  [0, 0],     // Rot
  [60, 35],   // Orange
  [120, 60],  // Gelb
  [180, 122], // Grün
  [240, 222], // Blau
  [300, 281], // Violett
  [360, 360]
]

export const originalColors = {
  primary: '#82563a',
  secondary: '#30272a',
  background: '#eeebe7',
  white: '#fffbfb'
}

export const colorSchemes = [
  {
    key: 'original',
    label: 'Original',
    offsets: [0],
    text: 'Die Farben der Startseite zum Vergleich: ein warmes Braun als Akzent, fast neutrales Dunkel und Beige.'
  },
  {
    key: 'complementary',
    label: 'Komplementär',
    offsets: [0, 180],
    roles: { secondary: 1, background: 0, white: 0 },
    text: 'Zwei Farben, die sich im Farbkreis gegenüberliegen (180°). Maximaler Kontrast, wirkt lebendig. Eine Farbe sollte dominieren, die andere setzt Akzente. Im RYB-Kreis sind die Paare Rot–Grün, Blau–Orange und Gelb–Violett. Im RGB-Kreis sind es Rot–Cyan, Grün–Magenta und Blau–Gelb.'
  },
  {
    key: 'split',
    label: 'Split-Komplementär',
    offsets: [0, 150, 210],
    roles: { secondary: 1, background: 2, white: 0 },
    text: 'Statt der Komplementärfarbe nimmt man ihre beiden Nachbarn (±30° neben 180°). Immer noch kontrastreich, aber weniger spannungsgeladen und leichter zu kombinieren.'
  },
  {
    key: 'analogous',
    label: 'Analog',
    offsets: [0, -30, 30],
    roles: { secondary: 1, background: 2, white: 0 },
    text: 'Drei Farben, die im Farbkreis nebeneinander liegen. Wirkt ruhig, harmonisch und natürlich. Kontrast entsteht hier vor allem über Helligkeit.'
  },
  {
    key: 'monochromatic',
    label: 'Monochrom',
    offsets: [0],
    roles: { secondary: 0, background: 0, white: 0 },
    text: 'Nur ein Farbton, variiert über Helligkeit und Sättigung. Elegant und sehr stimmig, kann aber schnell eintönig wirken.'
  },
  {
    key: 'triadic',
    label: 'Triadisch',
    offsets: [0, 120, 240],
    roles: { secondary: 1, background: 2, white: 0 },
    text: 'Drei Farben im gleichen Abstand (120°), also ein gleichseitiges Dreieck im Farbkreis. Bunt und ausgewogen. Am besten dominiert eine Farbe, die anderen zwei sind Akzente.'
  },
  {
    key: 'tetradic',
    label: 'Tetradisch',
    offsets: [0, 60, 180, 240],
    roles: { secondary: 2, background: 1, white: 3 },
    text: 'Zwei Komplementärpaare, die ein Rechteck im Farbkreis bilden. Die reichste Palette, aber am schwersten auszubalancieren. Eine Farbe sollte klar führen.'
  }
]

function normalize(angle) {
  return ((angle % 360) + 360) % 360;
}

function interpolate(angle, from, to) {
  const a = normalize(angle);
  for (let i = 0; i < RYB_RGB.length - 1; i++) {
    const a0 = RYB_RGB[i][from];
    const a1 = RYB_RGB[i + 1][from];
    if (a >= a0 && a <= a1) {
      const t = (a - a0) / (a1 - a0);
      return RYB_RGB[i][to] + t * (RYB_RGB[i + 1][to] - RYB_RGB[i][to]);
    }
  }
  return a;
}

export function rybToRgbHue(angle) {
  return interpolate(angle, 0, 1);
}

export function rgbToRybHue(angle) {
  return interpolate(angle, 1, 0);
}

export function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }

  return { h, s: s * 100, l: l * 100 };
}

export function hslToHex({ h, s, l }) {
  h = normalize(h);
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
  return '#' + toHex(f(0)) + toHex(f(8)) + toHex(f(4));
}

// relative Leuchtdichte nach WCAG
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map(i => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

// Winkel im gewählten Farbkreis -> tatsächlicher Farbton (HSL)
export function wheelToHue(angle, wheel) {
  return wheel === 'ryb' ? rybToRgbHue(angle) : normalize(angle);
}

/**
 * Erzeugt aus einer Primärfarbe die Harmoniefarben und die vier Rollen der Seite.
 * - harmony: die "reinen" Harmoniefarben (gleiche Sättigung/Helligkeit wie die Primärfarbe)
 * - colors: daraus abgeleitete Seitenfarben (dunkles Secondary, helles Background, fast weißes White)
 */
export function buildPalette(hex, scheme, wheel) {
  const base = hexToHsl(hex);
  const baseAngle = wheel === 'ryb' ? rgbToRybHue(base.h) : base.h;

  const harmony = scheme.offsets.map(offset => {
    const angle = normalize(baseAngle + offset);
    const hue = wheelToHue(angle, wheel);
    return {
      angle,
      hue,
      hex: offset === 0 ? hex : hslToHex({ h: hue, s: base.s, l: base.l })
    };
  });

  if (!scheme.roles) {
    return { harmony, colors: originalColors };
  }

  // gedämpfte Sättigung, damit Flächen nicht grell wirken
  const saturation = Math.min(Math.max(base.s * 0.6, 15), 45);
  const tone = (index, l) => hslToHex({ h: harmony[index].hue, s: saturation, l });

  return {
    harmony,
    colors: {
      primary: hex,
      secondary: tone(scheme.roles.secondary, 16),
      background: tone(scheme.roles.background, 91),
      white: tone(scheme.roles.white, 98.5)
    }
  };
}
