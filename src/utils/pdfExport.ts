import { jsPDF } from 'jspdf';

function cleanPdfText(text: string): string {
  if (!text) return '';
  return text
    .replace(/—/g, ' - ')
    .replace(/–/g, '-')
    .replace(/≈/g, '~')
    .replace(/√/g, 'raiz')
    .replace(/·/g, ' * ')
    .replace(/ṁ/g, 'm_flujo')
    .replace(/θ/g, 'theta')
    .replace(/°/g, ' deg')
    .replace(/ρ/g, 'rho')
    .replace(/Δ/g, 'Delta')
    .replace(/µm/g, 'um')
    .replace(/µ/g, 'u')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/⁻/g, '^-')
    .replace(/•/g, '-')
    .replace(/[^\x20-\x7E\xA0-\xFF\n\r\t]/g, '');
}

export function downloadAcademicPDF(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210 mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297 mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182 mm
  let y = 16;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      y = 18;
      // Header on subsequent pages
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(
        cleanPdfText('UTN FRP - TUM Viale | Informe Técnico: Corte por Chorro de Agua (AWJ)'),
        margin,
        10
      );
      doc.text(
        cleanPdfText('Diego Francisconi & Ariel Martinez | 10/11/2026'),
        pageWidth - margin,
        10,
        { align: 'right' }
      );
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);
      doc.line(margin, 12, pageWidth - margin, 12);
    }
  };

  // ==========================================
  // CARÁTULA ACADÉMICA OFICIAL (PORTADA)
  // ==========================================
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    cleanPdfText('REPÚBLICA ARGENTINA - UNIVERSIDAD TECNOLÓGICA NACIONAL'),
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 5;

  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(
    cleanPdfText('FACULTAD REGIONAL PARANÁ - EXTENSIÓN ÁULICA VIALE'),
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    cleanPdfText('Tecnicatura Universitaria en Mecatrónica (TUM) - Cátedra: Corte de Metales'),
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 6;

  // Title Box
  doc.setDrawColor(2, 132, 199);
  doc.setLineWidth(0.7);
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(3, 105, 161);
  doc.text(
    cleanPdfText('CORTE POR CHORRO DE AGUA ABRASIVO (AWJ) 4.0'),
    pageWidth / 2,
    y + 7.5,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(
    cleanPdfText('Desarrollo Integral de los 11 Puntos de Cátedra - Hidrodinámica, Mecatrónica e Industria 4.0'),
    pageWidth / 2,
    y + 14,
    { align: 'center' }
  );
  y += 24;

  // Metadata Grid - 2 balanced columns with ample margins
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 23, 1.5, 1.5, 'FD');

  const col1X = margin + 4;
  const col2X = margin + 94;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);

  // Row 1
  doc.text(cleanPdfText('Autores / Expositores:'), col1X, y + 5.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(3, 105, 161);
  doc.text(cleanPdfText('Diego Francisconi y Ariel Martinez'), col1X + 32, y + 5.5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text(cleanPdfText('Zona Afectada Calor:'), col2X, y + 5.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(4, 120, 87);
  doc.text(cleanPdfText('ZAC = 0,00 mm (Corte 100% en Frío)'), col2X + 32, y + 5.5);

  // Row 2
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text(cleanPdfText('Fecha de Exposición:'), col1X, y + 11.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(cleanPdfText('10 de Noviembre de 2026 (15-20 min)'), col1X + 32, y + 11.5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text(cleanPdfText('Abrasivo Activo:'), col2X, y + 11.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 83, 9);
  doc.text(cleanPdfText('Barton Garnet #80 (1,1 M part/s)'), col2X + 32, y + 11.5);

  // Row 3
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text(cleanPdfText('Presión UHP (2026):'), col1X, y + 17.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(cleanPdfText('6.480 bar (94.000 PSI) - Mach 3.06'), col1X + 32, y + 17.5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text(cleanPdfText('Cinemática 5 Ejes:'), col2X, y + 17.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(cleanPdfText('Flow Dynamic XD (Conicidad = 0 deg)'), col2X + 32, y + 17.5);

  y += 28;

  // ==========================================
  // CONTENIDO DE LOS 11 PUNTOS OFICIALES
  // ==========================================
  const academicSectionsData = [
    {
      title: 'Punto 1: Descripción del Proceso',
      paragraphs: [
        'El corte por chorro de agua (Waterjet Cutting) es un proceso de mecanizado no tradicional por erosión mecánica en frío. Un haz de fluido a presión ultra alta -de hasta 94.000 psi (~ 6.480 bar)- es forzado a través de un orificio microscópico calibrado de zafiro o diamante (0,10 a 0,38 mm), saliendo a velocidades supersónicas de 1.000 a 1.150 m/s (superando Mach 3 en el aire).',
        'Modalidad 1 - Chorro Puro (PWJ): Emplea agua pura a ultra-alta presión. Se utiliza para el corte aséptico y rápido de materiales blandos: elastómeros, espumas, juntas, plásticos, alimentos, cuero y papel con costo operativo mínimo (cero consumo de abrasivo).',
        'Modalidad 2 - Chorro Abrasivo (AWJ): Mediante efecto Venturi en el cabezal de mezcla se genera vacío que arrastra granate mineral (Barton Garnet #80). El flujo trifásico (agua + aire + abrasivo) colima en un tubo focalizador ROCTEC, multiplicando la potencia erosiva 1.000 veces y seccionando metales (acero inoxidable, titanio, Hardox, cobre), composites y cerámicos hasta espesores mayores a 250 mm sin zona afectada térmicamente (ZAC = 0,00 mm).'
      ]
    },
    {
      title: 'Punto 2: Principio Físico y Modelo Hidrodinámico',
      paragraphs: [
        'Ecuación de Bernoulli ideal: v_jet = raiz [ (2 * P) / rho ].',
        'Régimen real de Ultra Alta Presión (UHP): A presiones superiores a 4.000 bar, el agua experimenta compresibilidad con un incremento de densidad del 10% al 12%. Considerando el coeficiente de descarga por fricción y vena contracta (Cd ~ 0,65), la velocidad real de salida resulta:',
        'v_real = Cd * v_jet = Cd * raiz [ (2 * P) / rho ] ~ 1.000 a 1.050 m/s (Mach 3.06).',
        'Conservación de la Cantidad de Movimiento en la mezcla Venturi: m_agua * v_agua = (m_agua + m_abrasivo + m_aire) * v_mezcla. La velocidad de impacto de las partículas de granate alcanza 600 a 700 m/s.',
        'Mecanismo dual de remoción: En materiales dúctiles (metales) actúa por microcorte y cizalladura plástica en frío. En materiales frágiles (vidrio, piedra) actúa por microfractura y propagación controlada de grietas sin choque térmico.',
        'Potencia Hidráulica instantánea: P_h = P * Q = (400 MPa) * (3,33 x 10^-5 m^3/s) = 13,3 kW (requiere motor eléctrico industrial de 50 a 60 HP con rendimiento electro-hidráulico del 75%).'
      ]
    },
    {
      title: 'Punto 3: Máquinas y Componentes del Sistema',
      paragraphs: [
        'Generador de Presión UHP: Se divide en dos arquitecturas principales. 1) Bomba Intensificadora Hidráulica de doble efecto (relación de áreas 20:1, cilindros cerámicos gemelos, acumulador/atenuador de pulsaciones que reduce la fluctuación al +-2% y presiones hasta 6.480 bar / 94.000 PSI). 2) Bomba de Transmisión Directa con cigüeñal triplex (alta eficiencia energética 85-90% y presiones de 4.100 bar).',
        'Cabezal de Mezcla y Enfoque: Cuerpo de acero inoxidable autofretado de alta tenacidad. Aloja el orificio UHP de diamante policristalino PCD (vida útil de 800 a 2.000 h), la cámara de vacío Venturi, la entrada dosificada de abrasivo y el tubo focalizador de nano-carburo ROCTEC (vida útil de 80 a 150 h).',
        'Mesa de Coordenadas CNC y Batea Colectora: Cinemática pórtico de alta rigidez con servomotores AC brushless de lazo cerrado y reglas ópticas lineales (< 0,005 mm de resolución). Batea colectora con lamas de sacrificio de acero/cobre y nivel de agua regulable para corte sumergido.'
      ]
    },
    {
      title: 'Punto 4: Servicios Auxiliares e Infraestructura Requerida',
      paragraphs: [
        'Acondicionamiento del Agua: Requiere tren de filtración previa (filtros de 5 um, 1 um y 0,45 um) y planta desmineralizadora por Ósmosis Inversa (TDS < 50 ppm, dureza < 0,5 dH). Previene la precipitación de sales, cavitación y micro-rayaduras en los orificios de diamante.',
        'Suministro Eléctrico: Conexión trifásica 380 V industrial (50/60 Hz) con transformador dedicado de 40 a 75 kVA para la bomba UHP y el control CNC.',
        'Neumática y Enfriamiento: Aire comprimido seco y desengrasado (6 bar, ISO 8573-1) para el accionamiento de válvulas neumáticas UHP ultra-rápidas. Chiller de refrigeración circuito cerrado de 10 a 15 kW para mantener el aceite hidráulico de la bomba por debajo de 45 deg C.'
      ]
    },
    {
      title: 'Punto 5: Parámetros de Trabajo y Variables del Proceso',
      paragraphs: [
        'Presión de Bomba (P): Regulable de 3.800 a 6.480 bar. A mayor presión se incrementa la densidad de energía cinética (E proporcional a v^2), permitiendo mayor velocidad de avance o mayor espesor.',
        'Distancia de Separación (Standoff distance): Mantenida rigurosamente entre 1,0 y 2,0 mm. Un standoff superior produce divergencia cónica del chorro y pérdida de perpendicularidad.',
        'Caudal de Abrasivo: Dosificación calibrada de 250 a 500 g/min de granate almandino Barton Malla 80. La sobrealimentación genera atascamiento y pérdida de velocidad por saturación de masa.',
        'Velocidad de Avance (Feedrate) y Calidades ISO/DIN Q1 a Q5: Q1 (separación rápida, Ra > 12 um), Q2 (estándar para soldadura), Q3 (comercial, Ra ~ 6,3 um), Q4 (precisión de ingeniería, Ra ~ 3,2 um) y Q5 (acabado fino aeroespacial con tolerancia estrecha, Ra < 1,6 um).'
      ]
    },
    {
      title: 'Punto 6: Defectos Típicos y Control Mecatrónico',
      paragraphs: [
        'Conicidad de Ranura (Kerf Taper): Pérdida de energía del chorro que provoca corte en V, inverso o en barril. Solución mecatrónica: Cabezal articulado de 5 ejes (Flow Dynamic XD / Tilt-A-Jet) que inclina el cabezal activamente entre 1 deg y 9 deg para dejar la pieza útil 100% a escuadra (theta = 0,00 deg).',
        'Retraso del Chorro (Jet Lag y Estriado Inferior): La base del chorro se retrasa respecto a la parte superior por fricción con el material. Solución mecatrónica: Algoritmo CNC de desaceleración y aceleración predictiva (Look-Ahead vectorial) en esquinas y vértices cerrados.',
        'Despostillado / Picado Inicial: Evitado mediante ciclo de pre-perforación a baja presión (Vacuum Assist Pierce a 700 bar) antes de conmutar automáticamente a régimen UHP.'
      ]
    },
    {
      title: 'Punto 7: Control Dimensional, Rugosidad y Metrología',
      paragraphs: [
        'Tolerancias Dimensionales: +-0,025 mm a +-0,08 mm en máquinas rígidas con cinemática 5D calibrada.',
        'Rugosidad Superficial Ra: Altamente dependiente del índice de calidad seleccionado (Q1 a Q5) y del tamaño de partícula del abrasivo (Malla 80 estándar, Malla 120 para micro-mecanizado).',
        'Integridad Metalúrgica Total: Ausencia completa de tensiones térmicas residuales, transformaciones martensíticas indeseadas o microfisuras, eliminando operaciones secundarias de rectificado o desbaste.'
      ]
    },
    {
      title: 'Punto 8: Seguridad Ocupacional y Sustentabilidad Ambiental',
      paragraphs: [
        'Peligro Crítico de Inyección a Ultra Alta Presión: Un chorro a 6.000 bar penetra la piel de forma instantánea causando destrucción tisular profunda sin quemadura térmica evidente. Requiere protocolo médico hospitalario de descompresión quirúrgica inmediata.',
        'Equipos de Protección Personal (EPP): Trajes y polainas técnicas de fibra Dyneema / aramida certificadas contra impactos de 7.500 bar, protección ocular panorámica y auditiva.',
        'Sustentabilidad Ambiental: Operación con corte sumergido bajo agua que disminuye el nivel sonoro de 100 dBA a 74 dBA y retiene el 100% de aerosoles y nieblas. Los residuos sólidos de granate y metales pesados son extraídos por hidrociclones y decantación para reciclado o confinamiento seguro.'
      ]
    },
    {
      title: 'Punto 9: Secuencia Operativa Estándar (9 Pasos CNC)',
      paragraphs: [
        'Paso 1: Carga del plano CAD/CAM (DXF/STEP) y trazado de entradas (Lead-in) con compensación de radio de sangría.',
        'Paso 2: Selección mecatrónica de material, espesor y calidad requerida (Q1 a Q5) en la base de datos de corte.',
        'Paso 3: Verificación de presiones de entrada de agua, tolva de abrasivo y estado del orificio de diamante.',
        'Paso 4: Fijación rígida del tocho metálico sobre las lamas de sacrificio de la batea.',
        'Paso 5: Ajuste de cero pieza (G54) y calibración automática del sensor de distancia (Standoff a 1,5 mm).',
        'Paso 6: Secuencia de cebado hidráulico y presurización de la bomba UHP a 6.480 bar.',
        'Paso 7: Ejecución del ciclo de perforación inicial (Piercing con abrasivo activo).',
        'Paso 8: Mecanizado continuo del contorno con compensación dinámica de conicidad en 5 ejes.',
        'Paso 9: Despresurización controlada, purga de líneas y retiro de la pieza terminada limpia e inalterada.'
      ]
    },
    {
      title: 'Punto 10: Comparativa Multiproceso: Chorro vs Láser, Plasma y Oxicorte',
      paragraphs: [
        'Ventaja Cardinal Única: Zona Afectada por el Calor ZAC = 0,00 mm. Es el único proceso industrial capaz de cortar cualquier material metálico o compuesto sin alterar su estructura micro-cristalina.',
        'Frente al Láser de Fibra: El chorro de agua no presenta limitaciones de reflectividad óptica (corta cobre, bronce y aluminio macizo sin riesgo) y permite seccionar espesores masivos (> 150 a 200 mm) donde el rayo láser pierde capacidad pasante.',
        'Frente al Plasma y Oxicorte: Logra tolerancias diez veces superiores (+-0,05 mm frente a +-0,8 mm), sin escoria adherida, sin sangría angular y sin alabeo por deformación térmica.'
      ]
    },
    {
      title: 'Punto 11: Aplicaciones Industriales y Conclusiones del Equipo',
      paragraphs: [
        'Sectores Industriales Clave: Industria Aeroespacial (componentes estructurales de titanio Ti-6Al-4V, superaleaciones de níquel Inconel 718 y paneles de fibra de carbono CFRP), Medicina (implantes ortopédicos y prótesis biocompatibles), Maquinaria Agrícola de Entre Ríos y Santa Fe (placas de acero antidesgaste Hardox para sembradoras en el polo Paraná, Viale y Crespo), y Alimentaria (corte higiénico con agua pura).',
        'Conclusión Final (Diego Francisconi y Ariel Martinez): El corte por chorro de agua abrasivo combina física fundamental de fluidos con la vanguardia de la ingeniería mecatrónica moderna (cinemática 5D, 94.000 PSI y gemelos digitales 4.0), posicionándose como el método de separación en frío más versátil, preciso e inocuo de la manufactura avanzada.'
      ]
    }
  ];

  // Render each section with a clean box, no overflow, and clean line breaks
  academicSectionsData.forEach((section) => {
    // Check if header + first paragraph fits on page
    checkPageBreak(32);

    // Section Title Banner
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(186, 230, 253);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, y, contentWidth, 7.5, 1, 1, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(3, 105, 161);
    doc.text(cleanPdfText(section.title), margin + 3, y + 5);
    y += 10.5;

    // Paragraphs
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(30, 41, 59);

    // Available width inside the box: contentWidth - 4 mm = 178 mm
    const textWrapWidth = contentWidth - 4;

    section.paragraphs.forEach((p) => {
      const cleaned = cleanPdfText(p);
      const splitLines = doc.splitTextToSize(cleaned, textWrapWidth);
      const neededH = splitLines.length * 3.8 + 2;

      checkPageBreak(neededH);

      doc.text(splitLines, margin + 2, y, { lineHeightFactor: 1.25 });
      y += neededH;
    });

    y += 3;
  });

  // Footer page numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      cleanPdfText(
        `Página ${i} de ${totalPages} - Documento Técnico UTN FRP Viale - Diego Francisconi y Ariel Martinez`
      ),
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  // Save the PDF file
  doc.save('Informe_Tecnico_Chorro_de_Agua_UTN_Viale.pdf');
}

export function downloadAcademicMarkdown(): void {
  const markdownContent = `# Sistema de Corte por Chorro de Agua Abrasivo (AWJ) e Industria 4.0
**Universidad Tecnológica Nacional - Facultad Regional Paraná (UTN FRP)**
**Extensión Áulica Viale - Tecnicatura Universitaria en Mecatrónica (TUM)**
**Cátedra:** Corte de Metales
**Equipo Expositor:** Diego Francisconi y Ariel Martinez
**Fecha:** 10 de Noviembre de 2026 (Duración estipulada: 15-20 minutos)

---

## Parámetros Característicos UHP
* Presión de Trabajo UHP: 6.480 bar (94.000 PSI) - Flow HyperJet 2026
* Velocidad del Chorro Supersónico: 1.050 m/s (Mach 3.06)
* Zona Afectada Térmicamente: ZAC = 0,00 mm (Corte 100% en Frío)
* Tasa de Abrasivo: Barton Garnet Malla 80 (1,1 M part/s)
* Corrección Angular Cinemática 5D: theta = 0,00 deg (Flow Dynamic XD / Tilt-A-Jet)

---

## 1. Descripción del Proceso
El corte por chorro de agua (Waterjet Cutting) es un proceso de mecanizado no tradicional por erosión en frío.
Un chorro de agua a presión ultra alta -de hasta 94.000 psi (~ 6.480 bar)- es forzado a través de un orificio microscópico calibrado de piedra preciosa (zafiro, rubí o diamante policristalino de 0,10 a 0,38 mm), saliendo a velocidades supersónicas de 1.000 a 1.150 m/s (Mach 3+).
* **Modalidad Chorro Puro (PWJ):** Para materiales blandos (goma, juntas, plásticos, alimentos, cuero).
* **Modalidad Chorro Abrasivo (AWJ):** Incorpora granate mineral en la cámara Venturi, permitiendo cortar cualquier metal (acero inoxidable, titanio, Hardox) y composites de más de 250 mm de espesor sin aporte térmico.

## 2. Principio Físico y Modelo Hidrodinámico
* Ecuación de Bernoulli ideal: v_jet = raiz [ (2 * P) / rho ]
* Régimen real UHP con compresibilidad y coeficiente de descarga Cd ~ 0,65: v_real = Cd * raiz [ (2 * P) / rho ] ~ 1.050 m/s (Mach 3.06).
* Conservación del momento lineal en cámara de mezcla: m_w * v_w = (m_w + m_a + m_air) * v_mix.
* Potencia hidráulica del chorro: P_h = P * Q = 400 MPa * 3,33x10^-5 m^3/s = 13,3 kW.

## 3. Componentes de la Máquina
* Bomba Intensificadora UHP (relación de áreas 20:1, doble efecto cerámico).
* Cabezal de mezcla Paschen/Venturi con orificio de diamante PCD y tubo colimador ROCTEC.
* Cinemática 5D de lazo cerrado (Flow Dynamic XD) para compensación en tiempo real.

## 4. Servicios Auxiliares
* Tratamiento de agua por Ósmosis Inversa (TDS < 50 ppm).
* Suministro eléctrico trifásico 380V (40 a 75 kVA).
* Neumática industrial seca (6 bar) y Chiller de enfriamiento de aceite hidráulico.

## 5. Parámetros de Trabajo y Calidades Q1-Q5
* Q1: Corte de separación rápida (Ra > 12 um).
* Q2: Estándar para soldadura / estructural.
* Q3: Comercial estándar (Ra ~ 6,3 um).
* Q4: Acabado fino de ingeniería (Ra ~ 3,2 um).
* Q5: Precisión aeroespacial (Ra < 1,6 um, tolerancia estrecha).

## 6. Defectos Típicos y Control Mecatrónico
* Conicidad (Kerf Taper): Compensada mediante inclinación dinámica del cabezal 5D.
* Retraso del chorro (Jet Lag): Compensado con desaceleración predictiva (Look-Ahead CNC).
* Despostillado: Prevenido con perforación suave a baja presión (Vacuum Assist Pierce).

## 7. Metrología y Tolerancias
* Tolerancias de contorno: +-0,025 a +-0,08 mm.
* Cero tensiones residuales por ausencia de ciclo térmico.

## 8. Seguridad y Ecosistema
* Riesgo crítico de inyección a 6.500 bar y protocolo médico descompresivo.
* EPP certificado en fibra Dyneema resistente a 7.500 bar.
* Corte subacuático (atenuación acústica a 74 dBA y cero aerosoles).
* Hidrociclones para extracción de lodos de granate.

## 9. Secuencia Operativa (9 Pasos)
1. Carga CAD/CAM con Lead-in.
2. Definición de parámetros y calidad Q.
3. Chequeo de agua, presión y abrasivo.
4. Amarre de pieza.
5. Calibración de cero (G54) y standoff (1,5 mm).
6. Presurización UHP.
7. Perforación inicial (Piercing).
8. Contorneado CNC con 5 ejes.
9. Despresurización y retiro seguro.

## 10. Comparativa de Tecnologías
* Único proceso con ZAC = 0,00 mm.
* Corta espesores de 200 mm donde el láser se bloquea.
* Corta materiales reflectantes (cobre, aluminio) sin peligro óptico.

## 11. Conclusión
El corte por chorro de agua abrasivo a 94.000 PSI representa la perfecta convergencia entre la hidrodinámica supersónica y el control mecatrónico 5D de la Industria 4.0.
Equipo Expositor: Diego Francisconi y Ariel Martinez (UTN FRP - TUM Viale).
`;

  const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Documento_Tecnico_Oficial_UTN_Viale.md';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
