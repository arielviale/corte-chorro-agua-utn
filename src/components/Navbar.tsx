import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  Sliders, 
  Layers, 
  ShieldCheck, 
  BookOpen, 
  Timer, 
  Crosshair, 
  Flame,
  Award
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPresentation: () => void;
  isPresentationActive: boolean;
}

export default function Navbar({ activeTab, setActiveTab, onOpenPresentation, isPresentationActive }: NavbarProps) {
  const [pressureTick, setPressureTick] = useState(6200);
  const [timeStr, setTimeStr] = useState('');

  // Live telemetry pulse
  useEffect(() => {
    const interval = setInterval(() => {
      // Subtle realistic oscillation ±15 bar
      setPressureTick(6200 + Math.floor(Math.sin(Date.now() / 2000) * 18));
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'simulator', label: 'Gemelo Digital & Simulador', icon: Sliders },
    { id: 'head', label: 'Cabezal & Cinemática 5D', icon: Crosshair },
    { id: 'technologies', label: 'Bombas UHP & Arquitecturas', icon: Layers },
    { id: 'defects', label: 'Diagnóstico de Defectos', icon: Flame },
    { id: 'safety', label: 'Seguridad & Ecosistema', icon: ShieldCheck },
    { id: 'academic', label: 'Documento Técnico (11 Pts)', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-xl print:hidden">
      {/* Upper SCADA Telemetry Bar */}
      <div className="bg-[#060911] border-b border-slate-800/80 px-4 py-1.5 text-xs font-mono text-slate-400 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            SCADA LAZO CERRADO • ONLINE
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline">CNC: FLOW DYNAMIC XD KERNEL</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-400">P_UHP: {pressureTick} bar</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-300">V_CHORRO: 1.050 m/s (Mach 3.06)</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-medium">ZAC = 0,00 mm (Cold Cut)</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">{timeStr || '10:00:00'}</span>
          <span className="text-slate-600">|</span>
          <span className="bg-slate-800/80 px-2 py-0.5 rounded text-[11px] text-cyan-300 border border-slate-700">
            UTN FRP - TUM VIALE
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand / Institution Info */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('simulator')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
            <Activity className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                AWJ 4.0 <span className="text-cyan-400 font-mono text-sm font-semibold">CYBER-PHYSICAL</span>
              </h1>
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider font-semibold">
                Nivel Universitario
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span className="text-cyan-300 font-medium">Diego Francisconi & Ariel Martinez</span>
              <span>•</span>
              <span className="text-slate-300 font-medium">Mecatrónica UTN Paraná</span>
              <span>•</span>
              <span className="text-amber-400/90 font-mono">10/11/2026</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 max-w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Button: Presentation Mode */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPresentation}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition shadow-md ${
              isPresentationActive
                ? 'bg-amber-500 text-slate-950 shadow-amber-500/30 animate-pulse'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold shadow-cyan-500/25'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>{isPresentationActive ? 'Modo Defensa: ACTIVO' : 'Modo Defensa (15-20 min)'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
