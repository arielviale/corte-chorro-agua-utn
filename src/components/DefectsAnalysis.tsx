import React, { useState } from 'react';
import { 
  Flame, 
  CheckCircle, 
  AlertTriangle, 
  Sliders, 
  ArrowRight, 
  RotateCw, 
  Cpu, 
  Sparkles,
  Layers
} from 'lucide-react';
import { DEFECTS_CATALOG } from '../data/waterjetData';

export default function DefectsAnalysis() {
  const [selectedDefectId, setSelectedDefectId] = useState<string>('taper');
  const [showCompensated, setShowCompensated] = useState<boolean>(true);

  const currentDefect = DEFECTS_CATALOG.find((d) => d.id === selectedDefectId) || DEFECTS_CATALOG[0];

  return (
    <div className="bg-[#0B0F19] border border-cyan-500/20 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
              Control de Calidad & Cinemática CNC
            </span>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              Análisis Físico-Mecatrónico
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-2 flex items-center gap-2">
            Defectos Habituales en Metales y su Corrección Mecatrónica
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Comprender la causa fluidodinámica de las desviaciones y aplicar algoritmos de control numérico e interpolación en 5 ejes.
          </p>
        </div>

        {/* Toggle Before / After */}
        <button
          onClick={() => setShowCompensated(!showCompensated)}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 ${
            showCompensated
              ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{showCompensated ? 'Vista: CORRECCIÓN MECATRÓNICA ACTIVA' : 'Vista: DEFECTO SIN COMPENSACIÓN'}</span>
        </button>
      </div>

      {/* Defect Cards Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-6">
        {DEFECTS_CATALOG.map((defect) => {
          const isSelected = defect.id === selectedDefectId;
          return (
            <button
              key={defect.id}
              onClick={() => setSelectedDefectId(defect.id)}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div>
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider block">
                  Defecto #{defect.id}
                </span>
                <h4 className="text-xs font-bold text-white mt-1 leading-snug">
                  {defect.name}
                </h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5 line-clamp-1">
                  {defect.alias}
                </p>
              </div>
              <span className="text-[10px] text-cyan-300 mt-2 font-semibold flex items-center gap-1">
                Ver diagnóstico <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Analysis Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Side: Interactive SVG Graphic Illustrating Defect & Correction */}
        <div className="lg:col-span-6 bg-[#060911] border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center relative">
          <span className="text-xs font-mono text-slate-400 mb-2">
            Esquema Físico: {currentDefect.name} ({showCompensated ? 'Compensado por Software / 5 Ejes' : 'Comportamiento Natural'})
          </span>

          <div className="w-full h-64 bg-slate-950 rounded-lg border border-slate-900 p-2 flex items-center justify-center">
            {selectedDefectId === 'taper' && (
              <svg viewBox="0 0 420 210" className="w-full h-full">
                {/* Plate material: Left (Useful Piece) & Right (Scrap) */}
                <rect x="24" y="48" width="140" height="114" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />
                <rect x="234" y="48" width="162" height="114" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />

                {/* Kerf Slot */}
                {showCompensated ? (
                  // 5-Axis compensated: straight wall on the piece (left side) and extra angle on scrap (right side)
                  <g>
                    <polygon
                      points="164,48 234,48 210,162 164,162"
                      fill="#00F0FF"
                      fillOpacity="0.18"
                      stroke="#00F0FF"
                      strokeWidth="2"
                    />
                    {/* Highlighted 90 deg wall */}
                    <line x1="164" y1="48" x2="164" y2="162" stroke="#10B981" strokeWidth="3" />
                    {/* Highlighted angled scrap wall */}
                    <line x1="234" y1="48" x2="210" y2="162" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 2" />

                    {/* Left Box Label (Useful Piece) */}
                    <rect x="34" y="84" width="120" height="42" rx="5" fill="#0f172a" fillOpacity="0.9" stroke="#10B981" strokeWidth="1.2" />
                    <text x="94" y="101" fill="#10B981" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      PIEZA ÚTIL
                    </text>
                    <text x="94" y="117" fill="#e2e8f0" fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Pared a 90,00°
                    </text>

                    {/* Right Box Label (Scrap) */}
                    <rect x="244" y="84" width="142" height="42" rx="5" fill="#0f172a" fillOpacity="0.9" stroke="#F59E0B" strokeWidth="1.2" />
                    <text x="315" y="101" fill="#F59E0B" fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      ZONA DE DESCARTE
                    </text>
                    <text x="315" y="117" fill="#fde68a" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                      ◄ Conicidad desviada
                    </text>

                    {/* Inclined nozzle above */}
                    <line x1="194" y1="10" x2="199" y2="48" stroke="#00F0FF" strokeWidth="4.5" strokeLinecap="round" />
                    <rect x="208" y="11" width="150" height="22" rx="4" fill="#0f172a" fillOpacity="0.9" stroke="#0284c7" strokeWidth="1" />
                    <text x="283" y="25" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Cabezal inclinado θ_c
                    </text>

                    {/* Bottom summary */}
                    <text x="210" y="190" fill="#10B981" fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      ✓ Compensación 5 ejes activa: pared útil 100% perpendicular
                    </text>
                  </g>
                ) : (
                  // Uncompensated V-Taper
                  <g>
                    <polygon
                      points="164,48 234,48 212,162 186,162"
                      fill="#EF4444"
                      fillOpacity="0.2"
                      stroke="#EF4444"
                      strokeWidth="2"
                    />
                    <line x1="164" y1="48" x2="186" y2="162" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="4 2" />
                    <line x1="234" y1="48" x2="212" y2="162" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="4 2" />

                    {/* Vertical nozzle above */}
                    <line x1="199" y1="10" x2="199" y2="48" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
                    <rect x="208" y="11" width="150" height="22" rx="4" fill="#0f172a" fillOpacity="0.9" stroke="#EF4444" strokeWidth="1" />
                    <text x="283" y="25" fill="#fca5a5" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Cabezal fijo a 0°
                    </text>

                    {/* Central pill with dark backdrop so lines don't cross text */}
                    <rect x="85" y="84" width="250" height="42" rx="6" fill="#0f172a" fillOpacity="0.92" stroke="#EF4444" strokeWidth="1.5" />
                    <text x="210" y="102" fill="#EF4444" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Conicidad en V Natural (θ_t &gt; 0,8°)
                    </text>
                    <text x="210" y="117" fill="#fca5a5" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                      Pared inclinada tanto en pieza como en descarte
                    </text>

                    <text x="210" y="190" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Ancho Sup. &gt; Ancho Inf. por disipación cinética al profundizar
                    </text>
                  </g>
                )}
              </svg>
            )}

            {selectedDefectId === 'draglines' && (
              <svg viewBox="0 0 420 210" className="w-full h-full">
                <rect x="35" y="42" width="350" height="120" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <line x1="70" y1="28" x2="350" y2="28" stroke="#F59E0B" strokeWidth="2" />
                <text x="210" y="19" fill="#F59E0B" fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  Sentido de avance del cabezal ──►
                </text>

                {showCompensated ? (
                  <g>
                    {/* Controlled speed: vertical smooth striations */}
                    <line x1="95" y1="42" x2="95" y2="162" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.45" />
                    <line x1="150" y1="42" x2="150" y2="162" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.45" />
                    <line x1="210" y1="42" x2="210" y2="162" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.45" />
                    <line x1="270" y1="42" x2="270" y2="162" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.45" />
                    <line x1="325" y1="42" x2="325" y2="162" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.45" />

                    <rect x="80" y="78" width="260" height="46" rx="6" fill="#0f172a" fillOpacity="0.92" stroke="#10B981" strokeWidth="1.5" />
                    <text x="210" y="98" fill="#10B981" fontSize="10.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Acabado Q4–Q5 Homogéneo
                    </text>
                    <text x="210" y="114" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Ra 1,4 – 3,2 µm • Sin estriado curvo inferior
                    </text>

                    <text x="210" y="188" fill="#10B981" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      ✓ Velocidad de avance regulada: columna de corte vertical
                    </text>
                  </g>
                ) : (
                  <g>
                    {/* Uncompensated drag lines: curved striations in bottom half */}
                    <path d="M 105,42 Q 105,95 65,162" fill="none" stroke="#EF4444" strokeWidth="2" />
                    <path d="M 165,42 Q 165,95 125,162" fill="none" stroke="#EF4444" strokeWidth="2" />
                    <path d="M 225,42 Q 225,95 185,162" fill="none" stroke="#EF4444" strokeWidth="2" />
                    <path d="M 285,42 Q 285,95 245,162" fill="none" stroke="#EF4444" strokeWidth="2" />
                    <path d="M 345,42 Q 345,95 305,162" fill="none" stroke="#EF4444" strokeWidth="2" />

                    <rect x="70" y="78" width="280" height="44" rx="6" fill="#0f172a" fillOpacity="0.92" stroke="#EF4444" strokeWidth="1.5" />
                    <text x="210" y="97" fill="#EF4444" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Marcas de Estriado (Líneas de Arrastre)
                    </text>
                    <text x="210" y="113" fill="#fca5a5" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                      Rugosidad severa Ra &gt; 12 µm en tercio inferior
                    </text>

                    <text x="210" y="188" fill="#F59E0B" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Avance excesivo: la cola del chorro se curva hacia atrás
                    </text>
                  </g>
                )}
              </svg>
            )}

            {selectedDefectId === 'incomplete' && (
              <svg viewBox="0 0 420 210" className="w-full h-full">
                <rect x="35" y="42" width="350" height="120" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <line x1="150" y1="10" x2="150" y2="42" stroke="#00F0FF" strokeWidth="4.5" strokeLinecap="round" />

                {showCompensated ? (
                  <g>
                    {/* Complete through cut */}
                    <line x1="150" y1="42" x2="150" y2="188" stroke="#10B981" strokeWidth="3.5" />
                    <circle cx="150" cy="188" r="5" fill="#10B981" />

                    <rect x="172" y="76" width="198" height="48" rx="6" fill="#0f172a" fillOpacity="0.92" stroke="#10B981" strokeWidth="1.5" />
                    <text x="271" y="96" fill="#10B981" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Corte Pasante 100% Completo
                    </text>
                    <text x="271" y="113" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                      Presión UHP óptima y granate seco
                    </text>
                  </g>
                ) : (
                  <g>
                    {/* Incomplete cut: jet stops halfway and splashes back */}
                    <path d="M 150,42 L 150,102" stroke="#EF4444" strokeWidth="4.5" />
                    <path d="M 150,102 Q 128,76 112,50" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 2" />
                    <path d="M 150,102 Q 172,76 188,50" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 2" />
                    <rect x="35" y="102" width="350" height="60" fill="#EF4444" fillOpacity="0.15" />

                    <rect x="80" y="108" width="260" height="46" rx="6" fill="#0f172a" fillOpacity="0.92" stroke="#EF4444" strokeWidth="1.5" />
                    <text x="210" y="127" fill="#EF4444" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Corte Incompleto / No Perfora
                    </text>
                    <text x="210" y="143" fill="#F59E0B" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                      Baja presión o abrasivo atascado por humedad
                    </text>
                  </g>
                )}
              </svg>
            )}

            {selectedDefectId === 'jetlag' && (
              <svg viewBox="0 0 420 210" className="w-full h-full">
                <rect x="35" y="42" width="350" height="120" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <line x1="70" y1="28" x2="350" y2="28" stroke="#F59E0B" strokeWidth="2" />
                <text x="210" y="19" fill="#F59E0B" fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  Sentido de avance CNC ──►
                </text>

                {showCompensated ? (
                  <g>
                    {/* Compensated look-ahead: straight column */}
                    <line x1="305" y1="42" x2="305" y2="162" stroke="#10B981" strokeWidth="3.5" />
                    <rect x="52" y="76" width="235" height="48" rx="6" fill="#0f172a" fillOpacity="0.92" stroke="#10B981" strokeWidth="1.5" />
                    <text x="169" y="96" fill="#10B981" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Algoritmo Paso de Esquina:
                    </text>
                    <text x="169" y="113" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                      Desacelera y verticaliza la columna
                    </text>
                    <text x="210" y="188" fill="#10B981" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      ✓ Vértices y esquinas a 90° sin deformación inferior
                    </text>
                  </g>
                ) : (
                  <g>
                    {/* Uncompensated lag: curved stream */}
                    <path d="M 305,42 Q 295,102 215,162" fill="none" stroke="#EF4444" strokeWidth="3.5" />
                    <line x1="305" y1="42" x2="305" y2="162" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="215" y1="168" x2="305" y2="168" stroke="#F59E0B" strokeWidth="2" />

                    <rect x="50" y="76" width="215" height="46" rx="6" fill="#0f172a" fillOpacity="0.92" stroke="#EF4444" strokeWidth="1.5" />
                    <text x="157" y="95" fill="#EF4444" fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Retardo de Cola (Desviación)
                    </text>
                    <text x="157" y="111" fill="#fca5a5" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                      Desfase entre entrada y salida
                    </text>

                    <text x="210" y="190" fill="#F59E0B" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Inercia en esquinas: cola atrasada genera sub-corte
                    </text>
                  </g>
                )}
              </svg>
            )}

            {selectedDefectId === 'rollover' && (
              <svg viewBox="0 0 420 210" className="w-full h-full">
                <rect x="45" y="62" width="145" height="104" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />
                <rect x="230" y="62" width="145" height="104" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />

                {showCompensated ? (
                  <g>
                    {/* Jet column */}
                    <line x1="210" y1="42" x2="210" y2="174" stroke="#00F0FF" strokeWidth="3.5" />
                    {/* Nozzle close to plate (1.5 mm) */}
                    <rect x="192" y="18" width="36" height="28" rx="3" fill="#0f172a" stroke="#10B981" strokeWidth="2" />
                    {/* Callout pill on right */}
                    <rect x="238" y="18" width="142" height="26" rx="4" fill="#0f172a" fillOpacity="0.92" stroke="#10B981" strokeWidth="1.2" />
                    <text x="309" y="34" fill="#10B981" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      ◄ Distancia = 1,5 mm
                    </text>

                    <rect x="60" y="96" width="115" height="34" rx="4" fill="#0f172a" fillOpacity="0.9" stroke="#10B981" strokeWidth="1" />
                    <text x="117" y="117" fill="#10B981" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Arista viva 90°
                    </text>

                    <text x="210" y="192" fill="#10B981" fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      ✓ Filo superior nítido a 90° sin arenado periférico
                    </text>
                  </g>
                ) : (
                  <g>
                    {/* Jet column with divergent spray cone */}
                    <polygon points="207,32 213,32 232,68 188,68" fill="#EF4444" fillOpacity="0.28" />
                    <line x1="210" y1="32" x2="210" y2="174" stroke="#00F0FF" strokeWidth="3.5" />
                    {/* Nozzle high up (> 4.5 mm) */}
                    <rect x="192" y="6" width="36" height="26" rx="3" fill="#0f172a" stroke="#EF4444" strokeWidth="2" />
                    {/* Callout pill on right */}
                    <rect x="238" y="6" width="158" height="26" rx="4" fill="#0f172a" fillOpacity="0.92" stroke="#EF4444" strokeWidth="1.2" />
                    <text x="317" y="22" fill="#EF4444" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      ◄ Distancia &gt; 4,5 mm (Lejos)
                    </text>

                    {/* Rounded top edges */}
                    <path d="M 170,62 Q 190,62 190,82" fill="none" stroke="#EF4444" strokeWidth="3" />
                    <path d="M 250,62 Q 230,62 230,82" fill="none" stroke="#EF4444" strokeWidth="3" />

                    <rect x="55" y="96" width="125" height="34" rx="4" fill="#0f172a" fillOpacity="0.9" stroke="#EF4444" strokeWidth="1" />
                    <text x="117" y="117" fill="#fca5a5" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Borde redondeado
                    </text>

                    <text x="210" y="192" fill="#EF4444" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Niebla periférica erosiona la arista (Redondeo de Borde)
                    </text>
                  </g>
                )}
              </svg>
            )}

            {selectedDefectId === 'blowout' && (
              <svg viewBox="0 0 420 210" className="w-full h-full">
                <rect x="25" y="25" width="370" height="155" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />

                {showCompensated ? (
                  <g>
                    {/* Circle piece boundary shifted left so callout fits cleanly on right */}
                    <circle cx="115" cy="102" r="46" fill="#0f172a" stroke="#00F0FF" strokeWidth="2.5" />
                    <text x="115" y="99" fill="#10B981" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      PIEZA ÚTIL
                    </text>
                    <text x="115" y="112" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      Sin marcas
                    </text>

                    {/* Lead-in tangent curve from outside */}
                    <path d="M 192,145 Q 165,112 161,102" fill="none" stroke="#10B981" strokeWidth="2.5" strokeDasharray="4 2" />
                    <circle cx="192" cy="145" r="5" fill="#F59E0B" />

                    {/* Callout box on the right */}
                    <rect x="206" y="72" width="176" height="62" rx="6" fill="#0f172a" fillOpacity="0.92" stroke="#10B981" strokeWidth="1.5" />
                    <text x="294" y="92" fill="#F59E0B" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      ● Inicio en Zona de Descarte
                    </text>
                    <text x="294" y="108" fill="#10B981" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                      Entrada tangencial + vacío
                    </text>
                    <text x="294" y="122" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      Perímetro 100% libre de cráter
                    </text>
                  </g>
                ) : (
                  <g>
                    <circle cx="115" cy="102" r="46" fill="#0f172a" stroke="#00F0FF" strokeWidth="2.5" />
                    <text x="115" y="105" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      PIEZA ÚTIL
                    </text>

                    {/* Direct pierce crater right on the contour */}
                    <circle cx="161" cy="102" r="9" fill="#EF4444" fillOpacity="0.55" stroke="#EF4444" strokeWidth="2.5" />
                    <line x1="172" y1="102" x2="202" y2="102" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />

                    {/* Callout box on the right */}
                    <rect x="206" y="74" width="176" height="56" rx="6" fill="#0f172a" fillOpacity="0.92" stroke="#EF4444" strokeWidth="1.5" />
                    <text x="294" y="95" fill="#EF4444" fontSize="9.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Cráter de Perforación
                    </text>
                    <text x="294" y="111" fill="#fca5a5" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                      Impacto directo sobre el
                    </text>
                    <text x="294" y="123" fill="#fca5a5" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                      borde útil de la pieza
                    </text>
                  </g>
                )}
              </svg>
            )}
          </div>
        </div>

        {/* Right Side: Cause, Physics, and Mechatronic Resolution */}
        <div className="lg:col-span-6 space-y-4 text-xs">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
              Descripción Visual y Morfología:
            </span>
            <p className="text-slate-200 leading-relaxed">
              {currentDefect.visualDesc}
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              ¿Qué Fenómeno Físico lo Provoca?
            </span>
            <p className="text-slate-300 leading-relaxed">
              {currentDefect.cause}
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              Solución de Ingeniería Mecatrónica (Industria 4.0):
            </span>
            <p className="text-emerald-200 leading-relaxed bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/40">
              {currentDefect.mechatronicFix}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Matrix of Defect Causes & Quick Actions */}
      <div className="mt-8 pt-6 border-t border-slate-800">
        <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          Tabla de Diagnóstico Rápido en Planta (Cátedra de Corte):
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px]">
              <tr>
                <th className="p-3">Defecto Típico</th>
                <th className="p-3">Causa Físico-Mecánica</th>
                <th className="p-3 text-emerald-400">Solución Técnica Inmediata</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-bold text-white">Conicidad en la pared</td>
                <td className="p-3">Pérdida de energía cinética al profundizar / desgaste del tubo mezclador</td>
                <td className="p-3 text-emerald-300">Compensación 5 ejes en tiempo real, reducir velocidad, renovar tubo ROCTEC</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Marcas de estriado (líneas de arrastre)</td>
                <td className="p-3">Avance demasiado rápido para el espesor del material</td>
                <td className="p-3 text-emerald-300">Bajar velocidad de avance a Q3-Q5, aumentar presión UHP o caudal de granate</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Corte incompleto / no perfora</td>
                <td className="p-3">Presión insuficiente, abrasivo húmedo u orificio obstruido</td>
                <td className="p-3 text-emerald-300">Verificar presión de bomba, secar granate, purgar conductos con aire seco</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Desviación en esquinas</td>
                <td className="p-3">Inercia de la columna del chorro al cambiar de dirección</td>
                <td className="p-3 text-emerald-300">Algoritmo de compensación en esquinas del software CAM, desacelerar vértices</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

