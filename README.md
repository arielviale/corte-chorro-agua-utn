<div align="center">

# 🌊 Corte por Chorro de Agua Abrasivo (AWJ 4.0)
### *Manufactura de Alta Precisión en Frío, Gemelo Digital e Integración Ciberfísica*

[![UTN FRP](https://img.shields.io/badge/UTN-Facultad_Regional_Paran%C3%A1-003366?style=for-the-badge&logo=mortarboard&logoColor=white)](https://www.frp.utn.edu.ar/)
[![Mecatrónica](https://img.shields.io/badge/Carrera-Tecnicatura_en_Mecatr%C3%B3nica-EA580C?style=for-the-badge&logo=circuitverse&logoColor=white)](https://www.frp.utn.edu.ar/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<p align="center">
  <strong>Proyecto Final Integrador • Defensa de Grado</strong><br>
  Universidad Tecnológica Nacional • Facultad Regional Paraná (Extensión Áulica Viale)<br>
  <strong>Expositores:</strong> Diego Francisconi & Ariel Martinez • <strong>Fecha:</strong> 10 de Noviembre de 2026
</p>

</div>

---

## 🎯 Visión General del Proyecto

Esta plataforma interactiva y slide deck técnico fue desarrollada para la defensa académica en **Mecatrónica**. El sistema aborda en profundidad el proceso de **Corte por Chorro de Agua Abrasivo (AWJ - *Abrasive Waterjet Cutting*)**, analizando su comportamiento fluidodinámico, modelado matemático de sangría (*Kerf*), compensación cinemática multieje y su convergencia con los pilares de la **Industria 4.0**.

Frente a los métodos de separación térmicos tradicionales (Láser de Fibra, Plasma de Alta Definición y Oxicorte), el corte por chorro de agua abrasivo constituye el único proceso de separación que opera bajo un régimen **100% en frío por micro-erosión mecánica**, preservando inalterada la microestructura cristalina de aleaciones críticas sin crear tensiones residuales ni bordes martensíticos.

---

## ⚡ Métricas Físicas y Mecatrónicas Clave

```
┌─────────────────────────┬─────────────────────────┬─────────────────────────┐
│     ZAC = 0,00 mm       │   P_UHP: 6.480 bar      │   V_CHORRO ≈ 1.050 m/s  │
│  Zona Afectada Térmica  │  Presión Ultra-Alta     │   Régimen Supersónico   │
│   (Corte 100% en Frío)  │  (Flow HyperJet 94k)    │       (Mach 3.06)       │
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│    1,1 M part/seg       │     θ = 0,00°           │     Espesor >250 mm     │
│   Abrasivo Barton       │  Conicidad Compensada   │   Acero, Ti-6Al-4V,     │
│  Garnet Rojo Malla 80   │ (Cabezal 5 Ejes 3D)     │  Cobre, Inconel, Vidrio │
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

---

## 🚀 Módulos y Funcionalidades del Sistema

### 1. 🖥️ Slide Deck de Presentación Suizo Industrial (Swiss Precision)
- **Diseño de Alto Contraste:** Basado en fondos claros y tipografía industrial nítida para máxima legibilidad a distancia en proyectores de auditorio.
- **Gramática Titular y Concisa:** Estructura `Palabra Clave: Fragmento`, limitando la carga cognitiva a ~40 palabras por diapositiva.
- **Alternancia Dinámica de Layouts:**
  - *Layout A (Big Metrics):* Métricas de choque visual para principios físicos y cinemática 5D.
  - *Layout B (3-Column Cards):* Comparativas técnicas directas y espectro de materiales.
  - *Layout C (Graphic/Metric Split):* Diagramas de componentes con tarjetas de telemetría.
  - *Layout D (Process Timeline):* Cadenas secuenciales de transformación hidráulica y pilares Industria 4.0.
- **Cronómetro de Defensa:** Reloj integrado en tiempo real calibrado para el bloque de defensa de 15–20 minutos.

### 2. 🧊 Cabezal 3D Fotorrealista Interactivo (Three.js / WebGL)
- Modelado paramétrico con materiales fotorrealistas PBR (acero inoxidable cepillado, titanio y carburo de tungsteno).
- **Animación Fluidodinámica en Vivo:** Chorro supersónico a Mach 3.06 con nube de partículas y salpicadura sobre la chapa de acero.
- **Control Cinemático de 5 Ejes:** Botones interactivos para alternar entre `θ = 0,00° (Perpendicular)`, `-4° Taper` y `+8° Bisel 3D`.
- **Órbita 360°:** Arrastre con el mouse y zoom con rueda a 60 FPS nativos sin dependencias externas.

### 3. ⚙️ Gemelo Digital y Simulador AWJ 4.0
- **Cálculo Numérico en Tiempo Real:** Avance CNC ($V_f$), rugosidad estimada ($Ra$), número de Mach, potencia hidráulica ($P \times Q$), potencia eléctrica de bomba y costos operativos directos (USD/m).
- **Selector de Materiales Industriales:** Acero Inoxidable AISI 304, Titanio Ti-6Al-4V, Aluminio 6061-T6, Hardox 500, Inconel 718, Cobre Electrolítico C11000 y Latón.
- **Visualizador SVG del Frente de Corte:** Esquema en sección transversal de la sangría (*Kerf Taper*) y del retardo de cola (*Jet Lag*).

### 4. 🔬 Comparativa Inter-Tecnológica
- Matriz cuantitativa de procesos: AWJM vs Láser Fibra Óptica vs Plasma HD vs Electroerosión por Hilo (EDM).
- Criterios de selección según espesor, tolerancia dimensional, conductividad eléctrica y afectación metalúrgica.

### 5. 🛠️ Catálogo de Defectología Mecatrónica
- Análisis de causas y soluciones automáticas por software CAM / CNC:
  - *Kerf Taper (Conicidad de pared)* ➔ Compensación dinámica con muñeca A/C 5 ejes.
  - *Jet Lag (Retardo en curvas y esquinas)* ➔ Algoritmo *Corner Pass* con *Look-Ahead*.
  - *Top Edge Roll-Over (Borde redondeado)* ➔ Palpador de terreno capacitivo (*Terrain Follower* a 1,5 mm).
  - *Piercing Blowout (Cráter de entrada)* ➔ Perforación dinámica en arco con vacío *UltraPierce*.

---

## 📁 Arquitectura del Código

```text
CHORRO AGUA/
├── .agents/skills/              # Skills de desarrollo y agentes locales
├── public/                      # Assets estáticos y logos
├── src/
│   ├── components/
│   │   ├── SwissPresentationDeck.tsx   # Slide deck principal de 11 diapositivas (incluye PWJ vs AWJ)
│   │   ├── WaterjetHead3D.tsx          # Visor 3D fotorrealista en Three.js
│   │   ├── AWJSimulator40.tsx          # Simulador de corte y gemelo digital CNC
│   │   ├── HeadDiagramInteractive.tsx  # Corte transversal del cabezal y Venturi
│   │   ├── WaterjetTechComparison.tsx  # Matriz comparativa entre tecnologías
│   │   ├── DefectsAnalysis.tsx         # Diagnóstico físico y corrección mecatrónica
│   │   ├── SafetyEnvironment.tsx       # Normas de seguridad UHP y sustentabilidad
│   │   ├── AcademicSections.tsx        # Memoria técnica completa de 11 capítulos
│   │   └── SplineScene.tsx             # Wrapper de integración para escenas Spline
│   ├── data/
│   │   └── waterjetData.ts             # Base de datos de materiales, fórmulas y métricas
│   ├── types/
│   │   └── index.ts                    # Tipado estricto TypeScript
│   ├── utils/
│   │   └── pdfExport.ts                # Generador de dossier técnico en PDF
│   ├── App.tsx                         # Orquestador principal de la aplicación
│   ├── index.css                       # Directivas Tailwind y estilos de precisión
│   └── main.tsx                        # Punto de entrada React
├── index.html                          # HTML5 optimizado con tipografías Google Fonts
├── package.json                        # Dependencias (React 19, Three.js, Lucide, Tailwind)
├── tailwind.config.js                  # Paleta Suiza Industrial y espaciado técnico
├── tsconfig.json                       # Configuración de compilación TypeScript
└── vite.config.ts                      # Configuración de empaquetado Vite
```

---

## ⌨️ Atajos de Teclado durante la Exposición

| Tecla | Acción |
| :---: | :--- |
| **`→`** / **`Espacio`** / **`AvPág`** | Avanzar a la siguiente diapositiva |
| **`←`** / **`RePág`** | Retroceder a la diapositiva anterior |
| **`Inicio`** | Ir a la primera diapositiva (Portada) |
| **`Fin`** | Ir a la última diapositiva (Cierre y Preguntas) |
| **`F`** / Botón Esquina | Alternar modo Pantalla Completa (*Fullscreen*) |
| **`ESC`** | Cerrar el cajón de diapositivas o el Anexo Técnico |

---

## 🛠️ Instalación y Ejecución Local

### Prerrequisitos
- **Node.js** v18.0 o superior
- **npm** v9.0 o superior

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/arielviale/corte-chorro-agua-utn.git
   cd corte-chorro-agua-utn
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abrir en el navegador: `http://localhost:5173/`

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 👥 Equipo de Desarrollo y Exposición

- **Diego Francisconi** — Estudiante de Tecnicatura Universitaria en Mecatrónica
- **Ariel Martinez** — Estudiante de Tecnicatura Universitaria en Mecatrónica
- **Institución:** Universidad Tecnológica Nacional • Facultad Regional Paraná (UTN FRP)
- **Extensión Áulica:** Viale, Entre Ríos, Argentina

---

<div align="center">
  <sub>Desarrollado con pasión mecatrónica para la defensa académica UTN FRP 2026.</sub>
</div>
