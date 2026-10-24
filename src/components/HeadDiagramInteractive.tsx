import React, { useState } from 'react';
import { 
  Crosshair, 
  Layers, 
  Gauge, 
  Wind, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle,
  HelpCircle,
  Info
} from 'lucide-react';

export default function HeadDiagramInteractive() {
  const [activeComponent, setActiveComponent] = useState<string>('orifice');
  const [mode, setMode] = useState<'AWJ' | 'PWJ'>('AWJ');
  const [fiveAxisTilt, setFiveAxisTilt] = useState<boolean>(true);
  const [tiltAngle, setTiltAngle] = useState<number>(2.5);

  const componentsData: Record<string, {
    title: string;
    techName: string;
    material: string;
    lifespan: string;
    description: string;
    mechatronicNote: string;
  }> = {
    actuator: {
      title: 'Actuador Neumático y Válvula de Aguja',
      techName: 'Pneumatic ON/OFF High-Pressure Valve Assembly',
      material: 'Cuerpo de acero inoxidable autofretado 15-5PH, vástago y asiento de carburo/17-4PH.',
      lifespan: '150 a 300 horas de ciclo (reemplazo de aguja/asiento).',
      description: 'Apertura y cierre rápido de ultra-alta presión (4.100 a 6.500 bar) comandado por solenoide electroneumático de 24 VDC en sincronismo de milisegundos con el CNC.',
      mechatronicNote: 'En paradas de emergencia, la válvula Dump descarga la presión a 0 bar en <0,5 s por seguridad intrínseca.'
    },
    inlet: {
      title: 'Entrada de Agua UHP (Ultra-High Pressure)',
      techName: '1/4" HP Autofrettaged Cone-and-Thread Port',
      material: 'Tubo de acero inoxidable 316 CW autofretado a presiones de hasta 10.000 bar.',
      lifespan: '2.000 a 5.000 horas bajo inspección periódica de poros.',
      description: 'Látigo helicoidal flexible de alta presión que permite el movimiento multieje sin fatiga prematura de la línea.',
      mechatronicNote: 'La autofretación crea tensiones residuales de compresión en el diámetro interno para evitar la propagación de microfisuras por fatiga cíclica.'
    },
    orifice: {
      title: 'Orificio Primario de Joya',
      techName: 'Diamond / Sapphire Jewel Orifice (KMT IDE Integrated Diamond)',
      material: 'Diamante policristalino sintético (PCD) engastado en titanio o acero inoxidable.',
      lifespan: 'Diamante: 800 – 1.500 horas (Zafiro/Rubí: solo 40 – 80 horas).',
      description: 'Convierte la energía potencial de presión en energía cinética pura. El agua pasa por un orificio de Ø 0,25 a 0,38 mm acelerando a más de 1.050 m/s (Mach 3.06).',
      mechatronicNote: 'Una pequeña incrustación o astillado de 2 µm distorsiona la coherencia del chorro y reduce la velocidad de corte en más de un 40%.'
    },
    venturi: {
      title: 'Cámara de Mezcla Venturi',
      techName: 'Vacuum Mixing Chamber & UltraPierce Port',
      material: 'Acero inoxidable templado o inserto cerámico endurecido.',
      lifespan: '300 a 500 horas antes de recalibración.',
      description: 'El chorro supersónico de agua genera una zona de baja presión absoluta (vacío de -0,85 a -0,95 bar relativo), succionando de forma continua las partículas de granate.',
      mechatronicNote: 'En el piercing de materiales laminados, el sistema UltraPierce aplica vacío activo asistido para cebar el granate antes de abrir el agua y evitar delaminación.'
    },
    abrasive: {
      title: 'Dosificador y Entrada de Granate',
      techName: 'Abrasive Metering Hopper Feed Line',
      material: 'Conducto de poliuretano flexible antiestático con sensor óptico de atascamiento.',
      lifespan: 'Consumible continuo: 200 a 600 g/min de Barton Garnet malla 80.',
      description: 'Transporta el abrasivo mineral mineralizado desde la minitolva presurizada en el eje Z hasta la cámara de mezcla mediante presión negativa Venturi.',
      mechatronicNote: 'Control CNC de lazo cerrado mediante motor paso a paso con disco perforado para regular los gramos/minuto exactos según el espesor.'
    },
    mixing_tube: {
      title: 'Tubo de Enfoque / Boquilla Abrasiva',
      techName: 'Focusing Tube / Mixing Nozzle (ROCTEC 100 / ROCTEC 500)',
      material: 'Carburo de tungsteno sinterizado de grano nanométrico sin aglomerante metálico.',
      lifespan: 'ROCTEC 500: 100 – 150 horas de corte continuo (malla 80).',
      description: 'Colima y transfiere el impulso del agua a las partículas de granate a lo largo de 76 a 102 mm de longitud. Define el ancho de corte (Kerf ≈ 1,02 mm).',
      mechatronicNote: 'Se reemplaza cuando el orificio de salida aumenta de 0,76 mm a >0,95 mm (+25%) o cuando el desgaste es asimétrico generando conicidad.'
    },
    wrist_5axis: {
      title: 'Muñeca Cinemática 5 Ejes (Dynamic XD)',
      techName: 'Flow Dynamic XD / OMAX A-Jet Multi-Axis Articulation',
      material: 'Estructura de aleación ligera aeronáutica con reductores armónicos de juego cero.',
      lifespan: '10.000+ horas de operación CNC con mantenimiento preventivo.',
      description: 'Inclina dinámicamente el cabezal de ±0,5° a ±60° en tiempo real durante la interpolación para compensar la conicidad de sangría (Taper) y el retardo de cola (Jet Lag).',
      mechatronicNote: 'Transfiere el ángulo de conicidad natural directamente al lado del desperdicio (scrap), dejando la pieza útil con una pared perpendicular a 90,00°.'
    },
    standoff: {
      title: 'Distancia de Trabajo (Stand-Off Distance SOD)',
      techName: 'Z-Axis Terrain Follower & Anti-Collision Sensor',
      material: 'Anillo palpador capacitivo/óptico montado en el eje Z.',
      lifespan: 'Operación continua en tiempo real.',
      description: 'Mantiene una distancia constante entre el extremo del tubo focalizador y la chapa metálica de 1,5 a 2,5 mm.',
      mechatronicNote: 'Si la SOD aumenta a >4 mm, el chorro diverge y redondea la arista superior (Top Edge Roll-over), duplicando la conicidad.'
    }
  };

  const currentInfo = componentsData[activeComponent] || componentsData.orifice;

  return (
    <div className="bg-[#0B0F19] border border-cyan-500/20 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
              Módulo de Cinemática y Mecánica de Fluidos
            </span>
            <span className="text-xs font-mono text-slate-400">KMT IDE & Flow Dynamic XD</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-2">
            Corte Transversal del Cabezal de Corte y Cinemática 5 Ejes
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Exploración interactiva del fenómeno Venturi, aceleración supersónica a Mach 3 y compensación activa de conicidad.
          </p>
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-1 text-xs font-medium">
            <button
              onClick={() => setMode('AWJ')}
              className={`px-3 py-1.5 rounded transition ${
                mode === 'AWJ' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Chorro Abrasivo (AWJ - Metales)
            </button>
            <button
              onClick={() => setMode('PWJ')}
              className={`px-3 py-1.5 rounded transition ${
                mode === 'PWJ' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Agua Pura (PWJ - Blandos)
            </button>
          </div>

          <button
            onClick={() => setFiveAxisTilt(!fiveAxisTilt)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 ${
              fiveAxisTilt
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10'
                : 'bg-slate-900 text-slate-400 border-slate-700'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>{fiveAxisTilt ? 'Compensación 5 Ejes: ACTIVA (θ = 2,5°)' : 'Cabezal 3 Ejes Vertical (0°)'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Diagram + Detailed Tech Spec */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column: Interactive Vector Diagram */}
        <div className="lg:col-span-7 bg-[#060911] border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-3 left-3 text-[11px] font-mono text-slate-500 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            Hacé clic en cualquier componente para ver su análisis de ingeniería
          </div>

          {/* SVG Cutaway Diagram */}
          <div className="w-full max-w-[480px] h-[520px] relative flex items-center justify-center">
            <svg
              viewBox="0 0 400 520"
              className="w-full h-full filter drop-shadow-[0_0_15px_rgba(0,240,255,0.1)]"
              style={{
                transform: fiveAxisTilt ? `rotate(${tiltAngle}deg)` : 'rotate(0deg)',
                transition: 'transform 0.4s ease'
              }}
            >
              <defs>
                {/* Water high pressure gradient */}
                <linearGradient id="uhpWater" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00F0FF" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#00F0FF" />
                </linearGradient>

                {/* Jet Stream gradient */}
                <linearGradient id="supersonicJet" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#00F0FF" />
                  <stop offset="100%" stopColor={mode === 'AWJ' ? '#F59E0B' : '#00F0FF'} />
                </linearGradient>

                {/* Abrasive flow gradient */}
                <linearGradient id="garnetFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>

              {/* Upper Body: Pneumatic Actuator Chamber */}
              <g
                onClick={() => setActiveComponent('actuator')}
                className="cursor-pointer group"
              >
                <rect
                  x="140"
                  y="20"
                  width="120"
                  height="70"
                  rx="6"
                  fill={activeComponent === 'actuator' ? '#1e293b' : '#0f172a'}
                  stroke={activeComponent === 'actuator' ? '#00F0FF' : '#334155'}
                  strokeWidth="2"
                  className="transition duration-200 group-hover:stroke-cyan-400"
                />
                <text x="200" y="55" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                  VÁLVULA ACTUADOR ON/OFF
                </text>
                {/* Valve needle */}
                <line x1="200" y1="35" x2="200" y2="120" stroke="#f1f5f9" strokeWidth="3" />
              </g>

              {/* UHP Water Inlet (from right) */}
              <g
                onClick={() => setActiveComponent('inlet')}
                className="cursor-pointer group"
              >
                <path
                  d="M260,95 L340,95 L340,115 L260,115"
                  fill="#1e293b"
                  stroke={activeComponent === 'inlet' ? '#00F0FF' : '#334155'}
                  strokeWidth="2"
                  className="transition duration-200 group-hover:stroke-cyan-400"
                />
                {/* Flowing water lines inside inlet */}
                <line x1="330" y1="105" x2="260" y2="105" stroke="#00F0FF" strokeWidth="4" strokeDasharray="6 3" />
                <text x="350" y="110" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  Agua 6.200 bar
                </text>
              </g>

              {/* High Pressure Valve Body */}
              <g
                onClick={() => setActiveComponent('actuator')}
                className="cursor-pointer"
              >
                <rect
                  x="150"
                  y="90"
                  width="100"
                  height="45"
                  rx="4"
                  fill="#0f172a"
                  stroke={activeComponent === 'actuator' ? '#00F0FF' : '#475569'}
                  strokeWidth="1.5"
                />
              </g>

              {/* Diamond Jewel Orifice Seat */}
              <g
                onClick={() => setActiveComponent('orifice')}
                className="cursor-pointer group"
              >
                <rect
                  x="165"
                  y="135"
                  width="70"
                  height="22"
                  rx="2"
                  fill={activeComponent === 'orifice' ? '#083344' : '#164e63'}
                  stroke={activeComponent === 'orifice' ? '#00F0FF' : '#0891b2'}
                  strokeWidth="2"
                  className="transition duration-200 group-hover:stroke-cyan-300"
                />
                {/* Diamond gem symbol */}
                <polygon
                  points="195,146 200,139 205,146 200,153"
                  fill="#FFFFFF"
                  stroke="#00F0FF"
                  strokeWidth="1"
                />
                <circle cx="200" cy="146" r="2" fill="#00F0FF" />
                <text x="120" y="148" textAnchor="end" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  Orificio Diamante (Ø 0,33 mm) ──►
                </text>
              </g>

              {/* Venturi Mixing Chamber */}
              <g
                onClick={() => setActiveComponent('venturi')}
                className="cursor-pointer group"
              >
                <polygon
                  points="160,157 240,157 225,230 175,230"
                  fill={activeComponent === 'venturi' ? '#1e293b' : '#0f172a'}
                  stroke={activeComponent === 'venturi' ? '#00F0FF' : '#334155'}
                  strokeWidth="2"
                  className="transition duration-200 group-hover:stroke-cyan-400"
                />
                <text x="200" y="195" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
                  CÁMARA VENTURI
                </text>
                <text x="200" y="210" textAnchor="middle" fill="#00F0FF" fontSize="8" fontFamily="monospace">
                  -0.92 bar Vacío
                </text>
              </g>

              {/* Abrasive Inlet Port (from left) */}
              {mode === 'AWJ' && (
                <g
                  onClick={() => setActiveComponent('abrasive')}
                  className="cursor-pointer group"
                >
                  <path
                    d="M60,185 L165,185 L165,205 L60,205"
                    fill="#27272a"
                    stroke={activeComponent === 'abrasive' ? '#F59E0B' : '#52525b'}
                    strokeWidth="2"
                    className="transition duration-200 group-hover:stroke-amber-400"
                  />
                  {/* Abrasive particles moving */}
                  <circle cx="80" cy="195" r="2" fill="#F59E0B" />
                  <circle cx="105" cy="195" r="2.5" fill="#F59E0B" />
                  <circle cx="130" cy="195" r="2" fill="#F59E0B" />
                  <circle cx="150" cy="195" r="3" fill="#F59E0B" />
                  <text x="50" y="198" textAnchor="end" fill="#F59E0B" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    ◄── Granate Malla 80 (400 g/min)
                  </text>
                </g>
              )}

              {/* Mixing / Focusing Tube (ROCTEC) */}
              <g
                onClick={() => setActiveComponent('mixing_tube')}
                className="cursor-pointer group"
              >
                <rect
                  x="184"
                  y="230"
                  width="32"
                  height="130"
                  rx="3"
                  fill={activeComponent === 'mixing_tube' ? '#18181b' : '#09090b'}
                  stroke={activeComponent === 'mixing_tube' ? '#00F0FF' : '#52525b'}
                  strokeWidth="2"
                  className="transition duration-200 group-hover:stroke-cyan-400"
                />
                {/* Bore inner passage */}
                <line x1="200" y1="230" x2="200" y2="360" stroke="#000000" strokeWidth="6" />

                {/* Supersonic Jet Stream Inside Tube */}
                <line
                  x1="200"
                  y1="157"
                  x2="200"
                  y2="360"
                  stroke="url(#supersonicJet)"
                  strokeWidth={mode === 'AWJ' ? '4' : '2'}
                  strokeLinecap="round"
                />

                <text x="230" y="300" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                  ROCTEC Tube
                </text>
                <text x="230" y="315" fill="#64748b" fontSize="8" fontFamily="monospace">
                  Ø 1,02 mm × 76 mm
                </text>
              </g>

              {/* Stand-Off Distance SOD Indicator */}
              <g
                onClick={() => setActiveComponent('standoff')}
                className="cursor-pointer group"
              >
                <line x1="165" y1="360" x2="165" y2="385" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 2" />
                <line x1="160" y1="360" x2="170" y2="360" stroke="#F59E0B" strokeWidth="1" />
                <line x1="160" y1="385" x2="170" y2="385" stroke="#F59E0B" strokeWidth="1" />
                <text x="155" y="375" textAnchor="end" fill="#F59E0B" fontSize="8" fontFamily="monospace">
                  SOD 1,5 mm
                </text>
              </g>

              {/* The Supersonic Jet in Air Gap and Cut Front */}
              <line
                x1="200"
                y1="360"
                x2="200"
                y2="460"
                stroke="url(#supersonicJet)"
                strokeWidth={mode === 'AWJ' ? '5' : '2.5'}
                strokeOpacity="0.95"
              />

              {/* Metal Workpiece Plate */}
              <g>
                <rect
                  x="60"
                  y="385"
                  width="280"
                  height="70"
                  rx="4"
                  fill="#334155"
                  stroke="#475569"
                  strokeWidth="2"
                />
                {/* Cut kerf gap through metal */}
                <polygon
                  points="197,385 203,385 206,455 194,455"
                  fill="#060911"
                />
                <text x="75" y="425" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                  PIEZA METÁLICA (Espesor h)
                </text>
                <text x="75" y="440" fill="#38bdf8" fontSize="9" fontFamily="monospace">
                  ZAC = 0,00 mm • Micro-viruta en frío
                </text>
              </g>

              {/* Catcher Tank Bottom Energy Dissipation */}
              <rect x="40" y="475" width="320" height="35" rx="4" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 2" />
              <text x="200" y="497" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">
                TANQUE ATENUADOR CON AGUA SUBMARINA (&lt;78 dBA)
              </text>
            </svg>
          </div>

          {/* 5-Axis Dynamic XD Indicator */}
          {fiveAxisTilt && (
            <div className="mt-3 flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-mono text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Inclinación activa A/B: +{tiltAngle}° compensando conicidad hacia el desecho</span>
            </div>
          )}
        </div>

        {/* Right Column: Engineering Breakdown Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Análisis Técnico del Componente
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {currentInfo.title}
                </h3>
              </div>
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <Gauge className="w-4 h-4" />
              </span>
            </div>

            <p className="text-xs font-mono text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <strong className="text-slate-300">Denominación Industrial:</strong> {currentInfo.techName}
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-medium block mb-0.5">Material de Fabricación:</span>
                <p className="text-slate-200 bg-slate-800/40 p-2 rounded border border-slate-700/50">
                  {currentInfo.material}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-medium block mb-0.5">Vida Útil Típica y Desgaste:</span>
                <p className="text-amber-300 font-mono bg-amber-950/20 p-2 rounded border border-amber-900/40">
                  {currentInfo.lifespan}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-medium block mb-0.5">Principio Físico / Función:</span>
                <p className="text-slate-300 leading-relaxed">
                  {currentInfo.description}
                </p>
              </div>

              <div className="border-t border-slate-800 pt-3">
                <span className="text-cyan-400 font-mono font-semibold flex items-center gap-1.5 mb-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Implicancia Mecatrónica & Control:
                </span>
                <p className="text-slate-300 leading-relaxed bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-900/40">
                  {currentInfo.mechatronicNote}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Component Selector Buttons */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Navegar Componentes del Cabezal:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { id: 'orifice', label: '1. Orificio Joya' },
                { id: 'venturi', label: '2. Venturi Vacío' },
                { id: 'mixing_tube', label: '3. Tubo ROCTEC' },
                { id: 'abrasive', label: '4. Granate 80' },
                { id: 'wrist_5axis', label: '5. Muñeca 5 Ejes' },
                { id: 'standoff', label: '6. SOD Altura Z' },
                { id: 'actuator', label: '7. Aguja ON/OFF' },
                { id: 'inlet', label: '8. Entrada UHP' },
              ].map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => setActiveComponent(comp.id)}
                  className={`px-2 py-1.5 rounded text-[11px] font-medium transition text-left truncate ${
                    activeComponent === comp.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {comp.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
