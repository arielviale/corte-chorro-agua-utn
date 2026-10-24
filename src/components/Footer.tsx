import React from 'react';
import { Activity, Award, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060911] border-t border-slate-800 text-slate-400 py-10 px-4 mt-16 font-sans print:hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        {/* Col 1: Identity */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold">
              <Activity className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight">
              AWJ 4.0 CYBER-PHYSICAL
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Plataforma interactiva de gemelo digital y simulación hidrodinámica para el mecanizado no tradicional por chorro de agua abrasivo.
          </p>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>OPC UA & MTConnect Ready</span>
          </div>
        </div>

        {/* Col 2: Institutional */}
        <div className="space-y-2">
          <h4 className="font-mono text-white uppercase tracking-widest text-[11px] font-bold">
            Institución Académica
          </h4>
          <p className="text-slate-300 font-medium">
            Universidad Tecnológica Nacional
          </p>
          <p className="text-slate-400">
            Facultad Regional Paraná (UTN FRP)
          </p>
          <p className="text-slate-400">
            Extensión Áulica Viale, Entre Ríos
          </p>
          <a
            href="https://www.frp.utn.edu.ar/info2/?page_id=28373"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:underline flex items-center gap-1 pt-1"
          >
            <span>Portal UTN Viale</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Col 3: Cátedra y Carrera */}
        <div className="space-y-2">
          <h4 className="font-mono text-white uppercase tracking-widest text-[11px] font-bold">
            Cátedra y Carrera
          </h4>
          <p className="text-slate-300 font-medium">
            Tecnicatura Universitaria en Mecatrónica (TUM)
          </p>
          <p className="text-slate-400">
            Asignatura: Corte de Metales
          </p>
          <p className="text-slate-400">
            Trabajo Práctico Final de Cátedra
          </p>
          <span className="inline-block bg-slate-900 px-2 py-0.5 rounded text-[10px] text-amber-400 border border-slate-800 font-mono">
            Defensa: 10/11/2026
          </span>
        </div>

        {/* Col 4: Authors & Verification */}
        <div className="space-y-2">
          <h4 className="font-mono text-white uppercase tracking-widest text-[11px] font-bold">
            Equipo Expositor
          </h4>
          <p className="text-white font-bold text-sm">
            Diego Francisconi & Ariel Martinez
          </p>
          <p className="text-slate-400 text-[11px]">
            Especialización: Mecatrónica y SCADA Industrial
          </p>
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800 text-[10px] text-slate-400 font-mono">
            <span className="text-emerald-400 font-bold">Status:</span> Calibrado según modelo de erosión AWJ de Zeng & Kim y estándares de calidad Q1–Q5 (ISO 2768 / VDI 2906).
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
        <p>
          © 2026 AWJ-4.0 Cyber-Physical Lab • Desarrollado para la Cátedra de Corte de Metales – UTN FRP Viale.
        </p>
        <p className="text-slate-400 font-mono">
          Desarrollado con React 19, TypeScript, Tailwind CSS y Antigravity.
        </p>
      </div>
    </footer>
  );
}
