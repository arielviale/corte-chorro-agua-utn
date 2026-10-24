import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  CheckCircle2, 
  Atom, 
  Settings, 
  Wrench, 
  Layers, 
  Sliders, 
  Award, 
  ShieldCheck, 
  Building2, 
  FileText,
  Printer,
  Sparkles,
  HelpCircle,
  Zap,
  Gauge,
  Cpu,
  Download,
  FileDown,
  X,
  Check,
  Info
} from 'lucide-react';
import { 
  GOLDEN_EFFECTS, 
  MACHINERY_COMPONENTS, 
  AUXILIARY_SERVICES, 
  WORKING_PARAMETERS_TABLE,
  DEFECTS_CATALOG,
  POWER_CALCULATION,
  OPERATIONAL_STEPS_9,
  NORMATIVE_REFERENCES
} from '../data/waterjetData';
import { downloadAcademicPDF, downloadAcademicMarkdown } from '../utils/pdfExport';

export default function AcademicSections() {
  const [openSection, setOpenSection] = useState<number | 'all' | null>(1);
  const [showGoldenEffects, setShowGoldenEffects] = useState<boolean>(true);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handlePrint = () => {
    setShowExportModal(false);
    try {
      window.print();
    } catch (err) {
      console.warn('Error al invocar window.print(), generando descarga directa de PDF:', err);
      downloadAcademicPDF();
      setDownloadNotice('Se descargó el archivo PDF directamente en tu equipo.');
      setTimeout(() => setDownloadNotice(null), 4000);
    }
  };

  const handleDirectPdf = () => {
    setIsGeneratingPdf(true);
    setDownloadNotice('Compilando documento técnico universitario...');
    setTimeout(() => {
      try {
        downloadAcademicPDF();
        setDownloadNotice('¡PDF oficial descargado exitosamente!');
        setTimeout(() => setDownloadNotice(null), 4000);
      } catch (err) {
        console.error('Error generando PDF:', err);
        setDownloadNotice('Error en descarga directa. Por favor utiliza la opción "Guardar como PDF / Imprimir".');
      } finally {
        setIsGeneratingPdf(false);
      }
    }, 200);
  };

  const handleMarkdownDownload = () => {
    downloadAcademicMarkdown();
    setDownloadNotice('Documento Markdown (.md) descargado correctamente.');
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  const sections = [
    {
      id: 1,
      title: '1. Descripción del Proceso',
      icon: Atom,
      content: (
        <div className="space-y-4">
          <p className="leading-relaxed">
            El <strong>corte por chorro de agua</strong> (<em>Waterjet Cutting</em>) es un proceso de mecanizado no tradicional por <strong>erosión en frío</strong>. Un chorro de agua a presión ultra alta —que en la tecnología actual alcanza hasta <strong>94.000 psi (≈ 6.480 bar)</strong>— sale impulsado por un orificio microscópico calibrado a velocidad supersónica (casi 4 veces la velocidad del sonido, entre <strong>1.000 y 1.150 m/s</strong>), erosionando el material por impacto mecánico sin producir alteración térmica.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                <span className="text-cyan-400 font-bold font-mono text-sm">Modalidad 1: Chorro Puro (PWJ)</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Utiliza agua sola a ultra-alta presión que pasa por un orificio de 0,08 a 0,25 mm. Se emplea para el corte rápido y estéril de <strong>materiales blandos</strong>: goma, espuma de poliuretano, juntas, plásticos, alimentos, cuero y papel, con costo operativo mínimo (cero consumo de abrasivo).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="text-amber-400 font-bold font-mono text-sm">Modalidad 2: Chorro Abrasivo (AWJ)</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                El efecto Venturi en el cabezal genera vacío que arrastra granate mineral (<em>Barton Garnet</em>), <strong>multiplicando la potencia erosiva hasta 1.000 veces</strong>. Permite cortar cualquier metal (acero inoxidable, titanio, Hardox, cobre), piedra, vidrio y cerámicos hasta espesores mayores a 250–300 mm.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            <strong className="text-cyan-300 font-mono block mb-1">¿Para qué se utiliza?</strong>
            Cuando se requiere máxima versatilidad de material, ausencia total de calor (cero deformación térmica), o geometrías complejas con tolerancias estrechas que otros procesos no logran o encarecen.
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: '2. Principio Físico ⭐ (El Momento de Brillar)',
      icon: Atom,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-amber-950/30 p-4 rounded-xl border border-cyan-500/30 text-xs leading-relaxed">
            <span className="text-amber-300 font-bold font-mono uppercase block mb-1">
              ⭐ Analogía Física Estelar para la Exposición Oral:
            </span>
            <p className="text-slate-200">
              El fenómeno que separa el material es la <strong>erosión por impacto de partículas a alta velocidad</strong>: es exactamente <em>el mismo principio geológico con el que el agua y el viento tallan el Cañón del Antílope en la roca, pero acelerado 1.000 veces</em> mediante mecatrónica de precisión.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">1. Ecuación de Bernoulli y Deducción Hidrodinámica:</span>
              <p className="text-slate-300 font-sans leading-relaxed mb-2">
                Para líneas de corriente estacionarias, asumiendo cambio de elevación nulo (Δz ≈ 0), velocidad en la cámara previa despreciable (v₁ ≈ 0) y descarga a presión atmosférica (P₂ ≈ P_atm ≈ 0), la velocidad teórica ideal del chorro (v_jet) resulta:
              </p>
              <div className="bg-slate-900 p-2 rounded text-center text-cyan-300 font-mono text-xs">
                v_jet = √ [ (2 · P) / ρ ]
              </div>
              <p className="text-slate-300 font-sans leading-relaxed mt-2 mb-1">
                Para caracterizar con rigor el régimen de Ultra Alta Presión (P &gt; 4.000 bar), se incorporan las no-idealidades del fluido real:
              </p>
              <ul className="text-slate-300 font-sans list-disc list-inside space-y-1 text-xs">
                <li><strong>Compresibilidad del Agua:</strong> A 4.000 bar el agua experimenta un incremento de densidad del 10% al 12%, modificando el valor efectivo de ρ.</li>
                <li><strong>Coeficiente de Descarga (C_d ≈ 0,60 – 0,70):</strong> Por fricción viscosa en la pared del orificio, vena contracta y pérdidas por turbulencia.</li>
              </ul>
              <div className="bg-slate-900 p-2 rounded text-center text-emerald-300 font-mono text-xs mt-2">
                v_real = C_d · v_jet = C_d · √ [ (2 · P) / ρ ] ≈ 700 a 1.000 m/s (Mach 2 a Mach 3)
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">2. Densidad de Energía Cinética y Conservación del Momento Lineal:</span>
              <p className="text-slate-300 font-sans leading-relaxed mb-2">
                La tasa de remoción de material se rige por la energía cinética del chorro: <strong>E_k = ½ · m · v²</strong>. La dependencia cuadrática respecto a la velocidad demuestra que elevar la presión incrementa exponencialmente la densidad de energía cinética entregada al sustrato.
              </p>
              <p className="text-slate-300 font-sans leading-relaxed mb-1">
                En la cámara Venturi (AWJM), la aceleración multifásica (agua, granate y aire) se rige por la <strong>conservación del momento lineal unidimensional</strong>:
              </p>
              <div className="bg-slate-900 p-2 rounded text-center text-amber-300 font-mono text-xs">
                ṁ_w · v_w = (ṁ_w + ṁ_a + ṁ_air) · v_mix
              </div>
              <p className="text-slate-400 font-sans text-[11px] mt-1.5">
                Donde v_mix ≈ 600 m/s. <em>Demostración física crítica:</em> Si se sobrealimenta el caudal de abrasivo (ṁ_a) por encima del óptimo, la mezcla se satura, reduciendo drásticamente la velocidad final v_mix y provocando atascamiento, pérdida de poder de corte e ineficiencia energética.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-purple-300 font-bold block mb-1">3. Mecanismo Dual de Remoción: Microcorte vs Microfractura:</span>
              <p className="text-slate-300 font-sans leading-relaxed">
                Cada grano microscópico de granate actúa como una <strong>microherramienta de corte</strong> que colisiona a más de 600–700 m/s:
              </p>
              <ul className="text-slate-300 font-sans list-disc list-inside mt-1.5 space-y-1 text-xs">
                <li><strong>Materiales Dúctiles (Metales):</strong> Erosión por <em>microcorte y cizalladura plástica</em> localizada en frío.</li>
                <li><strong>Materiales Frágiles (Vidrio, Piedra, Cerámicos):</strong> Erosión por <em>microfractura y propagación controlada de grietas</em> sin choque térmico.</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">4. Potencia Hidráulica del Chorro vs Potencia Eléctrica Instalada:</span>
              <p className="text-slate-300 font-sans leading-relaxed mb-2">
                La potencia hidráulica teórica instantánea entregada por la columna del chorro se calcula mediante el producto directo de la presión por el caudal volumétrico:
              </p>
              <div className="bg-slate-900 p-2 rounded text-center text-cyan-300 font-mono text-xs">
                {POWER_CALCULATION.formula}
              </div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-sans">
                <div className="bg-slate-900/60 p-2 rounded border border-cyan-500/20 text-slate-300">
                  <span className="text-cyan-400 font-bold font-mono block">Cálculo Teórico en Régimen (400 MPa):</span>
                  Presión: P = 400 × 10⁶ Pa (4.000 bar)<br />
                  Caudal: Q = 2,0 L/min = 3,33 × 10⁻⁵ m³/s<br />
                  <strong className="text-emerald-400 font-mono">Potencia Hidráulica: P_h ≈ 13,3 kW</strong>
                </div>
                <div className="bg-slate-900/60 p-2 rounded border border-amber-500/20 text-slate-300">
                  <span className="text-amber-400 font-bold font-mono block">Potencia Eléctrica Motor (Bomba UHP):</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed mt-1">
                    {POWER_CALCULATION.example.electricPowerNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-500/40 text-xs text-emerald-200">
            <strong className="text-emerald-400 block font-mono mb-0.5">Ventaja Metalúrgica Decisiva frente a Láser, Plasma y Oxicorte:</strong>
            Al no existir calor ni reacciones químicas, <strong>no existe Zona Afectada Térmicamente (ZAT = 0,00 mm)</strong>, ni tensiones residuales de tracción, ni endurecimiento martensítico por enfriamiento brusco. Las propiedades mecánicas originales del metal quedan 100% inalteradas.
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: '3. Principio de Funcionamiento (Paso a Paso)',
      icon: Settings,
      content: (
        <div className="space-y-3">
          <p className="text-xs text-slate-300 leading-relaxed">
            La secuencia operativa hidromecatrónica integral se divide en <strong>9 etapas encadenadas</strong> desde el diseño digital hasta el control dimensional final:
          </p>
          <ol className="space-y-2 text-xs font-sans">
            {OPERATIONAL_STEPS_9.map((p) => (
              <li key={p.step} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                  {p.step}
                </span>
                <div className="space-y-0.5">
                  <span className="text-white font-bold font-mono block text-xs">{p.title}</span>
                  <span className="text-slate-300 text-xs leading-relaxed block">{p.desc}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )
    },
    {
      id: 4,
      title: '4. Maquinaria, Instalaciones y Tecnología 2026 ⭐',
      icon: Building2,
      content: (
        <div className="space-y-4 text-xs">
          <div>
            <h4 className="text-cyan-400 font-mono font-bold uppercase tracking-wider mb-2">
              Componentes Principales de la Máquina:
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left font-sans">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                  <tr>
                    <th className="p-2.5">Componente</th>
                    <th className="p-2.5">Función Mecatrónica</th>
                    <th className="p-2.5 text-cyan-400">Innovación 2026 / Estado del Arte</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 text-slate-300">
                  {MACHINERY_COMPONENTS.map((item, i) => (
                    <tr key={i}>
                      <td className="p-2.5 font-bold text-white font-mono">{item.component}</td>
                      <td className="p-2.5">{item.function}</td>
                      <td className="p-2.5 text-cyan-300">{item.specs2026}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-amber-400 font-mono font-bold uppercase tracking-wider mb-2">
              Servicios Auxiliares e Instalaciones de Planta:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {AUXILIARY_SERVICES.map((aux, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-amber-300 font-mono font-bold block mb-1">{aux.service}</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{aux.requirement}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/40 shadow-sm space-y-2.5">
            <span className="text-purple-300 font-mono font-bold uppercase block text-xs">
              Lo Premium 2026 para Destacar en la Defensa:
            </span>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li>• <strong>Bomba HyperJet de Flow:</strong> 94.000 psi (6.480 bar) — corta 30-50% más rápido y consume ~50% menos granate que una de 60.000 psi.</li>
              <li>• <strong>Cinemática 5 Ejes Doble (Lateral + Lead Angle):</strong> La inclinación lateral desvía la conicidad al scrap dejando la pared útil a 90,00°. El <em>Lead Angle</em> (inclinación frontal) adelanta la base del chorro para neutralizar el retraso parabólico (<em>Stream Lag</em>), el cual se torna crítico al superar el 25% de la velocidad máxima de separación.</li>
              <li>• <strong>Variante Micro-Waterjet:</strong> Orificios de 0,05 a 0,10 mm, micro-tubos de 0,15 a 0,20 mm y abrasivo ultra-fino Mesh 200–300, logrando un kerf de apenas 0,20 mm y tolerancias de <strong>±0,01 mm</strong> para stents biomédicos y microelectrónica.</li>
              <li>• <strong>Software Inteligente (OMAX IntelliMAX / Flow):</strong> Asigna automáticamente velocidades, presiones y calidades Q1-Q5 según material y espesor.</li>
              <li>• <strong>Industria 4.0:</strong> Diagnóstico remoto cloud (Remote Help de Hypertherm), nesting automático de chapa y <em>"lights-out cutting"</em> (corte sin operador durante la noche).</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: '5. Herramientas y Consumibles Críticos',
      icon: Wrench,
      content: (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-mono font-bold block mb-1">1. Orificio de Gema (Orifice):</span>
              <p className="text-slate-300 leading-relaxed">
                Rubí (40–100 h por micro-fractura) y Zafiro (50–200 h por cavitación) para bajo costo, o <strong>Diamante Monocristalino / PCD (800–2.000 horas)</strong> para chorro colimado continuo.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-mono font-bold block mb-1">2. Tubo Mezclador (Nozzle):</span>
              <p className="text-slate-300 leading-relaxed">
                Carburo de tungsteno nanométrico (ROCTEC). Diámetros de 0,76 a 1,02 mm. Se desgasta a una tasa de <strong>≈0,025 mm cada 8 horas</strong> de corte continuo, requiriendo reemplazo tras 80–150 h.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-mono font-bold block mb-1">3. Abrasivo Granate de Almandino:</span>
              <p className="text-slate-300 leading-relaxed">
                Dureza 7,5–8,0 Mohs. Malla 50/60 (desbaste), Malla 80 (estándar) y Malla 200–300 (Micro-Waterjet). <strong>Representa el 55% al 70% del costo variable por hora de máquina</strong>.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-300">
            <div>
              <strong className="text-white font-mono block">Impacto Económico HyperPressure:</strong>
              <span>A 90.000–94.000 psi se consume entre 35% y 50% menos abrasivo por metro lineal que a 60.000 psi, amortizando la bomba UHP en tiempo récord.</span>
            </div>
            <span className="text-amber-400 font-mono text-[11px] bg-slate-900 px-2.5 py-1 rounded border border-slate-700 whitespace-nowrap self-start sm:self-center">
              Ahorro 50% Granate
            </span>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: '6. Materiales, Espesores y Capacidades Geométricas',
      icon: Layers,
      content: (
        <div className="space-y-3 text-xs leading-relaxed">
          <p className="text-slate-300">
            El chorro de agua abrasivo es reconocido como <strong>el proceso de corte de contornos más versátil de la manufactura industrial</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-mono font-bold block mb-1">Gama Completa de Metales:</span>
              <ul className="space-y-1 text-slate-300">
                <li>• Acero al carbono SAE 1020/1045 y Acero antidesgaste Hardox 500 sin borde templado.</li>
                <li>• Acero inoxidable AISI 304/316L sin pérdida de resistencia a corrosión intergranular.</li>
                <li>• Aluminio estructural 6061-T6 y Titanio Ti-6Al-4V (sin capa alfa fragilizada).</li>
                <li>• Metales altamente reflectivos: Cobre C11000 y Latón (que el láser no puede cortar).</li>
                <li>• Superaleaciones aeroespaciales: Inconel 718 y Hastelloy.</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-mono font-bold block mb-1">No Metales, Compuestos y Geometrías:</span>
              <ul className="space-y-1 text-slate-300">
                <li>• Vidrio blindado, piedra, mármol, granito, cerámica y fibra de carbono.</li>
                <li>• <strong>Espesores:</strong> Metales macizos de más de 250 a 300 mm en una sola pasada.</li>
                <li>• <strong>Formatos:</strong> Chapas, placas gruesas, perfiles y tubos con 6to eje rotativo.</li>
                <li>• <strong>Geometrías:</strong> Biselados hasta 60° (5 ejes), esquinas vivas y perforación directa sin taladro previo.</li>
              </ul>
            </div>
          </div>

          <div className="bg-rose-950/20 p-3 rounded-lg border border-rose-900/40 text-rose-300 text-xs">
            <strong>Limitación Clave de Mercado:</strong> Es más lento en espesores muy grandes comparado con oxicorte o plasma, y no resulta económico para producción masiva simple de chapa fina de 1 a 3 mm (donde predomina el láser de fibra).
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: '7. Condiciones y Parámetros Operativos de Trabajo',
      icon: Sliders,
      content: (
        <div className="space-y-4 text-xs">
          <p className="text-slate-300 leading-relaxed">
            Variables de proceso gobernadas por el CNC y su impacto físico:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left font-sans">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                <tr>
                  <th className="p-2.5">Variable Operativa</th>
                  <th className="p-2.5">Efecto en el Proceso</th>
                  <th className="p-2.5">Rango Típico</th>
                  <th className="p-2.5 text-cyan-400">Método de Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 text-slate-300">
                {WORKING_PARAMETERS_TABLE.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-2.5 font-bold text-white font-mono">{row.variable}</td>
                    <td className="p-2.5">{row.effect}</td>
                    <td className="p-2.5 text-amber-300 font-mono">{row.recommendedRange}</td>
                    <td className="p-2.5 text-slate-400">{row.controlMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
            <span className="text-cyan-400 font-mono font-bold block">Tipos de Perforación Inicial (Piercing Mecatrónico):</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 text-slate-300">
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <strong className="text-white block font-mono text-xs">1. Perforación Estacionaria:</strong>
                <span>El cabezal permanece fijo; ideal para materiales frágiles o vidrio con vacío previo UltraPierce.</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <strong className="text-white block font-mono text-xs">2. Perforación Dinámica (Lineal):</strong>
                <span>El cabezal avanza en rampa mientras perfora, dispersando la energía y evitando cráteres.</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <strong className="text-white block font-mono text-xs">3. Perforación Radial (Circular):</strong>
                <span>Trayectoria en espiral en scrap para abrir camino suavemente en metales gruesos (&gt;50 mm).</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: '8. Calidad de Corte y Clasificación Internacional (Q1 a Q5)',
      icon: Award,
      content: (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-center">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Tolerancia Dimensional</span>
              <strong className="text-cyan-400 text-base block mt-0.5">±0,10 mm</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Ancho de Corte (Kerf)</span>
              <strong className="text-amber-400 text-base block mt-0.5">0,8 a 1,5 mm</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Rugosidad Superficial</span>
              <strong className="text-emerald-400 text-base block mt-0.5">Ra 1,4 a 6 µm</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase">Zona Térmica (ZAT)</span>
              <strong className="text-purple-300 text-base block mt-0.5">0,00 mm</strong>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { q: 'Q1', name: 'Corte de Separación Rápida (100% Vel)', ra: 'Ra 12,5 – 25 µm', desc: 'Desbaste veloz o recorte de scrap; estrías marcadas en el tercio inferior.' },
              { q: 'Q2', name: 'Corte Rugoso Industrial (70% Vel)', ra: 'Ra 6,3 – 12,5 µm', desc: 'Estructuras soldadas estándar y bridas sin mecanizado fino posterior.' },
              { q: 'Q3', name: 'Corte Estándar Comercial (45% Vel)', ra: 'Ra 3,2 – 6,3 µm', desc: 'Estándar del 80% de talleres; excelente equilibrio entre costo y tolerancia ±0,10 mm.' },
              { q: 'Q4', name: 'Acabado Fino Satinado (26% Vel)', ra: 'Ra 1,8 – 3,2 µm', desc: 'Superficie homogénea sin estrías discernibles al tacto ni conicidad perceptible.' },
              { q: 'Q5', name: 'Precisión Extrema Aeroespacial (14% Vel)', ra: 'Ra 1,2 – 1,8 µm', desc: 'Paredes perfectamente a 90,00° (conicidad anulada con 5 ejes) para ensamble directo.' }
            ].map((item) => (
              <div key={item.q} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-cyan-400 font-bold font-mono mr-2">{item.q} • {item.name}:</span>
                  <span className="text-slate-300">{item.desc}</span>
                </div>
                <span className="text-amber-400 font-mono text-[11px] whitespace-nowrap ml-2">{item.ra}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: '9. Defectos Típicos, Causas y Soluciones',
      icon: FileText,
      content: (
        <div className="space-y-4 text-xs">
          <p className="text-slate-300 leading-relaxed">
            Matriz de diagnóstico en planta según la física del chorro abrasivo:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left font-sans">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                <tr>
                  <th className="p-2.5">Defecto</th>
                  <th className="p-2.5">Causa Raíz</th>
                  <th className="p-2.5 text-emerald-400">Solución Técnica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 text-slate-300">
                <tr>
                  <td className="p-2.5 font-bold text-white font-mono">Conicidad en la pared</td>
                  <td className="p-2.5">El chorro pierde energía cinética al profundizar / desgaste del tubo mezclador</td>
                  <td className="p-2.5 text-emerald-300">Compensación 5 ejes en tiempo real, reducir velocidad, cambiar tubo ROCTEC</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white font-mono">Marcas de estriado ("drag lines")</td>
                  <td className="p-2.5">Avance demasiado rápido para el espesor del material</td>
                  <td className="p-2.5 text-emerald-300">Bajar velocidad de avance a Q3-Q5, aumentar presión UHP o caudal de granate</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white font-mono">Corte incompleto / no perfora</td>
                  <td className="p-2.5">Presión UHP insuficiente, abrasivo húmedo u orificio obstruido</td>
                  <td className="p-2.5 text-emerald-300">Verificar bomba UHP, secar granate de tolva, purgar línea con aire seco</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white font-mono">Desviación en esquinas</td>
                  <td className="p-2.5">Inercia de la columna del chorro al cambiar bruscamente de dirección</td>
                  <td className="p-2.5 text-emerald-300">Algoritmo "Corner Pass" con Look-Ahead que desacelera e inclina el cabezal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 10,
      title: '10. Seguridad Industrial y Ambiente ⭐ (Punto Fuerte Verde)',
      icon: ShieldCheck,
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-slate-300">
          <div className="bg-rose-950/40 p-3.5 rounded-xl border border-rose-500/40 text-xs text-rose-200 space-y-1">
            <strong className="text-white font-mono block">Física de la Punción UHP y Riesgo Vital Oculto:</strong>
            <p>
              Una presión fluida de apenas <strong>7 bar (100 PSI)</strong> vence la resistencia de la piel humana. A presiones de trabajo UHP (4.000 a &gt;6.900 bar), el chorro penetra instantáneamente trajes, músculos y hueso. La herida de entrada se manifiesta como un orificio puntiforme casi indoloro y sin sangrado, induciendo a subestimar el accidente mientras en el plano subcutáneo se produce una siembra masiva de contaminantes con <strong>Síndrome Compartimental y necrosis isquémica rápida</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-mono font-bold block mb-1">Protocolo Quirúrgico WJTA / WJA Obligatorio:</span>
              <ul className="space-y-1.5 text-slate-300">
                <li>• <strong>PROHIBICIÓN ESTRICTA:</strong> Queda terminantemente prohibido suturar la herida o colocar vendajes oclusivos en el centro primario de salud.</li>
                <li>• <strong>Ventana Crítica Quirúrgica de 6 Horas:</strong> La intervención mediante <em>Fasciotomía Descompresiva amplia</em> y debridación agresiva debe ejecutarse antes de 6 horas o la necrosis obliga a amputación irreversible.</li>
                <li>• <strong>Tarjeta Médica de Alerta (Medical Alert Card):</strong> Todo operario debe portar la tarjeta WJTA que advierte al cirujano sobre la naturaleza interna no visible del choque hidráulico.</li>
                <li>• <strong>Protecciones de Celda:</strong> Cortinas ópticas PLe Cat 4, doble válvula Dump de descarga en &lt;0,5 s y manguitos whip checks antirramotazo.</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="text-emerald-400 font-mono font-bold block mb-1">Sustentabilidad Ambiental (El más limpio):</span>
              <ul className="space-y-1.5 text-slate-300">
                <li>• <strong>Cero humos y gases tóxicos:</strong> Al ser corte en frío, no volatiliza vapores cancerígenos de cromo hexavalente (Cr⁶⁺) ni óxidos metálicos.</li>
                <li>• <strong>Atenuación Acústica:</strong> Corte sumergido bajo 15 mm de agua que amortigua el ruido de 106 dBA a <strong>74 dBA</strong> (conforme a Res. SRT 295/03).</li>
                <li>• <strong>Reciclaje de Granate:</strong> Equipos modernos deslodadores recuperan y reutilizan hasta el <strong>60–70% del abrasivo</strong>.</li>
                <li>• <strong>Residuo Inerte:</strong> El lodo sobrante es únicamente agua + arena mineral inerte sin sílice libre (&lt;0,1%), no clasificado como residuo peligroso.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-cyan-400 font-mono font-bold block">Marco Normativo y Estándares de Seguridad Aplicables:</span>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left font-sans">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                  <tr>
                    <th className="p-2.5">Código de Norma</th>
                    <th className="p-2.5">Título / Denominación Oficial</th>
                    <th className="p-2.5 text-cyan-400">Dominio de Aplicación / Alcance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 text-slate-300 font-mono text-[11px]">
                  {NORMATIVE_REFERENCES.map((norm) => (
                    <tr key={norm.code}>
                      <td className="p-2.5 font-bold text-cyan-300 whitespace-nowrap">{norm.code}</td>
                      <td className="p-2.5 text-white font-sans">{norm.title}</td>
                      <td className="p-2.5 text-slate-300 font-sans">{norm.domain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 11,
      title: '11. Aplicaciones, Ventajas, Limitaciones y Cierre',
      icon: Award,
      content: (
        <div className="space-y-4 text-xs leading-relaxed text-slate-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-mono font-bold block mb-1">Aplicaciones Industriales Clave:</span>
              <ul className="space-y-1 text-slate-300">
                <li>• <strong>Aeroespacial:</strong> Titanio y superaleaciones sin ZAT (hardware apto para vuelo AS9100).</li>
                <li>• <strong>Naval y Pesada:</strong> Placas macizas de acero de más de 150 mm.</li>
                <li>• <strong>Arquitectura y Diseño:</strong> Mosaicos y cortes intrincados en mármol, vidrio y granito.</li>
                <li>• <strong>Automotriz:</strong> Prototipos rápidos, juntas de estanqueidad y corte de paquetes de baterías VE.</li>
                <li>• <strong>Alimentos:</strong> Corte higiénico con agua pura sin cuchillas que transmitan contaminación cruzada.</li>
                <li>• <strong>Minería y Agro:</strong> Piezas de acero antidesgaste Hardox para sembradoras e implementos agrícolas en Entre Ríos / Santa Fe (polo Viale, Paraná, Crespo).</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-mono font-bold block mb-1">¿Cuándo Elegir Chorro de Agua?</span>
              <ul className="space-y-1 text-slate-300">
                <li>✓ Piezas de alta precisión donde la distorsión térmica es inadmisible.</li>
                <li>✓ Materiales reflectivos o conductores térmicos (cobre, aluminio) refractarios al láser.</li>
                <li>✓ Biselados en V/Y y chaflanes 3D en una sola pasada con 5 ejes que eliminan el fresado.</li>
                <li>✓ Espesores metálicos de más de 25–300 mm donde el láser no tiene capacidad pasante.</li>
                <li>✓ Producción flexible por lotes pequeños sin costo de matricería o recambio de herramientas.</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-950/50 via-slate-900 to-emerald-950/40 p-4 rounded-xl border border-cyan-500/30 text-xs">
            <strong className="text-white font-mono block mb-1">Conclusión de Cierre para la Exposición (Diego Francisconi y Ariel Martinez):</strong>
            <p className="text-slate-300">
              El corte por chorro de agua abrasivo combina física elemental (erosión supersónica) con la cúspide de la mecatrónica moderna (cinemática 5D, 94.000 psi e Industria 4.0). Frente a plasma y láser, es <em>el único proceso de la jornada capaz de cortar cualquier material en frío con ZAT = 0,00 mm</em>, garantizando máxima integridad metalúrgica.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Official University Cover Sheet for Print / PDF Export */}
      <div className="hidden print:block mb-8 pb-6 border-b-2 border-slate-900 page-break-after-always">
        <div className="text-center space-y-2">
          <div className="text-[11px] uppercase tracking-widest font-mono text-slate-600 font-bold">
            República Argentina • Universidad Tecnológica Nacional
          </div>
          <h1 className="text-xl font-bold uppercase tracking-wide text-slate-900">
            Facultad Regional Paraná — Extensión Áulica Viale
          </h1>
          <div className="text-xs font-semibold text-slate-700">
            Tecnicatura Universitaria en Mecatrónica (TUM) • Cátedra: Corte de Metales
          </div>
          <div className="my-5 py-4 border-y border-slate-300">
            <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
              INFORME TÉCNICO ACADÉMICO: DESARROLLO DE LOS 11 PUNTOS
            </h2>
            <p className="text-sm font-semibold text-sky-800 mt-1">
              Mecanizado No Tradicional por Chorro de Agua Abrasivo (AWJ) de Ultra Alta Presión (94.000 PSI) e Integración 4.0
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-left max-w-lg mx-auto text-xs text-slate-800 pt-1">
            <div>
              <span className="font-bold block text-slate-600 uppercase text-[9px]">Autores / Expositores:</span>
              <span className="font-bold text-sm text-slate-900">Diego Francisconi y Ariel Martinez</span>
            </div>
            <div>
              <span className="font-bold block text-slate-600 uppercase text-[9px]">Fecha de Evaluación:</span>
              <span className="font-bold text-sm">10 de Noviembre de 2026</span>
            </div>
            <div>
              <span className="font-bold block text-slate-600 uppercase text-[9px]">Presión UHP 2026:</span>
              <span className="font-bold text-sm">6.480 bar (94.000 PSI) • Mach 3.06</span>
            </div>
            <div>
              <span className="font-bold block text-slate-600 uppercase text-[9px]">Integridad Metalúrgica:</span>
              <span className="font-bold text-sm">ZAC = 0,00 mm (Corte 100% en Frío)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Screen Card */}
      <div className="bg-[#0B0F19] border border-cyan-500/20 rounded-2xl p-6 shadow-2xl space-y-6 academic-main-card">
        {/* Header with Title and Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800 print:hidden">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30 font-semibold">
                Consigna Oficial de Cátedra • Corte de Metales
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/30">
                Desarrollo Integral de los 11 Puntos Oficiales
              </span>
              <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                Tecnología 2026 e Industria 4.0
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 flex items-center gap-2">
              Documento Técnico Académico del Sistema de Chorro de Agua
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Universidad Tecnológica Nacional – Facultad Regional Paraná (Extensión Áulica Viale) • Diego Francisconi y Ariel Martinez
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={() => setShowExportModal(true)}
              className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition cursor-pointer"
              title="Exportar Documento Técnico en PDF o Imprimir"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Exportar PDF / Imprimir</span>
            </button>

            <button
              onClick={() => setOpenSection(openSection === 'all' ? null : 'all')}
              className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-700 transition font-mono cursor-pointer"
            >
              {openSection === 'all' ? 'Colapsar todo' : 'Expandir los 11 puntos'}
            </button>
          </div>
        </div>

        {/* Download notification banner */}
        {downloadNotice && (
          <div className="bg-cyan-950/80 border border-cyan-500/40 text-cyan-200 text-xs px-4 py-3 rounded-xl flex items-center justify-between gap-3 animate-fade-in print:hidden">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{downloadNotice}</span>
            </div>
            <button onClick={() => setDownloadNotice(null)} className="text-slate-400 hover:text-white cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Golden Effects Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-[#0B0F19] to-slate-950 p-4 rounded-xl border border-amber-500/30 print:hidden">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300">
                Golpes de Efecto Estelares para la Exposición Oral (15–20 min)
              </h3>
            </div>
            <button
              onClick={() => setShowGoldenEffects(!showGoldenEffects)}
              className="text-[11px] font-mono text-slate-400 hover:text-white cursor-pointer"
            >
              {showGoldenEffects ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          {showGoldenEffects && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {GOLDEN_EFFECTS.map((g) => (
                <div key={g.id} className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 hover:border-amber-500/40 transition">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                    {g.tag}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-0.5 leading-snug">
                    {g.highlight}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    {g.detail}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accordion of 11 Sections - ALL RENDERED IN DOM FOR PRINT */}
        <div className="space-y-3">
          {sections.map((section) => {
            const isSectionOpen = openSection === 'all' || openSection === section.id;
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className={`academic-accordion-item rounded-xl border transition overflow-hidden print:border-slate-300 print:bg-white print:shadow-none ${
                  isSectionOpen
                    ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenSection(isSectionOpen && openSection !== 'all' ? null : section.id)}
                  className="w-full p-4 flex items-center justify-between text-left transition print:pointer-events-none print:py-2.5 print:px-3 print:bg-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center print:hidden ${
                      isSectionOpen ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="font-bold text-sm text-white font-mono print:text-black print:text-base print:font-bold">
                      {section.title}
                    </span>
                  </div>
                  <span className="print:hidden">
                    {isSectionOpen ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </span>
                </button>

                {/* Content: Visible if open on screen, ALWAYS visible in print */}
                <div className={`p-5 pt-1 border-t border-slate-800/80 text-slate-300 text-xs academic-section-body print:border-slate-200 print:p-3 print:pt-2 print:text-slate-900 ${
                  isSectionOpen ? 'block' : 'hidden print:block'
                }`}>
                  {section.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Academic References Card */}
        <div className="mt-8 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 print:border-slate-300 print:bg-slate-50">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2 print:text-black">
            <BookOpen className="w-4 h-4 text-cyan-400 print:text-sky-700" />
            Bibliografía y Referencias Técnicas Verificadas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400 print:text-slate-800">
            <a
              href="https://www.flowwaterjet.com/waterjet-products/mach-500"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2 rounded hover:bg-slate-900 border border-slate-800/60 hover:text-cyan-300 transition print:border-slate-300"
            >
              <span>• Flow Mach 500 & Dynamic XD 5-Axis Manual</span>
              <ExternalLink className="w-3 h-3 ml-1 print:hidden" />
            </a>
            <a
              href="https://kmtwaterjet.com/en-gb/pro-pump-90000psi-6200bar-60hp/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2 rounded hover:bg-slate-900 border border-slate-800/60 hover:text-cyan-300 transition print:border-slate-300"
            >
              <span>• KMT STREAMLINE PRO 6.200 bar (90.000 PSI)</span>
              <ExternalLink className="w-3 h-3 ml-1 print:hidden" />
            </a>
            <a
              href="https://www.omax.com/en/media-center/tips/unlocking-efficiency-enduromax-pump/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2 rounded hover:bg-slate-900 border border-slate-800/60 hover:text-cyan-300 transition print:border-slate-300"
            >
              <span>• OMAX EnduroMAX Direct-Drive Servopump Specs</span>
              <ExternalLink className="w-3 h-3 ml-1 print:hidden" />
            </a>
            <a
              href="https://www.barton.com/waterjet-abrasive-guide/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2 rounded hover:bg-slate-900 border border-slate-800/60 hover:text-cyan-300 transition print:border-slate-300"
            >
              <span>• Barton Garnet 80 HPA Technical Guidelines</span>
              <ExternalLink className="w-3 h-3 ml-1 print:hidden" />
            </a>
            <a
              href="https://www.mdpi.com/2076-3417/11/8/3344"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2 rounded hover:bg-slate-900 border border-slate-800/60 hover:text-cyan-300 transition print:border-slate-300"
            >
              <span>• MDPI Applied Sciences: Abrasive Waterjet Review</span>
              <ExternalLink className="w-3 h-3 ml-1 print:hidden" />
            </a>
            <a
              href="https://www.frp.utn.edu.ar/info2/?page_id=28373"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2 rounded hover:bg-slate-900 border border-slate-800/60 hover:text-cyan-300 transition print:border-slate-300"
            >
              <span>• UTN Paraná – Tecnicatura Universitaria en Mecatrónica (Viale)</span>
              <ExternalLink className="w-3 h-3 ml-1 print:hidden" />
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 print:hidden animate-fade-in">
          <div className="bg-[#0B0F19] border border-cyan-500/40 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-6">
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5" />
                Centro de Exportación Académica • UTN FRP Viale
              </span>
              <h3 className="text-xl font-bold text-white">
                Exportar Informe Técnico (11 Puntos)
              </h3>
              <p className="text-xs text-slate-400">
                Selecciona la modalidad para generar tu entrega formal o imprimir el documento.
              </p>
            </div>

            <div className="space-y-3">
              {/* Option 1: Native Print to PDF (Vectorial A4) */}
              <div className="bg-slate-900/80 border border-cyan-500/30 rounded-xl p-4 hover:border-cyan-400 transition">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    Guardar como PDF / Imprimir (Oficial Vectorial A4)
                    <span className="bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold">
                      Recomendado
                    </span>
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Prepara el documento con <strong>portada universitaria de UTN FRP</strong>, todos los 11 puntos expandidos, tablas completas y formato A4 vectorial de máxima nitidez.
                  </p>
                  <div className="bg-slate-950/70 p-2.5 rounded border border-slate-800 text-[10px] text-cyan-300 font-mono mt-2 leading-relaxed">
                    💡 <strong>Paso en el navegador:</strong> Al abrirse la ventana de impresión, selecciona <em>"Guardar como PDF"</em> en la opción <strong>Destino</strong>.
                  </div>
                </div>
                <button
                  onClick={handlePrint}
                  className="mt-3 w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Abrir Asistente para Guardar en PDF / Imprimir</span>
                </button>
              </div>

              {/* Option 2: Direct PDF File Download */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <FileDown className="w-4 h-4 text-emerald-400" />
                    Descargar Archivo PDF Directo (.pdf)
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Descarga automática e instantánea del archivo compilado <code className="text-cyan-300 font-mono text-[10px]">Informe_Tecnico_Chorro_de_Agua_UTN_Viale.pdf</code> en tu carpeta de descargas sin configurar la impresora.
                  </p>
                </div>
                <button
                  onClick={handleDirectPdf}
                  disabled={isGeneratingPdf}
                  className="mt-3 w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium text-xs flex items-center justify-center gap-2 border border-slate-700 transition cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>{isGeneratingPdf ? 'Compilando PDF...' : 'Descargar Archivo PDF Directo (.pdf)'}</span>
                </button>
              </div>

              {/* Option 3: Full Markdown Dossier */}
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3.5 hover:border-slate-700 transition">
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      Documento Técnico en Markdown (.md)
                    </span>
                    <p className="text-[10px] text-slate-500">
                      Archivo fuente completo con formato de cátedra y citas bibliográficas.
                    </p>
                  </div>
                  <button
                    onClick={handleMarkdownDownload}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition cursor-pointer shrink-0"
                  >
                    Descargar .md
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
