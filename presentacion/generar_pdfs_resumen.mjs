import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('presentacion');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Limpieza para la codificación WinAnsi de Helvetica en jsPDF
function clean(text) {
  if (!text) return '';
  return String(text)
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/≈/g, '~')
    .replace(/·/g, '*')
    .replace(/θ/g, 'theta')
    .replace(/•/g, '-')
    .replace(/→/g, '->')
    .replace(/[^\x20-\x7E\xA0-\xFF\n\r\t]/g, '');
}

// ============================================================================
// CONTENIDO RESUMIDO - DIEGO
// ============================================================================

const DIEGO = {
  filename: 'Resumen_Oratoria_Diego_Francisconi.pdf',
  name: 'Diego Francisconi',
  role: 'Apertura, física del proceso y cierre',
  date: '10/11/2026',
  color: [15, 23, 42],
  accent: [234, 88, 12],
  blocks: [
    { label: 'D1–D5', time: '00:00 – 09:00', desc: 'Apertura y bloque físico' },
    { label: 'D10', time: '16:30 – 17:30', desc: 'Pilares 01 y 02' },
    { label: 'D11', time: '18:30 – 19:00', desc: 'Cierre conjunto' },
  ],
  mainSlides: [
    {
      tag: 'D1',
      time: '0:00 – 1:30',
      title: 'Portada institucional',
      say: 'Buenos días, somos Diego y Ariel, de Mecatrónica UTN FRP Viale. Presentamos AWJ 4.0: manufactura 100 % en frío.',
      nums: 'ZAC = 0,00 mm  *  6.480 bar  *  Mach 3.06',
      pass: 'Para entenderlo, empecemos por la física.',
    },
    {
      tag: 'D2',
      time: '1:30 – 3:30',
      title: 'Principio físico',
      say: 'El secreto: concentrar 6.480 bar en un orificio de diamante de 0,25 mm. El agua sale a 1.050 m/s. Es erosión, no calor.',
      nums: '94.000 PSI  *  1.800× manguera domiciliaria  *  1,1 M partículas/s  *  50–60 °C',
      pass: 'De ahí nacen dos variantes: PWJ y AWJ.',
    },
    {
      tag: 'D3',
      time: '3:30 – 5:30',
      title: 'Agua pura (PWJ) vs abrasiva (AWJ)',
      say: 'El agua pura corta blandos; el granate multiplica la erosión y permite cortar acero, titanio y hasta 250 mm.',
      nums: 'PWJ: orificio 0,08–0,20 mm  *  10–50 m/min  *  kerf 0,15 mm  *  AWJ: ×1.000',
      pass: 'Veamos qué pasa dentro del cabezal.',
    },
    {
      tag: 'D4',
      time: '5:30 – 7:30',
      title: 'Cabezal y efecto Venturi',
      say: 'Cuatro etapas: tubería autofretada, joya de diamante, Venturi y tubo ROCTEC. El vacío succiona el granate sin piezas móviles.',
      nums: 'Joya 0,25–0,33 mm  *  >1.000 h (25× zafiro)  *  vacío −0,85 a −0,95 bar  *  tubo 0,76 mm  *  standoff 1,5 mm',
      pass: 'Así se encadena la energía.',
    },
    {
      tag: 'D5',
      time: '7:30 – 9:00',
      title: 'Cadena de transformación energética',
      say: 'Cuatro fases: presurizar, acelerar, mezclar y cortar en frío. La potencia hidráulica es P × Q ≈ 13,3 kW.',
      nums: '4.000 bar  *  2 L/min  *  13,3 kW  *  motor 37–45 kW  *  rendimiento 65–72 % / 85–90 %',
      pass: 'Ariel: comparalo con láser y plasma.',
    },
  ],
  extraSlides: [
    {
      tag: 'D10',
      time: '16:30 – 17:30',
      title: 'Industria 4.0: pilares 01 y 02',
      say: 'Pilar 01: telemetría IoT y mantenimiento predictivo. Pilar 02: nesting CAM con piezas a 2 mm y más de 92 % de aprovechamiento.',
      nums: 'IEC 62443  *  2 mm entre piezas  *  >92 % de chapa utilizada',
      pass: 'Ariel completa los pilares 03 y 04.',
    },
    {
      tag: 'D11',
      time: '18:30 – 19:00',
      title: 'Conclusión y cierre conjunto',
      say: 'La manufactura avanzada no necesita calor: combina energía cinética supersónica, control multieje y algoritmos.',
      nums: 'Cinética + control + software = Mecatrónica',
      pass: 'Ariel cierra y abre el simulador.',
    },
  ],
  idea: {
    title: 'La idea que tenés que dejar grabada',
    text: 'La energía se concentra en el agua, nunca en el material: por eso el corte es en frío.',
    metrics: ['6.480 bar', 'Mach 3.06', 'ZAC = 0,00 mm'],
  },
  comparisons: [
    '6.480 bar equivalen a ~1.800 mangueras domiciliarias.',
    '1.050 m/s es Mach 3,06: más rápido que un avión de combate.',
    '1,1 millones de partículas/s son 350–550 g/min de granate.',
  ],
  numbers: [
    ['Zona afectada térmica', 'ZAC = 0,00 mm'],
    ['Presión UHP', '6.480 bar / 94.000 PSI'],
    ['Velocidad del chorro', '1.050 m/s (Mach 3.06)'],
    ['Orificio de diamante', '0,25 – 0,33 mm'],
    ['Tubo focalizador ROCTEC', '0,76 mm'],
    ['Distancia de trabajo (standoff)', '1,5 mm'],
    ['Caudal de granate', '350 – 550 g/min'],
    ['Partículas de abrasivo', '1,1 millones por segundo'],
    ['Potencia hidráulica', '13,3 kW (4.000 bar / 2 L/min)'],
    ['Motor eléctrico', '37 – 45 kW'],
    ['Eficiencia de bomba', '65–72 % intensificadora / 85–90 % directa'],
    ['Espesor máximo AWJ', '> 250 mm'],
  ],
  phrases: [
    ['Apertura', '"Buenos días a los profesores del tribunal y compañeros..."'],
    ['Pase a Ariel', '"Ahora le cedo la palabra a mi compañero Ariel Martinez..."'],
    ['Retoma', '"Retomando la palabra para analizar la Industria 4.0..."'],
    ['Cierre', '"La manufactura avanzada no necesita calor para separar materiales..."'],
  ],
  qa: [
    {
      q: '¿Por qué el agua necesita ósmosis inversa (TDS 50–150 ppm)?',
      a: 'A 6.000 bar cualquier mineral precipita, raya los sellos y astilla el diamante. El agua ultrapura (<5 ppm) también es corrosiva para los cilindros.',
    },
    {
      q: '¿Qué pasa si aumento demasiado el caudal de granate?',
      a: 'Por conservación del momento, arriba de 550–600 g/min la mezcla se satura, cae la velocidad y se obstruye el tubo ROCTEC.',
    },
    {
      q: '¿Intensificadora hidráulica o servobomba directa?',
      a: 'La intensificadora llega a 6.480 bar con 65–72 % de rendimiento. La directa triplex logra 85–90 % y ahorra hasta 25 % de energía.',
    },
  ],
  checklist: [
    'Ensayar en voz alta con cronómetro: bloque de 9 minutos.',
    'Una idea por diapositiva: no leer el texto de pantalla.',
    'Señalar la métrica naranja justo cuando la nombrás.',
    'Practicar el pase a Ariel sin cortar el ritmo.',
    'Probar flechas, F y ESC en la notebook de la defensa.',
  ],
  glossary: [
    ['UHP', 'Ultra-High Pressure: presión de hasta 6.480 bar.'],
    ['AWJ', 'Abrasive Waterjet: chorro de agua con granate.'],
    ['PWJ', 'Pure Waterjet: chorro de agua pura, sin abrasivo.'],
    ['Kerf', 'Ancho de la ranura de corte; varía con el espesor.'],
    ['Standoff', 'Distancia boquilla–pieza; se mantiene en 1,5 mm.'],
    ['ZAC', 'Zona Afectada por el Calor; en AWJ es 0,00 mm.'],
    ['Taper', 'Conicidad en V del corte; se corrige con 5 ejes.'],
    ['Nesting', 'Anidado de piezas en la chapa para ahorrar material.'],
  ],
  plan: [
    ['Hoy', 'Leer esta guía completa una vez, sin memorizar.'],
    ['Mañana', 'Ensayo en voz alta con cronómetro y el deck real.'],
    ['Última pasada', 'Solo la tabla de números y las frases de pase.'],
    ['Día de defensa', 'Probar equipo, 3D y simulador 30 min antes.'],
  ],
};

// ============================================================================
// CONTENIDO RESUMIDO - ARIEL
// ============================================================================

const ARIEL = {
  filename: 'Resumen_Oratoria_Ariel_Martinez.pdf',
  name: 'Ariel Martinez',
  role: 'Comparativa, cinemática, calidad y cierre',
  date: '10/11/2026',
  color: [15, 23, 42],
  accent: [234, 88, 12],
  blocks: [
    { label: 'D6–D9', time: '09:00 – 16:30', desc: 'Comparativa, 5 ejes, materiales y calidad' },
    { label: 'D10', time: '17:30 – 18:30', desc: 'Pilares 03 y 04 + seguridad' },
    { label: 'D11', time: '19:00 – 19:30', desc: 'Cierre y preguntas' },
  ],
  mainSlides: [
    {
      tag: 'D6',
      time: '9:00 – 11:00',
      title: 'AWJ vs plasma y láser',
      say: 'Plasma: ZAC 2–5 mm y borde martensítico. Láser: ZAC 0,3–1,2 mm y límite de 25 mm. AWJ: ZAC cero y ±0,05 mm.',
      nums: 'Plasma >20.000 K  *  láser 25 mm  *  AWJ >250 mm  *  ±0,05 mm',
      pass: 'El problema físico que queda es la conicidad.',
    },
    {
      tag: 'D7',
      time: '11:00 – 13:00',
      title: 'Cinemática de 5 ejes',
      say: 'En 3 ejes el kerf es una V de 1–3°. La muñeca A/C inclina el cabezal y desvía la conicidad al scrap: θ = 0,00°.',
      nums: '1–3°  *  control 1.000 Hz  *  inclinación ±60°  *  θ = 0,00°',
      pass: 'Eso habilita materiales imposibles para el calor.',
    },
    {
      tag: 'D8',
      time: '13:00 – 14:45',
      title: 'Materiales críticos',
      say: 'Titanio sin Alpha-Case, cobre sin perder conductividad, Hardox sin destemplar. Y compuestos sin delaminar.',
      nums: 'Ti-6Al-4V 120 mm  *  <60 °C  *  AS9100  *  C11000 100 % IACS  *  Hardox 500 HB',
      pass: 'Pero la calidad se elige: Q1 a Q5.',
    },
    {
      tag: 'D9',
      time: '14:45 – 16:30',
      title: 'Calidades Q1–Q5 y defectología',
      say: 'Q1 desbaste, Q3 estándar, Q5 aeroespacial. Jet lag, roll-over y blowout se corrigen por software y sensores.',
      nums: 'Q1 Ra 16,5 µm  *  Q3 45 % / Ra 4,5 µm  *  Q5 14 % / Ra 1,4 µm / 25 µm  *  look-ahead  *  1,5 mm',
      pass: 'Con esto llegamos a la fábrica 4.0.',
    },
  ],
  extraSlides: [
    {
      tag: 'D10',
      time: '17:30 – 18:30',
      title: 'Industria 4.0: pilares 03 y 04',
      say: 'Pilar 03: corte desatendido. Pilar 04: reciclar 70 % del granate y cortar sumergido: menos ruido y cero Cr6+.',
      nums: '70 % granate reciclado  *  65 % del costo operativo  *  15 mm sumergido  *  105 a <75 dBA',
      pass: 'Y en seguridad, el protocolo WJTA es crítico.',
    },
    {
      tag: 'D11',
      time: '18:30 – 19:30',
      title: 'Cierre, preguntas y simulador',
      say: 'Gracias. Quedamos a disposición del tribunal y abrimos el simulador para pruebas en vivo.',
      nums: 'Anexo técnico: 7 módulos interactivos',
      pass: 'Ofrecer probar el simulador con los datos que pida el tribunal.',
    },
  ],
  idea: {
    title: 'La idea que tenés que dejar grabada',
    text: 'El valor no está en cortar rápido, sino en cortar sin alterar el material y sin postproceso.',
    metrics: ['±0,05 mm', 'θ = 0,00°', 'Ra 1,4 µm'],
  },
  comparisons: [
    'El plasma deja 2–5 mm de ZAC; el AWJ deja 0,00 mm.',
    'El láser práctico llega a 25 mm; el AWJ supera los 250 mm.',
    'Q5 baja al 14 % de velocidad para lograr Ra 1,4 µm.',
  ],
  numbers: [
    ['ZAC del AWJ', '0,00 mm'],
    ['Tolerancia dimensional', '±0,05 mm'],
    ['Espesor máximo', '> 250 mm'],
    ['ZAC del plasma', '2 – 5 mm'],
    ['ZAC del láser', '0,3 – 1,2 mm'],
    ['Límite láser en acero', '~25 mm'],
    ['Conicidad en 3 ejes', '1 – 3°'],
    ['Corrección en 5 ejes', '1.000 Hz / θ = 0,00°'],
    ['Bisel máximo', '±60°'],
    ['Titanio Ti-6Al-4V', '120 mm / <60 °C / AS9100'],
    ['Rugosidad Q1 / Q3 / Q5', '16,5 / 4,5 / 1,4 µm'],
    ['Reciclado de granate', 'hasta 70 %'],
    ['Ruido al cortar sumergido', '105 a <75 dBA'],
  ],
  phrases: [
    ['Toma de palabra', '"Muchas gracias, Diego. Ahora la pregunta industrial clave es..."'],
    ['Frase de oro', '"Cuando el costo de alterar el material supera el costo del granate, el agua es insustituible."'],
    ['Pase a Diego', '"Complementando los pilares digitales que explicó Diego..."'],
    ['Cierre final', '"Muchas gracias a los profesores. Quedamos a disposición del tribunal..."'],
  ],
  qa: [
    {
      q: '¿Cómo sabe el cabezal cuántos grados inclinarse?',
      a: 'El CAM usa el modelo de Zeng & Kim: índice de maquinabilidad, espesor, presión y calidad Q. Predice la divergencia e interpola A (taper) y C (lead angle).',
    },
    {
      q: '¿Por qué el titanio exige AWJ en aeronáutica?',
      a: 'Sobre 450–500 °C forma Alpha-Case, capa frágil que inicia fatiga. El AWJ corta bajo 60 °C, no genera Alpha-Case y cumple AS9100.',
    },
    {
      q: '¿Protocolo WJTA ante una inyección a presión?',
      a: 'Herida mínima por fuera, daño profundo por dentro. Prohibido suturar: fasciotomía descompresiva dentro de las 6 horas y tarjeta médica siempre.',
    },
  ],
  checklist: [
    'Ensayar en voz alta con cronómetro: bloque de 7,5 minutos.',
    'Explicar cada defecto con su solución mecatrónica.',
    'Usar el conmutador 2D / 5 ejes en vivo, sin apuro.',
    'Tener a mano Q1, Q3 y Q5 para mostrar la escala.',
    'Probar el simulador antes de ofrecerlo al tribunal.',
  ],
  glossary: [
    ['UHP', 'Ultra-High Pressure: presión de hasta 6.480 bar.'],
    ['AWJ', 'Abrasive Waterjet: chorro de agua con granate.'],
    ['PWJ', 'Pure Waterjet: chorro de agua pura, sin abrasivo.'],
    ['Kerf', 'Ancho de la ranura de corte; varía con el espesor.'],
    ['Standoff', 'Distancia boquilla–pieza; se mantiene en 1,5 mm.'],
    ['ZAC', 'Zona Afectada por el Calor; en AWJ es 0,00 mm.'],
    ['Taper', 'Conicidad en V del corte; se corrige con 5 ejes.'],
    ['Nesting', 'Anidado de piezas en la chapa para ahorrar material.'],
  ],
  plan: [
    ['Hoy', 'Leer esta guía completa una vez, sin memorizar.'],
    ['Mañana', 'Ensayo en voz alta con cronómetro y el deck real.'],
    ['Última pasada', 'Solo la tabla de números y las frases de pase.'],
    ['Día de defensa', 'Probar equipo, 3D y simulador 30 min antes.'],
  ],
};

// ============================================================================
// LAYOUT DEL PDF
// ============================================================================

const PAGE_W = 210;
const PAGE_H = 297;
const M = 14;
const CW = PAGE_W - M * 2;

function buildStudyPDF(profile) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  let y = 0;

  const setText = (rgb) => doc.setTextColor(rgb[0], rgb[1], rgb[2]);
  const setFill = (rgb) => doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  const setDraw = (rgb) => doc.setDrawColor(rgb[0], rgb[1], rgb[2]);

  const footer = () => {
    const total = doc.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.4);
      setText([100, 116, 139]);
      doc.text(
        clean(`Resumen de oratoria  |  ${profile.name}  |  Defensa AWJ 4.0 – UTN FRP Viale  |  Página ${i} de ${total}`),
        PAGE_W / 2,
        PAGE_H - 8,
        { align: 'center' }
      );
    }
  };

  const miniHeader = () => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    setText(profile.accent);
    doc.text(clean(`RESUMEN DE ORATORIA  /  ${profile.name.toUpperCase()}`), M, 10);
    setDraw([226, 232, 240]);
    doc.setLineWidth(0.3);
    doc.line(M, 12.5, PAGE_W - M, 12.5);
    y = 19;
  };

  const pageBreak = () => {
    doc.addPage();
    miniHeader();
  };

  const ensure = (needed) => {
    if (y + needed > PAGE_H - 17) pageBreak();
  };

  const section = (label, hint) => {
    ensure(14);
    setFill(profile.accent);
    doc.rect(M, y, 2.2, 6.4, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    setText([15, 23, 42]);
    doc.text(clean(label), M + 4.5, y + 4.6);
    if (hint) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.6);
      setText([100, 116, 139]);
      doc.text(clean(hint), PAGE_W - M, y + 4.4, { align: 'right' });
    }
    y += 9.5;
  };

  const slideCard = (s) => {
    const sayLines = doc.splitTextToSize(clean(s.say), CW - 25);
    const numsLines = doc.splitTextToSize(clean(s.nums), CW - 25);
    const passLines = doc.splitTextToSize(clean(s.pass), CW - 25);
    const cardH = 9.2 + sayLines.length * 3.5 + numsLines.length * 3.35 + passLines.length * 3.2 + 2.4;

    ensure(cardH + 2.5);
    const top = y;

    setDraw([226, 232, 240]);
    doc.setLineWidth(0.35);
    doc.roundedRect(M, top, CW, cardH, 1.4, 1.4, 'D');

    setFill(profile.color);
    doc.roundedRect(M, top, 14, 9.2, 1.4, 1.4, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.6);
    setText([251, 146, 60]);
    doc.text(clean(s.tag), M + 7, top + 4.6, { align: 'center' });
    doc.setFontSize(6.2);
    setText([203, 213, 225]);
    doc.text(clean(s.time), M + 7, top + 7.8, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.2);
    setText([15, 23, 42]);
    doc.text(clean(s.title), M + 17, top + 5);

    let ty = top + 9;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.1);
    setText([51, 65, 85]);
    doc.text(sayLines, M + 17, ty, { lineHeightFactor: 1.16 });
    ty += sayLines.length * 3.5 + 1;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    setText(profile.accent);
    doc.text('NÚMEROS', M + 17, ty);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.9);
    setText([15, 23, 42]);
    doc.text(numsLines, M + 31, ty, { lineHeightFactor: 1.14 });
    ty += Math.max(numsLines.length * 3.35, 3.35) + 1;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    setText([100, 116, 139]);
    doc.text(passLines, M + 17, ty, { lineHeightFactor: 1.12 });

    y = top + cardH + 2.5;
  };

  const ideaBox = () => {
    ensure(24);
    y += 2;
    setFill(profile.color);
    doc.roundedRect(M, y, CW, 21, 1.6, 1.6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    setText([251, 146, 60]);
    doc.text(clean(profile.idea.title.toUpperCase()), M + 4, y + 5.2);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.4);
    setText([255, 255, 255]);
    doc.text(clean(profile.idea.text), M + 4, y + 10.6);

    const chipW = (CW - 8 - 8) / 3;
    profile.idea.metrics.forEach((m, i) => {
      const cx = M + 4 + i * (chipW + 4);
      setFill([30, 41, 59]);
      doc.roundedRect(cx, y + 13.2, chipW, 5.2, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.2);
      setText([251, 146, 60]);
      doc.text(clean(m), cx + chipW / 2, y + 16.7, { align: 'center' });
    });
    y += 24;
  };

  const comparisonBox = () => {
    ensure(30);
    y += 3;
    const boxH = 8 + profile.comparisons.length * 5.2;
    setFill([248, 250, 252]);
    setDraw([226, 232, 240]);
    doc.setLineWidth(0.35);
    doc.roundedRect(M, y, CW, boxH, 1.4, 1.4, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    setText(profile.accent);
    doc.text('PARA DIMENSIONAR', M + 4, y + 5.2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.1);
    setText([51, 65, 85]);
    profile.comparisons.forEach((line, i) => {
      doc.setFillColor(234, 88, 12);
      doc.circle(M + 4.6, y + 10.2 + i * 5.2, 0.7, 'F');
      doc.text(clean(line), M + 8, y + 10.2 + i * 5.2);
    });
    y += boxH + 4;
  };

  // --------------------------------------------------------------------------
  // PÁGINA 1: CABECERA + RECORRIDO + BLOQUE PRINCIPAL
  // --------------------------------------------------------------------------
  setFill(profile.color);
  doc.rect(0, 0, PAGE_W, 38, 'F');
  setFill(profile.accent);
  doc.rect(0, 38, PAGE_W, 1.4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  setText([251, 146, 60]);
  doc.text(clean(`DEFENSA DE GRADO  /  UTN FRP VIALE  /  ${profile.date}`), M, 11.5);

  doc.setFontSize(19);
  setText([255, 255, 255]);
  doc.text(clean(profile.name), M, 22.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  setText([203, 213, 225]);
  doc.text(clean(`${profile.role}  |  AWJ 4.0 – Corte por chorro de agua abrasivo`), M, 29.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  setText([251, 146, 60]);
  doc.text('GUÍA RÁPIDA PARA ESTUDIAR Y ENSAYAR', M, 35.5);

  y = 48;

  section('TU RECORRIDO EN LA EXPOSICIÓN', 'quién habla y cuándo');
  const blockW = (CW - 8) / profile.blocks.length;
  profile.blocks.forEach((b, i) => {
    const bx = M + i * (blockW + 4);
    setFill([248, 250, 252]);
    setDraw([226, 232, 240]);
    doc.setLineWidth(0.35);
    doc.roundedRect(bx, y, blockW, 16, 1.6, 1.6, 'FD');

    setFill(profile.accent);
    doc.roundedRect(bx, y, blockW, 6, 1.6, 1.6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.4);
    setText([255, 255, 255]);
    doc.text(clean(`${b.label}   ${b.time}`), bx + 2.6, y + 4.1);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.1);
    setText([51, 65, 85]);
    const descLines = doc.splitTextToSize(clean(b.desc), blockW - 5);
    doc.text(descLines, bx + 2.6, y + 10.2, { lineHeightFactor: 1.12 });
  });
  y += 21.5;

  section('BLOQUE PRINCIPAL', 'diapositiva por diapositiva');
  profile.mainSlides.forEach(slideCard);
  ideaBox();
  comparisonBox();

  // --------------------------------------------------------------------------
  // PÁGINA 2: INTERVENCIONES EXTRA + NÚMEROS + FRASES
  // --------------------------------------------------------------------------
  pageBreak();

  section('TUS OTRAS INTERVENCIONES', 'dentro de la exposición');
  profile.extraSlides.forEach(slideCard);

  y += 3;
  section('NÚMEROS QUE NO SE OLVIDAN', 'tabla de repaso rápido');
  const rowH = 6;
  profile.numbers.forEach((row, i) => {
    ensure(rowH + 1);
    if (i % 2 === 0) {
      setFill([248, 250, 252]);
      doc.rect(M, y, CW, rowH, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.9);
    setText([71, 85, 105]);
    doc.text(clean(row[0]), M + 2.5, y + 4);
    doc.setFont('helvetica', 'bold');
    setText([15, 23, 42]);
    doc.text(clean(row[1]), M + CW * 0.47, y + 4);
    y += rowH;
  });

  y += 4;
  section('FRASES EXACTAS PARA ENSAYAR', 'memorizar el arranque y los pases');
  profile.phrases.forEach((p) => {
    const lines = doc.splitTextToSize(clean(p[1]), CW - 40);
    const h = lines.length * 3.5 + 4.6;
    ensure(h + 2);
    setFill([255, 247, 237]);
    setDraw([253, 186, 116]);
    doc.setLineWidth(0.3);
    doc.roundedRect(M, y, CW, h, 1.2, 1.2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.9);
    setText(profile.accent);
    doc.text(clean(p[0].toUpperCase()), M + 2.8, y + 3.6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.7);
    setText([51, 65, 85]);
    doc.text(lines, M + 36, y + 3.6, { lineHeightFactor: 1.14 });
    y += h + 2;
  });

  y += 4;
  section('CHECKLIST ANTES DE SALIR A ESCENA', 'marcar con lapicera');
  profile.checklist.forEach((item) => {
    ensure(8);
    setDraw([148, 163, 184]);
    doc.setLineWidth(0.4);
    doc.rect(M, y + 0.3, 3.6, 3.6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.1);
    setText([51, 65, 85]);
    doc.text(clean(item), M + 6.5, y + 3.2);
    y += 6.3;
  });

  // --------------------------------------------------------------------------
  // PÁGINA 3: PREGUNTAS + GLOSARIO + PLAN + REGLA DE ORO
  // --------------------------------------------------------------------------
  pageBreak();

  section('PREGUNTAS PROBABLES DEL TRIBUNAL', 'respuestas cortas, sin dudar');
  profile.qa.forEach((item) => {
    const qLines = doc.splitTextToSize(clean(item.q), CW - 8);
    const aLines = doc.splitTextToSize(clean(item.a), CW - 8);
    const h = 4.2 + qLines.length * 3.5 + aLines.length * 3.4 + 3.2;
    ensure(h + 3);

    setFill([248, 250, 252]);
    setDraw([203, 213, 225]);
    doc.setLineWidth(0.3);
    doc.roundedRect(M, y, CW, h, 1.2, 1.2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    setText([15, 23, 42]);
    doc.text(qLines, M + 3, y + 4, { lineHeightFactor: 1.14 });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.6);
    setText([71, 85, 105]);
    doc.text(aLines, M + 3, y + 4 + qLines.length * 3.5 + 1, { lineHeightFactor: 1.14 });

    y += h + 2.6;
  });

  y += 4;
  section('GLOSARIO MÍNIMO', 'para no trabarse con las siglas');
  const colW = (CW - 8) / 2;
  profile.glossary.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const gx = M + col * (colW + 8);
    const gy = y + row * 11.5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    setText(profile.accent);
    doc.text(clean(item[0]), gx, gy + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.6);
    setText([51, 65, 85]);
    const lines = doc.splitTextToSize(clean(item[1]), colW - 18);
    doc.text(lines, gx + 18, gy + 4, { lineHeightFactor: 1.12 });

    setDraw([226, 232, 240]);
    doc.setLineWidth(0.25);
    doc.line(gx, gy + 8.6, gx + colW, gy + 8.6);
  });
  y += Math.ceil(profile.glossary.length / 2) * 11.5 + 3;

  y += 3;
  section('PLAN DE ENSAYO', 'de acá al día de la defensa');
  profile.plan.forEach((row) => {
    ensure(7);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.4);
    setText(profile.accent);
    doc.text(clean(row[0].toUpperCase()), M + 2, y + 3.2);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.1);
    setText([51, 65, 85]);
    doc.text(clean(row[1]), M + 32, y + 3.2);
    setDraw([226, 232, 240]);
    doc.setLineWidth(0.25);
    doc.line(M, y + 5.6, PAGE_W - M, y + 5.6);
    y += 6.8;
  });

  y += 4;
  section('NOTAS', 'para escribir durante el ensayo');
  for (let i = 0; i < 7; i++) {
    ensure(7);
    setDraw([226, 232, 240]);
    doc.setLineWidth(0.25);
    doc.line(M, y + 4.6, PAGE_W - M, y + 4.6);
    y += 6.4;
  }

  y += 3;
  ensure(19);
  setFill(profile.color);
  doc.roundedRect(M, y, CW, 16, 1.6, 1.6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  setText([251, 146, 60]);
  doc.text('REGLA DE ORO', M + 4, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.3);
  setText([255, 255, 255]);
  doc.text(
    clean('No leer la pantalla: una idea por diapositiva, la métrica en la mano y el pase de palabra ensayado.'),
    M + 4,
    y + 10.8
  );

  footer();

  const outPath = path.join(outDir, profile.filename);
  const buffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(outPath, buffer);
  console.log(`PDF generado: ${outPath} (${doc.getNumberOfPages()} páginas)`);
}

buildStudyPDF(DIEGO);
buildStudyPDF(ARIEL);
