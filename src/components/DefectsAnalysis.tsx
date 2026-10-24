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

          <div className="w-full max-w-[420px] h-64 bg-slate-950 rounded-lg border border-slate-900 p-2 flex items-center justify-center">
            {selectedDefectId === 'taper' && (
              <svg viewBox="0 0 350 200" className="w-full h-full">
                {/* Plate material */}
                <rect x="30" y="40" width="110" height="120" fill="#334155" stroke="#475569" strokeWidth="1" />
                <rect x="210" y="40" width="110" height="120" fill="#334155" stroke="#475569" strokeWidth="1" />

                {/* Kerf Slot */}
                {showCompensated ? (
                  // 5-Axis compensated: straight wall on the piece (left side) and extra angle on scrap (right side)
                  <g>
                    <polygon
                      points="140,40 210,40 190,160 140,160"
                      fill="#00F0FF"
                      fillOpacity="0.2"
                      stroke="#00F0FF"
                      strokeWidth="2"
                    />
                    <line x1="140" y1="40" x2="140" y2="160" stroke="#10B981" strokeWidth="2.5" />
                    <text x="145" y="105" fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      90,00° PIEZA ÚTIL
                    </text>
                    <text x="215" y="105" fill="#F59E0B" fontSize="9" fontFamily="monospace">
                      ◄ Conicidad volcada al Scrap
                    </text>
                    {/* Inclined nozzle above */}
                    <line x1="172" y1="10" x2="175" y2="40" stroke="#00F0FF" strokeWidth="4" />
                    <text x="175" y="25" fill="#38bdf8" fontSize="9" fontFamily="monospace">
                      Cabezal inclinado θ_c
                    </text>
                  </g>
                ) : (
                  // Uncompensated V-Taper
                  <g>
                    <polygon
                      points="140,40 210,40 185,160 165,160"
                      fill="#EF4444"
                      fillOpacity="0.2"
                      stroke="#EF4444"
                      strokeWidth="2"
                    />
                    <line x1="140" y1="40" x2="165" y2="160" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2" />
                    <line x1="210" y1="40" x2="185" y2="160" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2" />
                    <text x="175" y="100" fill="#EF4444" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Conicidad V Natural (θ_t &gt; 0,8°)
                    </text>
                    <text x="175" y="180" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      W_top &gt; W_bottom por disipación cinética
                    </text>
                  </g>
                )}
              </svg>
            )}

            {selectedDefectId === 'draglines' && (
              <svg viewBox="0 0 350 200" className="w-full h-full">
                <rect x="40" y="40" width="270" height="120" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <line x1="60" y1="28" x2="280" y2="28" stroke="#F59E0B" strokeWidth="2" />
                <text x="175" y="20" fill="#F59E0B" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  Sentido de avance rápido ──►
                </text>

                {showCompensated ? (
                  <g>
                    {/* Controlled speed: vertical smooth striations */}
                    <line x1="100" y1="40" x2="100" y2="160" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />
                    <line x1="140" y1="40" x2="140" y2="160" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />
                    <line x1="180" y1="40" x2="180" y2="160" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />
                    <line x1="220" y1="40" x2="220" y2="160" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />
                    <text x="175" y="105" fill="#10B981" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Acabado Q4-Q5 Homogéneo
                    </text>
                    <text x="175" y="125" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Ra 1,4 – 3,2 µm • Sin estriado curvo inferior
                    </text>
                  </g>
                ) : (
                  <g>
                    {/* Uncompensated drag lines: curved striations in bottom half */}
                    <path d="M 80,40 Q 80,90 45,160" fill="none" stroke="#EF4444" strokeWidth="2" />
                    <path d="M 130,40 Q 130,90 95,160" fill="none" stroke="#EF4444" strokeWidth="2" />
                    <path d="M 180,40 Q 180,90 145,160" fill="none" stroke="#EF4444" strokeWidth="2" />
                    <path d="M 230,40 Q 230,90 195,160" fill="none" stroke="#EF4444" strokeWidth="2" />
                    <text x="175" y="80" fill="#EF4444" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Marcas de Estriado ("Drag Lines")
                    </text>
                    <text x="175" y="178" fill="#F59E0B" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Avance excesivo: la cola del chorro se curva hacia atrás
                    </text>
                  </g>
                )}
              </svg>
            )}

            {selectedDefectId === 'incomplete' && (
              <svg viewBox="0 0 350 200" className="w-full h-full">
                <rect x="40" y="40" width="270" height="120" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <line x1="175" y1="10" x2="175" y2="40" stroke="#00F0FF" strokeWidth="4" />

                {showCompensated ? (
                  <g>
                    {/* Complete through cut */}
                    <line x1="175" y1="40" x2="175" y2="185" stroke="#10B981" strokeWidth="3" />
                    <circle cx="175" cy="185" r="5" fill="#10B981" />
                    <text x="190" y="105" fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      Corte Pasante 100% Completo
                    </text>
                    <text x="190" y="125" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                      Presión UHP óptima y granate seco fluido
                    </text>
                  </g>
                ) : (
                  <g>
                    {/* Incomplete cut: jet stops halfway and splashes back */}
                    <path d="M 175,40 L 175,100" stroke="#EF4444" strokeWidth="4" />
                    <path d="M 175,100 Q 155,75 140,50" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 2" />
                    <path d="M 175,100 Q 195,75 210,50" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 2" />
                    <rect x="40" y="100" width="270" height="60" fill="#EF4444" fillOpacity="0.15" />
                    <text x="175" y="130" fill="#EF4444" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Corte Incompleto / No Perfora
                    </text>
                    <text x="175" y="150" fill="#F59E0B" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Baja presión o abrasivo atascado por humedad
                    </text>
                  </g>
                )}
              </svg>
            )}

            {selectedDefectId === 'jetlag' && (
              <svg viewBox="0 0 350 200" className="w-full h-full">
                <rect x="40" y="40" width="270" height="120" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <line x1="60" y1="28" x2="280" y2="28" stroke="#F59E0B" strokeWidth="2" />
                <text x="175" y="20" fill="#F59E0B" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  Sentido de avance CNC ──►
                </text>

                {showCompensated ? (
                  <g>
                    {/* Compensated look-ahead: straight column */}
                    <line x1="240" y1="40" x2="240" y2="160" stroke="#10B981" strokeWidth="3" />
                    <text x="235" y="100" fill="#10B981" fontSize="10" fontFamily="monospace" textAnchor="end" fontWeight="bold">
                      Algoritmo "Corner Pass":
                    </text>
                    <text x="235" y="115" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">
                      Desacelera en esquinas y verticaliza la columna
                    </text>
                  </g>
                ) : (
                  <g>
                    {/* Uncompensated lag: curved stream */}
                    <path d="M 240,40 Q 230,100 160,160" fill="none" stroke="#EF4444" strokeWidth="3" />
                    <line x1="240" y1="40" x2="240" y2="160" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="160" y1="165" x2="240" y2="165" stroke="#F59E0B" strokeWidth="2" />
                    <text x="200" y="180" fill="#F59E0B" fontSize="10" fontFamily="monospace" textAnchor="middle">
                      Inercia en esquinas: cola atrasada genera sub-corte
                    </text>
                  </g>
                )}
              </svg>
            )}

            {selectedDefectId === 'rollover' && (
              <svg viewBox="0 0 350 200" className="w-full h-full">
                <rect x="40" y="50" width="120" height="110" fill="#334155" stroke="#475569" strokeWidth="1" />
                <rect x="190" y="50" width="120" height="110" fill="#334155" stroke="#475569" strokeWidth="1" />
                <line x1="175" y1="10" x2="175" y2="180" stroke="#00F0FF" strokeWidth="3" />

                {showCompensated ? (
                  <g>
                    <rect x="155" y="10" width="40" height="25" fill="#0f172a" stroke="#10B981" strokeWidth="1.5" />
                    <text x="175" y="27" fill="#10B981" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      SOD = 1,5 mm
                    </text>
                    <text x="175" y="195" fill="#10B981" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Filo vivo nítido a 90° sin arenado
                    </text>
                  </g>
                ) : (
                  <g>
                    <rect x="155" y="-10" width="40" height="25" fill="#0f172a" stroke="#EF4444" strokeWidth="1.5" />
                    <text x="175" y="7" fill="#EF4444" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      Distancia &gt; 4,5 mm (Lejos)
                    </text>
                    <path d="M 150,50 Q 160,50 160,65" fill="none" stroke="#EF4444" strokeWidth="2" />
                    <path d="M 200,50 Q 190,50 190,65" fill="none" stroke="#EF4444" strokeWidth="2" />
                    <text x="175" y="195" fill="#EF4444" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Niebla periférica erosiona arista (Redondeo de Borde)
                    </text>
                  </g>
                )}
              </svg>
            )}

            {selectedDefectId === 'blowout' && (
              <svg viewBox="0 0 350 200" className="w-full h-full">
                <rect x="40" y="30" width="270" height="140" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />

                {showCompensated ? (
                  <g>
                    {/* Circle piece boundary */}
                    <circle cx="175" cy="100" r="45" fill="#0f172a" stroke="#00F0FF" strokeWidth="2" />
                    {/* Lead-in tangent curve from outside */}
                    <path d="M 240,150 Q 220,110 220,100" fill="none" stroke="#10B981" strokeWidth="2.5" strokeDasharray="3 2" />
                    <circle cx="240" cy="150" r="4" fill="#F59E0B" />
                    <text x="245" y="155" fill="#F59E0B" fontSize="9" fontFamily="monospace">
                      Perforación en Chatarra (Asistida por Vacío)
                    </text>
                    <text x="175" y="105" fill="#10B981" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      Perímetro libre de marcas
                    </text>
                  </g>
                ) : (
                  <g>
                    <circle cx="175" cy="100" r="45" fill="#0f172a" stroke="#00F0FF" strokeWidth="2" />
                    <circle cx="220" cy="100" r="8" fill="#EF4444" fillOpacity="0.5" stroke="#EF4444" strokeWidth="2" />
                    <text x="235" y="95" fill="#EF4444" fontSize="9" fontFamily="monospace">
                      Cráter de perforación directo en la pieza
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
                <td className="p-3 font-bold text-white">Marcas de estriado ("drag lines")</td>
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
                <td className="p-3 text-emerald-300">Algoritmo "Corner Pass" del software CAM, desacelerar vértices</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

