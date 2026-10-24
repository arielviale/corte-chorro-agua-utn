import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Volume2, 
  Recycle, 
  HeartPulse, 
  Droplet, 
  CheckCircle, 
  AlertOctagon,
  FileText,
  VolumeX,
  Gauge
} from 'lucide-react';

export default function SafetyEnvironment() {
  const [isSubmerged, setIsSubmerged] = useState<boolean>(true);
  const soundLevel = isSubmerged ? 74 : 106;

  return (
    <div className="bg-[#0B0F19] border border-cyan-500/20 rounded-2xl p-6 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
              Protocolo HSE • Higiene, Seguridad y Gestión Ambiental
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              Cero Emisión de Humos Térmicos
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-2 flex items-center gap-2">
            Seguridad Operativa UHP y Sustentabilidad Ambiental
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Gestión de presiones de 6.500 bar, mitigación acústica por inmersión y economía circular del granate.
          </p>
        </div>
      </div>

      {/* Grid: UHP Injection Hazard & Interactive Acoustic Tank */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Medical Card: UHP Hypodermic Injection Warning & WJTA/WJA Protocol */}
        <div className="lg:col-span-6 bg-gradient-to-br from-rose-950/50 via-slate-900 to-rose-950/30 border border-rose-500/50 p-5 rounded-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
            <div className="flex items-center gap-2 text-rose-400">
              <HeartPulse className="w-5 h-5 animate-pulse" />
              <h3 className="font-bold text-base text-white">
                Riesgo Crítico: Inyección Hipodérmica UHP (&gt;6.500 bar)
              </h3>
            </div>
            <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
              Protocolo WJTA / WJA
            </span>
          </div>

          <div className="bg-rose-950/40 p-3 rounded-lg border border-rose-800/60 text-xs text-rose-200 space-y-1">
            <strong className="text-white font-mono block">Física de la Punción Tisular:</strong>
            <p>
              Una presión fluida de apenas <strong>7 bar (100 PSI)</strong> es suficiente para perforar la piel humana. A presiones UHP de <strong>4.000 a 6.900+ bar</strong>, el chorro atraviesa instantáneamente calzado de seguridad, guantes de cuero, masas musculares y estructuras óseas.
            </p>
          </div>

          {/* Fisiopatología en 3 Etapas */}
          <div className="space-y-1.5 text-xs">
            <span className="text-amber-400 font-mono font-bold uppercase text-[11px] block">
              Fisiopatología Oculta en 3 Etapas Clínicas:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-rose-400 font-bold font-mono block">1. Entrada Engañosa:</span>
                <span className="text-slate-300">Orificio puntiforme mínimo, casi indoloro y con escaso sangrado externo.</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-amber-400 font-bold font-mono block">2. Siembra Profunda:</span>
                <span className="text-slate-300">Dispersión masiva de agua no estéril, aceite, bacterias y granate en fascias.</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-purple-300 font-bold font-mono block">3. Necrosis Compartimental:</span>
                <span className="text-slate-300">Colapso microcirculatorio, isquemia aguda y gangrena acelerada.</span>
              </div>
            </div>
          </div>

          {/* Ventana Crítica Quirúrgica de 6 Horas */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-rose-500/40 flex items-center justify-between gap-3">
            <div>
              <span className="text-rose-400 font-mono font-bold text-xs uppercase flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-rose-500" />
                Ventana Quirúrgica Crítica: 6 Horas
              </span>
              <p className="text-slate-300 text-[11px] mt-0.5 leading-snug">
                La <strong>Fasciotomía Descompresiva</strong> de urgencia debe realizarse dentro de las 6 horas del impacto. Superado ese umbral, la necrosis es irreversible y obliga a la amputación del miembro.
              </p>
            </div>
            <div className="bg-rose-950 px-3 py-1.5 rounded-lg border border-rose-600 text-center shrink-0 font-mono">
              <span className="text-rose-400 font-extrabold text-lg block">&lt; 6h</span>
              <span className="text-[9px] text-slate-400 uppercase">Límite Vital</span>
            </div>
          </div>

          {/* Tarjeta Médica Oficial WJTA / WJA */}
          <div className="bg-slate-950 p-3.5 rounded-lg border border-amber-500/40 space-y-2 text-xs">
            <span className="text-amber-400 font-mono font-bold block flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> TARJETA MÉDICA OBLIGATORIA DEL OPERARIO (WJTA Medical Alert Card):
            </span>
            <p className="text-slate-200 text-[11px] italic bg-slate-900/90 p-2.5 rounded border border-slate-800 leading-relaxed">
              "ATENCIÓN CIRUJANO DE GUARDIA: Este operario puede haber sufrido una inyección por chorro de agua a ultra-alta presión (&gt;6.500 bar) con abrasivo mineral. <strong>ESTÁ CATEGÓRICAMENTE PROHIBIDA LA SUTURA PRIMARIA</strong> de la herida o el uso de vendajes oclusivos. Requiere hospitalización urgente con debridación quirúrgica amplia, descompresión de fascias e irrigación salina copiosa."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="bg-slate-950/80 p-2.5 rounded border border-slate-800">
              <span className="text-cyan-400 font-mono font-bold block mb-0.5">Doble Válvula Dump & Whip Checks:</span>
              <span className="text-slate-400 text-[11px]">Despresuriza 6.500 bar a 0 bar en &lt; 0,5 seg y manguitos antirramotazo en mangueras.</span>
            </div>
            <div className="bg-slate-950/80 p-2.5 rounded border border-slate-800">
              <span className="text-emerald-400 font-mono font-bold block mb-0.5">Indumentaria UHMWPE & PLe:</span>
              <span className="text-slate-400 text-[11px]">Trajes de polietileno de ultra-alto peso molecular y botas con blindaje metatarsal.</span>
            </div>
          </div>
        </div>

        {/* Acoustic Mitigation: Interactive Decibel Meter */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 p-5 rounded-xl shadow-lg flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <Volume2 className="w-5 h-5" />
              <h3 className="font-bold text-base text-white">
                Atenuación Acústica: Corte Subacuático vs Seco
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              Res. SRT 295/03 (Límite: 85 dBA)
            </span>
          </div>

          {/* Interactive Decibel Gauge */}
          <div className="bg-[#060911] p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSubmerged(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isSubmerged ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                🌊 Cabezal Sumergido (15 mm)
              </button>
              <button
                onClick={() => setIsSubmerged(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  !isSubmerged ? 'bg-rose-500 text-white font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                💨 Corte al Aire Libre (Seco)
              </button>
            </div>

            <div className="flex items-baseline gap-2 mt-2">
              <span className={`text-4xl font-bold font-mono ${
                isSubmerged ? 'text-emerald-400' : 'text-rose-400 animate-pulse'
              }`}>
                {soundLevel}
              </span>
              <span className="text-lg font-mono text-slate-400">dBA</span>
            </div>

            <p className="text-xs text-center text-slate-400 max-w-sm">
              {isSubmerged
                ? '✅ Ambiente confortable en taller: La columna de agua absorbe la onda de choque supersónica y confina toda la niebla abrasiva.'
                : '⚠️ Excede el umbral seguro (&gt;85 dBA). Requiere protección auditiva de copa (NRR &ge; 25 dB) y cerramiento acústico integral.'}
            </p>
          </div>

          <div className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
            <strong className="text-slate-200">Mecanismo Neumático del Tanque:</strong> Vejigas inflables o pulmones de desplazamiento rápido elevan y descienden el nivel del agua en menos de 10 segundos para cargar la chapa en seco y cortar sumergido.
          </div>
        </div>
      </div>

      {/* Environmental Lifecycle: Water Treatment & Garnet Recycling */}
      <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-4">
        <h3 className="font-bold text-base text-white flex items-center gap-2">
          <Recycle className="w-5 h-5 text-emerald-400" />
          Gestión Ambiental y Circuito de Economía Circular
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-cyan-400 font-mono font-bold block flex items-center gap-1.5">
              <Droplet className="w-4 h-4" /> Acondicionamiento de Agua (RO):
            </span>
            <p className="text-slate-300 leading-relaxed">
              El agua de red pasa por ablandador y Ósmosis Inversa para mantener los <strong>Sólidos Disueltos Totales (TDS) entre 50 y 150 ppm</strong>.
            </p>
            <p className="text-slate-400 text-[11px]">
              TDS &gt; 200 ppm cristaliza y desgasta los sellos; TDS &lt; 5 ppm (desionizada agresiva) corroe el acero inoxidable de los cilindros.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-amber-400 font-mono font-bold block flex items-center gap-1.5">
              <Gauge className="w-4 h-4" /> Barton Garnet Ecológico:
            </span>
            <p className="text-slate-300 leading-relaxed">
              El granate almandino es un silicato natural inerte con <strong>menos de 0,1% de sílice libre cristalina</strong>, eliminando por completo el riesgo ocupacional de silicosis.
            </p>
            <p className="text-slate-400 text-[11px]">
              A diferencia del plasma y láser, produce <strong>0% humos cancerígenos de Cromo Hexavalente (Cr⁶⁺)</strong> al seccionar acero inoxidable.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-emerald-400 font-mono font-bold block flex items-center gap-1.5">
              <Recycle className="w-4 h-4" /> Reciclado de Lodos (Big-Bags):
            </span>
            <p className="text-slate-300 leading-relaxed">
              Sistemas de hidrociclones decantan el lodo del tanque hacia bolsas filtrantes. Tras lavado y tamizado neumático, se <strong>recupera hasta un 60–70% del granate</strong> para reutilización inmediata, abatiendo drásticamente el costo operativo.
            </p>
            <p className="text-slate-400 text-[11px]">
              Conforme a Ley 24.051 de residuos industriales en Argentina.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
