import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('presentacion');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Clean text for standard WinAnsi Helvetica encoding in jsPDF
function clean(text) {
  if (!text) return '';
  return String(text)
    .replace(/—/g, ' - ')
    .replace(/–/g, '-')
    .replace(/≈/g, '~')
    .replace(/√/g, 'raiz')
    .replace(/·/g, '*')
    .replace(/ṁ/g, 'm_flujo')
    .replace(/θ/g, 'theta')
    .replace(/ρ/g, 'rho')
    .replace(/Δ/g, 'Delta')
    .replace(/µm/g, 'um')
    .replace(/µ/g, 'u')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/⁶/g, '^6')
    .replace(/⁺/g, '+')
    .replace(/⁻/g, '^-')
    .replace(/≥/g, '>=')
    .replace(/≤/g, '<=')
    .replace(/•/g, '-')
    .replace(/“|”/g, '"')
    .replace(/‘|’/g, "'")
    .replace(/[^\x20-\x7E\xA0-\xFF\n\r\t]/g, '');
}

// ============================================================================
// DATA: NARRATIVA DETALLADA POR EXPOSITOR Y DIAPOSITIVA
// ============================================================================

const DIEGO_SLIDES = [
  {
    slideNum: 'DIAPOSITIVA 1 (Apertura Institucional)',
    time: '00:00 - 01:30 min',
    title: 'Portada Institucional UTN FRP - Corte por Chorro de Agua Abrasivo (AWJ 4.0)',
    role: 'Apertura formal y planteo de la tesis central de Manufactura en Frío.',
    narrative: [
      '"Buenos días a los profesores del tribunal y compañeros. Nuestro equipo está integrado por Ariel Martinez y quien les habla, Diego Francisconi, estudiantes de la Tecnicatura Universitaria en Mecatrónica de la UTN Facultad Regional Paraná, Extensión Áulica Viale."',
      '"Hoy vamos a presentar y defender nuestro proyecto integrador sobre el Corte por Chorro de Agua Abrasivo bajo el paradigma de la Industria 4.0 (AWJ 4.0)."',
      '"Para comenzar, queremos destacar la premisa fundamental que diferencia a esta tecnología de cualquier otro método tradicional como el láser, el plasma o el oxicorte: estamos ante un proceso de manufactura 100% en frío. Mientras los procesos térmicos funden o vaporizan el metal aportando calor extremo, el chorro de agua separa la materia mediante energía hidrodinámica supersónica pura."',
      '"Como ven en los tres indicadores inferiores de nuestra portada, toda nuestra exposición girará en torno a tres pilares físicos innegociables: una Zona Afectada por el Calor exactamente igual a cero (ZAC = 0,00 mm), presiones de ultra-alta presión que hoy alcanzan los 6.480 bar, y velocidades de impacto supersónicas de Mach 3.06."'
    ],
    explanation: [
      'Qué se muestra en pantalla: Portada oscura de alto contraste (Dark Canvas #1) con los datos institucionales de la UTN FRP Viale, los nombres de ambos expositores y las 3 métricas físicas clave.',
      'Por qué es importante: Establece desde el minuto cero que el enfoque del trabajo no es meramente descriptivo, sino mecatrónico: combina mecánica de fluidos extrema con control CNC multieje.',
      'Dato técnico para el tribunal: El botón superior "Cabezal 3D Interactivo" permite mostrar en vivo el modelo WebGL del cabezal AWJ rotando a 60 FPS en la misma portada.'
    ],
    action: 'Señalar las 3 métricas inferiores (ZAC = 0,00 mm | 6.480 bar | Mach 3.06) y opcionalmente alternar el botón "Cabezal 3D Interactivo" antes de avanzar con la tecla [Flecha Derecha].'
  },
  {
    slideNum: 'DIAPOSITIVA 2 (Sección 01 - Principio Físico)',
    time: '01:30 - 03:30 min',
    title: 'Erosión Mecánica Supersónica Sin Aporte Térmico',
    role: 'Explicar la física de conversión presión-velocidad y el mecanismo dual de remoción.',
    narrative: [
      '"Pasando al principio físico del proceso, ¿cómo logramos cortar una placa maciza de acero o titanio usando agua? El secreto está en concentrar una presión extrema en un área microscópica."',
      '"En primer lugar, trabajamos con bombas de Ultra-Alta Presión (UHP) que llevan el agua hasta los 6.480 bar, equivalentes a 94.000 PSI. Para dimensionar esta magnitud física: es 1.800 veces la presión de una manguera domiciliaria."',
      '"En segundo lugar, cuando hacemos pasar esa agua presurizada por un orificio calibrado de diamante sintético de apenas un cuarto de milímetro, la energía potencial de presión se transforma por principio de Bernoulli en energía cinética pura. El chorro emerge a 1.050 metros por segundo, es decir, Mach 3.06: más de tres veces la velocidad del sonido en el aire."',
      '"En tercer lugar, logramos una Zona Afectada Térmicamente de 0,00 milímetros. Es exactamente el mismo fenómeno geológico con el que el agua y la arena tallan un cañón en la roca durante miles de años, pero acelerado mil veces y concentrado en un haz de menos de un milímetro. En los metales dúctiles actúa por micro-corte y cizalladura plástica en frío, y en materiales frágiles como el vidrio o la cerámica actúa por micro-fractura controlada sin choque térmico."'
    ],
    explanation: [
      'Ecuación física de respaldo: Según Bernoulli modificada por compresibilidad del agua (a >4.000 bar el agua se comprime un 10-12% aumentando su densidad) y el coeficiente de descarga Cd ~ 0,65 a 0,72 del orificio de diamante, v_real = Cd * raiz(2*P / rho) ~ 1.050 m/s.',
      'Flujo abrasivo activo: A ese chorro supersónico se le inyectan aproximadamente 1,1 millones de partículas por segundo de granate almandino Barton Malla 80.',
      'Ventaja metalúrgica: Al no superar los 50-60 °C en la zona de impacto (y ser refrigerado instantáneamente por el propio chorro), no hay cambio de fase cristalina, ni martensita templada, ni tensiones residuales.'
    ],
    action: 'Hacer clic en el botón naranja inferior derecho "Ver Registro Real" para abrir la fotografía industrial de una celda cortando acero inoxidable de 80 mm y cerrarla con [ESC].'
  },
  {
    slideNum: 'DIAPOSITIVA 3 (Sección 02 - Génesis y Evolución Operativa)',
    time: '03:30 - 05:30 min',
    title: 'Chorro de Agua Pura (PWJ) vs Chorro Abrasivo (AWJ 4.0)',
    role: 'Diferenciar las dos ramas tecnológicas del proceso y justificar el enfoque en AWJ 4.0.',
    narrative: [
      '"En la industria existen dos modalidades operativas bien diferenciadas que nacen del mismo principio hidrodinámico: el corte con Agua Pura (PWJ) y el corte con Chorro Abrasivo (AWJ)."',
      '"En el esquema infográfico vemos a la izquierda el Chorro de Agua Pura (PWJ). Utiliza únicamente agua filtrada que sale por un orificio diminuto de entre 0,08 y 0,20 milímetros. No lleva ningún mineral abrasivo. Es sumamente veloz —alcanza de 10 a 50 metros por minuto— y deja una sangría casi invisible de 0,15 milímetros. ¿Para qué se usa? Exclusivamente para materiales blandos: juntas de goma, espumas, polímeros, cuero, cartón y en la industria alimenticia, porque es un corte 100% aséptico y estéril. Sin embargo, si intentamos cortar acero con agua pura, el chorro simplemente rebota."',
      '"Ahí es donde entra nuestra segunda columna: el Chorro de Agua Abrasivo (AWJ). Al agregar granate almandino Malla 80 al chorro supersónico, multiplicamos su poder de erosión por mil. Cada partícula mineral actúa como una micro-herramienta de corte a más de 650 metros por segundo, permitiendo cortar aceros templados, titanio, superaleaciones y blindajes de más de 250 milímetros de espesor."',
      '"Como síntesis mecatrónica: una máquina AWJ 4.0 contiene al PWJ. Si cerramos la válvula dosificadora de abrasivo, la misma celda puede cortar juntas de goma por la mañana y placas de titanio aeroespacial por la tarde."'
    ],
    explanation: [
      'Por qué la diapositiva tiene dos vistas ("Esquema Infográfico" y "Fichas y Métricas"): Permite mostrar primero el diagrama comparativo visual de las boquillas y luego conmutar a la tabla de parámetros exactos (diámetro de orificio, carga abrasiva 0,00 vs 0,40 kg/min, ancho de sangría y reto de los 5 ejes).',
      'Defensa ante el tribunal: Aunque el principio base nace del agua pura, la cátedra de Corte de Metales y la Mecatrónica exigen estudiar el sistema AWJ 4.0 porque es el que incorpora control de vacío Venturi, dosificación electrónica de granate y cinemática de 5 ejes.'
    ],
    action: 'Mostrar primero el "Esquema Infográfico" (haciendo clic en la imagen si se desea hacer zoom HD) y luego pulsar el botón superior "Fichas y Métricas" para mostrar las 3 tarjetas técnicas.'
  },
  {
    slideNum: 'DIAPOSITIVA 4 (Sección 03 - Arquitectura Hidrodinámica)',
    time: '05:30 - 07:30 min',
    title: 'Cabezal de Corte AWJ y Efecto Venturi',
    role: 'Explicar la ingeniería interna del cabezal paso a paso y sus consumibles críticos.',
    narrative: [
      '"Veamos ahora qué ocurre exactamente dentro del cabezal de corte AWJ, recorriendo las cuatro etapas de su arquitectura interna que tenemos a la izquierda."',
      '"En el paso 1, el agua desmineralizada ingresa a 6.480 bar a través de tuberías de acero inoxidable autofretadas. La autofretación es un proceso donde el tubo se somete previamente a más de 10.000 bar para crear tensiones residuales de compresión en su pared interna y evitar que se fisure por fatiga."',
      '"En el paso 2, el agua atraviesa el Orificio de Joya Primaria, de unos 0,25 a 0,33 milímetros. Hoy se utiliza diamante sintético policristalino en lugar de zafiro o rubí, porque el diamante garantiza más de 1.000 horas de vida útil —25 veces más que el zafiro— manteniendo el chorro perfectamente coherente a Mach 3.06."',
      '"En el paso 3 ocurre el fenómeno clave: el Efecto Venturi. Al pasar el chorro supersónico a través de la cámara de mezcla, arrastra el aire circundante y genera una depresión o vacío de entre -0,85 y -0,95 bar. Ese vacío succiona de forma continua y pasiva el granate seco desde la tolva dosificadora sin necesidad de piezas móviles que se desgasten."',
      '"Finalmente, en el paso 4, el agua, el aire y el granate ingresan al Tubo Mezclador o Focalizador ROCTEC de carburo de tungsteno de grano nanométrico, de 0,76 milímetros de diámetro interno. Allí el agua transfiere su cantidad de movimiento a los granos minerales y el haz sale colimado hacia la chapa, manteniendo una distancia de trabajo ( separación boquilla-pieza) estricta de 1,5 milímetros regulada en lazo cerrado por un sensor capacitivo seguidor de terreno."'
    ],
    explanation: [
      'Conservación del momento lineal en la cámara Venturi: m_agua * v_agua = (m_agua + m_abrasivo + m_aire) * v_mezcla. Si se dosifica demasiado abrasivo (>700 g/min), la mezcla se satura, cae la velocidad y se tapa el tubo.',
      'Por qué es crítica la distancia de 1,5 mm (Separación boquilla-pieza): Si el cabezal se aleja a más de 3 o 4 mm de la chapa, el chorro supersónico se abre en forma de campana, redondeando el borde superior y ensanchando la sangría.'
    ],
    action: 'Recorrer visualmente los bloques 1 a 4 de la izquierda y destacar las 3 tarjetas de métricas de la derecha (>1.000 h diamante | -0,85 bar vacío | 1,5 mm constante).'
  },
  {
    slideNum: 'DIAPOSITIVA 5 (Sección 04 - Cadena Energética Hidrodinámica)',
    time: '07:30 - 09:00 min',
    title: 'Cadena de Transformación Energética',
    role: 'Cerrar el bloque de física e hidrodinámica sintetizando las 4 fases de energía y ceder la palabra a Ariel.',
    narrative: [
      '"Para cerrar este primer bloque sobre la física y la arquitectura de la máquina, en esta línea de tiempo horizontal resumimos toda la cadena de transformación energética en cuatro fases."',
      '"En la Fase 01 (Presurización), la bomba intensificadora electrohidráulica o servobomba directa toma energía eléctrica trifásica de la red y eleva la presión del agua hasta los 6.480 bar, estabilizando el flujo con un acumulador atenuador de pulsos."',
      '"En la Fase 02 (Aceleración), la joya primaria de diamante convierte esa energía potencial de presión en velocidad supersónica pura a Mach 3.06."',
      '"En la Fase 03 (Mezcla Abrasiva), el efecto Venturi incorpora 1,1 millones de partículas de granate por segundo —unos 350 a 550 gramos por minuto— y el tubo ROCTEC colima el flujo trifásico."',
      '"Y en la Fase 04 (Corte en Frío), esa energía cinética concentrada impacta sobre la pieza logrando una separación micrométrica con ZAC igual a cero. Como referencia de ingeniería que figura al pie: para una operación a 4.000 bar y 2 litros por minuto, la potencia hidráulica pura concentrada en ese chorro de menos de un milímetro cuadrado es de 13,3 kilovatios, accionada por un motor eléctrico de entre 37 y 45 kilovatios."',
      '"Ahora le cedo la palabra a mi compañero Ariel Martinez, quien va a analizar cómo compite esta tecnología frente al láser y al plasma, cómo funciona la cinemática de 5 ejes y cómo controlamos la calidad y los defectos en planta."'
    ],
    explanation: [
      'Cálculo de potencia hidráulica (muy valorado por los docentes): P_hid = P * Q. Pasando al Sistema Internacional: P = 400 MPa = 400 x 10^6 Pa; Q = 2 L/min = 3,33 x 10^-5 m^3/s. Multiplicando ambos: P_hid = 13.333 W = 13,3 kW.',
      'Rendimiento de bombas: Una bomba intensificadora hidráulica tiene un rendimiento del 65-72% (por las pérdidas térmicas del aceite hidráulico, que requiere enfriador de circuito cerrado), mientras que una servobomba de accionamiento directo triplex alcanza el 85-90% de eficiencia.'
    ],
    action: 'Señalar de izquierda a derecha las Fases 01 a 04, mencionar la fórmula P_hid = P x Q ≈ 13,3 kW del bloque inferior y darle el pase a Ariel avanzando a la Diapositiva 6.'
  },
  {
    slideNum: 'DIAPOSITIVA 10 (Sección 09 - Intervención de Diego: Pilares 01 y 02)',
    time: '16:30 - 17:30 min',
    title: 'AWJ en la Industria 4.0: Telemetría IoT y Anidamiento Inteligente CAM',
    role: 'Exponer los dos primeros pilares ciberfísicos de la Industria 4.0 antes de que Ariel exponga los pilares 03 y 04.',
    narrative: [
      '"Retomando la palabra para analizar cómo se integra hoy esta máquina en un ecosistema de Industria 4.0, vemos cuatro pilares fundamentales. Yo voy a explicar los dos primeros vinculados a la digitalización y el software, y Ariel explicará la autonomía y sustentabilidad."',
      '"El Pilar 01 es la Telemetría IoT en la Nube. Una celda AWJ 4.0 moderna no es una máquina aislada: cuenta con sensores de presión, temperatura de aceite y acelerómetros de vibración conectados en red bajo normas de ciberseguridad industrial IEC 62443. Esto permite el mantenimiento predictivo: el sistema detecta la caída de rendimiento en los sellos de ultra-alta presión o el desgaste del orificio de diamante antes de que ocurra una rotura en medio de un corte crítico."',
      '"El Pilar 02 es el Anidamiento Inteligente CAM. Como el chorro de agua no genera calor ni deforma térmicamente la chapa, podemos anidar las piezas a apenas 2 milímetros de distancia entre sí e incluso compartir líneas de corte comunes sin riesgo de que la chapa se alabee o se suelde por temperatura, logrando un aprovechamiento de materia prima superior al 92%."'
    ],
    explanation: [
      'Por qué el Anidamiento Inteligente en AWJ supera al térmico: En plasma o láser, si las piezas se colocan muy juntas en chapas gruesas, el calor acumulado deforma el esqueleto de la chapa y mueve las piezas. En AWJ, al ser corte en frío, la chapa permanece dimensionalmente estable de principio a fin.'
    ],
    action: 'Señalar los Pilares 01 y 02 de la Diapositiva 10 y cederle la palabra a Ariel para los Pilares 03 y 04.'
  },
  {
    slideNum: 'DIAPOSITIVA 11 (Sección 10 - Cierre Conjunto: Intervención de Diego)',
    time: '18:30 - 19:00 min',
    title: 'Conclusiones y Defensa ante el Tribunal (Síntesis Mecatrónica)',
    role: 'Pronunciar la reflexión mecatrónica de cierre junto con Ariel.',
    narrative: [
      '"Para concluir nuestra presentación, queremos dejar esta síntesis que resume la esencia mecatrónica del proyecto: El chorro de agua abrasivo demuestra que la manufactura avanzada no necesita calor para separar materiales; la máxima precisión se logra combinando energía cinética supersónica, control multieje en lazo cerrado y algoritmos inteligentes."'
    ],
    explanation: [
      'Esta frase conecta directamente las tres áreas de la Tecnicatura en Mecatrónica: Mecánica/Fluidos (energía cinética), Electrónica/Control (lazo cerrado multieje) e Informática Industrial (algoritmos inteligentes).'
    ],
    action: 'Mantener la Diapositiva 11 en pantalla y dar pie a Ariel para el saludo final y la apertura del Simulador CNC en vivo.'
  }
];

const ARIEL_SLIDES = [
  {
    slideNum: 'DIAPOSITIVA 6 (Sección 05 - Comparativa de Tecnologías)',
    time: '09:00 - 11:00 min',
    title: 'Chorro de Agua vs Procesos Térmicos (Plasma HD y Láser de Fibra)',
    role: 'Tomar la posta de Diego, comparar cuantitativamente AWJ contra Plasma y Láser, y mostrar la evidencia metalográfica.',
    narrative: [
      '"Muchas gracias, Diego. Ahora que conocemos cómo se genera y colima el chorro supersónico, la pregunta industrial clave es: ¿cómo compite el Chorro de Agua Abrasivo frente a los dos gigantes del corte térmico, que son el Plasma de Alta Definición y el Láser de Fibra Óptica?"',
      '"En la primera columna tenemos el Plasma de Alta Definición. Es un proceso rápido y económico para acero estructural, pero opera con un arco ionizado a más de 20.000 grados Kelvin. Eso deja una Zona Afectada por el Calor severa, de 2 a 5 milímetros, tolerancias amplias de más/menos 1 milímetro y un borde templado martensítico durísimo. Si luego queremos roscar o fresar esa pieza, el borde templado rompe los machos y las herramientas."',
      '"En la segunda columna vemos el Láser de Fibra Óptica. Es imbatible en velocidad para chapa fina menor a 6 milímetros y tiene excelente precisión, pero presenta dos grandes limitaciones físicas: primero, aún genera una ZAC térmica de 0,3 a 1,2 milímetros con microfisuras de refundición; segundo, su espesor límite práctico en acero ronda los 25 milímetros, y sufre graves problemas en metales altamente reflectivos como el cobre puro o el aluminio grueso, donde el haz fotónico puede rebotar y dañar el cabezal óptico."',
      '"En la tercera columna destacamos nuestra tecnología: el Chorro de Agua AWJ 4.0. Es el único proceso con ZAC igual a 0,00 milímetros, alcanza tolerancias de ±0,05 milímetros y es capaz de cortar bloques macizos de más de 250 milímetros de espesor en cualquier material."',
      '"Abajo vemos la evidencia experimental metalográfica: al observar al microscopio óptico una probeta cortada por chorro de agua, la red de granos cristalinos llega intacta hasta el borde mismo del corte, sin descarburación ni cambio de fase. El criterio técnico es contundente: cuando el costo de una alteración térmica supera el costo operativo del granate, el chorro de agua es insustituible."'
    ],
    explanation: [
      'Respuesta ante pregunta típica del tribunal ("¿Entonces el chorro de agua reemplaza al láser?"): No, son complementarios. En chapa fina de acero al carbono (<6 mm) donde no importa una mínima ZAC, el láser es más rápido y barato por metro. Pero en espesores medios/gruesos (>15-25 mm), aleaciones termosensibles (Titanio, Inconel, Hardox), metales reflectivos (Cobre) o materiales compuestos, el AWJ 4.0 domina absolutamente.',
      'Evidencia metalográfica interactiva: El banner inferior permite abrir la foto real de las probetas comparando la microestructura cristalina.'
    ],
    action: 'Hacer clic en el banner inferior "Inspeccionar Ensayo" (Probeta ZAC Real) para mostrar al tribunal la evidencia metalográfica y luego cerrarla con [ESC].'
  },
  {
    slideNum: 'DIAPOSITIVA 7 (Sección 06 - Cinemática Multieje y Control CNC)',
    time: '11:00 - 13:00 min',
    title: 'Compensación Activa de Conicidad en 5 Ejes (theta = 0,00°)',
    role: 'Explicar el problema físico de la conicidad natural y cómo la mecatrónica de 5 ejes lo resuelve en tiempo real.',
    narrative: [
      '"Pasamos ahora a uno de los mayores desafíos mecatrónicos del corte por chorro de agua: el control cinemático en 5 ejes para lograr conicidad cero."',
      '"¿Qué ocurre si cortamos una placa gruesa con un cabezal convencional de 3 ejes fijo a 90 grados? A medida que el chorro penetra en el espesor del metal, va perdiendo energía cinética por fricción. Como resultado, la ranura de corte (llamada sangría) es más ancha arriba que abajo, dejando una conicidad natural en forma de V de entre 1 y 3 grados. Esa pieza no tendría paredes a 90 grados y requeriría un fresado posterior."',
      '"¿Cómo lo resuelve la ingeniería mecatrónica en el AWJ 4.0? Mediante una muñeca cinemática articulada de 5 ejes (sumando los ejes rotativos A y C al pórtico cartesiano X, Y, Z), con sistemas de inclinación dinámica multieje."',
      '"El algoritmo CNC calcula a una frecuencia de 1.000 Hz cuánta conicidad va a generar el chorro según la dureza y el espesor del material, e inclina activamente el cabezal en sentido opuesto. De esta manera, el cabezal absorbe toda la conicidad natural y la desvía hacia el lado del recorte o descarte, dejando la pared de nuestra pieza útil 100% perpendicular, con un ángulo de conicidad residual theta igual a 0,00 grados."',
      '"Además, como vemos en la tarjeta inferior izquierda, esta articulación alcanza hasta ±60 grados, lo que nos permite mecanizar biseles en V, en Y o en K listos para soldadura en una sola operación sin mover la chapa de la mesa."'
    ],
    explanation: [
      'Doble compensación de los 5 ejes (Lateral + Frontal): 1) La inclinación lateral (Ángulo de Conicidad) corrige la conicidad en V volcando el ángulo al descarte. 2) La inclinación frontal en el sentido de avance (Ángulo de Ataque) adelanta la punta de la boquilla para compensar el retraso parabólico de la cola del chorro.',
      'Interactividad en vivo: En la parte derecha de esta diapositiva hay un conmutador interactivo ("Corte 2D Fijo" vs "5 Ejes Activo (theta = 0°)") que cambia el diagnóstico en pantalla.'
    ],
    action: 'Hacer clic en el botón "Corte 2D Fijo" para mostrar el error de conicidad en V (1,5° a 2,8°) y luego volver a activar "5 Ejes Activo (theta = 0°)" y ampliar la foto del cabezal articulado si se desea.'
  },
  {
    slideNum: 'DIAPOSITIVA 8 (Sección 07 - Versatilidad Metalúrgica)',
    time: '13:00 - 14:45 min',
    title: 'Espectro de Materiales Industriales Críticos',
    role: 'Exponer los 3 grupos de materiales críticos donde el chorro de agua es insustituible.',
    narrative: [
      '"Gracias a la suma de corte en frío (ZAC = 0,00 mm) y paredes perpendiculares (theta = 0,00°), el AWJ 4.0 se convierte en la máquina más versátil de la industria. Aquí destacamos tres familias de materiales críticos donde ningún otro proceso puede igualarlo."',
      '"El primer grupo, a la izquierda, es el Titanio Grado 5 (Ti-6Al-4V), utilizado en la industria aeroespacial y en implantes médicos. Cuando el titanio se corta con calor, absorbe oxígeno e hidrógeno formando una capa superficial cristalina y quebradiza llamada capa alfa fragilizada, que provoca fisuras por fatiga en vuelo. Como el chorro de agua no supera los 60 grados Celsius, corta titanio de hasta 120 milímetros sin capa frágil, cumpliendo directamente la norma aeronáutica AS9100."',
      '"El segundo grupo, en el centro, son los Metales Reflectivos y Tratados Térmicamente: el Cobre Electrolítico C11000 y el Aluminio Aeronáutico 6061-T6. En el cobre puro (usado en barras colectoras eléctricas para transformadores y baterías de vehículos eléctricos), el láser sufre rebote óptico y el calor oxida el borde; el agua lo corta limpiamente conservando el 100% de su conductividad IACS. Y en el aluminio 6061-T6, el corte en frío evita destruir el tratamiento térmico artificial T6 en el perímetro de la pieza."',
      '"El tercer grupo, a la derecha, son las Superaleaciones y Aceros Antidesgaste: Inconel 718 para turbinas y chapas Hardox 500 de hasta 500 Brinell de dureza, muy utilizadas aquí en nuestra región en el sector de maquinaria agrícola de Entre Ríos y Santa Fe. El chorro de agua los corta sin generar acritud ni borde templado, permitiendo que la pieza pase directo a roscado o plegado."',
      '"Y como destaca el bloque inferior, la misma máquina corta también materiales compuestos como fibra de carbono (CFRP) y Kevlar sin quemar la resina epoxi ni delaminar las capas."'
    ],
    explanation: [
      'Conexión regional (muy valorada por los docentes de UTN Paraná / Viale): Las fábricas de implementos agrícolas y sembradoras de Entre Ríos y Santa Fe utilizan intensivamente aceros antidesgaste Hardox 450/500 en cuchillas, tolvas y cuerpos de siembra, donde mantener la dureza original de fábrica sin destemplar ni fisurar el borde es fundamental.'
    ],
    action: 'Señalar las 3 columnas (Titanio Ti-6Al-4V | Cobre & Aluminio 6061-T6 | Hardox 500 & Inconel 718) destacando el indicador verde en cada una.'
  },
  {
    slideNum: 'DIAPOSITIVA 9 (Sección 08 - Control de Calidad y Defectología)',
    time: '14:45 - 16:30 min',
    title: 'Niveles de Acabado (Q1 a Q5) y Solución Mecatrónica de Defectos',
    role: 'Demostrar interactivamente la escala de calidades Q1 a Q5 y las 3 soluciones mecatrónicas a los defectos.',
    narrative: [
      '"En una celda CNC de chorro de agua no existe una única velocidad de corte: el acabado superficial se gobierna mediante la escala internacional de calidad de Q1 a Q5, que podemos probar en vivo en el panel izquierdo."',
      '"Si seleccionamos Q1 (Separación Rápida), el cabezal avanza a máxima velocidad dejando estrías marcadas en la mitad inferior y una rugosidad Ra de unos 16,5 micrómetros; se usa para desbaste o recorte de descarte. Si subimos a Q3 (Comercial Estándar), reducimos la velocidad al 45%, logrando una pared mate uniforme de Ra 4,5 micrómetros libre de rebaba, que cubre el 80% de las piezas metalmecánicas. Y si seleccionamos Q5 (Precisión Extrema Aeroespacial), la velocidad baja al 14% para dar tiempo a que el chorro rectifique toda la pared, alcanzando una rugosidad satinada de Ra 1,4 micrómetros y tolerancias de 25 micrones."',
      '"En la mitad derecha vemos cómo la mecatrónica resuelve los tres defectos físicos típicos del proceso:"',
      '"El Defecto 1 es la Desviación y Retardo del Chorro en Esquinas: cuando el cabezal llega rápido a una esquina de 90 grados, la parte superior dobla pero la cola inferior del chorro sigue de largo por inercia, dañando el vértice. La solución mecatrónica es el algoritmo CAM de control predictivo anticipado (Paso de Esquina), que desacelera antes de la esquina e inclina el cabezal para verticalizar la columna de agua."',
      '"El Defecto 2 es el Redondeo del Borde Superior: ocurre si la boquilla se aleja de la chapa. Lo solucionamos con el palpador capacitivo en el eje Z que mantiene la distancia constante en 1,5 milímetros incluso si la chapa está arqueada."',
      '"Y el Defecto 3 es el Cráter de Perforación Inicial: para que el impacto inicial no deje una marca en la pieza ni delamine materiales frágiles, el software programa una entrada tangencial fuera del contorno útil aplicando perforación dinámica a baja presión con vacío asistido."'
    ],
    explanation: [
      'Relación Velocidad vs Calidad Q: El software CAM permite incluso asignar distintas calidades Q a distintos tramos de una misma pieza: por ejemplo, cortar el contorno exterior no crítico en Q2 rápido, y cortar los alojamientos de rodamientos internos en Q5 de alta precisión, optimizando el costo por pieza.'
    ],
    action: 'Hacer clic en los botones Q1, Q3 y Q5 en la mitad izquierda de la Diapositiva 9 para que el tribunal vea cómo cambian en vivo la rugosidad Ra (µm) y la descripción técnica.'
  },
  {
    slideNum: 'DIAPOSITIVA 10 (Sección 09 - Intervención de Ariel: Pilares 03, 04 y Seguridad)',
    time: '17:30 - 18:30 min',
    title: 'AWJ en la Industria 4.0: Manufactura Desatendida, Economía Circular y Seguridad UHP',
    role: 'Completar la Diapositiva 10 tras la intervención de Diego (Pilares 01 y 02), explicando los Pilares 03 y 04, la seguridad UHP y el medio ambiente.',
    narrative: [
      '"Complementando los dos pilares digitales que explicó Diego, el Pilar 03 es la Manufactura Desatendida (corte autónomo con luces apagadas). Gracias a los sensores ópticos de flujo de granate y al control anticolisión en el eje Z, la máquina puede quedar operando sola durante el turno noche sin operario. Si detecta que se obstruyó la boquilla o falta abrasivo en la tolva, pausa el ciclo automáticamente, despresuriza la línea y envía una alerta al celular del supervisor."',
      '"El Pilar 04 es la Economía Circular y Planta Verde. El abrasivo representa cerca del 65% del costo operativo por hora. Por eso las celdas modernas incorporan sistemas hidrociclónicos que extraen el lodo del tanque, lavan y tamizan el mineral, permitiendo reciclar hasta el 70% del granate almandino y recircular el agua en circuito cerrado."',
      '"Finalmente, en el bloque inferior destacamos dos aspectos críticos de Higiene, Seguridad y Ambiente: primero, al cortar sumergido apenas 15 milímetros bajo el agua de la batea, encapsulamos la onda de choque supersónica reduciendo el ruido de 105 decibeles a menos de 75 dBA; segundo, eliminamos el 100% de las emisiones de humos cancerígenos de Cromo Hexavalente (Cr6+) que se generan al cortar acero inoxidable con plasma o láser. Y en seguridad operativa, todo operario trabaja bajo cerramientos ISO 13849 PLe y porta la tarjeta de alerta médica WJTA ante riesgos de inyección a alta presión."'
    ],
    explanation: [
      'Detalle médico de seguridad WJTA (por si pregunta el tribunal): Una inyección de fluido a 6.000 bar parece una picadura pequeña por fuera pero inyecta agua y granate en los compartimentos musculares. El protocolo internacional WJTA prohíbe suturar la herida y exige descompresión quirúrgica (fasciotomía) dentro de la ventana crítica de 6 horas.'
    ],
    action: 'Señalar los Pilares 03 y 04 y la barra inferior de Seguridad Ambiental (Cero Cr6+ y Ruido <75 dBA).'
  },
  {
    slideNum: 'DIAPOSITIVA 11 (Sección 10 - Cierre Conjunto y Apertura del Gemelo Digital)',
    time: '19:00 - 19:30 min',
    title: 'Conclusiones, Preguntas del Tribunal y Simulación en Vivo',
    role: 'Dar el cierre final tras la frase de Diego e invitar al tribunal a probar el Simulador / Anexo Técnico en vivo.',
    narrative: [
      '"Muchas gracias a los profesores por su atención. Quedamos ahora a entera disposición del tribunal para responder cualquier consulta técnica, y dejamos abierto en pantalla nuestro Anexo Técnico Interactivo y el Simulador CNC para realizar pruebas en vivo con cualquier aleación, presión o espesor que deseen verificar."'
    ],
    explanation: [
      'Al pulsar el botón naranja "Abrir Simulador AWJ para Pruebas en Vivo" (o la tecla [M]), se abre el Anexo Técnico con 7 módulos interactivos listos para defender cualquier pregunta de la mesa examinadora.'
    ],
    action: 'Hacer clic en el botón naranja "Abrir Simulador AWJ para Pruebas en Vivo" en el centro de la Diapositiva 11.'
  }
];

const QA_BANK = [
  {
    q: '1. ¿Por qué el agua a 6.480 bar necesita pasar por una planta de Ósmosis Inversa (TDS 50-150 ppm)?',
    who: 'Diego',
    a: 'Porque a más de 6.000 bar de presión y 1.050 m/s, cualquier mineral disuelto (calcio, magnesio o sílice) precipita instantáneamente, rayando los sellos cerámicos de la bomba y astillando el orificio de diamante en pocas horas. A la vez, no debe ser agua ultrapura desionizada (<5 ppm) porque el agua hambrienta de iones se vuelve corrosiva para el acero inoxidable de los cilindros.'
  },
  {
    q: '2. ¿Qué pasa si aumentamos demasiado el caudal de granate abrasivo para intentar cortar más rápido?',
    who: 'Diego',
    a: 'Por conservación de la cantidad de movimiento (m_agua * v_agua = m_total * v_mezcla), si sobrealimentamos granate por encima de unos 550-600 g/min, la masa sólida satura el chorro, la velocidad de mezcla cae drásticamente, se pierde poder erosivo y se termina obstruyendo el tubo focalizador ROCTEC.'
  },
  {
    q: '3. ¿Cuál es la diferencia energética entre una Bomba Intensificadora Hidráulica y una Servobomba Directa (Triplex)?',
    who: 'Diego',
    a: 'La bomba intensificadora usa un circuito intermedio de aceite hidráulico con un pistón multiplicador 20:1; alcanza las presiones más altas de la industria (6.480 bar HyperJet) con un rendimiento del 65-72%. La servobomba directa acciona 3 pistones cerámicos con un cigüeñal sin aceite intermedio, alcanzando un 85-90% de eficiencia eléctrica (ahorra hasta 25% de energía kWh).'
  },
  {
    q: '4. ¿Cómo sabe el cabezal de 5 ejes exactamente cuántos grados debe inclinarse para lograr theta = 0,00°?',
    who: 'Ariel',
    a: 'El software CAM utiliza el modelo matemático empírico de Zeng & Kim que relaciona el índice de maquinabilidad M del material, el espesor, la presión UHP y la velocidad de avance Q1-Q5. Con esos datos predice el ángulo de divergencia del chorro e interpola los ejes rotativos A (inclinación lateral para conicidad) y C (orientación e inclinación frontal de ataque para compensar el retraso de cola).'
  },
  {
    q: '5. ¿Por qué es tan peligroso cortar Titanio Ti-6Al-4V con procesos térmicos y por qué el AWJ es obligatorio en aeronáutica?',
    who: 'Ariel',
    a: 'Porque por encima de los 450-500 °C el titanio reacciona ávidamente con el oxígeno y el nitrógeno del aire formando una costra dura y sumamente frágil llamada capa alfa fragilizada. Esa capa actúa como concentrador de tensiones e inicia microfisuras por fatiga cíclica. Al cortar en frío con AWJ (ZAC = 0,00 mm), no existe capa alfa fragilizada y la pieza cumple directamente la norma aeroespacial AS9100.'
  },
  {
    q: '6. ¿En qué consiste el protocolo médico WJTA ante un accidente de inyección por chorro de agua?',
    who: 'Ariel',
    a: 'Aunque el orificio de entrada en la piel parezca minúsculo e indoloro al principio, el chorro a alta presión inyecta agua no estéril y partículas de granate profundamente en las fascias musculares, generando síndrome compartimental y necrosis. El protocolo WJTA exige llevar siempre la tarjeta de alerta médica, prohíbe terminantemente suturar la herida y obliga a realizar una fasciotomía descompresiva quirúrgica dentro de las primeras 6 horas.'
  }
];

// ============================================================================
// PDF GENERATOR HELPER
// ============================================================================

function buildPresentationPDF({ filename, mode = 'complete' }) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210
  const pageHeight = doc.internal.pageSize.getHeight(); // 297
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182
  let y = 16;

  const addPageHeader = () => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(100, 116, 139);
    doc.text(
      clean('UTN FRP Viale | Mecatrónica | Corte por Chorro de Agua (AWJ 4.0)'),
      margin,
      9.5
    );
    doc.text(
      clean('Expositores: Diego Francisconi & Ariel Martinez'),
      pageWidth - margin,
      9.5,
      { align: 'right' }
    );
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, 11.5, pageWidth - margin, 11.5);
  };

  const checkPageBreak = (neededHeight) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      addPageHeader();
      y = 17;
    }
  };

  const renderSectionBanner = (title, subtitle, rgbBg, rgbBorder, rgbText) => {
    checkPageBreak(22);
    doc.setFillColor(...rgbBg);
    doc.setDrawColor(...rgbBorder);
    doc.setLineWidth(0.6);
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...rgbText);
    doc.text(clean(title), margin + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(51, 65, 85);
    doc.text(clean(subtitle), margin + 4, y + 11.2);
    y += 18;
  };

  const renderSpeakerSlideBlock = (slide, speakerName, accentColor) => {
    checkPageBreak(42);

    // Slide Header Bar
    doc.setFillColor(15, 23, 42); // Slate 900
    doc.roundedRect(margin, y, contentWidth, 9.5, 1.5, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.0);
    doc.setTextColor(251, 146, 60); // Bright readable orange
    doc.text(clean(`${slide.slideNum}  •  ${speakerName.toUpperCase()}`), margin + 3.5, y + 6.2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(255, 255, 255);
    doc.text(clean(`Tiempo: ${slide.time}`), pageWidth - margin - 3.5, y + 6.2, { align: 'right' });
    y += 14.5;

    // Slide Title & Role
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(15, 23, 42);
    doc.text(clean(`Título en pantalla: ${slide.title}`), margin + 1, y);
    y += 4.8;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.2);
    doc.setTextColor(71, 85, 105);
    const roleLines = doc.splitTextToSize(clean(`Objetivo del expositor: ${slide.role}`), contentWidth - 2);
    doc.text(roleLines, margin + 1, y);
    y += roleLines.length * 3.8 + 2;

    // Sub-box 1: NARRATIVA HABLADA (Lo que dice el expositor palabra por palabra)
    checkPageBreak(20);
    doc.setFillColor(255, 247, 237); // Soft Orange tint
    doc.setDrawColor(253, 186, 116);
    doc.setLineWidth(0.35);
    doc.roundedRect(margin, y, contentWidth, 6, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(154, 52, 18);
    doc.text(clean('1. GUION / NARRATIVA HABLADA (Lo que expone oralmente frente al tribunal):'), margin + 3, y + 4.2);
    y += 8.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.6);
    doc.setTextColor(15, 23, 42);

    slide.narrative.forEach((paragraph) => {
      const lines = doc.splitTextToSize(clean(paragraph), contentWidth - 6);
      const h = lines.length * 4.0 + 2.2;
      checkPageBreak(h);
      doc.setDrawColor(...accentColor);
      doc.setLineWidth(0.6);
      doc.line(margin + 1.5, y - 2.5, margin + 1.5, y + lines.length * 4.0 - 2.5);
      doc.text(lines, margin + 4.5, y, { lineHeightFactor: 1.25 });
      y += h;
    });

    y += 1;

    // Sub-box 2: EXPLICACIÓN TÉCNICA DE RESPALDO
    checkPageBreak(18);
    doc.setFillColor(241, 245, 249); // Slate 100
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.35);
    doc.roundedRect(margin, y, contentWidth, 6, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(clean('2. EXPLICACIÓN TÉCNICA Y FUNDAMENTACIÓN (Respaldo ante consultas docentes):'), margin + 3, y + 4.2);
    y += 8.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(51, 65, 85);

    slide.explanation.forEach((exp) => {
      const lines = doc.splitTextToSize(clean(`- ${exp}`), contentWidth - 6);
      const h = lines.length * 3.8 + 1.8;
      checkPageBreak(h);
      doc.text(lines, margin + 3, y, { lineHeightFactor: 1.22 });
      y += h;
    });

    // Sub-box 3: ACCIÓN EN PANTALLA
    const actionLines = doc.splitTextToSize(clean(`ACCIÓN EN PANTALLA: ${slide.action}`), contentWidth - 8);
    const actionBoxH = actionLines.length * 3.8 + 4.5;
    checkPageBreak(actionBoxH + 5);

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(148, 163, 184);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentWidth, actionBoxH, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(15, 23, 42);
    doc.text(actionLines, margin + 4, y + 4, { lineHeightFactor: 1.2 });
    y += actionBoxH + 6;
  };

  // ==========================================================================
  // PORTADA PRINCIPAL DEL DOCUMENTO
  // ==========================================================================
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, y, contentWidth, 34, 2.5, 2.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(234, 88, 12);
  doc.text(
    clean('UNIVERSIDAD TECNOLÓGICA NACIONAL - FACULTAD REGIONAL PARANÁ (EXTENSIÓN ÁULICA VIALE)'),
    pageWidth / 2,
    y + 7,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  const mainHeaderTitle =
    mode === 'diego'
      ? 'GUION Y NARRATIVA DE EXPOSICIÓN: DIEGO FRANCISCONI'
      : mode === 'ariel'
      ? 'GUION Y NARRATIVA DE EXPOSICIÓN: ARIEL MARTINEZ'
      : 'DOSSIER DE NARRATIVA Y GUION POR EXPOSITOR (AWJ 4.0)';
  doc.text(clean(mainHeaderTitle), pageWidth / 2, y + 16, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text(
    clean('Proyecto Final Integrador de Mecatrónica: Corte por Chorro de Agua Abrasivo (AWJ 4.0)'),
    pageWidth / 2,
    y + 23,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(253, 186, 116);
  doc.text(
    clean('Expositores: Diego Francisconi & Ariel Martinez  |  Defensa: 10/11/2026  |  Duración: 15 a 20 min'),
    pageWidth / 2,
    y + 30,
    { align: 'center' }
  );
  y += 39;

  // ==========================================================================
  // CUADRO DE DISTRIBUCIÓN Y ORGANIZACIÓN DE LOS EXPOSITORES
  // ==========================================================================
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, contentWidth, 42, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(clean('ESTRUCTURA Y SEPARACIÓN DE ROLES ENTRE LOS DOS EXPOSITORES'), margin + 4, y + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(51, 65, 85);

  const summaryItems = [
    '- EXPOSITOR 1: DIEGO FRANCISCONI (Min 00:00 a 09:00 + Cierre 4.0 en Min 16:30 a 17:30):',
    '  Tiene a su cargo las Diapositivas 1, 2, 3, 4 y 5 (Apertura Institucional, Principio Físico Supersónico, Comparativa Agua Pura PWJ vs Abrasivo AWJ, Cabezal y Efecto Venturi, y Cadena de Transformación Energética), además de los Pilares 01 y 02 de Industria 4.0 en la Diapositiva 10 y la síntesis mecatrónica en la Diapositiva 11.',
    '- EXPOSITOR 2: ARIEL MARTINEZ (Min 09:00 a 16:30 + Cierre Sustentable y Q&A en Min 17:30 a 19:30):',
    '  Tiene a su cargo las Diapositivas 6, 7, 8 y 9 (Comparativa contra Plasma y Láser + Evidencia Metalográfica ZAC=0, Cinemática de 5 Ejes con Conicidad 0°, Materiales Críticos como Titanio/Cobre/Hardox, y Escala de Calidad Q1-Q5 + Solución Mecatrónica de Defectos), además de los Pilares 03 y 04 (Lights-Out, Reciclaje 70% y Seguridad UHP) en la Diapositiva 10 y la apertura del Gemelo Digital en la Diapositiva 11.'
  ];

  let sy = y + 12;
  summaryItems.forEach((line) => {
    const isBold = line.startsWith('- EXPOSITOR');
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setTextColor(isBold ? 234 : 51, isBold ? 88 : 65, isBold ? 12 : 85);
    const wrapped = doc.splitTextToSize(clean(line), contentWidth - 8);
    doc.text(wrapped, margin + 4, sy, { lineHeightFactor: 1.22 });
    sy += wrapped.length * 3.7 + 1.2;
  });
  y += 47;

  // Métricas Innegociables de Referencia Rápida
  doc.setFillColor(255, 247, 237);
  doc.setDrawColor(234, 88, 12);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, contentWidth, 14, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(154, 52, 18);
  doc.text(
    clean('MÉTRICAS CLAVE QUE AMBOS EXPOSITORES DEBEN RECORDAR EN TODO MOMENTO:'),
    margin + 4,
    y + 5
  );
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(15, 23, 42);
  doc.text(
    clean('ZAC = 0,00 mm (Corte Frío)  |  Presión = 6.480 bar (94.000 PSI)  |  Velocidad = 1.050 m/s (Mach 3.06)  |  Conicidad 5 Ejes = 0,00°'),
    margin + 4,
    y + 10.5
  );
  y += 19;

  // ==========================================================================
  // BLOQUE 1: DIEGO FRANCISCONI
  // ==========================================================================
  if (mode === 'complete' || mode === 'diego') {
    renderSectionBanner(
      'PARTE 1: NARRATIVA EXCLUSIVA DE DIEGO FRANCISCONI',
      'Desarrollo detallado de las Diapositivas 1, 2, 3, 4, 5 y participación en Diapositivas 10 y 11 (Guion + Explicación Técnica)',
      [239, 246, 255],
      [37, 99, 235],
      [29, 78, 216]
    );

    DIEGO_SLIDES.forEach((slide) => {
      renderSpeakerSlideBlock(slide, 'Diego Francisconi', [37, 99, 235]);
    });
  }

  // ==========================================================================
  // BLOQUE 2: ARIEL MARTINEZ
  // ==========================================================================
  if (mode === 'complete' || mode === 'ariel') {
    if (mode === 'complete') {
      doc.addPage();
      addPageHeader();
      y = 17;
    }

    renderSectionBanner(
      'PARTE 2: NARRATIVA EXCLUSIVA DE ARIEL MARTINEZ',
      'Desarrollo detallado de las Diapositivas 6, 7, 8, 9 y participación en Diapositivas 10 y 11 (Guion + Explicación Técnica)',
      [255, 247, 237],
      [234, 88, 12],
      [194, 65, 12]
    );

    ARIEL_SLIDES.forEach((slide) => {
      renderSpeakerSlideBlock(slide, 'Ariel Martinez', [234, 88, 12]);
    });
  }

  // ==========================================================================
  // BLOQUE 3: BANCO DE PREGUNTAS DEL TRIBUNAL Y RESPUESTAS POR EXPOSITOR
  // ==========================================================================
  doc.addPage();
  addPageHeader();
  y = 17;

  renderSectionBanner(
    'PARTE 3: DEFENSA ANTE EL TRIBUNAL (PREGUNTAS CLAVE Y QUIÉN RESPONDE)',
    'Guía de respuestas precisas para la ronda final de preguntas de los profesores de la UTN FRP',
    [240, 253, 244],
    [22, 163, 74],
    [21, 128, 61]
  );

  QA_BANK.filter((item) => {
    if (mode === 'diego') return item.who === 'Diego';
    if (mode === 'ariel') return item.who === 'Ariel';
    return true;
  }).forEach((qa) => {
    const qLines = doc.splitTextToSize(clean(`${qa.q}  [Responde: ${qa.who}]`), contentWidth - 10);
    const aLines = doc.splitTextToSize(clean(`Respuesta técnica: ${qa.a}`), contentWidth - 10);
    const needed = (qLines.length + aLines.length) * 4.0 + 10;
    checkPageBreak(needed);

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.35);
    doc.roundedRect(margin, y, contentWidth, needed - 3, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.6);
    doc.setTextColor(15, 23, 42);
    doc.text(qLines, margin + 3, y + 5, { lineHeightFactor: 1.2 });

    const ansY = y + 5 + qLines.length * 4.0 + 1.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.3);
    doc.setTextColor(51, 65, 85);
    doc.text(aLines, margin + 3, ansY, { lineHeightFactor: 1.22 });

    y += needed + 1;
  });

  // Numeración de páginas en el pie
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      clean(`Página ${i} de ${totalPages}  |  Guion Oficial de Exposición AWJ 4.0 - UTN FRP Viale  |  Diego Francisconi & Ariel Martinez`),
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  const outputPath = path.join(outDir, filename);
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(outputPath, pdfBuffer);
  console.log(`PDF generado exitosamente: ${outputPath} (${totalPages} páginas)`);
}

// Generar el PDF general con ambos expositores bien separados y explicados,
// más los PDFs individuales de cada expositor por si desean imprimir cada uno su parte.
buildPresentationPDF({
  filename: 'Narrativa_Expositores_Diego_y_Ariel_UTN_FRP.pdf',
  mode: 'complete'
});

buildPresentationPDF({
  filename: 'Narrativa_Individual_Diego_Francisconi.pdf',
  mode: 'diego'
});

buildPresentationPDF({
  filename: 'Narrativa_Individual_Ariel_Martinez.pdf',
  mode: 'ariel'
});
