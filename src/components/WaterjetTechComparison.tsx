import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle, 
  XCircle, 
  Sparkles,
  Gauge,
  Cpu,
  Zap,
  Crosshair,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { WATERJET_VARIANTS, INTER_TECH_COMPARISON, SO_WHAT_SYNTHESIS } from '../data/waterjetData';


export default function WaterjetTechComparison() {
  const [selectedVariantName, setSelectedVariantName] = useState<string>(
    'AWJ con Cabezal 5 Ejes (Cinemática Multieje)'
  );

  const selectedVariant = WATERJET_VARIANTS.find((v) => v.name === selectedVariantName) || WATERJET_VARIANTS[0];

  return (
    <div className="bg-[#0B0F19] border border-cyan-500/20 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
              Ingeniería de Sistemas de Chorro de Agua
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              Arquitecturas UHP y Cinemáticas
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-2 flex items-center gap-2">
            Comparativa Técnica de Configuraciones de Chorro de Agua
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Análisis de subsistemas del proceso: Chorro Abrasivo (AWJ) vs Chorro Puro (PWJ), Cinemática de 5 Ejes vs 3 Ejes, y Bombas Intensificadoras vs Servobombas de Accionamiento Directo.
          </p>
        </div>
      </div>

      {/* Tabs Selector for Waterjet Technologies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mt-6">
        {WATERJET_VARIANTS.map((v) => {
          const isSelected = v.name === selectedVariantName;
          return (
            <button
              key={v.name}
              onClick={() => setSelectedVariantName(v.name)}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  {v.category}
                </span>
                <span className="text-xs font-bold mt-1 block leading-snug">
                  {v.name}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-2 font-mono">
                {v.maxPressure}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Technology In-Depth Card */}
      <div className="mt-6 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-inner">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
              {selectedVariant.category}
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              {selectedVariant.name}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded bg-slate-950 border border-slate-700 text-slate-300">
              Presión: <strong className="text-cyan-400">{selectedVariant.maxPressure}</strong>
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold">
              Rendimiento: {selectedVariant.efficiency}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 text-xs">
          <div>
            <span className="text-slate-400 font-mono uppercase tracking-wider block mb-1">
              Arquitectura Mecatrónica & Cinemática:
            </span>
            <p className="text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed">
              {selectedVariant.architecture}
            </p>
            <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-amber-400 font-mono uppercase tracking-wider block mb-0.5">
                Materiales Típicos:
              </span>
              <p className="text-slate-300">
                {selectedVariant.typicalMaterials}
              </p>
            </div>
          </div>

          <div>
            <span className="text-slate-400 font-mono uppercase tracking-wider block mb-1">
              Ventajas en el Corte por Chorro de Agua:
            </span>
            <ul className="space-y-1.5 bg-slate-950 p-3 rounded-lg border border-slate-800">
              {selectedVariant.pros.map((pro, i) => (
                <li key={i} className="text-slate-200 flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-slate-400 font-mono uppercase tracking-wider block mb-1">
              Aspectos a Considerar / Limitaciones:
            </span>
            <ul className="space-y-1.5 bg-slate-950 p-3 rounded-lg border border-slate-800">
              {selectedVariant.cons.map((con, i) => (
                <li key={i} className="text-slate-200 flex items-start gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 p-3 bg-cyan-950/20 rounded-lg border border-cyan-900/40">
              <span className="text-cyan-400 font-mono uppercase tracking-wider block mb-0.5">
                Aplicación Óptima:
              </span>
              <p className="text-slate-300">
                {selectedVariant.bestUseCases}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Matrix Table of Waterjet Systems */}
      <div className="mt-8 overflow-x-auto">
        <h3 className="text-sm font-bold text-white mb-3 font-mono uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          Tabla Comparativa de Subsistemas y Configuraciones de Chorro de Agua
        </h3>
        <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
          <thead className="bg-slate-950 text-slate-300 font-mono uppercase text-[11px] border-b border-slate-800">
            <tr>
              <th className="p-3">Configuración / Subsistema</th>
              <th className="p-3">Arquitectura Técnica</th>
              <th className="p-3">Presión Máxima</th>
              <th className="p-3">Geometría de Sangría & Conicidad</th>
              <th className="p-3">Eficiencia y Rendimiento</th>
              <th className="p-3">Materiales Recomendados</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
            {WATERJET_VARIANTS.map((item, index) => {
              const isFiveAxis = item.name.includes('5 Ejes');
              return (
                <tr
                  key={item.name}
                  className={`transition hover:bg-slate-800/50 ${
                    isFiveAxis ? 'bg-cyan-950/30 border-l-4 border-l-cyan-400' : ''
                  }`}
                >
                  <td className="p-3 font-semibold text-white">
                    <span className="block">{item.name}</span>
                    <span className="text-[10px] text-cyan-400 font-mono">{item.category}</span>
                  </td>
                  <td className="p-3 text-slate-300 max-w-[200px] text-[11px]">
                    {item.architecture}
                  </td>
                  <td className="p-3 font-mono text-cyan-300 font-bold">
                    {item.maxPressure}
                  </td>
                  <td className="p-3 font-mono text-amber-300">
                    {item.kerfAndTaper}
                  </td>
                  <td className="p-3 text-slate-300 text-[11px]">
                    {item.efficiency}
                  </td>
                  <td className="p-3 text-slate-400 text-[11px]">
                    {item.typicalMaterials}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Innovations 2026 & Industry 4.0 Showcase Card */}
      <div className="mt-8 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-amber-950/30 p-5 rounded-2xl border border-cyan-500/30 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            Tecnología 2026 e Industria 4.0 en Corte por Chorro de Agua
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="text-cyan-400 font-mono font-bold block mb-1">Flow HyperJet 94.000 psi</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Presión de 6.480 bar que duplica la energía cinética del chorro, logrando un 30-50% mayor velocidad y un <strong>ahorro de hasta el 50% de abrasivo</strong> frente a bombas estándar de 60.000 psi.
            </p>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="text-purple-300 font-mono font-bold block mb-1">Cabezal 5 Ejes hasta 60°</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Biselados en V, Y, K y chaflanes de soldadura en una sola pasada. La compensación dinámica elimina por completo la necesidad de fresado posterior.
            </p>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="text-amber-300 font-mono font-bold block mb-1">Lights-Out Cutting 4.0</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Corte desatendido nocturno sin operador humano, asistido por diagnóstico remoto cloud (Hypertherm Remote Help) y sensores de monitoreo de orificio.
            </p>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="text-emerald-400 font-mono font-bold block mb-1">Reciclaje de Granate 60-70%</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Sistemas automáticos hydro-cyclone que recuperan partículas de almandino intactas para su reutilización inmediata, abatiendo el costo del lodo residual.
            </p>
          </div>
        </div>
      </div>

      {/* Quantitative Inter-Technology Matrix (AWJM vs Fiber Laser vs HD Plasma vs Wire EDM) */}
      <div className="mt-8 overflow-x-auto space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Matriz Cuantitativa Inter-Tecnológica (AWJM vs Láser vs Plasma vs Wire EDM)
          </h3>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            Criterios de Selección en Manufactura Avanzada
          </span>
        </div>

        <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-sans">
          <thead className="bg-slate-950 text-slate-300 font-mono uppercase text-[10px] border-b border-slate-800">
            <tr>
              <th className="p-3">Tecnología de Corte</th>
              <th className="p-3">Mecanismo Físico</th>
              <th className="p-3">Rango Espesor</th>
              <th className="p-3">Tolerancia</th>
              <th className="p-3">Kerf</th>
              <th className="p-3">Vel. Acero 12mm</th>
              <th className="p-3 text-emerald-400">Zona Térmica (ZAT)</th>
              <th className="p-3">Costo Operativo</th>
              <th className="p-3">Versatilidad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 bg-slate-900/40 text-[11px]">
            {INTER_TECH_COMPARISON.map((row, idx) => {
              const isAWJ = row.process.includes('AWJM');
              return (
                <tr
                  key={idx}
                  className={`transition hover:bg-slate-800/50 ${
                    isAWJ ? 'bg-cyan-950/40 border-l-4 border-l-cyan-400 font-semibold' : ''
                  }`}
                >
                  <td className="p-3 font-mono text-white whitespace-nowrap">
                    {row.process}
                  </td>
                  <td className="p-3 text-slate-300 max-w-[160px] text-[10px]">
                    {row.removalMechanism}
                  </td>
                  <td className="p-3 font-mono text-cyan-300 whitespace-nowrap">
                    {row.thicknessRange}
                  </td>
                  <td className="p-3 font-mono text-amber-300 whitespace-nowrap">
                    {row.tolerance}
                  </td>
                  <td className="p-3 font-mono text-slate-300 whitespace-nowrap">
                    {row.kerf}
                  </td>
                  <td className="p-3 font-mono text-slate-300 whitespace-nowrap">
                    {row.speedSteel12mm}
                  </td>
                  <td className="p-3 font-mono text-emerald-400 whitespace-nowrap font-bold">
                    {row.hazExtent}
                  </td>
                  <td className="p-3 font-mono text-slate-300 whitespace-nowrap">
                    {row.operatingCost}
                  </td>
                  <td className="p-3 text-slate-300 max-w-[160px] text-[10px]">
                    {row.versatility}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Critical "So What?" Syntheses */}
      <div className="mt-6 space-y-3">
        <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Evaluación Crítica del "So What?" Tecnológico:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {SO_WHAT_SYNTHESIS.map((sw, i) => {
            const isAWJ = sw.tech.includes('AWJM');
            return (
              <div
                key={i}
                className={`p-3.5 rounded-xl border ${
                  isAWJ
                    ? 'bg-cyan-950/40 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950 p-3.5 border-slate-800'
                }`}
              >
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-0.5">
                  {sw.tech}
                </span>
                <strong className={`block text-xs mb-1.5 leading-snug ${isAWJ ? 'text-cyan-300' : 'text-white'}`}>
                  {sw.verdict}
                </strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {sw.reason}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mechatronic Note on 5-Axis Dynamics */}
      <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block font-mono text-sm mb-1">
            Conclusión de Ingeniería Mecatrónica en Chorro de Agua:
          </strong>
          <p className="leading-relaxed">
            La integración de la cinemática de 5 ejes convierte al corte por chorro de agua abrasivo en un proceso de mecanizado de precisión final. Al inclinar la boquilla unos pocos grados para anular la conicidad natural en la pieza y desacelerar anticipadamente en las esquinas mediante algoritmos de control predictivo para compensar el retardo angular del chorro, se eliminan por completo las operaciones secundarias de fresado, conservando las propiedades metalúrgicas intactas en frío (<strong>ZAC = 0,00 mm</strong>).
          </p>
        </div>
      </div>
    </div>
  );
}
