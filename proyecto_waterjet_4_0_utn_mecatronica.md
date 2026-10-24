# Sistema de Corte por Chorro de Agua Abrasivo (AWJ) e Industria 4.0 — Guía Maestra y Especificación para Web Interactiva (Antigravity)

**Institución:** [Universidad Tecnológica Nacional – Facultad Regional Paraná (UTN FRP), Extensión Áulica Viale](https://www.frp.utn.edu.ar/info2/?page_id=28373)
**Carrera:** [Tecnicatura Universitaria en Mecatrónica (TUM)](https://www.frp.utn.edu.ar/info2/?page_id=16979)
**Asignatura / Trabajo Práctico:** Corte de Metales — Trabajo Práctico Final
**Equipo Expositor:** Diego Francisconi y Ariel Martinez
**Fecha de Exposición:** 10/11/2026 (Duración estipulada: 15 a 20 minutos)


## 1. Guía de Continuación en Antigravity (Blueprint de la Web Interactiva)

Este documento unifica el desarrollo académico completo de nivel universitario mecatrónico con la arquitectura de software y el código fuente base para construir y desplegar en **Antigravity** la plataforma web interactiva **AWJ-4.0 Cyber-Physical Lab**.

### 1.1 Arquitectura de la Aplicación Web Propuesta

| Módulo de la Web | Propósito en la Exposición (15–20 min) | Componentes Interactivos y Mecatrónicos |
| :--- | :--- | :--- |
| **Hero & SCADA Header** | Impacto visual inicial e identificación del grupo (Diego y Ariel – TUM UTN Paraná Viale). | Indicadores en tiempo real de estado de máquina: presión en bar/PSI, velocidad Mach del chorro, caudal y estado del lazo CNC. |
| **Cabezal y Cinemática 5D** | Explicar el principio físico, efecto Venturi y compensación dinámica de conicidad (*Taper*). | Selector interactivo PWJ vs. AWJ, corte transversal del cabezal [KMT IDE Diamond](https://kmtwaterjet.com/en-gb/products/ide-diamond-cutting-head/) y visualización de inclinación de ejes A/B en sistemas [Flow Dynamic Waterjet XD](https://www.flowwaterjet.com/waterjet-products/mach-500). |
| **Simulador CNC & Gemelo Digital 4.0** | Herramienta interactiva central para demostración en vivo frente a la cátedra. | Sliders de presión ($3.800	ext{ a }6.500	ext{ bar}$), espesor ($1	ext{ a }150	ext{ mm}$), material, malla de abrasivo [Barton Garnet](https://www.barton.com/waterjet-abrasive-guide/) y calidad ($Q_1	ext{ a }Q_5$). Calcula velocidad de avance, rugosidad $R_a$, conicidad, consumo y costos. |
| **Telemetría IIoT & Bombas UHP** | Comparar bombas intensificadoras lineales vs. servobombas de accionamiento directo. | Dashboard inspirado en [OMAX IntelliVISOR](https://www.hypertherm.com/Download?fileId=HYP300149&zip=False) con alertas predictivas de vida útil de orificio de diamante y tubo focalizador [ROCTEC](https://www.irwaterjet.com/focusing-tubes/). |
| **Matriz Comparativa de Cátedra** | Contrastar Chorro de Agua frente a los otros 5 grupos del TP (Láser, Plasma, Oxicorte, Hilo EDM, Pantógrafo). | Filtro interactivo por espesor, reflectividad térmica, Zona Afectada por el Calor (ZAC/HAZ) y precisión dimensional. |

### 1.2 Prompt Maestro para Pegar en el Agente de Antigravity

Copiá y pegá el siguiente bloque en el chat de **Antigravity** junto con este archivo `.md` para generar el proyecto completo:

```text
Actúa como un Ingeniero Mecatrónico Senior y Desarrollador Full-Stack especializado en interfaces SCADA / Industria 4.0.
Usando como base técnica y de contenido este archivo Markdown, construye una aplicación web interactiva moderna (React + Vite + Tailwind CSS + Lucide Icons) para nuestra exposición universitaria del 10/11/26 sobre "Sistema de Corte por Chorro de Agua (Diego - Ariel)" en la Tecnicatura Universitaria en Mecatrónica (UTN Regional Paraná - Extensión Áulica Viale).

Requisitos clave de diseño y funcionalidad:
1. Estética "Industrial Cyber-Physical Dark Mode" (tonos pizarra #0B0F19, cian supersónico #00F0FF para el chorro de alta presión, ámbar #F59E0B para el flujo de abrasivo granate y alertas de telemetría).
2. Navegación estructurada que cubra los 11 puntos de la consigna oficial del TP de forma visual (tarjetas técnicas, diagramas SVG animados del cabezal de corte y tablas dinámicas).
3. Incorpora la "Herramienta Interactiva: Gemelo Digital y Simulador de Parámetros AWJ 4.0" usando las ecuaciones hidrodinámicas y de corte provistas en la Sección 13 de este documento:
   - Controles deslizantes para Presión de Bomba (3800 a 6500 bar / 55.000 a 94.000 PSI), Espesor de pieza (2 a 120 mm), Caudal de abrasivo (150 a 600 g/min), Índice de Calidad (Q1 Separación a Q5 Precisión Aeroespacial) y selector de aleación (Acero Inoxidable AISI 304, Titanio Ti-6Al-4V, Aluminio 6061-T6, Acero al Carbono SAE 1020, Inconel 718, Cobre Electrolítico).
   - Salidas calculadas en tiempo real: Velocidad del chorro (m/s y número de Mach), Velocidad de avance CNC (mm/min), Rugosidad superficial estimada Ra (µm), Ángulo de conicidad (Kerf Taper con y sin compensación activa de 5 ejes), Potencia hidráulica requerida (kW/HP), Costo operativo por metro lineal y telemetría de desgaste de boquilla.
   - Visualizador gráfico en Canvas/SVG del perfil de sangría (Kerf) y del retardo de estriado (Jet Lag) que se actualiza en vivo al mover los controles.
4. Incluye un "Modo Presentación (15-20 min)" con un cronómetro integrado y selector de turno para Diego y Ariel.
```


## 2. Descripción del Proceso

El **corte por chorro de agua** (*Waterjet Cutting*) es un proceso de mecanizado no tradicional de naturaleza hidrodinámica y micro-mecánica en frío. Consiste en hacer pasar agua ultrapura a presiones extremas —entre $3.800	ext{ bar}$ ($55.000	ext{ PSI}$) y $6.500	ext{ bar}$ ($94.000	ext{ PSI}$) en equipos de última generación como la bomba [Flow HyperJet](https://www.flowwaterjet.com/waterjet-products/hyperjet)— a través de un orificio calibrado de piedra preciosa (rubí, zafiro o diamante policristalino) de entre $0,10	ext{ mm}$ y $0,40	ext{ mm}$ de diámetro.

La energía potencial de presión se transforma en energía cinética pura, generando un chorro coherente que viaja a velocidades supersónicas de hasta $1.000	ext{–}1.150	ext{ m/s}$ (superando **Mach 3** en el aire). Existen dos variantes operativas fundamentales:

* **Corte con Agua Pura (PWJ – *Pure Waterjet*):** Utiliza únicamente el chorro de agua a ultra-alta presión con orificios de $0,08	ext{ a }0,25	ext{ mm}$. Se emplea para materiales blandos o no metálicos (elastómeros, juntas, polímeros celulares, materiales compuestos delgados, papel y alimentos).
* **Corte por Chorro de Agua Abrasivo (AWJ – *Abrasive Waterjet*):** Es la configuración empleada para el **corte de metales** ([estudio sobre AWJM en materiales metálicos](https://www.mdpi.com/2076-3417/11/8/3344)). Una vez formado el chorro supersónico de agua pura, este atraviesa una cámara de mezcla donde genera un vacío por efecto Venturi, succionando partículas minerales de granate (*garnet*) como [Barton Garnet 80 HPA](https://www.barton.com/waterjet-abrasive-guide/). El agua acelera las partículas abrasivas dentro de un tubo de enfoque de carburo de tungsteno, convirtiendo el haz trifásico (agua + aire + abrasivo) en una herramienta de micro-erosión capaz de seccionar desde láminas micrométricas hasta bloques de acero, titanio o superaleaciones de más de $300	ext{ mm}$ de espesor.

### Esquema Conceptual de Reconocimiento del Sistema AWJ

```text
[Suministro Agua Tratada (Ósmosis/Desionizador)]
                     │
                     ▼
[Bomba UHP 4.100 - 6.500 bar (Intensificadora Hidráulica o Servobomba Directa)]
                     │  Tubería de Alta Presión (Acero Inox Autofretado)
                     ▼
        ┌──────────────────────────┐
        │   Válvula Neumática ON/OFF│ ◄── Señal PLC / CNC
        ├──────────────────────────┤
        │   Orificio de Diamante   │ (Ø 0,25 - 0,38 mm) -> Chorro Mach 3 (~1.050 m/s)
        ├──────────────────────────┤
        │   Cámara de Mezcla       │ ◄── Ingreso de Abrasivo Granate (Malla 80) por Efecto Venturi
        └─────────┬────────────────┘     (Dosificador CNC en lazo cerrado: 200 - 600 g/min)
                  │
                  │  [Tubo de Enfoque / Boquilla ROCTEC] (Ø 0,76 - 1,02 mm, L = 76 - 102 mm)
                  ▼
            Chorro Abrasivo Trifásico (Agua + Aire + Granate a ~700-850 m/s)
                  │  Distancia de Trabajo (SOD: 1,5 - 3,0 mm)
      ════════════╪════════════  ◄── Pieza Metálica (Corte en frío: ZAC = 0 mm)
      ────────────┴────────────
      [Tanque Atenuador de Energía con Agua + Rejillas de Soporte + Extracción de Lodos]
```


## 3. Principio Físico

El fenómeno físico responsable de la separación del material metálico en el corte por chorro de agua abrasivo es la **erosión mecánica supersónica por impacto de partículas a alta velocidad**, combinada con **micro-mecanizado por arranque de micro-viruta** y **fatiga por deformación plástica localizada**, sin intervención de fusión térmica ni reacciones químicas exotérmicas ([revisión de parámetros físicos en AWJM](https://www.researchgate.net/publication/391903537_Effect_of_Process_Parameters_on_Metal_Cutting_Using_Abrasive_Water_Jet_Machining_AWJM_Technology_A_Review)).

### 3.1 Conversión Hidrodinámica (Ecuación de Bernoulli Modificada)

En el paso a través del orificio primario de diámetro $d_o$, la presión hidrostática $P$ se convierte en velocidad de chorro $v_j$. Considerando el coeficiente de descarga $c_d pprox 0,65	ext{–}0,78$ y la compresibilidad del agua a ultra-alta presión (donde la densidad aumenta hasta un $15	ext{–}18\%$ a $6.000	ext{ bar}$):

$$v_j = c_d \sqrt{rac{2P}{
ho_w}}$$

Para una presión operativa de $P = 6.200	ext{ bar}$ ($6,2 	imes 10^8	ext{ Pa}$) en una bomba [KMT STREAMLINE PRO](https://kmtwaterjet.com/en-gb/pro-pump-90000psi-6200bar-60hp/), la velocidad teórica supera los $1.100	ext{ m/s}$ y la velocidad real del chorro de agua pura se sitúa en torno a $980	ext{–}1.050	ext{ m/s}$.

### 3.2 Transferencia de Cantidad de Movimiento al Abrasivo

Al ingresar el flujo másico de abrasivo $\dot{m}_a$ y aire en la cámara de mezcla, el chorro de agua de flujo másico $\dot{m}_w$ transfiere su impulso lineal dentro del tubo focalizador. Aplicando conservación de la cantidad de movimiento con un factor de eficiencia de mezcla $\eta_m pprox 0,65	ext{–}0,75$:

$$v_a = \eta_m \left( rac{\dot{m}_w}{\dot{m}_w + \dot{m}_a} 
ight) v_j$$

Cada gramo de granate malla 80 contiene aproximadamente **170.000 partículas angulares**; a una tasa estándar de $400	ext{ g/min}$, impactan sobre el frente de corte más de **1,1 millones de micro-aristas de corte por segundo** a velocidades de $650	ext{ a }800	ext{ m/s}$.

### 3.3 Rol de las Fuerzas Mecánicas, Erosión, Calor y Química

| Factor Físico | Rol en el Corte por Chorro de Agua (AWJ) | Implicancia Mecatrónica y Metalúrgica |
| :--- | :--- | :--- |
| **Erosión y Fuerzas Micro-Mecánicas** | **Fenómeno principal ($>99\%$).** En la zona superior del espesor (*Cutting Wear Zone*), las partículas impactan con ángulo rasante produciendo micro-corte por cizalladura. En la zona inferior (*Deformation Wear Zone*), el ángulo de impacto aumenta y predomina el endurecimiento local y micro-fractura por deformación plástica. | Las fuerzas de reacción sobre la pieza son muy bajas ($F_z < 50	ext{–}120	ext{ N}$), evitando desplazamientos bruscos o grandes mordazas hidráulicas, aunque requieren control de trayectoria CNC para compensar la deflexión del haz. |
| **Calor (Efecto Térmico)** | **Nulo o despreciable como agente de corte.** La fricción micro-mecánica genera calor puntual instantáneo que es disipado en milisegundos por el propio caudal de agua ($2	ext{ a }5	ext{ L/min}$). La pieza no supera los $50	ext{–}65	ext{ }^\circ	ext{C}$. | **Cero Zona Afectada por el Calor (ZAC / HAZ = 0).** No existe temple martensítico indeseado en los bordes, ni microfisuras térmicas, ni distorsión por alabeo en chapas delgadas. |
| **Reacciones Químicas** | **Inexistentes en la separación.** A diferencia del oxicorte (oxidación exotérmica del Fe), el proceso es químicamente inerte respecto a la estructura cristalina del metal. | Permite cortar titanio, aluminio, magnesio y aceros inoxidables austeníticos sin contaminación intersticial de óxidos ni pérdida de resistencia a la corrosión intergranular. |


## 4. Principio de Funcionamiento Paso a Paso

En una celda mecatrónica de corte por chorro de agua CNC moderna como el centro [Flow Mach 500](https://www.flowwaterjet.com/waterjet-products/mach-500) o la serie [OMAX 120X](https://www.omax.com/en/omax/omax/omax-120x/), la secuencia operativa integra CAD/CAM, control numérico interpolado y lazos hidroneumáticos:

### 4.1 Secuencia Operativa Completa

1. **Modelado CAD/CAM y Asignación de Calidad:** El operador importa la geometría 2D (`.dxf` / `.dwg`) o sólida 3D (`.step`) en el software especializado como [OMAX IntelliMAX](https://www.omax.com/en/media-center/tips/automation-using-intellimax/) o FlowXpert. En lugar de programar velocidades manuales en código G, asigna un **índice de calidad superficial ($Q_1$ a $Q_5$)** a cada entidad geométrica; el controlador calcula automáticamente las curvas de aceleración/desaceleración en esquinas e inclinación de los ejes A/B.
2. **Colocación de la Pieza y Nivelación:** La placa o perfil metálico se apoya sobre las lamas o rejillas sacrificables del tanque receptor. Si la pieza presenta alabeo, se activa el palpador de terreno o sensor láser del eje Z ([OMAX Z-Axis Terrain Follower](https://www.omax.com/en/accessories/z-axis-accessories/)) para mapear la topografía superficial y mantener constante la distancia boquilla-pieza (*Stand-Off Distance*, $	ext{SOD} = 1,5	ext{–}2,5	ext{ mm}$).
3. **Elevación del Nivel de Agua (Corte Subacuático):** Mediante un sistema neumático de cámaras desplazadoras en el tanque, se eleva el nivel de agua hasta cubrir la cara superior de la chapa ($10	ext{–}20	ext{ mm}$ por encima). Esto reduce el ruido ambiental de $105	ext{ dBA}$ a menos de $78	ext{ dBA}$ y contiene las proyecciones de neblina y abrasivo.
4. **Inicio del Corte (*Piercing* o Perforación):** Para contornos interiores o arranques fuera del borde, el cabezal se posiciona en las coordenadas $(X_0, Y_0)$.
   * El controlador activa el eductor de vacío (tecnología *UltraPierce*) para que el granate ingrese a la cámara de mezcla **fracciones de segundo antes** de abrir la válvula de agua de ultra-alta presión, evitando que el agua se acumule y bloquee la manguera de abrasivo.
   * La aguja neumática del cabezal abre el paso de agua; se ejecuta un *piercing* estacionario, circular o dinámico (movimiento de vaivén corto) regulando la presión para perforar el espesor completo sin salpicaduras hacia atrás (*splashback*).
5. **Movimiento Relativo e Interpolación Cinemática:** Una vez atravesado el espesor, el CNC desplaza el cabezal a lo largo de la trayectoria de entrada (*lead-in*) y luego sobre el perfil de la pieza.
   * En sistemas de 5 ejes como [Flow Dynamic Waterjet XD](https://www.flowwaterjet.com/waterjet-products/mach-700) o [OMAX A-Jet](https://www.omax.com/en/accessories/multi-axis-cutting/), los servomotores de la muñeca inclinan la boquilla entre $0,5^\circ$ y $4^\circ$ lateralmente para transferir toda la conicidad natural hacia el recorte (*scrap*) y dejar la pared de la pieza útil a $90,0^\circ$ exactos, además de inclinarla hacia adelante en las curvas para compensar el retardo de cola del chorro (*jet lag*).
6. **Separación del Material y Parada (*Lead-out*):** Al cerrar el contorno, el CNC ejecuta una salida tangencial (*lead-out*) o desaceleración controlada para evitar dejar un escalón o melladura (*witness mark*) en el punto de unión, cierra la válvula de aguja de alta presión, corta la dosificación de granate y disipa la energía remanente del chorro en el agua y el lecho de lodos del tanque receptor.

### 4.2 Esquema Técnico Señalado del Proceso y Cinemática del Chorro

```text
                       EJE Z (Servomotor + Husillo de Bolas / Sensor de Altura)
                                      │
                             ┌────────▼────────┐
   Aire Comprimido (ON/OFF) ─► Actuador Aguja  │ ◄── Entrada Agua UHP (4.100 - 6.500 bar)
                             ├─────────────────┤
                             │Cuerpo de Válvula│
                             ├─────────────────┤
                             │Orificio Diamante│ ──► (1) Formación Chorro Supersónico (Mach 3)
   Abrasivo Granate 80 Mesh ─►Cámara de Mezcla │ ──► (2) Succión Venturi y Mezcla Trifásica
                             └────────┬────────┘
                                      │          ──► (3) Inclinación Ejes A/B (Compensación Taper θ)
                                  ║   │   ║
                                  ║   ▼   ║      ──► (4) Tubo Focalizador ROCTEC (Ø 0,76 - 1,02 mm)
                                  ╚═══╦═══╝
                                      │  ◄── SOD: Distancia de Trabajo (1,5 - 3,0 mm)
   Dirección de Avance CNC (Vf) ════► │
   ───────────────────────────────────┼───────────────────────────────────
   PIEZA METÁLICA                     │  /     Zona Superior: Erosión por Corte (Ángulo bajo)
   (Espesor h)                       /  /
                                    /  /       Curvatura del Frente de Corte (Estriado / Jet Lag)
                                   /  /        Zona Inferior: Erosión por Deformación Plástica
   ───────────────────────────────/__/────────────────────────────────────
                                 /  /   ◄── Chorro Residual + Metal Erosionado + Granate Fracturado
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/~~/~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   TANQUE RECEPTOR (Agua + Lamelas de Acero + Atenuación Hidrodinámica)
```


## 5. Maquinaria e Instalaciones

Desde la perspectiva de la **Ingeniería Mecatrónica**, una estación industrial de corte por chorro de agua es un sistema ciberfísico que integra servohidráulica de ultra-alta presión, robótica cartesiana/articulada de alta rigidez, sensórica en lazo cerrado y acondicionamiento de fluidos.

### 5.1 Componentes Principales y Función

| Subsistema / Componente | Función Principal en la Máquina | Tecnologías de Referencia Industrial |
| :--- | :--- | :--- |
| **1. Unidad Generadora de Presión (Bomba UHP)** | Elevar la presión del agua de red ($3	ext{–}6	ext{ bar}$) hasta presiones de trabajo de $3.800	ext{ a }6.500	ext{ bar}$. Existen dos arquitecturas rivales: **Intensificadora Hidráulica** y **Accionamiento Directo (*Direct Drive*)**. | [Flow HyperJet 94i-D (6.500 bar / 94.000 PSI)](https://www.flowwaterjet.com/waterjet-products/hyperjet), [KMT STREAMLINE PRO (6.200 bar / 90.000 PSI)](https://kmtwaterjet.com/en-gb/pro-pump-90000psi-6200bar-60hp/) y [OMAX EnduroMAX Direct Drive](https://www.omax.com/en/media-center/tips/unlocking-efficiency-enduromax-pump/). |
| **2. Pórtico y Mesa CNC (*Gantry*)** | Ejecutar el movimiento interpolado $X, Y, Z$ con repetibilidad posicional de $\pm 0,025	ext{ mm}$. Utiliza servomotores brushless AC con encoders absolutos, guías lineales presurizadas o piñón-cremallera helicoidal protegido por fuelles contra el polvo abrasivo. | [Flow Mach 500](https://www.flowwaterjet.com/waterjet-products/mach-500) y [OMAX 160X Series](https://www.ohprecis.com/OMAX/OMAX-160X.html). |
| **3. Cabezal de Corte Multi-Eje (3D / 5 Ejes)** | Soportar la válvula neumática ON/OFF, el portaboquilla y los servomotores rotativos ($A, B$ o $B, C$) para inclinar el chorro hasta $\pm 60^\circ$ en biselados o compensar dinámicamente la conicidad. | [Flow Dynamic Waterjet XD](https://www.flowwaterjet.com/waterjet-products/mach-700), [OMAX A-Jet](https://www.omax.com/en/accessories/multi-axis-cutting/) y [OMAX Tilt-A-Jet](https://www.aquajet.co.uk/waterjet-machines/accessories/tilt-a-jet/). |
| **4. Sistema de Alimentación y Dosificación de Abrasivo** | Almacenar entre $250	ext{ y }2.000	ext{ kg}$ de granate en una tolva presurizada (*Bulk Hopper*) y transportarlo neumáticamente hasta un dosificador CNC local en el eje Z que regula el caudal en $	ext{g/min}$. | Dosificadores electrónicos proporcionales con celdas de carga y sensores de flujo ópticos/capacitivos. |
| **5. Tanque Atenuador (*Catcher Tank*)** | Frenar un chorro que viaja a Mach 3 en menos de $600	ext{–}900	ext{ mm}$ de columna de agua, soportar la pieza mediante flejes metálicos intercambiables y alojar el sistema de control neumático de nivel de agua. | Tanques con barrido automático por hidrociclones y transporte de lodos. |
| **6. Red de Tuberías UHP y Juntas Rotativas** | Conducir el agua a $6.500	ext{ bar}$ desde la bomba hasta el cabezal móvil mediante tubos de acero inoxidable austenítico trabajado en frío y autofretado ($1/4	ext{"}$ a $9/16	ext{"}$ OD) con látigos helicoidales (*whips*) o juntas giratorias de alta presión. | Tuberías y accesorios UHP [KMT Waterjet Systems](https://kmtwaterjet.com/kmt-waterjet-pumps-cutting-heads-abrasive-systems/). |

### 5.2 Comparativa Mecatrónica: Bomba Intensificadora vs. Bomba de Accionamiento Directo

| Parámetro Técnico | Bomba Intensificadora Lineal (Ej. [KMT PRO](https://kmtwaterjet.com/en-gb/pro-pump-90000psi-6200bar-60hp/) / [Flow HyperJet](https://www.flowwaterjet.com/waterjet-products/hyperjet)) | Bomba de Accionamiento Directo / Cigüeñal (Ej. [OMAX EnduroMAX](https://www.omax.com/en/media-center/tips/unlocking-efficiency-enduromax-pump/)) |
| :--- | :--- | :--- |
| **Principio de Actuación** | Un motor eléctrico mueve una bomba hidráulica de aceite ($200	ext{ bar}$) que empuja un pistón grande; por relación de áreas ($20:1	ext{ a }33:1$), dos émbolos cerámicos de menor diámetro comprimen el agua en carreras largas y baja frecuencia. | Un motor eléctrico con variador de frecuencia (VFD) acciona directamente un cigüeñal mecánico con 3 pistones cerámicos desfasados $120^\circ$ (bomba triplex), sin circuito intermedio de potencia hidráulica. |
| **Eficiencia Energética Global** | **65% – 72%** (pérdidas térmicas en el circuito de aceite hidráulico, requiere *chiller* mayor). | **85% – 90%** ([OMAX EnduroMAX](https://lucohe.com/en/tecnologia)), menor consumo eléctrico por litro bombeado. |
| **Presión Máxima Comercial** | **Hasta $6.200	ext{–}6.500	ext{ bar}$ ($90.000	ext{–}94.000	ext{ PSI}$).** Ideal para grandes espesores y operación multi-cabezal. | **Hasta $4.100	ext{–}6.900	ext{ bar}$ ($60.000	ext{–}100.000	ext{ PSI}$ en serie 100K).** Excelente estabilidad de presión sin acumulador grande. |
| **Mantenimiento y Sensórica** | Cambio de sellos de alta presión cada $500	ext{–}1.000	ext{ h}$; requiere acumulador atenuador (*attenuator*) para suavizar el rizado de presión en el cambio de carrera. | Modulación continua de RPM por VFD; menor rizado de presión gracias a la superposición sinusoidal de los 3 cilindros. |

### 5.3 Servicios Auxiliares de Planta Requeridos

1. **Suministro Eléctrico Industrial:** Red trifásica $3 	imes 380	ext{ V / 400 V AC (50 Hz)}$ en Argentina, con potencias instaladas de **30 HP (22 kW) a 125 HP (93 kW)** para la bomba principal ([KMT PRO 125 HP](https://kmtwaterjet.com/en-gb/kmt-waterjet-cutting-pro-6-200-bar-125-hp-pump/)), más $5	ext{–}10	ext{ kVA}$ estabilizados para el gabinete CNC, servodrives y periféricos.
2. **Agua de Alimentación y Tratamiento Físico-Químico:** Caudal de corte de **$2,0	ext{ a }7,6	ext{ L/min}$** según potencia y diámetro de orificio, a presión de entrada mínima de $3	ext{–}4,5	ext{ bar}$. **Requisito crítico:** a presiones mayores a $4.000	ext{ bar}$, los minerales disueltos (calcio, magnesio, sílice, cloruros) precipitan sobre los sellos y erosionan el orificio de diamante. Se exige **ablandador + sistema de Ósmosis Inversa (RO)** para mantener los Sólidos Disueltos Totales ($	ext{TDS}$) entre **$50	ext{ y }150	ext{ ppm}$** y pH entre $6,5	ext{ y }8,0$ (nota: el agua ultrapura desionizada con $	ext{TDS} < 5	ext{ ppm}$ se evita porque vuelve el agua químicamente agresiva y corroe los cilindros de acero inoxidable).
3. **Aire Comprimido Industrial:** Presión de **$6	ext{ a }7	ext{ bar}$ ($85	ext{–}100	ext{ PSI}$)**, caudal de $150	ext{–}400	ext{ L/min}$, **estrictamente seco (secador frigorífico, punto de rocío $< 3	ext{ }^\circ	ext{C}$)** y libre de aceite. Es vital para accionar la válvula neumática ON/OFF del cabezal, presurizar los fuelles/guías lineales y transportar el abrasivo sin que la humedad lo apelmace y obstruya la manguera.
4. **Refrigeración (*Chiller*):** Enfriador de circuito cerrado de agua glicolada (capacidad térmica equivalente al $25	ext{–}30\%$ de la potencia de una bomba intensificadora, ej. $10	ext{–}15	ext{ kW}$ térmicos para una bomba de $50	ext{ HP}$) o intercambiador agua-aceite para mantener el aceite hidráulico por debajo de $45	ext{ }^\circ	ext{C}$.
5. **Extracción y Filtrado de Lodos (*Garnet Removal System*):** Sistema de barrido de fondo con bombas de diafragma e hidrociclón decantador hacia bolsones *Big-Bag*, evitando paradas manuales de limpieza del tanque.


## 6. Herramientas y Consumibles

En el corte por chorro de agua, la "herramienta de corte" propiamente dicha es el **haz fluido-abrasivo supersónico**, pero su geometría, coherencia y densidad energética dependen directamente de tres consumibles críticos en el cabezal ([componentes de cabezales KMT](https://kmtwaterjet.com/en-gb/waterjet-cutting-head-nozzles-for-peak-performance/)):

### 6.1 Elementos de Corte y Consumibles Críticos

| Consumible / Elemento | Función Específica | Materiales Constructivos | Vida Útil Típica | Criterio de Selección, Desgaste y Reemplazo |
| :--- | :--- | :--- | :--- | :--- |
| **1. Orificio Primario (*Jewel Orifice*)** | Transformar la presión hidrostática en un chorro colimado a Mach 3. | **Rubí sintético, Zafiro sintético** o **Diamante Policristalino Sintético (PCD)** ([KMT IDE Diamond](https://kmtwaterjet.com/en-gb/products/ide-diamond-cutting-head/)). | Rubí/Zafiro: **$40	ext{–}80	ext{ h}$**.<br>Diamante: **$800	ext{–}1.500	ext{ h}$**. | **Selección:** Diámetro ($0,25	ext{ a }0,38	ext{ mm}$) según caudal máximo de la bomba.<br>**Desgaste:** Micro-astillado del borde por partículas en suspensión o incrustación salina.<br>**Reemplazo:** Cuando el chorro pierde coherencia (aspecto "abanico"), cae la presión de bomba $>150	ext{ bar}$ para igual régimen, o al cumplir horas en el contador SCADA. |
| **2. Tubo de Enfoque / Boquilla (*Focusing Tube / Mixing Nozzle*)** | Colimar y acelerar la mezcla de agua y granate hacia la pieza. Define el ancho de corte (*Kerf*). | Carburo de tungsteno sinterizado por prensado isostático en caliente compuesto (ej. [ROCTEC 100 / ROCTEC 500](https://www.irwaterjet.com/focusing-tubes/)). | **$80	ext{–}150	ext{ h}$** de corte abrasivo continuo. | **Selección:** Diámetro interno $pprox 3 	imes d_{	ext{orificio}}$ (ej. orificio $0,33	ext{ mm}$ con boquilla $1,02	ext{ mm}$ o $0,25	ext{ mm}$ con boquilla $0,76	ext{ mm}$).<br>**Desgaste:** Erosión interna progresiva del diámetro de salida (crece de $0,76	ext{ mm}$ a $>1,15	ext{ mm}$) o desgaste excéntrico si el orificio está desalineado.<br>**Reemplazo:** Cuando el diámetro de salida aumenta un **$20	ext{–}25\%$** (medido con galga pin calibrada) o cuando la precisión dimensional y velocidad caen. |
| **3. Abrasivo Mineral (Granate / *Garnet*)** | Partícula cortante que arranca micro-viruta del metal por impacto. | Granate Almandino natural ($	ext{Fe}_3	ext{Al}_2(	ext{SiO}_4)_3$), dureza **7,5 a 8,0 Mohs**, aristas sub-angulares a afiladas ([Barton Garnet 80 HPA / Adirondack HPX](https://www.barton.com/waterjet-cutting-abrasives/)). | **Consumible de un solo paso** (o reciclable hasta un $40	ext{–}50\%$ tras secado y tamizado). | **Selección por Malla (*Mesh*):**<br>• **50/60 Mesh ($\sim 300	ext{ }\mu	ext{m}$):** Corte rápido en aceros gruesos ($>50	ext{ mm}$).<br>• **80 Mesh ($\sim 180	ext{ }\mu	ext{m}$):** Estándar universal industrial ($80\%$ de aplicaciones en metales) ([Barton 80 HPA](https://www.barton.com/waterjet-abrasive-guide/)).<br>• **120/220 Mesh ($\sim 65	ext{–}125	ext{ }\mu	ext{m}$):** Micro-corte y bordes de acabado espejo ($R_a < 1,6	ext{ }\mu	ext{m}$). |
| **4. Sellos UHP, Válvula ON/OFF y Rejillas** | Estanqueidad a $6.000	ext{ bar}$, corte del flujo y soporte físico de chapas. | Polímeros UHMWPE/PTFE con respaldos de bronce, agujas de acero inoxidable 17-4PH y flejes de acero galvanizado. | Sellos: **$500	ext{–}1.000	ext{ h}$**.<br>Aguja/Asiento: **$150	ext{–}300	ext{ h}$**. | **Reemplazo de Sellos:** Detectado por sensores de temperatura en los cilindros de alta presión (fuga interna de agua caliente al drenaje *weep hole*).<br>**Reemplazo de Aguja ON/OFF:** Si gotea agua por la boquilla con la válvula cerrada. |


## 7. Materiales y Geometrías

### 7.1 Capacidad de Corte en Metales y Limitaciones de Material

El corte por chorro de agua abrasivo es el **proceso de corte de perfiles más versátil de la manufactura moderna**, ya que no depende de la conductividad eléctrica (a diferencia del Plasma y Electroerosión por Hilo EDM), ni de la absorción óptica (a diferencia del Láser de Fibra/$	ext{CO}_2$), ni de la temperatura de ignición del óxido (a diferencia del Oxicorte).

* **Metales que corta con excelencia:**
  * **Aleaciones de Titanio (Ti-6Al-4V, Grado 2 y 5):** Es el método preferido en la industria aeroespacial porque no genera capa alfa fragilizada (*alpha-case*) por oxígeno/calor.
  * **Aceros Inoxidables (AISI 304, 316L, Dúplex, Martensíticos) y Aceros al Carbono / Aleados (SAE 1010 a 4140, Hardox 450/500):** Corta aceros ya templados sin revenido ni pérdida de dureza en el filo ([análisis en acero inoxidable 304](https://www.iieta.org/download/file/fid/90969)).
  * **Superaleaciones Termorresistentes (Inconel 625/718, Hastelloy, Waspaloy):** Donde el mecanizado por fresado sufre desgaste extremo de insertos y el láser deja microfisuras de refundición.
  * **Metales Altamente Reflectivos y Conductores Térmicos (Cobre electrolítico, Latón, Bronce, Aluminio serie 2000/6000/7000):** El láser sufre reflexión del haz y el plasma deja bordes muy rugosos en espesores gruesos; el chorro de agua corta placas de aluminio y cobre de más de $100	ext{ mm}$ con bordes limpios ([estudio de AWJM en aluminio](https://www.researchgate.net/publication/46027795_A_Study_on_Abrasive_Water_Jet_Machining_of_Aluminum_with_Garnet_Abrasives)).
* **Materiales con Limitaciones o Restricciones:**
  * **Materiales cerámicos ultraduros ($>8,5	ext{ Mohs}$):** Como el carburo de tungsteno sinterizado, carburo de boro o diamante policristalino (tienen dureza igual o superior al granate de $8,0	ext{ Mohs}$; requieren velocidades extremadamente bajas o abrasivo de óxido de aluminio/carburo de silicio que desgasta el tubo focalizador en pocas horas).
  * **Materiales reactivos al agua:** Magnesio puro en polvo/viruta fina o sodio/litio metálico (riesgo de generación de hidrógeno).
  * **No metálico crítico (Vidrio Templado):** Se fractura instantáneamente al primer impacto por liberación de sus tensiones internas de compresión superficial.
  * **Laminados y Materiales Compuestos (CFRP / GFRP) o Bimetales con adhesivo débil:** Presentan riesgo de **delaminación** hidrodinámica durante la perforación inicial si no se emplea *piercing* a baja presión ($800	ext{–}1.200	ext{ bar}$) con vacío asistido o taladro neumático auxiliar ([accesorios MAXIEM/OMAX para composites](https://www.omax.com/en/omax/maxiem/maxiem-2040x/)).

### 7.2 Formatos Constructivos y Capacidades Geométricas

| Categoría Geométrica | Capacidad del Sistema AWJ | Detalles Técnicos e Implementación CNC |
| :--- | :--- | :--- |
| **Chapas y Placas Planas** | **Sí (aplicación principal).** Espesores desde **$0,2	ext{ mm}$ hasta $>300	ext{ mm}$** (rango óptimo competitivo: $3	ext{ mm a }150	ext{ mm}$). | Las láminas muy finas ($<0,8	ext{ mm}$) se apilan en paquete (*stack cutting*) para aumentar la productividad y evitar vibraciones. |
| **Perfiles, Barras y Tubos** | **Sí.** Mediante integración de un **6to eje rotativo sumergible** (*Rotary Axis*) ([accesorios multi-eje OMAX](https://www.omax.com/en/accessories/multi-axis-cutting/)). | Permite cortar bocas de pescado (*fishmouths*) en tuberías de acero inoxidable, ranurados helicoidales y seccionado de barras macizas. Para cortar un tubo sin dañar la pared opuesta, se introduce un tapón deflector interno (*sacrificial plug*) de acero o polímero. |
| **Cortes Rectos y Curvos** | **Sí.** Libertad geométrica total en el plano $XY$. | Radio interno mínimo de esquina determinado por el radio del tubo focalizador ($R_{	ext{mín}} pprox 0,38	ext{ a }0,55	ext{ mm}$). En curvas cerradas, el algoritmo CNC reduce la velocidad de avance automáticamente para evitar la desviación de la cola del chorro. |
| **Cortes Interiores (Agujeros, Cajas)** | **Sí.** Mediante perforación previa (*piercing*) en cualquier coordenada interna. | Agujeros de hasta $1,2	ext{ mm}$ de diámetro. En espesores gruesos ($>50	ext{ mm}$), el *piercing* estacionario es reemplazado por *piercing* dinámico circular o lineal para facilitar la evacuación del abrasivo. |
| **Cortes Biselados y 3D** | **Sí.** Mediante cabezales de 5 ejes con inclinación de hasta **$\pm 60^\circ$** ([Flow Mach 700 Dynamic XD](https://www.flowwaterjet.com/waterjet-products/mach-700)). | Permite realizar chaflanes en V, Y, X o K listos para soldadura sin fresado posterior, así como avellanados cónicos. |
| **Limitación Geométrica Intrínseca** | **Corte pasante obligatorio (*Through-Cut*).** | A diferencia de una fresadora CNC, el chorro de agua no realiza cajeras ciegas de profundidad controlada con precisión micrométrica (el *controlled depth milling* con AWJ solo logra tolerancias groseras de $\pm 0,3	ext{ mm}$ por variaciones locales de erosión). |


## 8. Condiciones y Parámetros de Trabajo

El desempeño del proceso AWJ está gobernado por un sistema multivariable donde el controlador CNC regula las variables de entrada para optimizar la tasa de remoción de material ($	ext{MRR}$) frente al acabado superficial ([revisión de parámetros de proceso AWJM](http://dspace-su.server.ly:8080/xmlui/bitstream/handle/123456789/3430/Effect+of+Process+Parameters+on+Metal+Cutting+Using+Abrasive+Water+Jet+Machining+(AWJM)+Technology-+A+Review.pdf?sequence=1)):

| Variable Operativa | Rango Típico Industrial | Efecto Físico al Aumentar la Variable | Regulación y Control en la Máquina |
| :--- | :--- | :--- | :--- |
| **1. Presión Hidráulica de Agua ($P$)** | $3.800	ext{ a }6.500	ext{ bar}$<br>($55.000	ext{ a }94.000	ext{ PSI}$) | Incrementa exponencialmente la velocidad del chorro ($v_j \propto \sqrt{P}$) y la energía cinética de impacto. Aumentar de $4.100	ext{ bar}$ a $6.200	ext{ bar}$ eleva la velocidad de corte entre un **$35\%$ y un $50\%$** y reduce el consumo de abrasivo por metro cortado ([datos KMT 90.000 PSI](https://kmtwaterjet.com/en-gb/waterjet-pump-pro-90000psi-50hp/)). | Válvula proporcional electrohidráulica (en intensificadora) o variador de frecuencia VFD (en servobomba directa). Se reduce a $800	ext{–}1.500	ext{ bar}$ durante el *piercing* en materiales frágiles. |
| **2. Velocidad de Avance CNC ($v_f$)** | $5	ext{ a }5.000	ext{ mm/min}$<br>(según espesor y calidad) | **Variable más crítica sobre la calidad.** A mayor velocidad de avance, menor número de impactos por milímetro lineal: aumenta la rugosidad ($R_a$), crece el ángulo de estriado (*jet lag*) y cambia la conicidad (*taper*). Si supera la velocidad crítica $u_{sep}$, el chorro no logra atravesar la pieza. | Lazo de posición y velocidad de los servomotores CNC en función del índice de calidad seleccionado ($Q_1$ rápido a $Q_5$ lento de precisión). |
| **3. Caudal Másico de Abrasivo ($\dot{m}_a$)** | $150	ext{ a }650	ext{ g/min}$<br>(estándar: $350	ext{–}450	ext{ g/min}$) | Aumenta la capacidad de corte hasta alcanzar un **punto óptimo de saturación** ($\sim 12	ext{–}15\%$ en masa respecto al caudal de agua). Más allá del óptimo, las partículas chocan entre sí y pierden velocidad media, reduciendo la eficiencia y encareciendo el costo horario (el granate representa el **$55	ext{–}65\%$ del costo operativo total**). | Dosificador electrónico CNC en el cabezal con orificio calibrado o tornillo sinfín paso a paso. |
| **4. Caudal Volumétrico de Agua ($Q_w$)** | $1,8	ext{ a }5,5	ext{ L/min}$<br>(por cabezal) | Determinado por la presión $P$ y el área del orificio de diamante ($Q_w \propto d_o^2 \sqrt{P}$). Mayor caudal permite arrastrar mayor masa de abrasivo para espesores superiores a $80	ext{ mm}$. | Selección física del diámetro del orificio ($0,25	ext{ mm}$, $0,33	ext{ mm}$ o $0,38	ext{ mm}$). |
| **5. Distancia de Trabajo (*Stand-Off Distance*, SOD)** | $1,5	ext{ a }3,0	ext{ mm}$<br>(en corte normal) | Al salir del tubo de enfoque, el chorro diverge por fricción con el aire circundante. Si $	ext{SOD} > 4	ext{ mm}$, la periferia de baja energía del chorro redondea el borde superior (*roll-over*), ensancha la sangría (*kerf*) y duplica la conicidad. | Control automático de eje Z mediante palpador mecánico/óptico previo o sensor anticolisión. |
| **6. Potencia y Fuerza de Reacción** | Potencia: $22	ext{ a }93	ext{ kW}$<br>Fuerza axial: $30	ext{ a }120	ext{ N}$ | La potencia eléctrica de la bomba limita el par $(P, d_o)$ máximo admisible. La fuerza mecánica sobre la pieza es muy baja en comparación con el fresado, pero el chorro ejerce presión hidrodinámica vertical durante el *piercing*. | Sujeción mediante mordazas rápidas de acero inoxidable en los bordes de la mesa, contrapesos de plomo/acero sobre chapas finas o pestañas de micro-unión (*micro-tabs*) programadas en el CAM. |
| **7. Refrigeración y Corte Sumergido** | Inmersión: $15	ext{ mm}$ sobre la pieza | El propio chorro refrigera la zona de corte de forma inherente. Trabajar con el cabezal sumergido atenúa el ruido acústico y evita neblina en el taller. | Válvulas electroneumáticas de llenado/vaciado de vejigas en el tanque receptor. |


## 9. Calidad del Corte

En la industria metalmecánica y aeroespacial, el acabado del corte por chorro de agua se clasifica internacionalmente en **5 niveles de calidad ($Q_1$ a $Q_5$)**, los cuales determinan directamente el tiempo de máquina y la necesidad o no de operaciones secundarias:

| Nivel de Calidad | Denominación Industrial | Velocidad Relativa (% de $u_{\max}$) | Rugosidad Superficial ($R_a$) | Tolerancia Dimensional Típica | Conicidad Sin 5 Ejes (*Taper*) | Conicidad Con 5 Ejes ([Dynamic XD](https://www.flowwaterjet.com/waterjet-products/mach-500) / [Tilt-A-Jet](https://www.aquajet.co.uk/waterjet-machines/accessories/tilt-a-jet/)) | ¿Requiere Terminación Posterior? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Q1** | **Corte de Separación (*Separation Cut*)** | $85\% 	ext{ – } 100\%$ | $12,5 	ext{ – } 25,0	ext{ }\mu	ext{m}$ | $\pm 0,35	ext{ a }\pm 0,60	ext{ mm}$ | $0,30	ext{ a }0,60	ext{ mm}$ por lado | $0,15	ext{ mm}$ | **Sí**, si es superficie funcional. Se usa para desbaste rápido o recorte de sobrantes (*scrap*). |
| **Q2** | **Corte Rugoso (*Rough Cut*)** | $60\% 	ext{ – } 75\%$ | $6,3 	ext{ – } 12,5	ext{ }\mu	ext{m}$ | $\pm 0,20	ext{ a }\pm 0,35	ext{ mm}$ | $0,20	ext{ a }0,35	ext{ mm}$ por lado | $0,10	ext{ mm}$ | **Sí**, para ajustes mecánicos; apto directo para estructuras soldadas no críticas. |
| **Q3** | **Corte Estándar Comercial (*Medium / Standard*)** | $40\% 	ext{ – } 55\%$ | $3,2 	ext{ – } 6,3	ext{ }\mu	ext{m}$ | $\pm 0,10	ext{ a }\pm 0,15	ext{ mm}$ | $0,10	ext{ a }0,20	ext{ mm}$ por lado | $< 0,04	ext{ mm}$ | **No** para el $80\%$ de piezas estructurales, bridas, soportes y chasis mecatrónicos. |
| **Q4** | **Corte de Calidad Fina (*Fine Quality*)** | $22\% 	ext{ – } 32\%$ | $1,8 	ext{ – } 3,2	ext{ }\mu	ext{m}$ | $\pm 0,05	ext{ a }\pm 0,08	ext{ mm}$ | $0,05	ext{ a }0,10	ext{ mm}$ por lado | $< 0,02	ext{ mm}$ | **No.** Superficie satinada mate uniforme sin estrías visibles en el tercio inferior. |
| **Q5** | **Corte de Alta Precisión (*Precision / Finish*)** | $10\% 	ext{ – } 18\%$ | $1,2 	ext{ – } 1,8	ext{ }\mu	ext{m}$<br>($< 1,0	ext{ }\mu	ext{m}$ con Malla 120/220) | $\pm 0,025	ext{ a }\pm 0,05	ext{ mm}$ | $< 0,04	ext{ mm}$ por lado | **$< 0,01	ext{ mm}$ ($pprox 0^\circ$)** | **No** (salvo alojamientos de rodamientos IT6/IT7 o roscados de precisión). |

### Análisis Detallado de los Atributos de Calidad

* **Ancho de Corte o Sangría (*Kerf Width*):** Oscila entre **$0,75	ext{ mm y }1,20	ext{ mm}$** en corte abrasivo estándar (aproximadamente un $10\%$ mayor que el diámetro interno del tubo focalizador). Es significativamente más angosto que el oxicorte ($2,5	ext{–}5	ext{ mm}$) y el plasma ($1,8	ext{–}4	ext{ mm}$), permitiendo un anidado (*nesting*) compacto de piezas con mínimo desperdicio de materia prima.
* **Rebabas (*Burr / Dross*):** A diferencia del láser, plasma y oxicorte —que producen escoria adherida por solidificación de metal fundido en la arista inferior—, el chorro de agua **no genera escoria térmica**. En calidades $Q_3$ a $Q_5$, el borde inferior sale libre de rebabas; únicamente en calidades muy rápidas ($Q_1$–$Q_2$) en metales muy dúctiles (aluminio blando, cobre o acero inoxidable fino) puede formarse una leve rebaba mecánica de salida por plegado plástico, fácilmente removible con un cepillado ligero.
* **Deformaciones y Alteraciones Térmicas:**
  * **Alteración metalúrgica nula ($	ext{ZAC} = 0	ext{ }\mu	ext{m}$):** La microestructura granular del metal en el borde cortado permanece idéntica al metal base ([estudio experimental de rugosidad y microdureza en AWJ](https://www.sciepub.com/portal/downloads?doi=10.12691/ajme-4-5-2&filename=ajme-4-5-2.pdf)). No hay endurecimiento superficial por martensita que rompa machos de roscar o fresas en operaciones posteriores.
  * **Ausencia de tensiones térmicas residuales:** Al no existir gradiente térmico, tiras largas y estrechas o grillas complejas no se arquean al liberarse de la chapa. Solo puede presentarse un ligero mateado o granallado en los primeros $0,3	ext{ mm}$ del borde superior (*frosting*) debido a las gotas periféricas del chorro.


## 10. Defectos Habituales, Causas Físicas y Corrección Mecatrónica

Durante el corte de metales por chorro de agua pueden aparecer cuatro defectos característicos cuya comprensión física y corrección algorítmica es un pilar de la mecatrónica aplicada ([análisis de defectos en AWJ metálico](https://www.mdpi.com/2076-3417/11/8/3344)):

### 10.1 Defecto 1: Conicidad de la Sangría (*Kerf Taper* en V, Invertido o Tonel)

* **Descripción visual:** El ancho de la ranura de corte en la cara superior de entrada ($W_{	ext{top}}$) difiere del ancho en la cara inferior de salida ($W_{	ext{bottom}}$), dejando las paredes de la pieza con una ligera inclinación angular $	heta_t$:
  $$	heta_t = rctan\left(rac{W_{	ext{top}} - W_{	ext{bottom}}}{2h}
ight)$$
* **Qué lo provoca:**
  1. **Conicidad en V positiva ($W_{	ext{top}} > W_{	ext{bottom}}$):** Es la más frecuente al cortar a velocidades medias o altas ($Q_1	ext{–}Q_3$). A medida que el chorro penetra en el espesor $h$, pierde energía cinética por fricción con las paredes y colisiones inelásticas; en el fondo tiene menor capacidad erosiva y la ranura se estrecha.
  2. **Conicidad invertida o divergente ($W_{	ext{top}} < W_{	ext{bottom}}$):** Ocurre en chapas delgadas o al cortar a velocidades extremadamente bajas con presiones muy altas, donde el chorro se expande geométricamente antes de perder su capacidad de corte.
* **Cómo se corrige:**
  * **En máquinas de 3 ejes:** Reduciendo la velocidad de avance CNC ($v_f$), disminuyendo la distancia de trabajo ($	ext{SOD}$ a $1,5	ext{ mm}$) y reemplazando el tubo focalizador si supera su desgaste admisible.
  * **En máquinas de 5 ejes (Solución Industria 4.0):** Activando la compensación cinemática automática en cabezales [OMAX Tilt-A-Jet](https://www.aquajet.co.uk/waterjet-machines/accessories/tilt-a-jet/) o [Flow Dynamic Waterjet XD](https://www.flowwaterjet.com/waterjet-products/mach-500). El modelo predictivo del CNC calcula el ángulo $	heta_t$ exacto e inclina el cabezal en sentido opuesto hacia el lado del desperdicio (*scrap*), logrando paredes perfectamente perpendiculares ($90,00^\circ$).

### 10.2 Defecto 2: Retardo de Cola del Chorro (*Stream Lag / Jet Lag*) y Estriado Inferior (*Striations*)

* **Descripción visual:** En el tercio inferior del espesor cortado aparecen líneas curvas inclinadas hacia atrás respecto al sentido de avance, y en las esquinas agudas o curvas cerradas la parte inferior de la pieza queda sub-cortada o redondeada (*corner washout*).
* **Qué lo provoca:** El chorro de agua no es una herramienta rígida como una fresa de carburo; se comporta como una **columna flexible**. Mientras la parte superior del chorro ingresa en la coordenada actual $(X, Y)$, el frente de erosión en la base de una placa gruesa viaja retrasado una distancia $L_{	ext{lag}}$ detrás del eje de la boquilla. Si el cabezal cambia bruscamente de dirección en una esquina a $90^\circ$, la parte superior gira de inmediato pero la "cola" inferior del chorro barre la esquina en diagonal, deformando la geometría.
* **Cómo se corrige:**
  * Implementando algoritmos de **control anticipativo (*Look-Ahead*) en el CNC**: el controlador desacelera exponencialmente antes de llegar al vértice para permitir que la cola inferior del chorro alcance a la parte superior (alineación vertical del haz) antes de cambiar el vector de velocidad.
  * En cabezales de 5 ejes, inclinando dinámicamente la boquilla unos grados hacia adelante en el plano de la trayectoria para adelantar el punto de salida inferior.

### 10.3 Defecto 3: Redondeo y Esmerilado del Borde Superior (*Top Edge Roll-Over / Frosting*)

* **Descripción visual:** La arista superior de entrada pierde su filo vivo a $90^\circ$, presentando un chaflán redondeado y una banda opaca arenada de $0,5	ext{ a }1,5	ext{ mm}$ de ancho.
* **Qué lo provoca:** Distancia boquilla-pieza excesiva ($	ext{SOD} > 3,5	ext{ mm}$) o desgaste severo del tubo de enfoque. Al salir de la boquilla, el núcleo central supersónico está rodeado por una "niebla" periférica de gotas y partículas de granate de baja velocidad que no alcanzan a cortar pero erosionan superficialmente el borde superior como un arenado.
* **Cómo se corrige:** Calibrar la distancia $	ext{SOD}$ a $1,5	ext{–}2,0	ext{ mm}$, verificar el alineamiento concéntrico entre el orificio de diamante y la cámara de mezcla, o laminar una película protectora de sacrificio sobre piezas de acabado espejo.

### 10.4 Defecto 4: Cráter o Imperfección en el Punto de Entrada/Salida (*Piercing Blowout / Witness Mark*)

* **Descripción visual:** Una marca circular, muesca o protuberancia en el punto donde comienza y termina el perímetro de la pieza.
* **Qué lo provoca:** Iniciar la perforación (*piercing*) directamente sobre la línea de contorno final de la pieza, o detener el chorro instantáneamente al cerrar el perfil.
* **Cómo se corrige:** Programar siempre en el software CAM entradas y salidas fuera de la pieza (*Lead-in / Lead-out*) tangenciales o en arco de $3	ext{ a }8	ext{ mm}$ de longitud situadas en la zona de recorte, con solapamiento (*overtravel*) y rampa de desaceleración suave.

```text
   COMPARATIVA VISUAL DE LOS DOS DEFECTOS PRINCIPALES EN METALES

   (A) CONICIDAD (KERF TAPER)                   (B) RETARDO DE COLA (JET LAG) EN ESQUINA
   Vista Frontal del Corte                      Vista Lateral de la Placa
   
        │ │  <- Chorro AWJ                           Dirección de Avance CNC ───►
        ▼ ▼                                               │ │ <- Posición actual boquilla
   ─────┐ ┌─────  Ancho Superior (W_top)             ─────┼─┼──────────────────────
       /   \                                              │ │
      /     \     Pared inclinada (θ_t)                  /  /   El frente inferior se
     /       \    por pérdida de energía                /  /    retrasa una distancia
    /         \   en profundidad                       /  /     L_lag respecto a la
   ────┐   ┌────  Ancho Inferior (W_bottom)      ─────/__/──────entrada superior
                                                      ◄──► L_lag
```


## 11. Seguridad Industrial y Gestión Ambiental

Aunque el corte por chorro de agua elimina de raíz los riesgos térmicos, radiaciones ópticas y humos metálicos cancerígenos propios de los procesos térmicos, introduce riesgos físicos de **ultra-alta presión y acústica** que exigen protocolos estrictos de Higiene y Seguridad Industrial:

### 11.1 Riesgos Específicos y Protecciones de Máquina (Ingeniería de Seguridad)

| Riesgo Específico | Naturaleza del Peligro | Protecciones de Máquina (Hardware/PLC) | Elementos de Protección Personal (EPP) |
| :--- | :--- | :--- | :--- |
| **Inyección Hipodérmica a Ultra-Alta Presión** | Un chorro a Mach 3 o una micro-fuga por poro (*pinhole leak*) en una tubería a $6.000	ext{ bar}$ atraviesa calzado de cuero, guantes de kevlar y tejidos humanos instantáneamente. **Peligro médico crítico:** la inyección de agua no estéril y partículas de granate a alta presión en tejidos profundos causa necrosis compartimental y riesgo de amputación si no es tratada quirúrgicamente de urgencia (los operadores deben portar una **Tarjeta de Alerta Médica de Inyección UHP**). | • Barreras optoelectrónicas (cortinas de luz categoría 4 / PLe) o escáneres láser perimetrales que detienen el CNC y cierran la válvula ON/OFF si alguien invade la zona.<br>• Doble válvula de descarga (*Dump Valve*) normalmente abierta por resorte: ante parada de emergencia (E-Stop) o corte eléctrico, despresuriza la línea de $6.200	ext{ bar}$ a $0	ext{ bar}$ en menos de $0,5	ext{ s}$.<br>• Coraza protectora en látigos UHP y gabinete insonorizado cerrado en la bomba. | • Gafas de seguridad policarbonato envolventes (ANSI Z87.1) o pantalla facial.<br>• Calzado de seguridad con puntera de acero y suela antideslizante.<br>• Guantes anticorte para manipulación de chapas metálicas filosas (aclaración: ningún guante resiste el impacto directo del chorro). |
| **Ruido Industrial Supersónico** | Cuando el chorro sale a Mach 3 al aire libre, la onda de choque supersónica genera entre **$95	ext{ y }110	ext{ dBA}$**, superando el límite legal de $85	ext{ dBA}$ para jornada de 8 horas (Resolución SRT 295/03 en Argentina). | • **Corte Subacuático:** Elevar el nivel de agua del tanque receptor $15	ext{–}20	ext{ mm}$ por encima de la pieza reduce la emisión sonora a **$72	ext{–}78	ext{ dBA}$**.<br>• Anillo supresor de salpicaduras y ruido de poliuretano alrededor de la boquilla. | • Protectores auditivos de copa o endoaurales ($	ext{NRR} \ge 25	ext{ dB}$) obligatorios cuando se corta en seco o con nivel de agua bajo. |
| **Atrapamiento Mecánico CNC** | Movimiento rápido en vacío ($G00$ hasta $15	ext{–}35	ext{ m/min}$) de un puente pórtico pesado. | • Paradas de emergencia por cable y pulsadores tipo golpe de puño en ambos extremos del puente.<br>• Sensor anticolisión magnético/óptico en el cabezal que pausa el servodrive ante impacto con piezas levantadas. | • Ropa de trabajo ajustada sin elementos sueltos al operar cerca del pórtico. |

### 11.2 Gestión Ambiental: Humos, Polvo, Residuos y Efluentes

* **Humos y Gases Tóxicos ($0\%$ de emisión):** Al ser un proceso en frío, **no genera humos de óxidos metálicos, ni ozono, ni vapores de cromo hexavalente ($	ext{Cr}^{6+}$)** al cortar acero inoxidable (una ventaja ambiental decisiva frente al corte por plasma y láser).
* **Control de Polvo Silíceo Libre:** El granate almandino natural certificado como [Barton Garnet](https://www.barton.com/garnet-abrasives/) es un silicato no tóxico e inerte con **menos de $0,1	ext{–}0,5\%$ de sílice cristalina libre respirable** (a diferencia de la arena de cuarzo común, prohibida por causar silicosis). Durante la carga de tolvas se utilizan mangas cerradas o aspiración localizada.
* **Manejo de Residuos Sólidos (Lodos de Granate + Micro-viruta):**
  * El abrasivo fracturado se deposita en el fondo del tanque junto con un $2	ext{ a }5\%$ de partículas del metal cortado.
  * Cuando se cortan aceros al carbono, inoxidables, aluminio o titanio, el lodo deshidratado en *Big-Bags* se clasifica como **residuo industrial no peligroso**, o bien pasa por una planta de lavado y clasificación ciclónica que permite **recuperar y reutilizar hasta el $40	ext{–}50\%$ del granate**.
  * **Excepción ambiental obligatoria:** Si se cortan aleaciones con **plomo (latones al plomo), cadmio, berilio (cobre-berilio) o cromo lixiviable**, el lodo residual debe segregarse y gestionarse como **residuo peligroso** conforme a la Ley Nacional 24.051.
* **Efluentes Líquidos y Reciclado de Agua en Circuito Cerrado:** Las instalaciones modernas incorporan sistemas de filtración en circuito cerrado (hidrociclón + filtros bolsa de $5	ext{ y }1	ext{ }\mu	ext{m}$ + resinas de intercambio iónico + enfriador) que recirculan el agua desbordada del tanque hacia la bomba UHP, logrando un consumo neto de reposición casi nulo (solo por evaporación).


## 12. Aplicaciones Industriales, Ventajas, Limitaciones y Comparativa de Procesos

### 12.1 Ejemplos Industriales Concretos

1. **Industria Aeroespacial y Defensa:** Fabricación de cuadernas estructurales de **Titanio Ti-6Al-4V**, soportes de motores en **Inconel 718** y paneles compuestos de fibra de carbono (CFRP) para fuselajes y satélites. Las normas aeronáuticas prohíben o exigen mecanizar por completo la Zona Afectada por el Calor (ZAC) de los cortes térmicos; el chorro de agua entrega la pieza lista sin alteración metalúrgica.
2. **Industria Agroindustrial y Metalmecánica Regional (Entre Ríos / Santa Fe):** En el polo metalmecánico de la región (fabricantes de sembradoras, cosechadoras, implementos agrícolas, acoplados y equipamiento avícola/alimenticio cerca de Viale, Paraná y Crespo), el AWJ se utiliza para cortar cuchillas de **acero al boro y chapas antidesgaste Hardox** sin destemplar el filo, así como componentes de **acero inoxidable grado alimenticio AISI 316L** de gran espesor para frigoríficos y lácteas sin decoloración térmica.
3. **Ingeniería Eléctrica y Electromovilidad:** Corte de barras colectoras (*busbars*) de **cobre electrolítico puro** de $10	ext{ a }40	ext{ mm}$ de espesor para transformadores de potencia y paquetes de baterías, donde el láser sufre retro-reflexión óptica.
4. **Matrices, Herramentales y Prototipado Mecatrónico:** Corte de placas portamatrices en acero para herramientas **AISI D2 / SAE 4140**, engranajes especiales, bridas para actuadores y piezas de aluminio aeronáutico **7075-T6** de gran espesor pasando directamente del archivo CAD a la pieza final.

### 12.2 ¿Cuándo Conviene Elegir el Proceso y Cuándo Resulta Poco Adecuado?

* **Cuándo CONVIENE elegir Corte por Chorro de Agua (AWJ):**
  * Cuando el material **no tolera calor ni distorsión térmica** (aceros tratados térmicamente, titanio, aluminio estructural, superaleaciones, bimetales).
  * Cuando el espesor supera el límite limpio del láser ($>20	ext{–}30	ext{ mm}$ en aceros o $>15	ext{ mm}$ en aluminio/cobre) y se requiere **alta precisión dimensional ($\pm 0,05	ext{ mm}$) y paredes a $90^\circ$** que el plasma o el oxicorte no pueden alcanzar.
  * En talleres flexibles (*Job Shops*) que deben cambiar en minutos entre cortar una placa de acero inoxidable de $80	ext{ mm}$, una barra de cobre de $25	ext{ mm}$, una junta de teflón y una placa de fibra de carbono en la misma máquina.
  * Cuando se busca eliminar el costo y tiempo de un fresado secundario para remover la ZAC o la escoria.
* **Cuándo RESULTA POCO ADECUADO elegir Corte por Chorro de Agua:**
  * **Producción masiva de chapa fina de acero al carbono o inoxidable ($1	ext{ a }6	ext{ mm}$) sin exigencia metalúrgica de ZAC:** En este rango, un **Láser de Fibra óptica** de $6	ext{ a }12	ext{ kW}$ corta de **4 a 8 veces más rápido** y con un costo operativo por pieza notablemente menor, ya que no consume abrasivo granate.
  * **Desbaste pesado de planchones de acero al carbono estructural ($>100	ext{ mm}$) con baja exigencia de tolerancia ($\pm 2	ext{ mm}$):** El **Oxicorte** tiene un costo de inversión inicial (CAPEX) y de operación muy inferior cuando no importa la ZAC ni el acabado superficial.
  * **Micro-matrices de precisión sub-micrométrica ($R_a < 0,4	ext{ }\mu	ext{m}$, tolerancia $\pm 0,002	ext{ mm}$) con esquinas internas de radio casi cero:** Corresponde elegir **Electroerosión por Hilo (WEDM)**.

### 12.3 Matriz Comparativa Frente a los Todos los Grupos del Trabajo Práctico

| Criterio Técnico / Económico | **Chorro de Agua (AWJ)**<br>*(Diego - Ariel)* | **Corte Láser Fibra**<br>*(Esteban - Mateo.R)* | **Oxicorte (Oxi-Gas)**<br>*(Mijael - Thiago)* | **Corte por Plasma HD**<br>*(Emanuel - Maximiliano)* | **Electroerosión Hilo (WEDM)**<br>*(Gervasio - Daian)* |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Principio Físico** | Erosión mecánica supersónica en frío (Mach 3 + granate). | Fusión y vaporización fotónica por haz coherente + gas. | Reacción química exotérmica de oxidación ($	ext{Fe} + 	ext{O}_2$). | Fusión térmica por arco eléctrico constricto ionizado ($>20.000	ext{ }^\circ	ext{C}$). | Descargas eléctricas pulsadas de chispa en dieléctrico. |
| **Materiales Admisibles** | **Todos los metales y no metales** (reflectivos, compuestos, cerámicos). | Metales (limitado en espesores gruesos de Cu/Latón reflectivos). | **Solo aceros al carbono y baja aleación** (no corta Inox, Al ni Ti). | **Solo materiales eléctricamente conductores** (aceros, Inox, Al). | **Solo materiales eléctricamente conductores**. |
| **Zona Afectada por el Calor (ZAC / HAZ)** | **NULA ($0,00	ext{ mm}$). Corte 100% en frío.** | Pequeña ($0,1	ext{ a }0,5	ext{ mm}$), deja capa refundida dura. | Muy grande ($2,0	ext{ a }>10	ext{ mm}$), alta distorsión térmica. | Moderada a grande ($0,5	ext{ a }3,0	ext{ mm}$), borde nitrurado/endurecido. | Muy pequeña ($0,005	ext{ a }0,02	ext{ mm}$, capa blanca superficial). |
| **Rango de Espesor en Metales** | **$0,2	ext{ a }>300	ext{ mm}$** (óptimo $3	ext{–}150	ext{ mm}$). | $0,5	ext{ a }40	ext{ mm}$ (óptimo en chapa fina $1	ext{–}15	ext{ mm}$). | $6	ext{ a }>300	ext{ mm}$ (ineficaz en chapa fina por alabeo). | $1,5	ext{ a }80	ext{ mm}$ (óptimo en espesor medio $6	ext{–}50	ext{ mm}$). | $0,1	ext{ a }300	ext{ mm}$ (para matricería de precisión). |
| **Precisión Dimensional** | **Alta ($\pm 0,025	ext{ a }\pm 0,10	ext{ mm}$).** | Alta ($\pm 0,03	ext{ a }\pm 0,10	ext{ mm}$). | Baja ($\pm 1,0	ext{ a }\pm 3,0	ext{ mm}$). | Media ($\pm 0,25	ext{ a }\pm 0,80	ext{ mm}$). | **Ultra-alta ($\pm 0,002	ext{ a }\pm 0,005	ext{ mm}$).** |
| **Ancho de Corte (*Kerf*)** | $0,75	ext{ a }1,20	ext{ mm}$ | $0,15	ext{ a }0,60	ext{ mm}$ | $2,50	ext{ a }5,00	ext{ mm}$ | $1,50	ext{ a }4,00	ext{ mm}$ | $0,10	ext{ a }0,35	ext{ mm}$ |
| **Velocidad Productiva** | Media a Baja (según calidad $Q_1	ext{–}Q_5$). | **Muy Alta** en espesores finos y medios. | Baja (requiere precalentamiento). | Alta en espesores medios ($10	ext{–}40	ext{ mm}$). | **Muy Baja** (horas por pieza). |
| **Costo Operativo (OPEX) y CAPEX** | **CAPEX Alto / OPEX Medio-Alto** (impulsado por el consumo de granate). | CAPEX Alto / OPEX Bajo-Medio (electricidad + $	ext{N}_2/	ext{O}_2$). | **CAPEX Muy Bajo / OPEX Bajo** (oxígeno + propano/acetileno). | CAPEX Medio / OPEX Medio (electrodos/toberas + gases). | CAPEX Alto / OPEX Alto por hora de pieza terminada. |

> **Nota sobre el Grupo 6 (Pantógrafos para corte CNC):** Un *pantógrafo CNC* no es un fenómeno físico de separación en sí mismo, sino la **arquitectura cinemática cartesiana ($X, Y, Z$)** que porta la herramienta. Tanto el Chorro de Agua como el Láser, el Plasma y el Oxicorte utilizan pórticos o pantógrafos CNC para ejecutar la trayectoria programada, diferenciándose en las exigencias de rigidez estructural, protección de guías contra abrasivo y velocidad de respuesta dinámica.


## 13. Código Base de la Herramienta Interactiva para Antigravity (`AWJSimulator40.tsx`)

A continuación se entrega el componente interactivo completo y autónomo en **React + Tailwind CSS** con el motor matemático hidrodinámico y de costos preprogramado, listo para guardar como `src/components/AWJSimulator40.tsx` (o integrar en `App.tsx`) dentro de **Antigravity**:

```tsx
import React, { useState, useMemo } from 'react';

interface MaterialSpec {
  id: string;
  name: string;
  machinability: number; // Factor M de Zeng & Kim (Acero SAE 1020 ≈ 85, Aluminio 6061 ≈ 215, Titanio ≈ 108, Inconel ≈ 62)
  density: number; // g/cm3
  hardnessNote: string;
  thermalNote: string;
}

const MATERIALS: MaterialSpec[] = [
  {
    id: 'aisi304',
    name: 'Acero Inoxidable AISI 304',
    machinability: 81,
    density: 8.0,
    hardnessNote: 'Austenítico (~180 HB) — Sin precipitación de carburos ni Cr6+',
    thermalNote: 'ZAC = 0,00 mm (Conserva resistencia a corrosión intergranular)',
  },
  {
    id: 'ti6al4v',
    name: 'Titanio Grado 5 (Ti-6Al-4V)',
    machinability: 108,
    density: 4.43,
    hardnessNote: 'Aeroespacial (~330 HB) — Cero capa alfa fragilizada (Alpha-Case)',
    thermalNote: 'ZAC = 0,00 mm (Apto directo para norma aeronáutica)',
  },
  {
    id: 'al6061',
    name: 'Aluminio Estructural 6061-T6',
    machinability: 215,
    density: 2.7,
    hardnessNote: 'Templado T6 (~95 HB) — No pierde tratamiento térmico de envejecido',
    thermalNote: 'ZAC = 0,00 mm (Sin reflexión óptica ni rebaba fundida)',
  },
  {
    id: 'sae1020',
    name: 'Acero al Carbono SAE 1020 / Hardox',
    machinability: 88,
    density: 7.85,
    hardnessNote: 'Estructural / Antidesgaste — Sin borde martensítico templado',
    thermalNote: 'ZAC = 0,00 mm (Apto para roscado directo sin romper machos)',
  },
  {
    id: 'inconel718',
    name: 'Superaleación Inconel 718',
    machinability: 62,
    density: 8.19,
    hardnessNote: 'Níquel-Cromo (~360 HB) — Evita endurecimiento por deformación térmica',
    thermalNote: 'ZAC = 0,00 mm (Sin microfisuras de refundición)',
  },
  {
    id: 'cobre',
    name: 'Cobre Electrolítico C11000',
    machinability: 138,
    density: 8.96,
    hardnessNote: 'Alta conductividad eléctrica/térmica — Donde el láser sufre reflexión',
    thermalNote: 'ZAC = 0,00 mm (Corte limpio en barras colectoras Busbars)',
  },
];

const QUALITY_LEVELS = [
  { q: 1, label: 'Q1 - Separación Rápida', speedFactor: 1.0, raBase: 16.5, taperDeg: 0.85, tolMm: 0.40 },
  { q: 2, label: 'Q2 - Corte Desbaste', speedFactor: 0.68, raBase: 9.2, taperDeg: 0.52, tolMm: 0.25 },
  { q: 3, label: 'Q3 - Estándar Industrial', speedFactor: 0.45, raBase: 4.5, taperDeg: 0.28, tolMm: 0.12 },
  { q: 4, label: 'Q4 - Calidad Fina', speedFactor: 0.26, raBase: 2.4, taperDeg: 0.12, tolMm: 0.06 },
  { q: 5, label: 'Q5 - Precisión Aeroespacial', speedFactor: 0.14, raBase: 1.4, taperDeg: 0.05, tolMm: 0.025 },
];

export default function AWJSimulator40() {
  const [materialId, setMaterialId] = useState<string>('aisi304');
  const [thicknessMm, setThicknessMm] = useState<number>(20);
  const [pressureBar, setPressureBar] = useState<number>(6200); // 3800 a 6500 bar
  const [orificeMm, setOrificeMm] = useState<number>(0.33); // 0.25, 0.33, 0.38 mm
  const [abrasiveGMin, setAbrasiveGMin] = useState<number>(400); // 150 a 650 g/min
  const [meshSize, setMeshSize] = useState<number>(80); // 50, 80, 120
  const [qualityIndex, setQualityIndex] = useState<number>(3);
  const [fiveAxisActive, setFiveAxisActive] = useState<boolean>(true);
  const [pumpType, setPumpType] = useState<'intensifier' | 'direct'>('intensifier');

  const selectedMaterial = useMemo(
    () => MATERIALS.find((m) => m.id === materialId) || MATERIALS[0],
    [materialId]
  );

  const selectedQuality = useMemo(
    () => QUALITY_LEVELS.find((q) => q.q === qualityIndex) || QUALITY_LEVELS[2],
    [qualityIndex]
  );

  const metrics = useMemo(() => {
    // 1. Conversión de presión y velocidad de chorro por Bernoulli modificada
    const pressurePsi = Math.round(pressureBar * 14.5038);
    const pressurePa = pressureBar * 1e5;
    const cd = 0.72; // Coeficiente de descarga en orificio de diamante
    const rhoWater = 1000 * (1 + 0.000028 * pressureBar); // Compresibilidad a UHP
    const jetVelocityMs = cd * Math.sqrt((2 * pressurePa) / rhoWater);
    const machNumber = jetVelocityMs / 343;

    // 2. Caudal volumétrico de agua y potencia hidráulica
    const areaOrificeM2 = Math.PI * Math.pow((orificeMm * 1e-3) / 2, 2);
    const waterFlowLMin = areaOrificeM2 * jetVelocityMs * 60 * 1000;
    const waterMassKgMin = waterFlowLMin;
    const abrasiveKgMin = abrasiveGMin / 1000;

    // 3. Velocidad de partículas abrasivas por transferencia de momento
    const mixingEfficiency = 0.71;
    const abrasiveVelocityMs =
      mixingEfficiency * (waterMassKgMin / (waterMassKgMin + abrasiveKgMin)) * jetVelocityMs;

    // 4. Potencia hidráulica y eléctrica según arquitectura de bomba
    const hydraulicPowerKw = (pressureBar * waterFlowLMin) / 600;
    const pumpEfficiency = pumpType === 'direct' ? 0.86 : 0.70;
    const electricPowerKw = hydraulicPowerKw / pumpEfficiency;
    const electricPowerHp = electricPowerKw * 1.341;

    // 5. Velocidad de avance CNC (Modelo empírico calibrado tipo Zeng & Kim)
    const meshFactor = meshSize === 50 ? 1.12 : meshSize === 120 ? 0.82 : 1.0;
    const pressureFactor = Math.pow(pressureBar / 4100, 1.35);
    const abrasiveFactor = Math.pow(abrasiveGMin / 380, 0.62) * (abrasiveGMin > 550 ? 0.93 : 1.0);
    const orificeFactor = Math.pow(orificeMm / 0.33, 1.15);

    const maxSeparationSpeedMmMin =
      (selectedMaterial.machinability * 14.5 * pressureFactor * abrasiveFactor * orificeFactor * meshFactor) /
      Math.pow(thicknessMm, 1.08);

    const feedRateMmMin = Math.max(4, maxSeparationSpeedMmMin * selectedQuality.speedFactor);

    // 6. Rugosidad superficial Ra (µm) y Conicidad (Kerf Taper)
    const meshRaMultiplier = meshSize === 50 ? 1.28 : meshSize === 120 ? 0.68 : 1.0;
    const estimatedRaUm = +(selectedQuality.raBase * meshRaMultiplier).toFixed(2);

    const nozzleDiamMm = +(orificeMm * 3.05).toFixed(2);
    const topKerfMm = +(nozzleDiamMm * 1.08).toFixed(2);
    const effectiveTaperDeg = fiveAxisActive ? 0.015 : selectedQuality.taperDeg;
    const taperPerSideMm = +(
      Math.tan((effectiveTaperDeg * Math.PI) / 180) * thicknessMm
    ).toFixed(3);
    const bottomKerfMm = +(Math.max(0.4, topKerfMm - 2 * taperPerSideMm)).toFixed(2);

    // 7. Retardo de cola (Jet Lag) y Costo Operativo por Metro Lineal (USD/m)
    const jetLagMm = +(
      0.18 * thicknessMm * Math.pow(selectedQuality.speedFactor, 0.85) * (fiveAxisActive ? 0.35 : 1.0)
    ).toFixed(2);

    const cutTimeMinPerMeter = 1000 / feedRateMmMin;
    const abrasiveCostPerMeterUsd = cutTimeMinPerMeter * abrasiveKgMin * 0.65; // ~0.65 USD/kg Garnet 80 HPA
    const powerAndConsumablesPerMeterUsd = cutTimeMinPerMeter * (electricPowerKw * 0.14 / 60 + 0.38);
    const totalCostPerMeterUsd = +(abrasiveCostPerMeterUsd + powerAndConsumablesPerMeterUsd).toFixed(2);

    return {
      pressurePsi,
      jetVelocityMs: Math.round(jetVelocityMs),
      machNumber: machNumber.toFixed(2),
      waterFlowLMin: waterFlowLMin.toFixed(2),
      abrasiveVelocityMs: Math.round(abrasiveVelocityMs),
      hydraulicPowerKw: hydraulicPowerKw.toFixed(1),
      electricPowerKw: electricPowerKw.toFixed(1),
      electricPowerHp: Math.round(electricPowerHp),
      feedRateMmMin: Math.round(feedRateMmMin),
      estimatedRaUm,
      nozzleDiamMm,
      topKerfMm,
      bottomKerfMm,
      effectiveTaperDeg: effectiveTaperDeg.toFixed(2),
      taperPerSideMm,
      jetLagMm,
      cutTimeMinPerMeter: cutTimeMinPerMeter.toFixed(1),
      totalCostPerMeterUsd,
    };
  }, [
    selectedMaterial,
    thicknessMm,
    pressureBar,
    orificeMm,
    abrasiveGMin,
    meshSize,
    selectedQuality,
    fiveAxisActive,
    pumpType,
  ]);

  return (
    <div className="bg-slate-950 text-slate-100 p-6 rounded-2xl border border-cyan-500/30 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-800 pb-4 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
            Gemelo Digital Industria 4.0 • UTN FRP - TUM Viale
          </span>
          <h2 className="text-2xl font-bold mt-2 text-white">
            Simulador Mecatrónico de Corte por Chorro de Agua (AWJ)
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFiveAxisActive(!fiveAxisActive)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
              fiveAxisActive
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            {fiveAxisActive ? '5 Ejes Dynamic XD / Tilt-A-Jet: ACTIVO' : 'Cabezal 3 Ejes Estándar (Sin Compensación)'}
          </button>
        </div>
      </div>

      {/* Controles de Entrada y Resultados SCADA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4 bg-slate-900/90 p-5 rounded-xl border border-slate-800">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">ALEACIÓN METÁLICA</label>
            <select
              value={materialId}
              onChange={(e) => setMaterialId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
            >
              {MATERIALS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (M={m.machinability})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">PRESIÓN UHP DE BOMBA</span>
              <span className="text-cyan-400 font-bold">
                {pressureBar} bar ({metrics.pressurePsi.toLocaleString()} PSI)
              </span>
            </div>
            <input
              type="range"
              min={3800}
              max={6500}
              step={100}
              value={pressureBar}
              onChange={(e) => setPressureBar(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">ESPESOR DE LA PIEZA (h)</span>
              <span className="text-cyan-400 font-bold">{thicknessMm} mm</span>
            </div>
            <input
              type="range"
              min={2}
              max={120}
              step={1}
              value={thicknessMm}
              onChange={(e) => setThicknessMm(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">CAUDAL DE ABRASIVO GRANATE</span>
              <span className="text-amber-400 font-bold">{abrasiveGMin} g/min (Malla {meshSize})</span>
            </div>
            <input
              type="range"
              min={150}
              max={650}
              step={25}
              value={abrasiveGMin}
              onChange={(e) => setAbrasiveGMin(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">ÍNDICE DE CALIDAD CNC (Q1 - Q5)</label>
            <div className="grid grid-cols-5 gap-1">
              {QUALITY_LEVELS.map((q) => (
                <button
                  key={q.q}
                  onClick={() => setQualityIndex(q.q)}
                  className={`py-2 rounded text-xs font-bold transition ${
                    qualityIndex === q.q
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  Q{q.q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Telemetría Calculada */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400">VELOCIDAD CHORRO AGUA</span>
            <p className="text-2xl font-bold text-cyan-400 mt-1">{metrics.jetVelocityMs} m/s</p>
            <span className="text-xs text-slate-400">Mach {metrics.machNumber} • Partículas: {metrics.abrasiveVelocityMs} m/s</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400">VELOCIDAD AVANCE CNC (Vf)</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{metrics.feedRateMmMin} mm/min</p>
            <span className="text-xs text-slate-400">Tiempo por metro: {metrics.cutTimeMinPerMeter} min</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400">RUGOSIDAD ESTIMADA (Ra)</span>
            <p className="text-2xl font-bold text-amber-400 mt-1">{metrics.estimatedRaUm} µm</p>
            <span className="text-xs text-slate-400">ZAC / HAZ: 0,00 mm (En frío)</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400">SANGRÍA (KERF) & TAPER</span>
            <p className="text-xl font-bold text-white mt-1">
              {metrics.topKerfMm} → {metrics.bottomKerfMm} mm
            </p>
            <span className="text-xs text-cyan-300">Conicidad: {metrics.effectiveTaperDeg}° ({metrics.taperPerSideMm} mm/lado)</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400">CAUDAL Y POTENCIA</span>
            <p className="text-xl font-bold text-white mt-1">{metrics.waterFlowLMin} L/min</p>
            <span className="text-xs text-slate-400">{metrics.electricPowerKw} kW ({metrics.electricPowerHp} HP)</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400">COSTO OPERATIVO ESTIMADO</span>
            <p className="text-2xl font-bold text-rose-400 mt-1">USD {metrics.totalCostPerMeterUsd}/m</p>
            <span className="text-xs text-slate-400">Retardo Jet Lag: {metrics.jetLagMm} mm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```


## 14. Guion Cronometrado de Exposición (15–20 Minutos) para Diego y Ariel

Para brillar en la defensa del **10/11/26** en la [Tecnicatura Universitaria en Mecatrónica de la UTN FRP en Viale](https://www.frp.utn.edu.ar/info2/?page_id=28373), se propone la siguiente distribución equitativa y dinámica apoyada en la web interactiva:

| Bloque de Tiempo | Expositor | Secciones de la Consigna | Acción en la Web Interactiva en Vivo |
| :--- | :--- | :--- | :--- |
| **00:00 – 03:30** | **Diego** | **1. Descripción del proceso** y **2. Principio físico** | Abrir el *Dashboard SCADA*, mostrar cómo el agua a $6.500	ext{ bar}$ alcanza **Mach 3 ($1.050	ext{ m/s}$)** por Bernoulli y cómo el efecto Venturi acelera más de 1 millón de partículas de granate por segundo sin generar Zona Afectada por el Calor ($	ext{ZAC} = 0$). |
| **03:30 – 07:30** | **Ariel** | **3. Principio de funcionamiento paso a paso** y **4. Maquinaria e instalaciones** | Mostrar el diagrama interactivo del cabezal: desde el *piercing* con vacío asistido (*UltraPierce*) hasta la interpolación de 5 ejes. Comparar la bomba intensificadora lineal ([KMT STREAMLINE PRO](https://kmtwaterjet.com/en-gb/pro-pump-90000psi-6200bar-60hp/)) vs. la servobomba directa ([OMAX EnduroMAX](https://www.omax.com/en/media-center/tips/unlocking-efficiency-enduromax-pump/)) y detallar la planta de ósmosis inversa ($	ext{TDS } 50	ext{–}150	ext{ ppm}$). |
| **07:30 – 11:30** | **Diego** | **5. Herramientas y consumibles** y **6. Materiales y geometrías** | Mostrar la telemetría IIoT del orificio de diamante sintético ([KMT IDE](https://kmtwaterjet.com/en-gb/products/ide-diamond-cutting-head/)), el tubo de enfoque [ROCTEC](https://www.irwaterjet.com/focusing-tubes/) y el abrasivo [Barton Garnet 80 HPA](https://www.barton.com/waterjet-abrasive-guide/). Explicar por qué corta Titanio, Inconel y Cobre reflectivo sin destemplar ni microfisurar. |
| **11:30 – 15:30** | **Ariel** | **7. Condiciones y parámetros**, **8. Calidad ($Q_1	ext{–}Q_5$)** y **9. Defectos y causas** | **Demostración Estrella en Vivo:** Invitar al docente a elegir un material y espesor en el **Simulador Interactivo**. Mostrar cómo al subir la velocidad a $Q_1$ aparecen el *Kerf Taper* y el *Jet Lag*, y cómo al activar el botón de **5 Ejes Dynamic XD / Tilt-A-Jet** el ángulo de conicidad cae a $0^\circ$. |
| **15:30 – 18:30** | **Diego y Ariel** | **10. Seguridad y ambiente** y **11. Aplicaciones, ventajas y comparativa final** | Repasar el protocolo ante inyección hipodérmica UHP, el corte sumergido para bajar de $105	ext{ a }75	ext{ dBA}$ y cerrar con la tabla comparativa frente a los otros 5 grupos de la cátedra. |


## 15. Referencias Técnicas Verificadas

* **Flow International Corporation:** [Centro de mecanizado Mach 500 y cabezal Dynamic Waterjet XD](https://www.flowwaterjet.com/waterjet-products/mach-500) y [Bombas Intensificadoras HyperJet 94.000 PSI (6.500 bar)](https://www.flowwaterjet.com/waterjet-products/hyperjet).
* **OMAX / Hypertherm Associates:** [Eficiencia de bombas de accionamiento directo EnduroMAX](https://www.omax.com/en/media-center/tips/unlocking-efficiency-enduromax-pump/), [Accesorios de 5 ejes A-Jet y compensación Tilt-A-Jet](https://www.omax.com/en/accessories/multi-axis-cutting/) y [Monitoreo predictivo Industria 4.0 IntelliVISOR](https://www.hypertherm.com/Download?fileId=HYP300149&zip=False).
* **KMT Waterjet Systems:** [Bombas UHP STREAMLINE PRO 6.200 bar / 90.000 PSI](https://kmtwaterjet.com/en-gb/pro-pump-90000psi-6200bar-60hp/) y [Cabezales de corte con orificio de diamante integral IDE](https://kmtwaterjet.com/en-gb/products/ide-diamond-cutting-head/).
* **Barton International:** [Guía técnica de abrasivos de granate 80 HPA y Adirondack HPX](https://www.barton.com/waterjet-abrasive-guide/).
* **Literatura Científica sobre Parámetros y Defectos AWJM:** [Recent Progress Trend on Abrasive Waterjet Cutting of Metallic Materials (MDPI Applied Sciences)](https://www.mdpi.com/2076-3417/11/8/3344) y [Performance Analysis of Cutting Parameters on 304 Stainless Steels (IIETA)](https://www.iieta.org/download/file/fid/90969).
* **Institución Académica:** [UTN Facultad Regional Paraná – Tecnicatura Universitaria en Mecatrónica (Extensión Áulica Viale)](https://www.frp.utn.edu.ar/info2/?page_id=28373).
