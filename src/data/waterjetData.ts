import { MaterialSpec, QualityLevel, ComparisonProcess, DefectItem, MachineryComponent, WorkingParameter } from '../types';

export const MATERIALS: MaterialSpec[] = [
  {
    id: 'aisi304',
    name: 'Acero Inoxidable AISI 304',
    category: 'Aceros Austeníticos',
    machinability: 81,
    density: 8.0,
    hardnessNote: 'Austenítico (~180 HB) — Sin precipitación de carburos de cromo',
    thermalNote: 'ZAC = 0,00 mm (Conserva 100% su resistencia a corrosión intergranular)',
    maxRecommendedThick: 150,
  },
  {
    id: 'ti6al4v',
    name: 'Titanio Grado 5 (Ti-6Al-4V)',
    category: 'Aeroespacial y Biomedicina',
    machinability: 108,
    density: 4.43,
    hardnessNote: 'Aeroespacial (~330 HB) — Cero capa alfa fragilizada (Alpha-Case)',
    thermalNote: 'ZAC = 0,00 mm (Apto directo para normas aeronáuticas AS9100 / Boeing / Airbus)',
    maxRecommendedThick: 120,
  },
  {
    id: 'al6061',
    name: 'Aluminio Estructural 6061-T6',
    category: 'No Ferrosos Ligeros',
    machinability: 215,
    density: 2.7,
    hardnessNote: 'Tratado T6 (~95 HB) — No pierde el revenido artificial por calor',
    thermalNote: 'ZAC = 0,00 mm (Cero rebaba fundida y sin riesgo de reflexión óptica como en láser)',
    maxRecommendedThick: 200,
  },
  {
    id: 'sae1020',
    name: 'Acero al Carbono SAE 1020 / Hardox 500',
    category: 'Estructural y Antidesgaste',
    machinability: 88,
    density: 7.85,
    hardnessNote: 'Resistente a abrasión (hasta 500 HB) — No crea borde templado martensítico',
    thermalNote: 'ZAC = 0,00 mm (Permite roscado y maquinado posterior sin romper herramientas)',
    maxRecommendedThick: 250,
  },
  {
    id: 'inconel718',
    name: 'Superaleación Inconel 718',
    category: 'Alta Temperatura / Turbinas',
    machinability: 62,
    density: 8.19,
    hardnessNote: 'Níquel-Cromo-Molibdeno (~360 HB) — No se acritudina térmicamente',
    thermalNote: 'ZAC = 0,00 mm (Cero microfisuras de refundición en bordes críticos)',
    maxRecommendedThick: 100,
  },
  {
    id: 'cobre',
    name: 'Cobre Electrolítico Puro C11000',
    category: 'Alta Conductividad Eléctrica',
    machinability: 138,
    density: 8.96,
    hardnessNote: 'Excelente ductilidad (45-55 HRB) — Altamente reflectivo a fotones',
    thermalNote: 'ZAC = 0,00 mm (Corte óptimo de barras Busbars para transformadores y baterías VE)',
    maxRecommendedThick: 80,
  },
  {
    id: 'laton',
    name: 'Latón Comercial Cu-Zn (C36000)',
    category: 'Aleaciones de Cobre',
    machinability: 165,
    density: 8.5,
    hardnessNote: 'Maquinado rápido (~120 HB) — Cero emisión de vapores de zinc',
    thermalNote: 'ZAC = 0,00 mm (Preserva tolerancias finas en piezas de relojería y grifería)',
    maxRecommendedThick: 90,
  },
];

export const QUALITY_LEVELS: QualityLevel[] = [
  {
    q: 1,
    label: 'Q1 - Corte de Separación Rápida',
    description: 'Máxima productividad con estrías visibles en el 60% inferior. Ideal para recorte de scrap o desbaste previo a fresado.',
    speedFactor: 1.0,
    raBase: 16.5,
    taperDeg: 0.85,
    tolMm: 0.40,
    typicalUse: 'Desbaste de planchones, piezas no funcionales, corte preliminar.',
  },
  {
    q: 2,
    label: 'Q2 - Corte Rugoso Industrial',
    description: 'Estrías leves en el tercio inferior. Excelente balance para piezas que irán soldadas en estructuras no críticas.',
    speedFactor: 0.68,
    raBase: 9.2,
    taperDeg: 0.52,
    tolMm: 0.25,
    typicalUse: 'Estructuras soldadas estándar, bridas básicas, bases de tanques.',
  },
  {
    q: 3,
    label: 'Q3 - Corte Estándar Comercial',
    description: 'El estándar universal en talleres metalmecánicos (80% de piezas). Textura uniforme mate, libre de rebabas en el fondo.',
    speedFactor: 0.45,
    raBase: 4.5,
    taperDeg: 0.28,
    tolMm: 0.12,
    typicalUse: 'Soportes de máquinas, bridas de alta presión, brazos robóticos mecatrónicos.',
  },
  {
    q: 4,
    label: 'Q4 - Acabado Fino Satinado',
    description: 'Alta calidad visual y dimensional. Superficie homogénea sin estrías discernibles al tacto ni conicidad perceptible.',
    speedFactor: 0.26,
    raBase: 2.4,
    taperDeg: 0.12,
    tolMm: 0.06,
    typicalUse: 'Componentes aeroespaciales, engranajes no rectificados, piezas médicas.',
  },
  {
    q: 5,
    label: 'Q5 - Precisión Extrema Aeroespacial',
    description: 'Mínima velocidad de avance para máxima perpendicularidad y acabado espejo satinado. Tolerancias micrométricas.',
    speedFactor: 0.14,
    raBase: 1.4,
    taperDeg: 0.04,
    tolMm: 0.025,
    typicalUse: 'Alojamientos de rodamientos IT7, guías prismáticas, matricería fina.',
  },
];

export interface WaterjetVariant {
  name: string;
  category: string;
  architecture: string;
  maxPressure: string;
  efficiency: string;
  typicalMaterials: string;
  kerfAndTaper: string;
  pros: string[];
  cons: string[];
  bestUseCases: string;
}

export const WATERJET_VARIANTS: WaterjetVariant[] = [
  {
    name: 'AWJ con Cabezal 5 Ejes (Dynamic XD / Tilt-A-Jet)',
    category: 'Corte Abrasivo de Alta Precisión',
    architecture: 'Muñeca articulada CNC de 5 ejes con compensación en tiempo real del ángulo de sangría y jet lag.',
    maxPressure: 'Hasta 6.500 bar (94.000 PSI)',
    efficiency: 'Máxima precisión: anulación del 100% de la conicidad en la pieza útil.',
    typicalMaterials: 'Todos los metales: Titanio Ti-6Al-4V, Inconel 718, Acero Inoxidable 316L, Hardox 500, Cobre C11000.',
    kerfAndTaper: 'Sangría 0,75 a 1,02 mm • Conicidad: θ = 0,00° (Pared a 90,0° exactos)',
    pros: [
      'Elimina por completo el mecanizado posterior de fresado',
      'Paredes a 90,00° exactos volcando el taper al desecho (scrap)',
      'Compensación anticipativa Look-Ahead en esquinas cerradas',
      'Capacidad de biselado en V, Y y chaflanes de soldadura hasta ±60°'
    ],
    cons: [
      'Mayor inversión en cabezal y cinemática multieje',
      'Requiere software CAM avanzado con algoritmos de modelado predictivo'
    ],
    bestUseCases: 'Aeroespacial, herramentales, matricería, piezas con ajuste de ensamble directo.'
  },
  {
    name: 'AWJ Cabezal 3 Ejes Convencional',
    category: 'Corte Abrasivo Estándar',
    architecture: 'Pórtico cartesiano X, Y, Z con cabezal fijado a 90° respecto a la mesa.',
    maxPressure: '3.800 a 4.100 bar (55.000 a 60.000 PSI)',
    efficiency: 'Buena productividad; presenta conicidad natural en función de la velocidad.',
    typicalMaterials: 'Placas de acero estructural, aluminio, cobre, bronce y titanio.',
    kerfAndTaper: 'Sangría 0,80 a 1,15 mm • Conicidad: 0,20° a 0,85° (V natural)',
    pros: [
      'Estructura mecánica más simple y menor costo de mantenimiento',
      'Ideal para cortes pasantes donde la conicidad de 0,2 mm es admisible',
      'Cero Zona Afectada por el Calor (ZAC = 0,00 mm)'
    ],
    cons: [
      'Presenta conicidad en V positiva si se incrementa la velocidad',
      'Puede requerir desbaste o fresado posterior en ajustes precisos'
    ],
    bestUseCases: 'Calderería, piezas estructurales para soldar, bridas estándar.'
  },
  {
    name: 'Corte con Agua Pura (PWJ - Pure Waterjet)',
    category: 'Corte Hidrodinámico sin Abrasivo',
    architecture: 'Haz supersónico colimado de agua pura a través de micro-orificio (Ø 0,08 a 0,20 mm) sin cámara de mezcla.',
    maxPressure: '3.800 a 6.200 bar (55.000 a 90.000 PSI)',
    efficiency: 'Altísima velocidad lineal; costo operativo ultra-bajo (cero consumo de granate).',
    typicalMaterials: 'Materiales blandos: juntas de goma, teflón, espuma de poliuretano, corcho, cartón, alimentos y textiles.',
    kerfAndTaper: 'Sangría ultra-fina (0,10 a 0,25 mm) • Sin abrasión mineral',
    pros: [
      'Velocidades de hasta 20 a 50 metros/minuto',
      'Costo por metro ínfimo: no gasta abrasivo ni tubos de carburo',
      'Corte limpio y estéril apto para industria alimenticia y médica'
    ],
    cons: [
      'Incapaz de cortar metales o aleaciones (rebota en materiales duros)',
      'Exclusivo para elastómeros y no metales'
    ],
    bestUseCases: 'Fabricación masiva de juntas de estanqueidad, embalajes técnicos, sellos poliméricos.'
  },
  {
    name: 'Bomba UHP Intensificadora Hidráulica',
    category: 'Generación de Presión UHP Lineal',
    architecture: 'Circuito de aceite hidráulico a 200 bar que acciona pistón diferencial 20:1 con carreras largas y baja frecuencia.',
    maxPressure: 'Hasta 6.200 a 6.500 bar (90.000 a 94.000 PSI)',
    efficiency: 'Eficiencia global 65% – 72% (requiere chiller para disipación térmica en el aceite).',
    typicalMaterials: 'Optimizado para alimentar múltiples cabezales y grandes espesores de metal (>100 mm).',
    kerfAndTaper: 'Salida de presión estabilizada mediante acumulador de pulsos (Attenuator)',
    pros: [
      'Alcanza las máximas presiones de la industria (6.500 bar / HyperJet)',
      'Excelente confiabilidad en turnos continuos de trabajo pesado',
      'Permite alimentar 2 a 4 cabezales simultáneos con una sola unidad'
    ],
    cons: [
      'Menor rendimiento energético que la servobomba directa',
      'Requiere circuito hidráulico intermedio de aceite y enfriador mayor'
    ],
    bestUseCases: 'Talleres de corte pesado (Job Shops), múltiples cabezales, espesores superiores a 80 mm.'
  },
  {
    name: 'Servobomba de Accionamiento Directo (Direct Drive)',
    category: 'Generación de Presión UHP Electromecánica',
    architecture: 'Servomotor con variador de frecuencia (VFD) conectado a cigüeñal mecánico con 3 pistones cerámicos (triplex).',
    maxPressure: '4.100 a 6.900 bar (60.000 a 100.000 PSI)',
    efficiency: 'Eficiencia energética superior: 85% a 90% (sin pérdidas hidráulicas de aceite).',
    typicalMaterials: 'Corte eficiente de metales con menor consumo en la factura eléctrica.',
    kerfAndTaper: 'Rizado de presión mínimo gracias al desfase de 120° de los 3 cilindros',
    pros: [
      'Ahorro eléctrico directo del 20% al 30% respecto a intensificadoras',
      'Menor huella de carbono y mantenimiento más sencillo (sin aceite)',
      'Modulación instantánea de RPM y presión por software'
    ],
    cons: [
      'Los sellos operan a mayor frecuencia de ciclado',
      'Menos común para configuraciones con más de 2 cabezales de alto caudal'
    ],
    bestUseCases: 'Celdas de producción continua automatizada, optimización de consumo eléctrico kWh.'
  },
  {
    name: 'Micro-Waterjet (Ultra-Precisión Biomédica & Microelectrónica)',
    category: 'Micro-Mecanizado Abrasivo de Precisión',
    architecture: 'Cabezal miniaturizado con orificio de gema de 0,05 a 0,10 mm, micro-tubo focalizador de 0,15 a 0,20 mm y abrasivo ultra-fino Mesh 200–300.',
    maxPressure: '4.000 bar estabilizada con atenuador de alta frecuencia',
    efficiency: 'Resolución sub-milimétrica sin daño térmico, compitiendo directo con láser femtosegundo y Wire EDM.',
    typicalMaterials: 'Stents de nitinol, titanio grado médico, silicio, micro-engranajes de relojería y cerámicas técnicas.',
    kerfAndTaper: 'Sangría ultra-estrecha: Kerf ≈ 0,20 mm • Tolerancia: ± 0,01 mm',
    pros: [
      'Ancho de corte minúsculo de 0,20 mm con tolerancias de ±0,01 mm',
      'No induce deformación térmica ni microfisuras en componentes biomédicos',
      'Cero emisión de calor, libre de rebaba y sin capa refundida (recast layer)',
      'Permite micro-corte de polímeros biorreabsorbibles y aleaciones con memoria de forma'
    ],
    cons: [
      'Exige abrasivo de ultra-alta pureza Mesh 200–300 para no tapar el micro-tubo',
      'Velocidad de avance menor que en macro-corte'
    ],
    bestUseCases: 'Dispositivos médicos implantables, microelectrónica, relojería de alta gama, MEMS.'
  }
];

export const INTER_TECH_COMPARISON = [
  {
    process: 'Chorro de Agua Abrasivo (AWJM)',
    removalMechanism: 'Erosión mecánica por impacto abrasivo supersónico (frío)',
    thicknessRange: '1 mm a >150 mm (hasta >300 mm)',
    tolerance: '± 0,05 mm a ± 0,25 mm (±0,01 en Micro-WJ)',
    kerf: '0,60 mm a 1,20 mm (0,20 mm en Micro-WJ)',
    speedSteel12mm: '100 a 450 mm/min (según Q1–Q5)',
    hazExtent: 'NULA (0,00 mm - Proceso 100% en frío)',
    operatingCost: 'Alto (~$25 - $35 USD/h por abrasivo)',
    versatility: 'Universal (Metales, cerámicas, vidrio, compuestos CFRP)'
  },
  {
    process: 'Láser de Fibra (Fiber Laser)',
    removalMechanism: 'Fusión y evaporación por fotones coherentes',
    thicknessRange: '0,5 mm a 25 mm',
    tolerance: '± 0,03 mm a ± 0,10 mm',
    kerf: '0,10 mm a 0,40 mm',
    speedSteel12mm: '1.000 a 2.500 mm/min',
    hazExtent: 'Mínima (0,1 mm - 0,5 mm)',
    operatingCost: 'Moderado (~$13 - $20 USD/h)',
    versatility: 'Metales conductores no reflectivos, polímeros seleccionados'
  },
  {
    process: 'Plasma de Alta Definición (HD Plasma)',
    removalMechanism: 'Fusión por arco de gas ionizado térmico (>20.000 K)',
    thicknessRange: '3 mm a 50 mm',
    tolerance: '± 0,25 mm a ± 0,75 mm',
    kerf: '1,50 mm a 4,00 mm',
    speedSteel12mm: '1.500 a 3.500 mm/min',
    hazExtent: 'Alta (1,0 mm - 3,0 mm con borde templado)',
    operatingCost: 'Bajo (~$10 - $15 USD/h)',
    versatility: 'Exclusivamente metales electroconductores'
  },
  {
    process: 'Electroerosión por Hilo (Wire EDM)',
    removalMechanism: 'Descarga por micro-chispas térmicas en dieléctrico',
    thicknessRange: '1 mm a 200 mm',
    tolerance: '± 0,002 mm a ± 0,005 mm (submicrónica)',
    kerf: '0,10 mm a 0,30 mm',
    speedSteel12mm: '10 a 20 mm/min (muy lenta)',
    hazExtent: 'Mínima (capa de refundición recast blanca)',
    operatingCost: 'Muy Alto (~$85 USD/h por hilo y resinas)',
    versatility: 'Exclusivamente metales electroconductores'
  }
];

export const SO_WHAT_SYNTHESIS = [
  {
    tech: 'Láser de Fibra',
    verdict: 'Dominante en chapa delgada (<6 mm)',
    reason: 'Imbatible en costo y velocidad para producción masiva de chapa fina. Pierde viabilidad en metales reflectivos (cobre, bronce) y espesores macizos.'
  },
  {
    tech: 'Plasma HD',
    verdict: 'Líder en costo/metro de acero estructural grueso',
    reason: 'Rápido y económico para calderería pesada, pero genera conicidad pronunciada y ZAC con borde templado que exige rectificado posterior.'
  },
  {
    tech: 'Wire EDM',
    verdict: 'El rey de la precisión para matricería',
    reason: 'Tolerancias submicrónicas insustituibles en matrices de corte, pero restringido a metales conductores y con velocidades de avance sumamente lentas.'
  },
  {
    tech: 'Chorro de Agua (AWJM)',
    verdict: 'La solución insustituible cuando la integridad metalúrgica es crítica',
    reason: 'En titanio (Ti-6Al-4V) e Inconel 718 no crea microfisuras ni capa fragilizada. En compuestos de carbono (CFRP) corta sin delaminar ni quemar la matriz epoxi.'
  }
];


export const DEFECTS_CATALOG: DefectItem[] = [
  {
    id: 'taper',
    name: 'Conicidad en la Pared',
    alias: 'Kerf Taper (Conicidad Natural del Chorro)',
    visualDesc: 'Diferencia de ancho entre la cara superior de entrada (W_top) y la cara inferior de salida (W_bottom), dejando la pared inclinada con un ángulo θ_t.',
    cause: 'El chorro pierde energía cinética por fricción y choque al profundizar en el espesor, o por desgaste cónico del tubo mezclador.',
    mechatronicFix: 'Compensación 5 ejes en tiempo real (Flow Dynamic XD / OMAX Tilt-A-Jet) volcando el taper al scrap; reducir velocidad de avance o cambiar consumibles.',
    diagramType: 'taper'
  },
  {
    id: 'draglines',
    name: 'Marcas de Estriado ("Drag Lines")',
    alias: 'Striations / Striation Drag Angle',
    visualDesc: 'Líneas curvas o estrías pronunciadas hacia atrás en el tercio inferior del corte, dejando una superficie rugosa y áspera.',
    cause: 'Velocidad de avance (Vf) demasiado rápida para el espesor del material; la base del chorro se retrasa respecto a la boquilla superior.',
    mechatronicFix: 'Bajar velocidad de avance (seleccionar calidad Q3 a Q5), aumentar la presión hidráulica UHP o incrementar el caudal de abrasivo.',
    diagramType: 'draglines'
  },
  {
    id: 'incomplete',
    name: 'Corte Incompleto / No Perfora',
    alias: 'Uncut Material / Piercing Failure',
    visualDesc: 'El chorro no llega a atravesar la chapa, rebotando en el fondo o dejando la pieza unida por puentes metálicos.',
    cause: 'Presión UHP insuficiente de la bomba, abrasivo húmedo que apelmaza la tolva, o tubo focalizador obstruido.',
    mechatronicFix: 'Verificar la bomba intensificadora/direct drive, purgar la línea de granate con aire seco, comprobar el vacío Venturi y secar el abrasivo.',
    diagramType: 'incomplete'
  },
  {
    id: 'jetlag',
    name: 'Desviación del Corte en Esquinas',
    alias: 'Corner Washout / Inercia del Chorro',
    visualDesc: 'Sub-corte en el vértice interior de una esquina a 90° o ensanchamiento irregular de la sangría en cambios bruscos de dirección.',
    cause: 'Inercia de la columna inferior del chorro que continúa su trayectoria previa mientras el cabezal superior ya dobló la esquina.',
    mechatronicFix: 'Algoritmo CNC "Corner Pass" con Look-Ahead que desacelera anticipadamente antes del vértice e inclina el cabezal 5 ejes para verticalizar el chorro.',
    diagramType: 'jetlag'
  },
  {
    id: 'rollover',
    name: 'Redondeo del Borde Superior',
    alias: 'Top Edge Roll-Over & Frosting',
    visualDesc: 'Pérdida del filo vivo en la arista de entrada, con chaflán redondeado y franja opaca periférica de 0,5 a 1,5 mm.',
    cause: 'Distancia boquilla-pieza excesiva (SOD > 3,5 mm) o desgaste del orificio primario de joya.',
    mechatronicFix: 'Control de lazo cerrado del eje Z con palpador de terreno capacitivo (Terrain Follower) para mantener SOD constante en 1,5 mm.',
    diagramType: 'rollover'
  },
  {
    id: 'blowout',
    name: 'Cráter en Punto de Perforación',
    alias: 'Piercing Blowout / Witness Mark',
    visualDesc: 'Cráter o muesca irregular en la arista de la pieza donde se inició o cerró el contorno.',
    cause: 'Perforar directamente sobre la línea de contorno o corte instantáneo sin trayectoria de aproximación suave.',
    mechatronicFix: 'Generar entradas tangenciales Lead-in y salidas Lead-out en arco en la zona de desecho, con perforación dinámica y vacío previo UltraPierce.',
    diagramType: 'piercing'
  }
];

export const MACHINERY_COMPONENTS: MachineryComponent[] = [
  {
    component: 'Bomba Intensificadora / Direct Drive',
    function: 'Genera la presión ultra alta (UHP)',
    techDetails: 'Comprime el agua filtrada desde 3.800 bar hasta 6.480 bar (94.000 psi). Utiliza circuitos electrohidráulicos o servomotores cigüeñal triplex.',
    specs2026: 'Bomba HyperJet de Flow: 94.000 psi (6.480 bar). Corta 30-50% más rápido que a 60.000 psi y ahorra 25-35% de granate (hasta ~50% a 90k psi).'
  },
  {
    component: 'Cabezal de Corte (Orificio + Cámara + Tubo)',
    function: 'Convierte presión en chorro supersónico y mezcla el abrasivo',
    techDetails: 'Orificio de gema (diamante/zafiro de 0,1 a 0,35 mm) transforma presión en chorro a Mach 3.5 (~1.000 m/s); cámara Venturi succiona granate y tubo mezclador colima el haz.',
    specs2026: 'Orificio de diamante con vida útil de más de 1.000 horas continuas y tubo focalizador de carburo de tungsteno ROCTEC.'
  },
  {
    component: 'Cabezal Articulado 5 Ejes (A y C)',
    function: 'Compensación dinámica de conicidad y cortes 3D',
    techDetails: 'Muñeca cinemática articulada que inclina el cabezal en tiempo real en los ejes A y C para contrarrestar la conicidad natural y el retardo del chorro.',
    specs2026: 'Inclinación de hasta 60° para biselados en V, Y, chaflanes de soldadura y piezas complejas 3D en una sola operación.'
  },
  {
    component: 'Puente / Mesa CNC (X, Y, Z)',
    function: 'Movimiento relativo del cabezal con máxima precisión',
    techDetails: 'Estructura cartesiana de pórtico con servomotores brushless, guías lineales de alta rigidez y encoders ópticos absolutos con resolución micrométrica.',
    specs2026: 'Sistemas inteligentes con algoritmos Look-Ahead que anticipan curvas y esquinas para regular velocidad de avance.'
  },
  {
    component: 'Tolva Dosificadora de Abrasivo',
    function: 'Alimentación controlada de granate mineral',
    techDetails: 'Minidispensador montado sobre el eje Z con disco dosificador motorizado que entrega un caudal regulado de 0,3 a 0,7 kg/min.',
    specs2026: 'Sensores ópticos y de vacío en lazo cerrado para evitar apelmazamiento y detener el corte si falta abrasivo.'
  },
  {
    component: 'Tanque de Captación con Reja de Soporte',
    function: 'Soporta la pieza de trabajo y disipa la energía del chorro',
    techDetails: 'Tanque lleno de agua con lamas o rejas de sacrificio donde apoya la chapa. Amortigua la energía residual del chorro de agua y recolecta el lodo.',
    specs2026: 'Nivel de agua regulable neumáticamente para corte sumergido: reduce el ruido de 105 dBA a menos de 75 dBA y suprime la niebla.'
  }
];

export const AUXILIARY_SERVICES = [
  { service: 'Alimentación Eléctrica', requirement: 'Red trifásica 380V (50/60 Hz) con potencia de 60 a 125 HP (45 a 93 kW) para accionar la bomba UHP.' },
  { service: 'Agua Potable Filtrada', requirement: 'Agua tratada con ósmosis inversa y ablandador; TDS controlado (50-150 ppm) para proteger sellos y orificios de joya.' },
  { service: 'Chiller de Enfriamiento', requirement: 'Unidad de refrigeración de circuito cerrado para disipar el calor generado por el aceite hidráulico de la bomba intensificadora.' },
  { service: 'Aire Comprimido Seco', requirement: '6 a 7 bar con secador frigorífico (punto de rocío <3 °C); indispensable para accionar válvulas y evitar que el abrasivo se humedezca.' },
  { service: 'Remoción y Reciclaje de Abrasivo', requirement: 'Sistemas automáticos tipo hydro-cyclone que extraen el lodo y equipos de reciclaje que permiten reutilizar hasta 60-70% del granate.' }
];

export const WORKING_PARAMETERS_TABLE: WorkingParameter[] = [
  {
    variable: 'Presión UHP (bar / psi)',
    effect: '↑ Presión = ↑ Velocidad de corte y ↓ Consumo de abrasivo',
    recommendedRange: '3.800 a 6.480 bar (55.000 a 94.000 psi)',
    controlMethod: 'Regulación proporcional en la bomba UHP desde el panel de control CNC.'
  },
  {
    variable: 'Velocidad de Avance (mm/min)',
    effect: '↓ Velocidad = Mejor acabado superficial (Ra) y menor conicidad',
    recommendedRange: '5 a 5.000 mm/min (según espesor y calidad Q1 a Q5)',
    controlMethod: 'Cálculo algorítmico automático en el software CAM (OMAX IntelliMAX / FlowXpert).'
  },
  {
    variable: 'Caudal de Abrasivo (kg/min)',
    effect: 'Más abrasivo = Más potencia de corte, pero mayor rugosidad y costo',
    recommendedRange: '0,3 a 0,7 kg/min (a 90.000 psi se reduce ~50% respecto a 60.000 psi)',
    controlMethod: 'Disco dosificador rotativo o válvula dosificadora de abrasivo CNC.'
  },
  {
    variable: 'Altura del Cabezal - SOD (mm)',
    effect: 'Debe mantenerse constante; si SOD > 3 mm se ensancha el kerf y redondea la arista',
    recommendedRange: '1,5 a 2,5 mm sobre la chapa',
    controlMethod: 'Sensor de distancia láser o sonda táctil (Terrain Follower) en lazo cerrado.'
  },
  {
    variable: 'Diámetro Orificio / Tubo (mm)',
    effect: 'Define el ancho de corte (kerf de 0,8 a 1,5 mm) y la potencia hidráulica',
    recommendedRange: 'Orificio: 0,10 a 0,35 mm | Tubo: 0,76 a 1,02 mm',
    controlMethod: 'Selección mecánica de consumibles calibrados según espesor a cortar.'
  },
  {
    variable: 'Tipo de Perforación (Piercing)',
    effect: 'Garantiza inicio seguro sin romper materiales frágiles ni generar cráteres',
    recommendedRange: 'Radial, Dinámica o Estacionaria',
    controlMethod: 'Selección automática por software según espesor y ductilidad del material.'
  }
];

export const GOLDEN_EFFECTS = [
  {
    id: 'garden-hose',
    tag: 'Presión UHP',
    highlight: '94.000 psi = 1.800 veces una manguera de jardín',
    detail: 'Una manguera domiciliaria entrega ~50 psi. A 94.000 psi (6.480 bar), el agua sale a casi 4 veces la velocidad del sonido (~1.150 m/s).'
  },
  {
    id: 'zero-haz',
    tag: 'Metalurgia',
    highlight: 'El ÚNICO proceso de corte en frío de la jornada: ZAT = 0,00 mm',
    detail: 'No hay calor, no hay refundición ni borde templado martensítico. Conserva intacta la microestructura de aceros, titanio e Inconel.'
  },
  {
    id: 'antelope-canyon',
    tag: 'Principio Físico',
    highlight: 'El Cañón del Antílope acelerado 1.000 veces',
    detail: 'El fenómeno es erosión mecánica pura por micro-impactos a alta velocidad, igual que el viento y agua tallan cañones en la roca.'
  },
  {
    id: 'hyperjet-savings',
    tag: 'Economía 2026',
    highlight: 'HyperJet 94k: 30-50% más rápido y hasta 50% ahorro de abrasivo',
    detail: 'Al aumentar la presión a 94.000 psi, la energía cinética del chorro se duplica, reduciendo drásticamente los gramos de granate por pieza.'
  },
  {
    id: 'five-axis-bevel',
    tag: 'Cinemática 5D',
    highlight: 'Bisel 3D con 5 ejes que elimina el fresado posterior',
    detail: 'El cabezal se inclina hasta 60° realizando chaflanes de soldadura y piezas complejas en una sola operación sin mecanizado secundario.'
  },
  {
    id: 'lights-out',
    tag: 'Industria 4.0',
    highlight: 'Lights-Out Cutting: Mecanizado nocturno 100% desatendido',
    detail: 'Con diagnóstico remoto cloud, nesting automático y sensores de protección, la máquina corta de noche sin operador humano.'
  }
];

export const PRESENTATION_SLIDES = [
  {
    id: 1,
    time: '00:00 - 03:00',
    speaker: 'Diego',
    title: '1. Introducción al Proceso y Principio Físico',
    objectives: [
      'Bienvenida institucional (UTN FRP - TUM Viale) y presentación de Diego Francisconi y Ariel Martinez',
      'Definición de corte en frío: agua a presión ultra alta (hasta 94.000 psi / 6.480 bar) a casi 4 veces la velocidad del sonido',
      'Dos modalidades operativas: Chorro Puro (PWJ) para elastómeros y Chorro Abrasivo (AWJ) con granate para metales y piedra',
      'Golpe de Efecto 1: "94.000 psi = 1.800 veces la presión de una manguera de jardín"',
      'Principio físico: erosión mecánica por micro-impactos ("el Cañón del Antílope acelerado 1.000 veces")',
      'Microcorte en metales dúctiles vs microfractura en materiales frágiles: ZAT = 0,00 mm, sin deformación ni templado'
    ],
    interactiveAction: 'Mostrar en el Dashboard el indicador de velocidad Mach 3.06, la presión UHP y la ausencia de gradiente térmico.'
  },
  {
    id: 2,
    time: '03:00 - 06:00',
    speaker: 'Diego',
    title: '2. Principio de Funcionamiento Paso a Paso',
    objectives: [
      'Paso 1 - Generación de presión: bomba intensificadora / direct drive presuriza agua a 4.000–6.200 bar',
      'Paso 2 - Conducción: tuberías autofretadas de acero inoxidable 316 CW hasta el cabezal',
      'Paso 3 - Conversión: orificio de joya (zafiro, rubí o diamante de 0,1–0,35 mm) transforma presión en chorro supersónico (~1.000 m/s)',
      'Paso 4 - Mezcla abrasiva: el vacío generado por efecto Venturi succiona granate de almandino a la cámara',
      'Paso 5 - Corte: el tubo mezclador de carburo de tungsteno colima el chorro y erosiona la pieza',
      'Paso 6 - Movimiento relativo: pórtico CNC en X, Y, Z y cinemática A/C de 5 ejes sobre reja y tanque de captación'
    ],
    interactiveAction: 'Abrir el Corte Transversal Interactivo del Cabezal y hacer clic en cada componente para ver la transformación hidrodinámica.'
  },
  {
    id: 3,
    time: '06:00 - 09:30',
    speaker: 'Diego',
    title: '3. Maquinaria, Tecnología 2026 e Industria 4.0',
    objectives: [
      'Los 5 componentes principales: Bomba UHP, Cabezal de corte, Mesa CNC, Tolva de abrasivo y Tanque con reja',
      'Servicios auxiliares de planta: electricidad (60-125 HP), agua desmineralizada, chiller, aire comprimido seco y reciclaje de granate (60-70%)',
      'Lo Premium 2026: Bomba HyperJet de Flow a 94.000 psi (corta 30-50% más rápido y consume ~50% menos abrasivo)',
      'Cabezal 5 ejes (A y C): inclinación de hasta 60° para biselados, chaflanes y piezas 3D',
      'Software inteligente (OMAX IntelliMAX / FlowXpert) y compensación dinámica de conicidad en tiempo real',
      'Industria 4.0: diagnóstico remoto cloud (Remote Help), nesting automático de chapa y Lights-Out Cutting (corte nocturno desatendido)'
    ],
    interactiveAction: 'Mostrar la comparativa técnica de bombas y la animación de inclinación de 5 ejes compensando la conicidad.'
  },
  {
    id: 4,
    time: '09:30 - 12:30',
    speaker: 'Ariel',
    title: '4. Herramientas, Materiales y Parámetros Operativos',
    objectives: [
      'Consumibles críticos: Orificio de gema (diamante >1.000 h vs zafiro 40-80 h), tubo mezclador de carburo ROCTEC y granate malla 80/120',
      'Espectro ilimitado de materiales: metales aeroespaciales (Ti-6Al-4V, Inconel 718), metales reflectivos (cobre C11000, aluminio 6061) y Hardox 500',
      'Capacidades de espesor: desde láminas delgadas hasta metales de más de 250-300 mm en una sola pasada',
      'Variables de trabajo: Presión (bar), Velocidad de avance (mm/min), Caudal de abrasivo (kg/min) y Distancia SOD constante',
      'Tipos de perforación (Piercing): Radial, Dinámica y Estacionaria con tecnología UltraPierce según espesor y fragilidad'
    ],
    interactiveAction: 'En el Simulador AWJ, alternar entre Titanio, Cobre y Hardox, mostrando la variación de avance según el factor M.'
  },
  {
    id: 5,
    time: '12:30 - 16:00',
    speaker: 'Ariel',
    title: '5. Calidad de Corte (Q1 a Q5) y Diagnóstico de Defectos',
    objectives: [
      'Índices de calidad Q1 a Q5: de desbaste rápido a precisión extrema aeroespacial (tolerancias ±0,1 mm, Ra 1,4 a 6 µm)',
      'Defecto 1 - Conicidad en la pared: corregida al 100% con cabezal de 5 ejes volcando el taper al scrap',
      'Defecto 2 - Marcas de estriado ("Drag Lines"): avance excesivo; solución regulando velocidad y presión',
      'Defecto 3 - Corte incompleto / no perfora: presión insuficiente o granate húmedo; monitoreo de flujo y purga',
      'Defecto 4 - Desviación en esquinas (Jet Lag): inercia del chorro resuelta con algoritmo "Corner Pass" con Look-Ahead'
    ],
    interactiveAction: 'Entrar al módulo de Diagnóstico de Defectos y alternar el botón "Vista: CORRECCIÓN MECATRÓNICA ACTIVA" en vivo.'
  },
  {
    id: 6,
    time: '16:00 - 19:30',
    speaker: 'Diego y Ariel',
    title: '6. Seguridad, Sustentabilidad Verde y Cierre Estelar',
    objectives: [
      'Seguridad UHP de nivel quirúrgico: corte sumergido para reducir el ruido de 105 dBA a <75 dBA, cerramientos PLe y tarjeta médica',
      'Sustentabilidad ecológica: el proceso más limpio de la industria (cero humos de cromo Cr⁶⁺, agua recirculada, reciclaje del 60-70% de abrasivo)',
      'Matriz de decisión: ¿Cuándo elegir chorro de agua? Cero ZAT, espesores macizos, metales reflectivos y bisel 3D en 1 sola operación',
      'Cierre conjunto: Demostración final del gemelo digital y ronda de preguntas frente al tribunal de la UTN FRP'
    ],
    interactiveAction: 'Cierre con la pantalla completa del simulador en modo interactivo e invitar a los profesores a proponer un material para simular.'
  }
];

export const CLOSING_STATEMENTS = [
  {
    author: 'Ariel & Diego',
    focus: 'Manufactura Avanzada',
    quote: 'El corte por chorro de agua demuestra que la manufactura avanzada no siempre necesita calor para separar materiales: a veces, la precisión se logra con presión, control y tecnología inteligente.'
  },
  {
    author: 'Diego',
    focus: 'Metalurgia vs Procesos Térmicos',
    quote: 'Mientras otros procesos funden el material, el chorro de agua lo erosiona con control micrométrico, permitiendo cortar sin alterar su estructura cristalina y adaptándose a la industria 4.0.'
  },
  {
    author: 'Ariel',
    focus: 'Decisión Económica Industrial',
    quote: 'El proceso de chorro abrasivo es especialmente valioso cuando el costo de una alteración térmica (ZAC) es mayor que el costo operativo del abrasivo. Por eso se consolida como la tecnología insustituible en titanio aeroespacial y composites.'
  }
];

export const POWER_CALCULATION = {
  formula: 'Potencia_hidráulica = P × Q',
  description: 'Cálculo de la potencia hidráulica teórica entregada al chorro',
  example: {
    pressureMPa: 400,
    pressureBar: 4000,
    flowLmin: 2.0,
    flowM3s: '3,33 × 10⁻⁵ m³/s',
    hydraulicPowerKW: 13.3,
    electricPowerNote: 'La potencia eléctrica consumida por la unidad motriz será de 30 a 75 kW debido al rendimiento electrohidráulico (60-70% en intensificadores).'
  }
};

export const OPERATIONAL_STEPS_9 = [
  { step: 1, title: 'Programación CAD/CAM & Nesting Inteligente', desc: 'Importación del modelo DXF/STEP, anidado algorítmico para máximo aprovechamiento de la chapa, cálculo de velocidades según calidad Q1–Q5 y compensación de kerf.' },
  { step: 2, title: 'Sujeción de la Pieza sobre la Mesa CNC', desc: 'Fijación de la placa mediante morsets, topes mecánicos, ventosas o dispositivos magnéticos sobre las lamas de sacrificio de la mesa.' },
  { step: 3, title: 'Configuración y Calibración del Cabezal', desc: 'Ajuste del diámetro de tobera (0,1–0,35 mm), tubo focalizador ROCTEC, distancia de trabajo SOD (1,5–2,5 mm) y ángulo multieje A/C.' },
  { step: 4, title: 'Generación y Estabilización UHP', desc: 'La bomba intensificadora o servobomba directa presuriza el agua tratada hasta 4.000–6.480 bar, estabilizada por el acumulador atenuador de pulsos.' },
  { step: 5, title: 'Formación del Chorro y Vacío Venturi', desc: 'El agua supersónica pasa por la joya de diamante a Mach 3.5; la depresión en la cámara de mezcla succiona el flujo regulado de granate almandino.' },
  { step: 6, title: 'Perforación Inicial (Piercing Controlado)', desc: 'Estrategia de penetración suave, dinámica o radial con tecnología UltraPierce para no astillar materiales frágiles ni delaminar composites.' },
  { step: 7, title: 'Corte por Interpolación Cinemática Continua', desc: 'El cabezal recorre la trayectoria guiado por CNC con algoritmos Look-Ahead que desaceleran en esquinas vivas e inclinan el cabezal 5 ejes.' },
  { step: 8, title: 'Separación de Pieza y Disipación en Cuba', desc: 'El chorro remanente es frenado por la columna de agua del tanque de captura, amortiguando el ruido y canalizando el lodo al sistema de reciclaje.' },
  { step: 9, title: 'Descarga, Control Dimensional y Acabado', desc: 'Extracción de la pieza cortada; al ser corte en frío sin rebaba soldada ni ZAC, la pieza está lista para ensamble directo o desbarbado mínimo.' }
];

export const NORMATIVE_REFERENCES = [
  { code: 'ISO 23125', title: 'Seguridad en Máquinas Herramienta de Corte por Chorro de Agua', domain: 'Seguridad de Máquinas' },
  { code: 'ISO 13849-1', title: 'Seguridad de los Sistemas de Mando (Nivel PLe / Categoría 4)', domain: 'Interbloqueos y Parada' },
  { code: 'IEC 62443', title: 'Ciberseguridad en Sistemas de Control y Automatización Industrial (IACS)', domain: 'Industria 4.0 Cloud' },
  { code: 'WJTA / WJA', title: 'Protocolo Médico de Emergencia e Inyección a Ultra-Alta Presión', domain: 'Salud Ocupacional' },
  { code: 'Res. SRT 295/03', title: 'Higiene y Seguridad en el Trabajo – Límite de Exposición Acústica (85 dBA)', domain: 'Argentina / Laboral' },
  { code: 'Ley 24.051', title: 'Régimen de Residuos Industriales y Gestión de Lodos Abrasivos', domain: 'Medio Ambiente Argentina' }
];

export const SPEECH_SCRIPT_18MIN = [
  {
    interval: 'Minuto 0 a 1',
    speaker: 'Diego',
    section: 'Introducción Institucional',
    dialogue: 'Buenos días a los profesores y compañeros. Nuestro grupo, integrado por Ariel Martinez y quien les habla, Diego Francisconi, va a presentar el sistema de corte por chorro de agua. Un proceso de separación avanzada que utiliza agua a ultra-alta presión para erosionar mecánicamente el material. A diferencia del láser, plasma y oxicorte, este proceso corta 100% en frío: no funde el metal y garantiza una ventaja decisiva: cero zona afectada térmicamente.'
  },
  {
    interval: 'Minuto 1 a 3',
    speaker: 'Ariel',
    section: 'Descripción y Modalidades (PWJ vs AWJ)',
    dialogue: 'El proceso opera en dos variantes: Chorro Puro para materiales blandos como espumas, gomas o alimentos, y Chorro Abrasivo, donde añadimos granate mineral en la cámara de mezcla para cortar aceros templados, titanio, cobre y composites. En la industria metalmecánica, el corte abrasivo es la estrella, multiplicando la potencia de erosión hasta 1.000 veces.'
  },
  {
    interval: 'Minuto 3 a 5',
    speaker: 'Diego',
    section: 'Principio Físico y Termodinámica',
    dialogue: 'La bomba convierte energía eléctrica en energía hidráulica a más de 4.000 a 6.480 bar. Al atravesar un orificio microscópico de diamante de 0,3 mm, la presión se transforma en velocidad supersónica cercana a los 1.000 m/s por Bernoulli. Si calculamos la potencia hidráulica teórica para 400 MPa y 2 L/min, el chorro concentra más de 13 kilovatios en un milímetro cuadrado. No hay calor ni combustión: es el Cañón del Antílope tallado por agua y arena, pero acelerado mil veces.'
  },
  {
    interval: 'Minuto 5 a 7',
    speaker: 'Ariel',
    section: 'Principio de Funcionamiento Paso a Paso',
    dialogue: 'El flujo productivo inicia en el software CAD/CAM con nesting inteligente. Se sujeta la chapa, se presuriza la línea UHP y se ejecuta una perforación suave o dinámica para evitar cráteres. Luego, el pórtico CNC desplaza el cabezal erosionando la pieza de forma continua. La columna de agua en la cuba amortigua el chorro y recircula el fluido, entregando piezas terminadas sin deformación térmica.'
  },
  {
    interval: 'Minuto 7 a 9',
    speaker: 'Diego',
    section: 'Maquinaria, Bombas e Instalaciones',
    dialogue: 'La celda mecatrónica integra una bomba intensificadora o servobomba directa, acumulador atenuador de pulsos, cabezal de mezcla Venturi, mesa CNC y cuba de captura. Además, requiere servicios de planta: electricidad trifásica, aire seco para válvulas y una planta de ósmosis inversa para controlar que el agua tenga entre 50 y 150 ppm de sólidos, protegiendo los sellos.'
  },
  {
    interval: 'Minuto 9 a 11',
    speaker: 'Ariel',
    section: 'Herramientas, Consumibles y Materiales',
    dialogue: 'Los consumibles críticos son el orificio de diamante —que dura hasta 2.000 horas—, el tubo mezclador de carburo ROCTEC y el granate almandino malla 80. El abrasivo representa entre el 55% y el 70% del costo variable por hora. Cortamos metales reflectivos como cobre y aluminio sin problemas ópticos, aceros Hardox sin perder dureza y composites CFRP sin delaminar.'
  },
  {
    interval: 'Minuto 11 a 13',
    speaker: 'Diego',
    section: 'Parámetros Operativos y Calidad Q1-Q5',
    dialogue: 'Gobernamos presión, velocidad de avance, caudal de abrasivo y distancia boquilla-pieza. La calidad se clasifica de Q1 a Q5, desde separación rápida hasta precisión aeroespacial de ±0,05 mm. En piezas gruesas el chorro tiende a abrirse generando conicidad, pero los cabezales modernos de 5 ejes la anulan en tiempo real.'
  },
  {
    interval: 'Minuto 13 a 15',
    speaker: 'Ariel',
    section: 'Defectos, Seguridad y Ambiente',
    dialogue: 'Dos defectos clave son el corte incompleto —corregido ajustando presión y secando el granate— y el retraso parabólico o Stream Lag en esquinas, neutralizado desacelerando con algoritmos Look-Ahead. En seguridad, el protocolo médico WJTA exige que ante una punción UHP no se suture jamás y se practique fasciotomía dentro de las 6 horas. En ambiente, es el proceso más limpio: cero humos de cromo y reciclaje del 60% al 70% del granate.'
  },
  {
    interval: 'Minuto 15 a 17',
    speaker: 'Diego',
    section: 'Industria 4.0, Gemelo Digital y Aplicaciones',
    dialogue: 'Hoy el chorro de agua es una celda 4.0 conectada. Contamos con sensores IIoT de presión y vibración, gemelo digital para predecir colisiones antes de cortar, monitoreo cloud, cortes autónomos Lights-Out durante la noche y ciberseguridad industrial bajo norma IEC 62443.'
  },
  {
    interval: 'Minuto 17 a 18',
    speaker: 'Ariel & Diego',
    section: 'Conclusión y Cierre Estelar',
    dialogue: 'Como conclusión final: El corte por chorro de agua demuestra que la manufactura avanzada no siempre necesita calor para separar materiales: la precisión se logra con presión, control mecatrónico y tecnología inteligente. Mientras otros funden el metal, nosotros lo separamos con ZAC igual a cero. Quedamos a disposición del tribunal para la demostración en vivo de nuestro gemelo digital.'
  }
];


