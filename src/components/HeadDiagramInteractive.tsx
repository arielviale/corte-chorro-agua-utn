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
      techName: 'Conjunto de Válvula de Aguja de Ultra-Alta Presión (Control Rápido de Apertura/Cierre)',
      material: 'Cuerpo de acero inoxidable autofretado 15-5PH, vástago y asiento de carburo / 17-4PH.',
      lifespan: '150 a 300 horas de ciclo continuo (reemplazo de aguja y asiento).',
      description: 'Apertura y cierre instantáneo de ultra-alta presión (4.100 a 6.500 bar) comandado por solenoide electroneumático de 24 V en sincronismo de milisegundos con el control CNC.',
      mechatronicNote: 'En paradas de emergencia, la válvula de alivio descarga la presión del circuito a 0 bar en menos de 0,5 segundos por seguridad intrínseca.'
    },
    inlet: {
      title: 'Entrada de Agua a Ultra-Alta Presión (UHP)',
      techName: 'Puerto Roscado y Conificado Autofretado de 1/4" para Conexión de Alta Presión',
      material: 'Tubo de acero inoxidable 316 de pared gruesa autofretado a presiones de hasta 10.000 bar.',
      lifespan: '2.000 a 5.000 horas bajo inspección periódica de microfisuras.',
      description: 'Látigo helicoidal flexible de alta presión que permite el desplazamiento multieje continuo sin fatiga mecánica prematura de la línea.',
      mechatronicNote: 'El proceso de autofretación genera tensiones residuales de compresión en el diámetro interno para evitar la propagación de fisuras por fatiga cíclica.'
    },
    orifice: {
      title: 'Orificio Primario de Joya Calibrada',
      techName: 'Orificio de Joya de Diamante Sintético Policristalino o Zafiro Calibrado',
      material: 'Diamante policristalino sintético engastado con interferencia en titanio o acero inoxidable.',
      lifespan: 'Diamante: 800 a 1.500 horas (Zafiro o Rubí: solo 40 a 80 horas).',
      description: 'Convierte la energía potencial de presión en energía cinética pura. El agua pasa por un micro-orificio de Ø 0,25 a 0,38 mm acelerando a más de 1.050 m/s (Mach 3,06).',
      mechatronicNote: 'Cualquier impureza o astillado de apenas 2 micrómetros distorsiona la coherencia del chorro supersónico y reduce la velocidad de corte en más de un 40%.'
    },
    venturi: {
      title: 'Cámara de Mezcla por Efecto Venturi',
      techName: 'Cámara de Mezcla Hidrodinámica con Depresión y Vacío Inducido',
      material: 'Acero inoxidable de alta resistencia al desgaste con inserto cerámico templado.',
      lifespan: '300 a 500 horas de trabajo antes de recalibración.',
      description: 'El chorro supersónico de agua genera una zona de baja presión absoluta (vacío de -0,85 a -0,95 bar relativo), succionando de forma continua las partículas de abrasivo mineral.',
      mechatronicNote: 'En la perforación inicial de materiales laminados, el sistema activa vacío asistido previo para cebar el granate antes del impacto del agua, evitando delaminaciones.'
    },
    abrasive: {
      title: 'Dosificador y Línea de Entrada de Granate',
      techName: 'Línea Neumática de Alimentación y Dosificación Controlada de Granate Mineral',
      material: 'Conducto de poliuretano flexible antiestático con sensor fotoeléctrico de flujo y atascamiento.',
      lifespan: 'Consumible continuo de corte: 200 a 600 g/min de Granate Barton Malla 80.',
      description: 'Transporta el abrasivo mineral desde la minitolva presurizada en el eje Z hasta la cámara de mezcla mediante la depresión negativa del efecto Venturi.',
      mechatronicNote: 'Control CNC en lazo cerrado mediante motor paso a paso con disco perforado para dosificar el caudal másico exacto de granate según el espesor del material.'
    },
    mixing_tube: {
      title: 'Tubo de Enfoque y Colimación (Boquilla Abrasiva)',
      techName: 'Tubo Colimador y Mezclador de Carburo de Tungsteno de Grano Nanométrico (ROCTEC)',
      material: 'Carburo de tungsteno sinterizado de grano ultra-fino sin matriz metálica de cobalto.',
      lifespan: 'Tubo ROCTEC: 100 a 150 horas de corte continuo efectivo con Malla 80.',
      description: 'Colima y transfiere el impulso cinético del chorro de agua a las partículas minerales a lo largo de 76 a 102 mm. Establece el ancho final de sangría (1,02 mm).',
      mechatronicNote: 'Se sustituye de forma preventiva cuando el diámetro interno aumenta más de un 25% (de 0,76 mm a >0,95 mm) o cuando el desgaste asimétrico induce conicidad no compensable.'
    },
    wrist_5axis: {
      title: 'Muñeca Cinemática Articulada de 5 Ejes',
      techName: 'Cabezal Cinemático Multieje Articulado para Compensación Activa de Conicidad',
      material: 'Estructura mecanizada de aleación ligera aeronáutica con reductores armónicos de juego cero.',
      lifespan: 'Más de 10.000 horas de operación CNC con mantenimiento preventivo de rodamientos.',
      description: 'Inclina dinámicamente el cabezal de ±0,5° a ±60° en tiempo real durante la interpolación para compensar la conicidad de sangría y el retardo de cola en curvas.',
      mechatronicNote: 'Transfiere el ángulo de conicidad natural directamente hacia el lado del material de descarte, dejando la pieza útil con una pared perpendicular a 90,00° exactos.'
    },
    standoff: {
      title: 'Distancia de Trabajo Boquilla-Chapa (Altura en Eje Z)',
      techName: 'Sensor Seguidor de Terreno Capacitivo y Sistema Anticolisión en Eje Z',
      material: 'Anillo palpador capacitivo y óptico de alta respuesta montado en el cabezal Z.',
      lifespan: 'Operación continua en tiempo real sin desgaste mecánico por contacto.',
      description: 'Mantiene una separación constante y precisa entre la punta del tubo colimador y la chapa metálica de 1,5 a 2,5 mm durante todo el mecanizado.',
      mechatronicNote: 'Si la distancia de trabajo supera los 4 mm, el chorro supersónico diverge rápidamente, redondeando la arista superior y duplicando el ancho de corte.'
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
            <span className="text-xs font-mono text-slate-400">Cabezal de Corte UHP & Cinemática 5 Ejes</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-2">
            Corte Transversal del Cabezal de Corte y Cinemática de 5 Ejes
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
            <span>{fiveAxisTilt ? 'Compensación 5 Ejes: ACTIVA (θ = 2,5°)' : 'Cabezal Convencional Vertical (0°)'}</span>
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

          {/* SVG Cutaway Diagram with expanded 600px width to avoid any text clipping */}
          <div className="w-full max-w-[620px] h-[520px] relative flex items-center justify-center">
            <svg
              viewBox="0 0 600 520"
              className="w-full h-full filter drop-shadow-[0_0_15px_rgba(0,240,255,0.1)]"
              style={{
                transform: fiveAxisTilt ? `rotate(${tiltAngle}deg)` : 'rotate(0deg)',
                transformOrigin: '300px 260px',
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

              {/* Upper Body: Pneumatic Actuator Chamber (Centered at X=300) */}
              <g
                onClick={() => setActiveComponent('actuator')}
                className="cursor-pointer group"
              >
                <rect
                  x="240"
                  y="20"
                  width="120"
                  height="70"
                  rx="6"
                  fill={activeComponent === 'actuator' ? '#1e293b' : '#0f172a'}
                  stroke={activeComponent === 'actuator' ? '#00F0FF' : '#334155'}
                  strokeWidth="2"
                  className="transition duration-200 group-hover:stroke-cyan-400"
                />
                {/* Text Badge for Actuator */}
                <rect x="245" y="28" width="110" height="20" rx="3" fill="#0f172a" fillOpacity="0.8" />
                <text x="300" y="42" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  VÁLVULA ACTUADORA
                </text>
                {/* Valve needle starting below the text */}
                <line x1="300" y1="52" x2="300" y2="120" stroke="#f1f5f9" strokeWidth="3" />
              </g>

              {/* High Pressure Valve Body */}
              <g
                onClick={() => setActiveComponent('actuator')}
                className="cursor-pointer"
              >
                <rect
                  x="250"
                  y="90"
                  width="100"
                  height="45"
                  rx="4"
                  fill="#0f172a"
                  stroke={activeComponent === 'actuator' ? '#00F0FF' : '#475569'}
                  strokeWidth="1.5"
                />
              </g>

              {/* UHP Water Inlet (from right) */}
              <g
                onClick={() => setActiveComponent('inlet')}
                className="cursor-pointer group"
              >
                <path
                  d="M350,95 L460,95 L460,115 L350,115"
                  fill="#1e293b"
                  stroke={activeComponent === 'inlet' ? '#00F0FF' : '#334155'}
                  strokeWidth="2"
                  className="transition duration-200 group-hover:stroke-cyan-400"
                />
                {/* Flowing water lines inside inlet */}
                <line x1="450" y1="105" x2="350" y2="105" stroke="#00F0FF" strokeWidth="4" strokeDasharray="6 3" />
                {/* Water Pressure Badge */}
                <rect x="468" y="93" width="124" height="24" rx="4" fill="#083344" stroke="#00F0FF" strokeWidth="1" />
                <text x="530" y="109" textAnchor="middle" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  Agua a 6.200 bar
                </text>
              </g>

              {/* Diamond Jewel Orifice Seat */}
              <g
                onClick={() => setActiveComponent('orifice')}
                className="cursor-pointer group"
              >
                <rect
                  x="265"
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
                  points="295,146 300,139 305,146 300,153"
                  fill="#FFFFFF"
                  stroke="#00F0FF"
                  strokeWidth="1"
                />
                <circle cx="300" cy="146" r="2" fill="#00F0FF" />

                {/* Connector line and arrow to Badge */}
                <line x1="195" y1="146" x2="265" y2="146" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="3 2" />
                <polygon points="265,146 257,142 257,150" fill="#00F0FF" />

                {/* Prominent, unclipped Badge for Diamond Orifice */}
                <rect
                  x="10"
                  y="132"
                  width="180"
                  height="28"
                  rx="4"
                  fill="#083344"
                  fillOpacity="0.95"
                  stroke={activeComponent === 'orifice' ? '#00F0FF' : '#0891b2'}
                  strokeWidth="1.5"
                  className="transition duration-200 group-hover:stroke-cyan-300"
                />
                <text x="100" y="150" textAnchor="middle" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  Orificio Diamante (Ø 0,33 mm)
                </text>
              </g>

              {/* Venturi Mixing Chamber */}
              <g
                onClick={() => setActiveComponent('venturi')}
                className="cursor-pointer group"
              >
                <polygon
                  points="260,157 340,157 325,230 275,230"
                  fill={activeComponent === 'venturi' ? '#1e293b' : '#0f172a'}
                  stroke={activeComponent === 'venturi' ? '#00F0FF' : '#334155'}
                  strokeWidth="2"
                  className="transition duration-200 group-hover:stroke-cyan-400"
                />
                <text x="300" y="195" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  CÁMARA VENTURI
                </text>
                <text x="300" y="210" textAnchor="middle" fill="#00F0FF" fontSize="8" fontFamily="monospace">
                  -0,92 bar Vacío
                </text>
              </g>

              {/* Abrasive Inlet Port (from left) */}
              {mode === 'AWJ' && (
                <g
                  onClick={() => setActiveComponent('abrasive')}
                  className="cursor-pointer group"
                >
                  <path
                    d="M175,185 L265,185 L265,205 L175,205"
                    fill="#27272a"
                    stroke={activeComponent === 'abrasive' ? '#F59E0B' : '#52525b'}
                    strokeWidth="2"
                    className="transition duration-200 group-hover:stroke-amber-400"
                  />
                  {/* Abrasive particles moving */}
                  <circle cx="190" cy="195" r="2" fill="#F59E0B" />
                  <circle cx="215" cy="195" r="2.5" fill="#F59E0B" />
                  <circle cx="238" cy="195" r="2" fill="#F59E0B" />
                  <circle cx="255" cy="195" r="3" fill="#F59E0B" />

                  {/* Prominent, unclipped Badge for Abrasive Inlet */}
                  <rect
                    x="10"
                    y="176"
                    width="160"
                    height="38"
                    rx="4"
                    fill="#27272a"
                    fillOpacity="0.95"
                    stroke={activeComponent === 'abrasive' ? '#F59E0B' : '#52525b'}
                    strokeWidth="1.5"
                    className="transition duration-200 group-hover:stroke-amber-400"
                  />
                  <text x="90" y="192" textAnchor="middle" fill="#F59E0B" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    Granate Barton Malla 80
                  </text>
                  <text x="90" y="206" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="monospace">
                    400 g/min (Vacío) ──►
                  </text>
                </g>
              )}

              {/* Mixing / Focusing Tube (ROCTEC) */}
              <g
                onClick={() => setActiveComponent('mixing_tube')}
                className="cursor-pointer group"
              >
                <rect
                  x="284"
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
                <line x1="300" y1="230" x2="300" y2="360" stroke="#000000" strokeWidth="6" />

                {/* Supersonic Jet Stream Inside Tube */}
                <line
                  x1="300"
                  y1="157"
                  x2="300"
                  y2="360"
                  stroke="url(#supersonicJet)"
                  strokeWidth={mode === 'AWJ' ? '4' : '2'}
                  strokeLinecap="round"
                />

                {/* Mixing Tube Badge (Right side, fully inside canvas) */}
                <rect
                  x="335"
                  y="282"
                  width="170"
                  height="38"
                  rx="4"
                  fill="#09090b"
                  fillOpacity="0.95"
                  stroke={activeComponent === 'mixing_tube' ? '#00F0FF' : '#334155'}
                  strokeWidth="1.5"
                />
                <text x="420" y="298" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  Tubo Mezclador ROCTEC
                </text>
                <text x="420" y="312" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                  Carburo Ø 1,02 mm × 76 mm
                </text>
              </g>

              {/* Stand-Off Distance Indicator */}
              <g
                onClick={() => setActiveComponent('standoff')}
                className="cursor-pointer group"
              >
                <line x1="265" y1="360" x2="265" y2="385" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 2" />
                <line x1="260" y1="360" x2="270" y2="360" stroke="#F59E0B" strokeWidth="1" />
                <line x1="260" y1="385" x2="270" y2="385" stroke="#F59E0B" strokeWidth="1" />

                {/* Badge for Standoff distance */}
                <rect
                  x="70"
                  y="360"
                  width="190"
                  height="25"
                  rx="3"
                  fill="#1e1b4b"
                  fillOpacity="0.9"
                  stroke={activeComponent === 'standoff' ? '#F59E0B' : '#4338ca'}
                  strokeWidth="1"
                />
                <text x="165" y="376" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="monospace" fontWeight="bold">
                  Distancia a Pieza: 1,5 mm ──►
                </text>
              </g>

              {/* The Supersonic Jet in Air Gap and Cut Front */}
              <line
                x1="300"
                y1="360"
                x2="300"
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
                  width="480"
                  height="70"
                  rx="4"
                  fill="#334155"
                  stroke="#475569"
                  strokeWidth="2"
                />
                {/* Cut kerf gap through metal */}
                <polygon
                  points="297,385 303,385 306,455 294,455"
                  fill="#060911"
                />
                <text x="80" y="420" fill="#e2e8f0" fontSize="12" fontFamily="sans-serif" fontWeight="bold">
                  PIEZA METÁLICA (Espesor h)
                </text>
                <text x="80" y="438" fill="#38bdf8" fontSize="9" fontFamily="monospace">
                  ZAC = 0,00 mm • Micro-mecanizado en frío sin alteración térmica
                </text>
              </g>

              {/* Catcher Tank Bottom Energy Dissipation */}
              <rect x="50" y="475" width="500" height="35" rx="4" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 2" />
              <text x="300" y="497" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">
                TANQUE ATENUADOR CON AGUA SUBMARINA (&lt;78 dBA)
              </text>
            </svg>
          </div>

          {/* 5-Axis Dynamic Indicator */}
          {fiveAxisTilt && (
            <div className="mt-3 flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-mono text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Cinemática 5 Ejes: Inclinación activa A/B (+{tiltAngle}°) compensando conicidad hacia el desecho</span>
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
                { id: 'standoff', label: '6. Altura Z (1,5 mm)' },
                { id: 'actuator', label: '7. Válvula de Aguja' },
                { id: 'inlet', label: '8. Entrada Presión' },
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
