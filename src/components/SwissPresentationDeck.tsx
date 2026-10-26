import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Layers,
  Sliders,
  Crosshair,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  FileText,
  Clock,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Box,
  Eye,
  X
} from 'lucide-react';
import SplineScene from './SplineScene';
import WaterjetHead3D from './WaterjetHead3D';

interface SwissPresentationDeckProps {
  onOpenTechnicalAnnex?: (tabId: string) => void;
}

export default function SwissPresentationDeck({ onOpenTechnicalAnnex }: SwissPresentationDeckProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const totalSlides = 11;

  // 15-20 min defense timer
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  // 3D Spline integration on Title Slide
  const [showCover3D, setShowCover3D] = useState<boolean>(false);

  // Real cutting photography inspection modal state
  const [previewImage, setPreviewImage] = useState<{
    src: string;
    title: string;
    subtitle: string;
    badge: string;
    specs: { label: string; value: string }[];
  } | null>(null);

  // Slide 2 (Slide ID 3) view mode toggle: Infographic vs 3-Column Cards
  const [slide2ViewMode, setSlide2ViewMode] = useState<'infographic' | 'cards'>('infographic');

  // Slide 6 interactive taper compensation toggle
  const [isTaperCompActive, setIsTaperCompActive] = useState<boolean>(true);
  // Slide 8 interactive quality selection
  const [selectedQuality, setSelectedQuality] = useState<number>(3);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerBadgeStyle = () => {
    if (timerSeconds < 15 * 60) return 'text-slate-700 bg-slate-100 border-slate-300';
    if (timerSeconds <= 18 * 60) return 'text-amber-700 bg-amber-50 border-amber-300 font-bold';
    return 'text-rose-700 bg-rose-50 border-rose-300 font-bold animate-pulse';
  };

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(totalSlides);
      } else if (e.key === 'Escape') {
        setShowDrawer(false);
        setPreviewImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, totalSlides]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => { });
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Precision Top Presenter Bar (Ultra-clean Swiss Layout) */}
      <header className="h-14 border-b border-[#E2E8F0] bg-white px-6 flex items-center justify-between text-xs z-30 sticky top-0 shadow-swiss">
        {/* Left: Academic Badge */}
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#EA580C] rounded-sm" />
          <span className="font-semibold tracking-tight text-[#0F172A] text-sm">
            AWJ 4.0 • UTN FRP
          </span>
          <span className="text-[#94A3B8] hidden sm:inline">|</span>
          <span className="text-[#64748B] hidden sm:inline font-medium">
            Mecatrónica Viale
          </span>
          <span className="bg-[#F1F5F9] text-[#475569] font-mono px-2 py-0.5 rounded text-[11px] font-semibold">
            Diego Francisconi & Ariel Martinez
          </span>
        </div>

        {/* Center: Slide Navigator & Progress */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDrawer(!showDrawer)}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#F8F9FA] hover:bg-[#F1F5F9] border border-[#E2E8F0] font-mono text-[12px] font-semibold text-[#0F172A] transition-colors"
            title="Ver índice de diapositivas"
          >
            <span>Diapositiva</span>
            <span className="text-[#EA580C] font-bold">{currentSlide}</span>
            <span className="text-[#94A3B8]">/</span>
            <span>{totalSlides}</span>
          </button>
        </div>

        {/* Right: Defense Timer & Tools */}
        <div className="flex items-center gap-3">
          {/* Defense Timer (15-20 min target) */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded border font-mono text-[12px] ${getTimerBadgeStyle()}`}>
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(timerSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="ml-1 p-0.5 hover:text-[#EA580C] transition-colors"
              title={isTimerRunning ? "Pausar cronómetro" : "Iniciar cronómetro"}
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button
              onClick={() => { setIsTimerRunning(false); setTimerSeconds(0); }}
              className="p-0.5 hover:text-[#EA580C] transition-colors"
              title="Reiniciar cronómetro"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Technical Annex Trigger */}
          {onOpenTechnicalAnnex && (
            <button
              onClick={() => onOpenTechnicalAnnex('simulator')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] font-medium border border-[#CBD5E1] transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Anexo Técnico</span>
            </button>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
            title="Pantalla Completa (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Slide Index Drawer Overlay */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/40 backdrop-blur-sm flex justify-center items-start pt-16 px-4">
          <div className="bg-white rounded-xl shadow-swiss-lg border border-[#E2E8F0] p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-[#E2E8F0]">
              <h3 className="text-base font-bold text-[#0F172A]">Índice de la Defensa Técnica (11 Slides)</h3>
              <button
                onClick={() => setShowDrawer(false)}
                className="text-xs font-mono text-[#64748B] hover:text-[#0F172A] px-2 py-1 rounded bg-[#F1F5F9]"
              >
                Cerrar [ESC]
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs font-medium">
              {[
                { id: 1, title: '01. Portada Institucional UTN FRP', type: 'Dark Canvas' },
                { id: 2, title: '02. Principio Físico y Métricas UHP', type: 'Layout A (Big Metrics)' },
                { id: 3, title: '03. Génesis: Chorro Puro (PWJ) vs Abrasivo (AWJ)', type: 'Layout B (3 Columns)' },
                { id: 4, title: '04. Cabezal de Corte & Efecto Venturi', type: 'Layout C (Graphic/Metric Split)' },
                { id: 5, title: '05. Cadena de Transformación Hidráulica', type: 'Layout D (Timeline)' },
                { id: 6, title: '06. Comparativa Técnica vs Láser y Plasma', type: 'Layout B (3 Columns)' },
                { id: 7, title: '07. Cinemática Activa y Conicidad θ = 0°', type: 'Layout A (Big Metric + 5 Ejes)' },
                { id: 8, title: '08. Espectro de Materiales Industriales', type: 'Layout B (3 Columns)' },
                { id: 9, title: '09. Calidades Q1-Q5 y Defectología', type: 'Layout C (Graphic/Metric Split)' },
                { id: 10, title: '10. Industria 4.0 & Ecosistema Ciberfísico', type: 'Layout D (Timeline)' },
                { id: 11, title: '11. Conclusiones y Preguntas Tribunal', type: 'Dark Canvas' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentSlide(s.id);
                    setShowDrawer(false);
                  }}
                  className={`text-left p-2.5 rounded-lg border transition-all ${currentSlide === s.id
                    ? 'border-[#EA580C] bg-[#FFF7ED] text-[#EA580C] font-bold'
                    : 'border-[#E2E8F0] hover:bg-[#F8F9FA] text-[#334155]'
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{s.title}</span>
                    <span className="text-[10px] text-[#94A3B8] font-mono">{s.type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Slide Presentation Stage (16:9 projection friendly) */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative">
        <div className="w-full max-w-6xl min-h-[580px] lg:min-h-[640px] flex flex-col justify-between transition-all duration-300">

          {/* ========================================================================= */}
          {/* SLIDE 1: [DARK CANVAS #1] Portada Institucional UTN FRP                  */}
          {/* ========================================================================= */}
          {currentSlide === 1 && (
            <div className="h-full w-full rounded-2xl bg-[#0F172A] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between shadow-swiss-lg border border-slate-800 relative overflow-hidden">
              {/* Subtle Swiss precision grid lines */}
              <div className="absolute inset-0 bg-technical-grid opacity-10 pointer-events-none" />

              {/* Top: Institutional Header */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <span className="text-xs font-mono font-semibold tracking-wider text-[#EA580C] uppercase block">
                    Universidad Tecnológica Nacional • Facultad Regional Paraná
                  </span>
                  <span className="text-sm font-medium text-slate-400 block mt-0.5">
                    Extensión Áulica Viale • Tecnicatura Universitaria en Mecatrónica
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <button
                    onClick={() => setShowCover3D(!showCover3D)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[#EA580C] border border-[#EA580C]/40 text-xs font-mono font-semibold transition"
                    title="Alternar modelo 3D del cabezal de corte AWJ"
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>{showCover3D ? "Vista Tipográfica" : "Cabezal 3D Interactivo"}</span>
                  </button>
                  <span className="bg-slate-800 px-3 py-1 rounded text-slate-300">
                    Defensa: 10/11/2026
                  </span>
                  <span className="bg-[#EA580C]/20 text-[#EA580C] border border-[#EA580C]/40 px-3 py-1 rounded font-semibold">
                    15–20 Min
                  </span>
                </div>
              </div>

              {/* Center: Hero Title & Fragment (with optional 3D Spline Scene) */}
              {showCover3D ? (
                <div className="relative z-10 my-auto py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-3">
                    <div className="inline-block bg-slate-800/80 px-3 py-1 rounded text-xs font-mono font-semibold text-[#EA580C] tracking-wide">
                      PROYECTO FINAL INTEGRADOR DE MECATRÓNICA
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] font-display">
                      Corte por Chorro de Agua Abrasivo <span className="text-[#EA580C]">(AWJ 4.0)</span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                      <strong className="text-white font-semibold">Manufactura en Frío:</strong> Separación mecánica micrométrica mediante energía hidráulica e integración ciberfísica.
                    </p>
                  </div>
                  <div className="lg:col-span-5 h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl relative">
                    <WaterjetHead3D theme="dark" showControls={true} />
                  </div>
                </div>
              ) : (
                <div className="relative z-10 my-auto py-6 space-y-4 max-w-4xl">
                  <div className="inline-block bg-slate-800/80 px-3 py-1 rounded text-xs font-mono font-semibold text-[#EA580C] tracking-wide">
                    PROYECTO FINAL INTEGRADOR DE MECATRÓNICA
                  </div>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-display">
                    Corte por Chorro de Agua Abrasivo <span className="text-[#EA580C]">(AWJ 4.0)</span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-slate-300 font-normal leading-relaxed max-w-3xl">
                    <strong className="text-white font-semibold">Manufactura en Frío:</strong> Separación mecánica micrométrica mediante energía hidráulica e integración ciberfísica.
                  </p>
                </div>
              )}

              {/* Bottom: Team & Core Physical Takeaways */}
              <div className="relative z-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 block font-semibold">
                    Equipo Expositor
                  </span>
                  <div className="text-base sm:text-lg font-bold text-white mt-1 flex items-center gap-3">
                    <span className="text-slate-100">Diego Francisconi</span>
                    <span className="text-[#EA580C]">&</span>
                    <span className="text-slate-100">Ariel Martinez</span>
                  </div>
                </div>

                {/* 3 Non-negotiable physical metric highlights */}
                <div className="flex items-center gap-6 font-mono text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Zona Afectada Calor</span>
                    <span className="text-lg sm:text-xl font-bold text-[#EA580C]">ZAC = 0,00 mm</span>
                  </div>
                  <div className="w-px h-8 bg-slate-800" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Presión UHP</span>
                    <span className="text-lg sm:text-xl font-bold text-white">6.480 bar</span>
                  </div>
                  <div className="w-px h-8 bg-slate-800" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Velocidad</span>
                    <span className="text-lg sm:text-xl font-bold text-white">Mach 3.06</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 2: [LIGHT] Layout A: Big Metric Callouts — Principio Físico         */}
          {/* ========================================================================= */}
          {currentSlide === 2 && (
            <div className="h-full w-full rounded-2xl bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between shadow-swiss-card border border-[#E2E8F0]">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-[#E2E8F0] pb-4">
                <div>
                  <span className="text-xs font-mono font-bold tracking-wider text-[#EA580C] uppercase">
                    01 • Principio Físico y Fenomenología
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-1 font-display">
                    Erosión Mecánica Supersónica Sin Aporte Térmico
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded">
                  Expositor: Diego
                </span>
              </div>

              {/* Big Metric Callouts (Layout A) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-4">
                {/* Metric 1 */}
                <div className="p-6 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-2">
                  <span className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-wider block">
                    Presión Hidráulica UHP
                  </span>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#EA580C] font-mono tracking-tight">
                    6.480 <span className="text-xl sm:text-2xl font-bold text-[#64748B]">bar</span>
                  </div>
                  <p className="text-base text-[#1E293B] font-medium pt-2">
                    <strong className="text-[#0F172A]">Energía Extrema:</strong> 1.800 veces la presión de una manguera domiciliaria (94.000 PSI).
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="p-6 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-2">
                  <span className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-wider block">
                    Velocidad del Chorro
                  </span>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] font-mono tracking-tight">
                    1.050 <span className="text-xl sm:text-2xl font-bold text-[#64748B]">m/s</span>
                  </div>
                  <p className="text-base text-[#1E293B] font-medium pt-2">
                    <strong className="text-[#0F172A]">Régimen Supersónico:</strong> Aceleración a Mach 3.06 al salir del orificio de joya.
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="p-6 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-2">
                  <span className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-wider block">
                    Zona Térmicamente Afectada
                  </span>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] font-mono tracking-tight">
                    0,00 <span className="text-xl sm:text-2xl font-bold text-[#64748B]">mm</span>
                  </div>
                  <p className="text-base text-[#1E293B] font-medium pt-2">
                    <strong className="text-[#0F172A]">Corte en Frío:</strong> Cero tensiones térmicas, deformación ni borde templado.
                  </p>
                </div>
              </div>

              {/* Bottom Takeaway Fragment with Real Photo Preview Button */}
              <div className="p-4 rounded-xl bg-[#FFF7ED] border border-[#FDBA74] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="text-sm text-[#9A3412] font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EA580C] shrink-0" />
                  <span>
                    <strong className="font-bold text-[#0F172A]">Mecanismo Dual:</strong> Micro-corte por cizalladura en metales dúctiles y micro-fractura en materiales frágiles.
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-[#EA580C] font-bold hidden md:inline">
                    Barton Garnet Malla 80 • 1,1 M part/s
                  </span>
                  <button
                    onClick={() => setPreviewImage({
                      src: '/images/awj_metal_cutting.jpg',
                      title: 'Operación Real AWJ: Placa de Acero Inoxidable 80 mm',
                      subtitle: 'Registro fotográfico de celda industrial con chorro supersónico Mach 3',
                      badge: 'Fotografía Industrial Real',
                      specs: [
                        { label: 'Espesor Macizo', value: '80 mm Acero Inoxidable' },
                        { label: 'Presión Hidráulica', value: '6.480 bar (94.000 PSI)' },
                        { label: 'Velocidad Chorro', value: '1.050 m/s (Mach 3.06)' },
                        { label: 'Temperatura Pieza', value: 'Ambiente (ZAC = 0,00 mm)' }
                      ]
                    })}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#EA580C] text-[#EA580C] hover:bg-[#EA580C] hover:text-white transition-colors text-xs font-mono font-bold shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Registro Real</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 3: [LIGHT] Layout B: 3-Column Feature Cards — PWJ vs AWJ 4.0        */}
          {/* ========================================================================= */}
          {currentSlide === 3 && (
            <div className="h-full w-full rounded-2xl bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between shadow-swiss-card border border-[#E2E8F0]">
              {/* Header with View Switcher */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#E2E8F0] pb-4 gap-3">
                <div>
                  <span className="text-xs font-mono font-bold tracking-wider text-[#EA580C] uppercase">
                    02 • Génesis y Evolución Operativa
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight mt-1 font-display">
                    Chorro de Agua Pura (PWJ) vs Chorro Abrasivo (AWJ 4.0)
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {/* View Mode Switcher */}
                  <div className="flex items-center gap-1.5 bg-[#F1F5F9] p-1 rounded-xl border border-[#CBD5E1]">
                    <button
                      onClick={() => setSlide2ViewMode('infographic')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${slide2ViewMode === 'infographic'
                        ? 'bg-[#EA580C] text-white shadow-sm'
                        : 'text-[#475569] hover:text-[#0F172A]'
                        }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Esquema Infográfico</span>
                    </button>
                    <button
                      onClick={() => setSlide2ViewMode('cards')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${slide2ViewMode === 'cards'
                        ? 'bg-[#0F172A] text-white shadow-sm'
                        : 'text-[#475569] hover:text-[#0F172A]'
                        }`}
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Fichas y Métricas</span>
                    </button>
                  </div>

                  <span className="text-xs font-mono text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded hidden lg:inline">
                    Expositor: Diego
                  </span>
                </div>
              </div>

              {/* VIEW 1: HERO INFOGRAPHIC COMPARISON */}
              {slide2ViewMode === 'infographic' ? (
                <div className="my-auto py-2 flex flex-col items-center gap-3">
                  <div
                    onClick={() => setPreviewImage({
                      src: '/images/corte_agua_vs_abrasivo.jpg',
                      title: 'Dos Tipos Principales de Proceso de Corte por Chorro de Agua',
                      subtitle: 'Comparativa de boquilla hidrodinámica, mecanismo de corte y materiales ideales',
                      badge: 'Infografía Oficial de Corte',
                      specs: [
                        { label: 'Corte Agua Pura (PWJ)', value: 'Agua pura a 6.000 bar • Orificio Joya Ø 0,12 mm' },
                        { label: 'Corte Abrasivo (AWJ)', value: 'Agua + Granate Almandino Malla 80 a Mach 3.06' },
                        { label: 'Sustratos PWJ', value: 'Espumas, gomas, textiles, cuero, alimentos, papel' },
                        { label: 'Sustratos AWJ', value: 'Aceros, titanio, vidrio, cerámicas, blindajes macizos' }
                      ]
                    })}
                    className="relative rounded-2xl overflow-hidden border-2 border-[#CBD5E1] shadow-swiss hover:shadow-xl transition-all group cursor-pointer bg-white max-h-[58vh] flex items-center justify-center w-full max-w-5xl"
                  >
                    <img
                      src="/images/corte_agua_vs_abrasivo.jpg"
                      alt="Dos tipos principales de proceso de corte por chorro de agua: Agua Pura vs Con Abrasivo"
                      className="w-full h-auto max-h-[58vh] object-contain group-hover:scale-[1.01] transition-transform duration-300 select-none"
                    />
                    <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center pointer-events-none">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/85 backdrop-blur-sm text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-mono font-bold shadow-xl border border-white/20">
                        <Maximize2 className="w-4 h-4 text-[#EA580C]" />
                        <span>Hacer clic para ampliar en alta resolución [HD]</span>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm border border-[#CBD5E1] px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-[#0F172A] shadow-sm flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#EA580C]" />
                      <span>Zoom Interactivo</span>
                    </div>
                  </div>

                  <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-[#64748B] px-2 gap-2">
                    <span className="flex items-center gap-1.5 text-[#0F172A] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      PWJ: Corte aséptico sin residuo mineral • AWJ: Micro-corte ciberfísico en metales duros (&gt;250 mm)
                    </span>
                    <button
                      onClick={() => setSlide2ViewMode('cards')}
                      className="text-[#EA580C] hover:underline font-bold flex items-center gap-1"
                    >
                      <span>Ver parámetros numéricos detallados</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ) : (
                /* VIEW 2: 3-COLUMN METRIC CARDS */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-4">
                  {/* Column 1: PWJ */}
                  <div className="p-5 sm:p-6 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-3.5 flex flex-col justify-between">
                    <div>
                      <div className="border-b border-[#E2E8F0] pb-2.5 mb-3">
                        <span className="text-xs font-mono font-semibold text-[#64748B] uppercase">Fundamento Hidrodinámico</span>
                        <h3 className="text-xl font-bold text-[#0F172A] mt-0.5">Agua Pura (PWJ)</h3>
                      </div>

                      {/* Real Photo Embed 1: PWJ */}
                      <div
                        onClick={() => setPreviewImage({
                          src: '/images/pwj_pure_waterjet.jpg',
                          title: 'Corte por Chorro de Agua Pura (PWJ)',
                          subtitle: 'Micro-orificio joya a 6.000 bar en celda experimental',
                          badge: 'PWJ Real • Sin Abrasivo',
                          specs: [
                            { label: 'Presión Hidráulica', value: '6.000 bar (87.000 PSI)' },
                            { label: 'Diámetro Chorro', value: 'Ø 0,12 mm' },
                            { label: 'Aporte Térmico', value: 'ZAC = 0,00 mm' },
                            { label: 'Material Cortado', value: 'Polímeros / Goma / Alimentos' }
                          ]
                        })}
                        className="relative rounded-lg overflow-hidden border border-[#CBD5E1] h-28 sm:h-32 mb-3 group cursor-pointer shadow-sm hover:shadow-md transition-all bg-slate-900"
                      >
                        <img
                          src="/images/pwj_pure_waterjet.jpg"
                          alt="Chorro de Agua Pura (PWJ)"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm text-white p-1 rounded">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="absolute bottom-1.5 left-2 text-[10px] font-mono font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded border border-white/20">
                          FOTO REAL • Ø 0,12 mm
                        </span>
                      </div>

                      <div className="space-y-1.5 text-sm text-[#475569]">
                        <div className="flex justify-between font-mono">
                          <span>Orificio Joya:</span>
                          <strong>Ø 0,08 a 0,20 mm</strong>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>Carga Abrasiva:</span>
                          <strong className="text-emerald-700">0,00 kg/min (Cero)</strong>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>Velocidad Avance:</span>
                          <strong>10 a 50 m/min</strong>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>Ancho de Sangría:</span>
                          <strong>0,10 a 0,25 mm</strong>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                      <strong className="text-[#0F172A]">Materiales Blandos:</strong> Asepsia total (alimentos, goma, espumas). El agua pura rebota en metales duros.
                    </p>
                  </div>

                  {/* Column 2: AWJ */}
                  <div className="p-5 sm:p-6 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-3.5 flex flex-col justify-between">
                    <div>
                      <div className="border-b border-[#E2E8F0] pb-2.5 mb-3">
                        <span className="text-xs font-mono font-semibold text-[#64748B] uppercase">Micro-Erosión Supersónica</span>
                        <h3 className="text-xl font-bold text-[#0F172A] mt-0.5">Chorro Abrasivo (AWJ)</h3>
                      </div>

                      {/* Real Photo Embed 2: AWJ */}
                      <div
                        onClick={() => setPreviewImage({
                          src: '/images/awj_metal_cutting.jpg',
                          title: 'Corte Abrasivo Supersónico AWJ 4.0',
                          subtitle: 'Cabezal industrial CNC cortando bloque macizo de acero de 80 mm',
                          badge: 'AWJ Real • Mach 3.06',
                          specs: [
                            { label: 'Presión Hidráulica', value: '6.480 bar (HyperJet)' },
                            { label: 'Velocidad de Impacto', value: '1.050 m/s (Mach 3.06)' },
                            { label: 'Tubo Mezclador', value: 'ROCTEC 500 (Ø 0,76 mm)' },
                            { label: 'Abrasivo', value: 'Granate Almandino Barton Malla 80' }
                          ]
                        })}
                        className="relative rounded-lg overflow-hidden border border-[#CBD5E1] h-28 sm:h-32 mb-3 group cursor-pointer shadow-sm hover:shadow-md transition-all bg-slate-900"
                      >
                        <img
                          src="/images/awj_metal_cutting.jpg"
                          alt="Chorro de Agua Abrasivo (AWJ)"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm text-white p-1 rounded">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="absolute bottom-1.5 left-2 text-[10px] font-mono font-bold text-white bg-[#EA580C] px-2 py-0.5 rounded border border-orange-300/30">
                          FOTO REAL • 80 mm Acero
                        </span>
                      </div>

                      <div className="space-y-1.5 text-sm text-[#475569]">
                        <div className="flex justify-between font-mono">
                          <span>Tubo ROCTEC:</span>
                          <strong>Ø 0,76 a 1,02 mm</strong>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>Flujo Granate:</span>
                          <strong>1,1 M part/s (Malla 80)</strong>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>Espesor Macizo:</span>
                          <strong className="text-emerald-700">&gt;250 mm metales</strong>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>Aporte Térmico:</span>
                          <strong className="text-[#EA580C]">ZAC = 0,00 mm</strong>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                      <strong className="text-[#0F172A]">Salto Cuántico:</strong> El agua acelera al mineral a Mach 3, capaz de cortar aceros, titanio y blindajes.
                    </p>
                  </div>

                  {/* Column 3: Justificación del Proyecto UTN */}
                  <div className="p-5 sm:p-6 rounded-xl bg-[#FFF7ED] border-2 border-[#EA580C] space-y-3.5 shadow-swiss flex flex-col justify-between">
                    <div>
                      <div className="border-b border-[#FDBA74] pb-2.5 mb-3">
                        <span className="text-xs font-mono font-bold text-[#EA580C] uppercase">Justificación Mecatrónica</span>
                        <h3 className="text-xl font-black text-[#0F172A] mt-0.5">¿Por Qué AWJ 4.0?</h3>
                      </div>

                      {/* Interactive Thumbnail trigger for 5-Axis Real Photo */}
                      <div
                        onClick={() => setPreviewImage({
                          src: '/images/awj_5axis_tilt.jpg',
                          title: 'Cabezal Articulado 5 Ejes (Tilt-A-Jet Dynamic XD)',
                          subtitle: 'Compensación mecatrónica activa de conicidad en pieza aeroespacial',
                          badge: 'Reto Mecatrónico UTN',
                          specs: [
                            { label: 'Ejes Cinemáticos', value: 'X, Y, Z, A, C (Interpolados)' },
                            { label: 'Conicidad Lograda', value: 'θ = 0,00° (Cero error)' },
                            { label: 'Control CNC', value: 'Lazo Cerrado IoT / Beckhoff' },
                            { label: 'Nivel Tecnológico', value: 'Industria 4.0 Cyber-Physical' }
                          ]
                        })}
                        className="relative rounded-lg overflow-hidden border border-[#FDBA74] h-28 sm:h-32 mb-3 group cursor-pointer shadow-sm hover:shadow-md transition-all bg-slate-900"
                      >
                        <img
                          src="/images/awj_5axis_tilt.jpg"
                          alt="Cinemática 5 Ejes AWJ"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm text-white p-1 rounded">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="absolute bottom-1.5 left-2 text-[10px] font-mono font-bold text-white bg-black/80 px-2 py-0.5 rounded border border-orange-400/40">
                          RETO: CABEZAL 5 EJES
                        </span>
                      </div>

                      <div className="space-y-1.5 text-sm text-[#9A3412]">
                        <div className="flex justify-between font-mono">
                          <span className="text-[#0F172A]">Herencia Total:</span>
                          <strong className="text-[#0F172A]">AWJ contiene al PWJ</strong>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span className="text-[#0F172A]">Reto 5 Ejes:</span>
                          <strong className="text-[#EA580C]">Conicidad θ = 0,00°</strong>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span className="text-[#0F172A]">Industria Real:</span>
                          <strong className="text-[#0F172A]">Sector Metalmecánico</strong>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span className="text-[#0F172A]">Ecosistema 4.0:</span>
                          <strong className="text-[#0F172A]">IoT y Lazo Cerrado</strong>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-[#9A3412] pt-2 border-t border-[#FDBA74] font-medium">
                      <strong className="text-[#0F172A]">Defensa ante Tribunal:</strong> Partimos del principio del PWJ, pero el AWJ 4.0 es el estado del arte exigido en mecatrónica.
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Takeaway */}
              <div className="p-3 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0] text-xs font-mono text-[#0F172A] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span>Versatilidad de Celda: Una máquina AWJ 4.0 corta juntas en modo PWJ o placas de blindaje en modo AWJ sin cambiar de mesa.</span>
                <span className="text-[#EA580C] font-bold">Dualidad Operativa 100% Funcional</span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 4: [LIGHT] Layout C: Graphic & Metric Split — Cabezal AWJ & Venturi */}
          {/* ========================================================================= */}
          {currentSlide === 4 && (
            <div className="h-full w-full rounded-2xl bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between shadow-swiss-card border border-[#E2E8F0]">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-[#E2E8F0] pb-4">
                <div>
                  <span className="text-xs font-mono font-bold tracking-wider text-[#EA580C] uppercase">
                    03 • Arquitectura Hidrodinámica
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-1 font-display">
                    Cabezal de Corte AWJ y Efecto Venturi
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded">
                  Expositor: Diego
                </span>
              </div>

              {/* Graphic & Metric Split (Layout C) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-4 items-center">
                {/* Left Side: Technical Schematic Drawing */}
                <div className="lg:col-span-7 bg-[#F8F9FA] rounded-xl border border-[#E2E8F0] p-6 flex flex-col items-center justify-center relative">
                  <div className="w-full max-w-md space-y-3 font-mono text-xs">
                    {/* Step 1: Inlet */}
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#E2E8F0] shadow-swiss">
                      <div className="w-8 h-8 rounded bg-[#0F172A] text-white flex items-center justify-center font-bold text-xs">
                        1
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-[#0F172A] block">Entrada UHP (Tubo Autofretado)</span>
                        <span className="text-[11px] text-[#64748B]">Agua desmineralizada a 6.480 bar</span>
                      </div>
                      <span className="font-mono text-[#EA580C] font-bold text-xs">P_UHP</span>
                    </div>

                    {/* Step 2: Jewel Orifice */}
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#E2E8F0] shadow-swiss">
                      <div className="w-8 h-8 rounded bg-[#EA580C] text-white flex items-center justify-center font-bold text-xs">
                        2
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-[#0F172A] block">Orificio de Diamante Sintético</span>
                        <span className="text-[11px] text-[#64748B]">Transforma presión en chorro Mach 3.06</span>
                      </div>
                      <span className="font-mono text-[#0F172A] font-bold text-xs">Ø 0,25 mm</span>
                    </div>

                    {/* Step 3: Venturi Chamber */}
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#E2E8F0] shadow-swiss">
                      <div className="w-8 h-8 rounded bg-[#334155] text-white flex items-center justify-center font-bold text-xs">
                        3
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-[#0F172A] block">Cámara Venturi & Vacío Inducido</span>
                        <span className="text-[11px] text-[#64748B]">Succión de granate almandino Malla 80</span>
                      </div>
                      <span className="font-mono text-[#0F172A] font-bold text-xs">-0,85 bar</span>
                    </div>

                    {/* Step 4: ROCTEC Mixing Tube */}
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#E2E8F0] shadow-swiss">
                      <div className="w-8 h-8 rounded bg-[#EA580C] text-white flex items-center justify-center font-bold text-xs">
                        4
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-[#0F172A] block">Tubo Mezclador ROCTEC</span>
                        <span className="text-[11px] text-[#64748B]">Colima el haz abrasivo sobre la pieza</span>
                      </div>
                      <span className="font-mono text-[#0F172A] font-bold text-xs">Ø 0,76 mm</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: 3 Key High-Impact Metric Cards */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0]">
                    <span className="text-xs font-mono font-bold text-[#EA580C] uppercase block">
                      Vida Útil del Orificio
                    </span>
                    <span className="text-2xl font-black text-[#0F172A] font-mono block mt-1">
                      &gt;1.000 horas
                    </span>
                    <p className="text-sm text-[#475569] mt-1">
                      <strong className="text-[#0F172A]">Diamante vs Zafiro:</strong> 25x mayor durabilidad sin distorsión del perfil de corte.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0]">
                    <span className="text-xs font-mono font-bold text-[#EA580C] uppercase block">
                      Vacío Depresor Venturi
                    </span>
                    <span className="text-2xl font-black text-[#0F172A] font-mono block mt-1">
                      -0,85 a -0,95 bar
                    </span>
                    <p className="text-sm text-[#475569] mt-1">
                      <strong className="text-[#0F172A]">Arrastre Pasivo:</strong> Succión continua de abrasivo sin componentes mecánicos en movimiento.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FFF7ED] border border-[#FDBA74]">
                    <span className="text-xs font-mono font-bold text-[#EA580C] uppercase block">
                      Distancia de Trabajo de la Boquilla
                    </span>
                    <span className="text-2xl font-black text-[#EA580C] font-mono block mt-1">
                      1,5 mm constante
                    </span>
                    <p className="text-sm text-[#9A3412] mt-1">
                      Regulada en lazo cerrado por sensor de terreno capacitivo para evitar ensanchamiento de sangría.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="text-xs font-mono text-[#64748B] flex justify-between items-center border-t border-[#E2E8F0] pt-3">
                <span>Concentración típica: 10% abrasivo en masa por volumen de agua</span>
                <span className="text-[#EA580C] font-bold">Ancho de sangría: 0,80 a 1,10 mm</span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 5: [LIGHT] Layout D: Horizontal Process Timeline — Cadena UHP       */}
          {/* ========================================================================= */}
          {currentSlide === 5 && (
            <div className="h-full w-full rounded-2xl bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between shadow-swiss-card border border-[#E2E8F0]">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-[#E2E8F0] pb-4">
                <div>
                  <span className="text-xs font-mono font-bold tracking-wider text-[#EA580C] uppercase">
                    04 • Cinemática y Cadena Hidrodinámica
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-1 font-display">
                    Cadena de Transformación Energética
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded">
                  Expositor: Diego
                </span>
              </div>

              {/* Horizontal Process Timeline (Layout D) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-auto py-6">
                {/* Step 1 */}
                <div className="p-5 rounded-xl bg-[#F8F9FA] border-t-4 border-[#0F172A] border-x border-b border-[#E2E8F0] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#64748B] block">FASE 01</span>
                    <h3 className="text-lg font-bold text-[#0F172A] mt-1">Presurización</h3>
                    <div className="text-2xl font-black text-[#0F172A] font-mono mt-2">
                      6.480 bar
                    </div>
                  </div>
                  <p className="text-sm text-[#475569] mt-4">
                    <strong className="text-[#0F172A]">Bomba UHP:</strong> Intensificador electrohidráulico con acumulador atenuador de pulsos.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-xl bg-[#F8F9FA] border-t-4 border-[#EA580C] border-x border-b border-[#E2E8F0] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#EA580C] block">FASE 02</span>
                    <h3 className="text-lg font-bold text-[#0F172A] mt-1">Aceleración</h3>
                    <div className="text-2xl font-black text-[#EA580C] font-mono mt-2">
                      Mach 3.06
                    </div>
                  </div>
                  <p className="text-sm text-[#475569] mt-4">
                    <strong className="text-[#0F172A]">Joya Primaria:</strong> Orificio de diamante convierte energía de presión en velocidad pura.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-xl bg-[#F8F9FA] border-t-4 border-[#0F172A] border-x border-b border-[#E2E8F0] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#64748B] block">FASE 03</span>
                    <h3 className="text-lg font-bold text-[#0F172A] mt-1">Mezcla Abrasiva</h3>
                    <div className="text-2xl font-black text-[#0F172A] font-mono mt-2">
                      1,1 M part/s
                    </div>
                  </div>
                  <p className="text-sm text-[#475569] mt-4">
                    <strong className="text-[#0F172A]">Efecto Venturi:</strong> Incorporación de granate mineral y colimación en tubo ROCTEC.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-5 rounded-xl bg-[#FFF7ED] border-t-4 border-[#EA580C] border-x border-b border-[#FDBA74] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#EA580C] block">FASE 04</span>
                    <h3 className="text-lg font-bold text-[#9A3412] mt-1">Corte en Frío</h3>
                    <div className="text-2xl font-black text-[#EA580C] font-mono mt-2">
                      ZAC = 0,00
                    </div>
                  </div>
                  <p className="text-sm text-[#9A3412] mt-4">
                    <strong className="text-[#0F172A]">Micro-Erosión:</strong> Cizalladura mecánica sin alteración metalúrgica de la pieza.
                  </p>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="p-4 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-xs font-mono text-[#334155]">
                  Potencia Hidráulica Teórica: <strong>P_hid = P × Q ≈ 13,3 kW</strong> (con motor de 37 kW a 60% de rendimiento)
                </span>
                <span className="text-xs font-mono font-bold text-[#EA580C]">
                  Consumo de Granate: 0,35 a 0,55 kg/min
                </span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 6: [LIGHT] Layout B: 3-Column Feature Cards — AWJ vs Térmicos       */}
          {/* ========================================================================= */}
          {currentSlide === 6 && (
            <div className="h-full w-full rounded-2xl bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between shadow-swiss-card border border-[#E2E8F0]">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-[#E2E8F0] pb-4">
                <div>
                  <span className="text-xs font-mono font-bold tracking-wider text-[#EA580C] uppercase">
                    05 • Análisis Comparativo de Tecnologías
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-1 font-display">
                    Chorro de Agua vs Procesos Térmicos
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded">
                  Expositor: Ariel
                </span>
              </div>

              {/* 3-Column Feature Cards (Layout B) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-4">
                {/* Column 1: Plasma */}
                <div className="p-6 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-4">
                  <div className="border-b border-[#E2E8F0] pb-3">
                    <span className="text-xs font-mono font-semibold text-[#64748B] uppercase">Térmico Convencional</span>
                    <h3 className="text-xl font-bold text-[#0F172A] mt-0.5">Plasma de Alta Definición</h3>
                  </div>
                  <div className="space-y-2 text-sm text-[#475569]">
                    <div className="flex justify-between font-mono">
                      <span>ZAC Térmica:</span>
                      <strong className="text-rose-600">2,0 a 5,0 mm</strong>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Tolerancia:</span>
                      <strong>±0,8 a ±1,5 mm</strong>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Borde Templado:</span>
                      <strong className="text-rose-600">Severo (Martensita)</strong>
                    </div>
                  </div>
                  <p className="text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                    Requiere amolado previo y rompe herramientas en mecanizado posterior.
                  </p>
                </div>

                {/* Column 2: Laser */}
                <div className="p-6 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-4">
                  <div className="border-b border-[#E2E8F0] pb-3">
                    <span className="text-xs font-mono font-semibold text-[#64748B] uppercase">Fotónico Concentrado</span>
                    <h3 className="text-xl font-bold text-[#0F172A] mt-0.5">Láser Fibra Óptica</h3>
                  </div>
                  <div className="space-y-2 text-sm text-[#475569]">
                    <div className="flex justify-between font-mono">
                      <span>ZAC Térmica:</span>
                      <strong className="text-amber-600">0,3 a 1,2 mm</strong>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Tolerancia:</span>
                      <strong>±0,08 mm</strong>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Espesor Límite:</span>
                      <strong className="text-amber-600">&lt;25 mm en aceros</strong>
                    </div>
                  </div>
                  <p className="text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                    Inviable en metales reflectivos (cobre/aluminio) por riesgo de retro-reflexión a la fibra.
                  </p>
                </div>

                {/* Column 3: AWJ 4.0 (Featured with Industrial Orange) */}
                <div className="p-6 rounded-xl bg-[#FFF7ED] border-2 border-[#EA580C] space-y-4 shadow-swiss">
                  <div className="border-b border-[#FDBA74] pb-3">
                    <span className="text-xs font-mono font-bold text-[#EA580C] uppercase">Cinético Ciberfísico</span>
                    <h3 className="text-xl font-black text-[#0F172A] mt-0.5">Chorro de Agua (AWJ 4.0)</h3>
                  </div>
                  <div className="space-y-2 text-sm text-[#9A3412]">
                    <div className="flex justify-between font-mono">
                      <span className="text-[#0F172A]">ZAC Térmica:</span>
                      <strong className="text-[#EA580C] text-base">ZAC = 0,00 mm</strong>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="text-[#0F172A]">Tolerancia:</span>
                      <strong className="text-[#0F172A]">±0,05 mm</strong>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="text-[#0F172A]">Espesor Límite:</span>
                      <strong className="text-[#0F172A]">&gt;250 mm macizo</strong>
                    </div>
                  </div>
                  <p className="text-xs text-[#9A3412] pt-2 border-t border-[#FDBA74] font-medium">
                    Cero microfisuras, sin rebaba fundida y apto para cualquier aleación metálica o composite.
                  </p>
                </div>
              </div>

              {/* Metallurgical Macro-Evidence Banner */}
              <div
                onClick={() => setPreviewImage({
                  src: '/images/waterjet_zac_metallurgy.jpg',
                  title: 'Evidencia Metalográfica: ZAC 0,00 mm vs Corte Térmico',
                  subtitle: 'Ensayo macroscópico y microscopía óptica de bordes de corte en placa de acero 25 mm',
                  badge: 'Ensayo Metalúrgico UTN',
                  specs: [
                    { label: 'Corte AWJ (Chorro)', value: 'ZAC = 0,00 mm • Microestructura intacta' },
                    { label: 'Corte Térmico (Plasma)', value: 'ZAC > 3,5 mm • Fusión y microfisuras' },
                    { label: 'Rugosidad Superficial', value: 'Ra 1,6 µm (AWJ Q5) vs Ra 12,5 µm' },
                    { label: 'Tensiones Residuales', value: 'Nulas en AWJ (Propiedades intactas)' }
                  ]
                })}
                className="p-3 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] flex flex-col sm:flex-row items-center gap-3.5 cursor-pointer hover:border-[#EA580C] hover:bg-white transition-all group shadow-sm"
              >
                <div className="w-full sm:w-44 h-16 rounded-lg overflow-hidden border border-[#E2E8F0] relative shrink-0 bg-slate-900">
                  <img src="/images/waterjet_zac_metallurgy.jpg" alt="Ensayo Metalográfico ZAC" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute bottom-1 left-1 text-[9px] font-mono bg-black/80 text-white px-1.5 py-0.5 rounded font-bold">
                    PROBETA ZAC REAL
                  </span>
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#EA580C] uppercase text-[11px]">Evidencia Experimental en Laboratorio:</span>
                    <span className="bg-emerald-100 text-emerald-800 font-mono text-[10px] px-1.5 py-0.2 rounded font-bold">ZAC = 0,00 mm</span>
                  </div>
                  <p className="text-[#334155] mt-0.5 leading-snug">
                    Micrografía óptica de probeta: El AWJ preserva el 100% de la red de granos sin descarburación periférica ni martensita templada (defensa académica ante tribunal).
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-1 text-xs font-mono font-bold text-[#EA580C] group-hover:translate-x-1 transition-transform">
                  <span>Inspeccionar Ensayo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom Takeaway */}
              <div className="p-3 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0] text-xs font-mono text-[#0F172A] flex justify-between items-center">
                <span>Criterio Técnico: Si el costo de la alteración térmica supera el costo operativo del granate → <strong>AWJ es insustituible</strong>.</span>
                <span className="text-[#EA580C] font-bold">Sin cambio de fase metalúrgica</span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 7: [LIGHT] Layout A: Big Metric & Cinemática — Compensación 5 Ejes  */}
          {/* ========================================================================= */}
          {currentSlide === 7 && (
            <div className="h-full w-full rounded-2xl bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between shadow-swiss-card border border-[#E2E8F0]">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-[#E2E8F0] pb-4">
                <div>
                  <span className="text-xs font-mono font-bold tracking-wider text-[#EA580C] uppercase">
                    06 • Cinemática Multieje y Control CNC
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-1 font-display">
                    Compensación Activa de Conicidad en 5 Ejes
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded">
                  Expositor: Ariel
                </span>
              </div>

              {/* Big Metric + Interactive Kinematics Display (Layout A) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-4 items-center">
                {/* Big Metric Callout */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-6 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0]">
                    <span className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-wider block">
                      Conicidad Residual en Pieza
                    </span>
                    <div className="text-5xl sm:text-6xl font-black text-[#EA580C] font-mono tracking-tight mt-1">
                      θ = 0,00°
                    </div>
                    <p className="text-base text-[#1E293B] font-medium pt-3">
                      <strong className="text-[#0F172A]">Paredes 100% Perpendiculares:</strong> El cabezal articulado absorbe la conicidad natural y la desvía hacia el material de descarte (chatarra).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FFF7ED] border border-[#FDBA74]">
                    <span className="text-xs font-mono font-bold text-[#EA580C] uppercase block">
                      Inclinación Articulada en Ejes A y C
                    </span>
                    <div className="text-2xl font-black text-[#0F172A] font-mono mt-0.5">
                      ±60° de Articulación
                    </div>
                    <p className="text-xs text-[#9A3412] mt-1">
                      Permite biseles para soldadura (V, Y, K) en la misma operación sin reposicionar la chapa.
                    </p>
                  </div>
                </div>

                {/* Right: Interactive Cinemática Comparison */}
                <div className="lg:col-span-7 bg-[#F8F9FA] rounded-xl border border-[#E2E8F0] p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
                    <span className="text-xs font-mono font-bold text-[#0F172A] uppercase">
                      Demostración Cinemática en Tiempo Real
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsTaperCompActive(false)}
                        className={`px-3 py-1 text-xs font-mono rounded transition-colors ${!isTaperCompActive
                          ? 'bg-[#0F172A] text-white font-bold'
                          : 'bg-white border text-[#64748B] hover:text-[#0F172A]'
                          }`}
                      >
                        Corte 2D Fijo
                      </button>
                      <button
                        onClick={() => setIsTaperCompActive(true)}
                        className={`px-3 py-1 text-xs font-mono rounded transition-colors ${isTaperCompActive
                          ? 'bg-[#EA580C] text-white font-bold'
                          : 'bg-white border text-[#64748B] hover:text-[#0F172A]'
                          }`}
                      >
                        5 Ejes Activo (θ = 0°)
                      </button>
                    </div>
                  </div>

                  {/* Visual Simulation Representation */}
                  <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] flex flex-col justify-center text-center space-y-3">
                    {isTaperCompActive ? (
                      <div className="space-y-3">
                        <div
                          onClick={() => setPreviewImage({
                            src: '/images/awj_5axis_tilt.jpg',
                            title: 'Cabezal Articulado 5 Ejes (Tilt-A-Jet Dynamic XD)',
                            subtitle: 'Articulación mecatrónica activa para anular la conicidad y el arrastre de estela',
                            badge: 'Cinemática 5 Ejes en Vivo',
                            specs: [
                              { label: 'Ejes Articulados', value: 'X, Y, Z + A (inclinación) y C (rotación)' },
                              { label: 'Rango Inclinación', value: 'Hasta ±60° en dinámica continua' },
                              { label: 'Conicidad θ', value: '0,00° (Paredes 100% perpendiculares)' },
                              { label: 'Control CNC', value: 'Interpolación cinemática continua' }
                            ]
                          })}
                          className="relative rounded-lg overflow-hidden border border-[#CBD5E1] h-44 group cursor-pointer shadow-sm hover:shadow-md transition-all bg-slate-900"
                        >
                          <img
                            src="/images/awj_5axis_tilt.jpg"
                            alt="Cabezal 5 Ejes en Acción"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end text-white text-left">
                            <div>
                              <span className="text-[10px] font-mono font-bold bg-[#EA580C] px-2 py-0.5 rounded inline-block mb-1">
                                OMAX TILT-A-JET DYNAMIC XD • REGISTRO REAL
                              </span>
                              <p className="text-xs font-medium drop-shadow-sm">Cabezal 5 ejes inclinándose para anular la conicidad natural en pieza aeroespacial.</p>
                            </div>
                            <span className="text-xs font-mono font-bold text-emerald-400 bg-black/70 px-2 py-0.5 rounded border border-emerald-400/30 shrink-0">
                              θ = 0,00°
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 bg-[#F8F9FA] p-2.5 rounded-lg border border-[#E2E8F0] text-xs">
                          <div className="inline-flex items-center gap-1.5 text-emerald-800 font-mono font-bold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>COMPENSACIÓN DINÁMICA ACTIVADA</span>
                          </div>
                          <span className="font-mono text-[#EA580C] font-bold">
                            Conicidad = 0,00° • Arista 90° exacta
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 py-6">
                        <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-800 border border-rose-300 px-3 py-1 rounded text-xs font-mono font-bold">
                          CONICIDAD NATURAL EN "V" (CORTE 2D CONVENCIONAL)
                        </div>
                        <p className="text-sm text-[#64748B] max-w-md mx-auto">
                          Al perder energía cinética en el fondo de la sangría, el chorro se ensancha produciendo un desvío de 1° a 3° en la pared útil.
                        </p>
                        <div className="font-mono text-xs text-rose-600 font-bold">
                          Error angular de conicidad: 1,5° a 2,8° • Pieza requiere rectificado posterior
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-xs font-mono text-[#64748B]">
                    Algoritmo Cinemático: Calcula la inclinación polar en ejes A y C a 1.000 Hz en lazo cerrado.
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="text-xs font-mono text-[#64748B] flex justify-between items-center border-t border-[#E2E8F0] pt-3">
                <span>Control Predictivo CNC: Regulación anticipada de avance para eliminar el desvío en vértices a 90°</span>
                <span className="text-[#EA580C] font-bold">Tolerancia dimensional: ±0,05 mm</span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 8: [LIGHT] Layout B: 3-Column Feature Cards — Materiales Críticos  */}
          {/* ========================================================================= */}
          {currentSlide === 8 && (
            <div className="h-full w-full rounded-2xl bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between shadow-swiss-card border border-[#E2E8F0]">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-[#E2E8F0] pb-4">
                <div>
                  <span className="text-xs font-mono font-bold tracking-wider text-[#EA580C] uppercase">
                    07 • Versatilidad Metalúrgica
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-1 font-display">
                    Espectro de Materiales Industriales Críticos
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded">
                  Expositor: Ariel
                </span>
              </div>

              {/* 3-Column Feature Cards (Layout B) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-4">
                {/* Column 1: Titanium */}
                <div className="p-6 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-4">
                  <div className="border-b border-[#E2E8F0] pb-3">
                    <span className="text-xs font-mono font-bold text-[#EA580C] uppercase">Aeroespacial & Medicina</span>
                    <h3 className="text-xl font-bold text-[#0F172A] mt-0.5">Titanio Grado 5 (Ti-6Al-4V)</h3>
                  </div>
                  <div className="space-y-2 text-sm text-[#475569]">
                    <div className="flex justify-between font-mono">
                      <span>Espesor típico:</span>
                      <strong className="text-[#0F172A]">10 a 120 mm</strong>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Capa Frágil:</span>
                      <strong className="text-emerald-700">Sin Capa Frágil (Fase Alfa)</strong>
                    </div>
                  </div>
                  <p className="text-xs text-[#334155] pt-2 border-t border-[#E2E8F0]">
                    <strong className="text-[#0F172A]">Aprobado AS9100:</strong> Al no superar los 60 °C, mantiene intacta la fatiga cíclica en turbinas.
                  </p>
                </div>

                {/* Column 2: Reflective Metals */}
                <div className="p-6 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-4">
                  <div className="border-b border-[#E2E8F0] pb-3">
                    <span className="text-xs font-mono font-bold text-[#EA580C] uppercase">Metales Reflectivos</span>
                    <h3 className="text-xl font-bold text-[#0F172A] mt-0.5">Cobre C11000 & Al 6061-T6</h3>
                  </div>
                  <div className="space-y-2 text-sm text-[#475569]">
                    <div className="flex justify-between font-mono">
                      <span>Conductividad:</span>
                      <strong className="text-[#0F172A]">100% IACS</strong>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Rebote Óptico:</span>
                      <strong className="text-emerald-700">Cero Peligro</strong>
                    </div>
                  </div>
                  <p className="text-xs text-[#334155] pt-2 border-t border-[#E2E8F0]">
                    <strong className="text-[#0F172A]">Barras Colectoras y Baterías VE:</strong> El haz de agua corta sin reflejos y no des-templa el temple T6.
                  </p>
                </div>

                {/* Column 3: Superalloys */}
                <div className="p-6 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-4">
                  <div className="border-b border-[#E2E8F0] pb-3">
                    <span className="text-xs font-mono font-bold text-[#EA580C] uppercase">Extrema Resistencia</span>
                    <h3 className="text-xl font-bold text-[#0F172A] mt-0.5">Hardox 500 & Inconel 718</h3>
                  </div>
                  <div className="space-y-2 text-sm text-[#475569]">
                    <div className="flex justify-between font-mono">
                      <span>Dureza Base:</span>
                      <strong className="text-[#0F172A]">Hasta 500 HB</strong>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Endurecimiento:</span>
                      <strong className="text-emerald-700">Cero Acritud</strong>
                    </div>
                  </div>
                  <p className="text-xs text-[#334155] pt-2 border-t border-[#E2E8F0]">
                    <strong className="text-[#0F172A]">Mecanizable Directo:</strong> Los bordes conservan su ductilidad permitiendo roscado sin romper machos.
                  </p>
                </div>
              </div>

              {/* Bottom Takeaway */}
              <div className="p-3 rounded-lg bg-[#FFF7ED] border border-[#FDBA74] text-xs font-mono text-[#9A3412] flex justify-between items-center">
                <span>Composites y Sándwiches: Fibra de carbono, kevlar y caucho sin delaminación mediante perforación suave asistida por vacío.</span>
                <span className="text-[#EA580C] font-bold">1 Única Máquina para Todo</span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 9: [LIGHT] Layout C: Graphic/Metric Split — Calidades Q1-Q5 y Defectos*/}
          {/* ========================================================================= */}
          {currentSlide === 9 && (
            <div className="h-full w-full rounded-2xl bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between shadow-swiss-card border border-[#E2E8F0]">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-[#E2E8F0] pb-4">
                <div>
                  <span className="text-xs font-mono font-bold tracking-wider text-[#EA580C] uppercase">
                    08 • Control de Calidad y Solución de Defectos
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-1 font-display">
                    Niveles de Acabado (Q1 a Q5) y Defectología
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded">
                  Expositor: Ariel
                </span>
              </div>

              {/* Graphic/Metric Split (Layout C) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-4 items-center">
                {/* Left: Interactive Q1 to Q5 Selector */}
                <div className="lg:col-span-6 bg-[#F8F9FA] rounded-xl border border-[#E2E8F0] p-6 space-y-4">
                  <span className="text-xs font-mono font-bold text-[#0F172A] uppercase block">
                    Escala Estándar de Calidad Superficial
                  </span>

                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((q) => (
                      <button
                        key={q}
                        onClick={() => setSelectedQuality(q)}
                        className={`py-3 rounded-lg border font-mono font-bold text-center transition-all ${selectedQuality === q
                          ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-swiss'
                          : 'bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#F1F5F9]'
                          }`}
                      >
                        <span className="block text-sm">Q{q}</span>
                      </button>
                    ))}
                  </div>

                  {/* Quality Details Card */}
                  <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-[#0F172A]">
                        {selectedQuality === 1 && 'Q1: Separación Rápida (Desbaste)'}
                        {selectedQuality === 2 && 'Q2: Rugoso para Soldadura'}
                        {selectedQuality === 3 && 'Q3: Comercial Estándar (80% Mercado)'}
                        {selectedQuality === 4 && 'Q4: Acabado Fino Satinado'}
                        {selectedQuality === 5 && 'Q5: Precisión Extrema Aeroespacial'}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#EA580C]">
                        {selectedQuality === 1 && 'Ra ≈ 16,5 µm'}
                        {selectedQuality === 2 && 'Ra ≈ 9,2 µm'}
                        {selectedQuality === 3 && 'Ra ≈ 4,5 µm'}
                        {selectedQuality === 4 && 'Ra ≈ 2,4 µm'}
                        {selectedQuality === 5 && 'Ra ≈ 1,4 µm'}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569]">
                      {selectedQuality === 1 && 'Máxima velocidad de avance con estrías visibles en el 60% inferior. Para descarte o corte preliminar de separación rápida.'}
                      {selectedQuality === 2 && 'Estrías leves. Excelente balance para piezas que irán directamente unidas por soldadura.'}
                      {selectedQuality === 3 && 'Acabado mate parejo sin rebaba inferior. Estándar para bridas y soportes mecatrónicos.'}
                      {selectedQuality === 4 && 'Alta calidad visual y dimensional sin estriado detectable al tacto. Para engranajes y piezas de precisión.'}
                      {selectedQuality === 5 && 'Mínima velocidad de avance, máxima perpendicularidad y acabado espejo para turbinas y piezas médicas.'}
                    </p>
                  </div>
                </div>

                {/* Right: 3 Key Mechatronic Defect Fixes */}
                <div className="lg:col-span-6 space-y-3 font-sans">
                  <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0]">
                    <span className="text-xs font-mono font-bold text-[#EA580C] uppercase block">
                      Defecto 1: Desviación y Retardo del Chorro en Esquinas
                    </span>
                    <p className="text-xs text-[#334155] mt-1">
                      <strong className="text-[#0F172A]">Solución Mecatrónica:</strong> Algoritmo CAM de compensación en esquinas con control predictivo que desacelera e inclina el cabezal para verticalizar el chorro.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0]">
                    <span className="text-xs font-mono font-bold text-[#EA580C] uppercase block">
                      Defecto 2: Redondeo del Borde Superior
                    </span>
                    <p className="text-xs text-[#334155] mt-1">
                      <strong className="text-[#0F172A]">Solución Mecatrónica:</strong> Palpador capacitivo seguidor de terreno mantiene la distancia entre boquilla y chapa en 1,5 mm.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0]">
                    <span className="text-xs font-mono font-bold text-[#EA580C] uppercase block">
                      Defecto 3: Cráter de Perforación Inicial
                    </span>
                    <p className="text-xs text-[#334155] mt-1">
                      <strong className="text-[#0F172A]">Solución Mecatrónica:</strong> Perforación dinámica asistida con entrada tangencial fuera del contorno útil.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="text-xs font-mono text-[#64748B] flex justify-between items-center border-t border-[#E2E8F0] pt-3">
                <span>Compensación algorítmica: El software regula velocidad automáticamente en función de la calidad Q seleccionada.</span>
                <span className="text-[#EA580C] font-bold">Cero rebabas en corte sumergido</span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 10: [LIGHT] Layout D: Horizontal Process Timeline — Industria 4.0   */}
          {/* ========================================================================= */}
          {currentSlide === 10 && (
            <div className="h-full w-full rounded-2xl bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between shadow-swiss-card border border-[#E2E8F0]">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-[#E2E8F0] pb-4">
                <div>
                  <span className="text-xs font-mono font-bold tracking-wider text-[#EA580C] uppercase">
                    09 • Integración Ciberfísica y Sustentabilidad
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-1 font-display">
                    AWJ en la Industria 4.0: Ecosistema Autónomo
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded">
                  Expositor: Diego & Ariel
                </span>
              </div>

              {/* 4 Pillars Horizontal Process Timeline (Layout D) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-auto py-6">
                {/* Pillar 1 */}
                <div className="p-5 rounded-xl bg-[#F8F9FA] border-t-4 border-[#0F172A] border-x border-b border-[#E2E8F0] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#64748B] block">PILAR 01</span>
                    <h3 className="text-lg font-bold text-[#0F172A] mt-1">Telemetría IoT</h3>
                    <div className="text-xl font-bold text-[#0F172A] font-mono mt-2">
                      Telemetría en la Nube
                    </div>
                  </div>
                  <p className="text-sm text-[#475569] mt-4">
                    <strong className="text-[#0F172A]">Mantenimiento Predictivo:</strong> Sensores de vibración y presión detectan desgaste en sellos UHP antes de fallar.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="p-5 rounded-xl bg-[#F8F9FA] border-t-4 border-[#EA580C] border-x border-b border-[#E2E8F0] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#EA580C] block">PILAR 02</span>
                    <h3 className="text-lg font-bold text-[#0F172A] mt-1">Anidamiento (Nesting)</h3>
                    <div className="text-xl font-bold text-[#EA580C] font-mono mt-2">
                      &gt;92% Rendimiento
                    </div>
                  </div>
                  <p className="text-sm text-[#475569] mt-4">
                    <strong className="text-[#0F172A]">Optimización CAM:</strong> Distribución automática de geometrías en chapa con líneas de corte compartidas.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="p-5 rounded-xl bg-[#F8F9FA] border-t-4 border-[#0F172A] border-x border-b border-[#E2E8F0] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#64748B] block">PILAR 03</span>
                    <h3 className="text-lg font-bold text-[#0F172A] mt-1">Manufactura Desatendida</h3>
                    <div className="text-xl font-bold text-[#0F172A] font-mono mt-2">
                      100% Autónoma
                    </div>
                  </div>
                  <p className="text-sm text-[#475569] mt-4">
                    <strong className="text-[#0F172A]">Operación Nocturna:</strong> Corte autónomo sin operario con parada preventiva si falta abrasivo o colisiona el cabezal.
                  </p>
                </div>

                {/* Pillar 4 */}
                <div className="p-5 rounded-xl bg-[#FFF7ED] border-t-4 border-[#EA580C] border-x border-b border-[#FDBA74] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#EA580C] block">PILAR 04</span>
                    <h3 className="text-lg font-bold text-[#9A3412] mt-1">Economía Circular</h3>
                    <div className="text-xl font-bold text-[#EA580C] font-mono mt-2">
                      70% Reciclaje
                    </div>
                  </div>
                  <p className="text-sm text-[#9A3412] mt-4">
                    <strong className="text-[#0F172A]">Planta Verde:</strong> Agua en circuito cerrado y sistema hydro-cyclone que recupera hasta 70% del granate.
                  </p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="p-4 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-xs font-mono text-[#334155]">
                  Seguridad Ambiental: <strong>Cero emisiones de humos cancerígenos de Cromo Hexavalente (Cr⁶⁺)</strong> producidos por corte térmico.
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700">
                  Corte Sumergido: Ruido &lt;75 dBA
                </span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SLIDE 11: [DARK CANVAS #2] Closing / Q&A Slide                            */}
          {/* ========================================================================= */}
          {currentSlide === 11 && (
            <div className="h-full w-full rounded-2xl bg-[#0F172A] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between shadow-swiss-lg border border-slate-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-technical-grid opacity-10 pointer-events-none" />

              {/* Header */}
              <div className="relative z-10 flex justify-between items-start border-b border-slate-800 pb-6">
                <div>
                  <span className="text-xs font-mono font-bold tracking-wider text-[#EA580C] uppercase block">
                    10 • Defensa de Proyecto Final • Conclusión
                  </span>
                  <span className="text-sm text-slate-400 block mt-0.5">
                    UTN Facultad Regional Paraná • Tecnicatura Universitaria en Mecatrónica
                  </span>
                </div>
                <span className="bg-[#EA580C]/20 text-[#EA580C] border border-[#EA580C]/40 px-3 py-1 rounded text-xs font-mono font-bold">
                  Fin de Exposición
                </span>
              </div>

              {/* Center: Major Takeaway Quote & Tribunal Q&A */}
              <div className="relative z-10 my-auto py-6 space-y-6 max-w-4xl">
                <div className="inline-block bg-slate-800 px-3 py-1 rounded text-xs font-mono font-semibold text-[#EA580C]">
                  SÍNTESIS MECATRÓNICA
                </div>

                <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug font-display">
                  "El chorro de agua abrasivo demuestra que la manufactura avanzada <span className="text-[#EA580C]">no necesita calor</span> para separar materiales: la precisión se logra con energía cinética, control multieje y algoritmos inteligentes."
                </blockquote>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-sm text-slate-300 font-medium">
                    <strong className="text-white">Ronda de Preguntas del Tribunal:</strong> Los expositores quedan a disposición para consultas técnicas.
                  </div>
                  {onOpenTechnicalAnnex && (
                    <button
                      onClick={() => onOpenTechnicalAnnex('simulator')}
                      className="px-4 py-2 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-mono text-xs font-bold transition-colors flex items-center gap-2"
                    >
                      <Sliders className="w-4 h-4" />
                      <span>Abrir Simulador AWJ para Pruebas en Vivo</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 block font-semibold">
                    Expositores
                  </span>
                  <div className="text-base font-bold text-white mt-0.5">
                    Diego Francisconi & Ariel Martinez
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-400 flex items-center gap-4">
                  <span>Viale, Entre Ríos</span>
                  <span>•</span>
                  <span className="text-[#EA580C] font-semibold">10/11/2026</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Swiss Precision Bottom Navigation Bar */}
      <footer className="h-14 border-t border-[#E2E8F0] bg-white px-6 flex items-center justify-between z-20 sticky bottom-0 shadow-swiss">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentSlide === 1}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border font-mono text-xs font-semibold transition-all ${currentSlide === 1
            ? 'border-transparent text-[#CBD5E1] cursor-not-allowed'
            : 'border-[#E2E8F0] bg-white hover:bg-[#F8F9FA] text-[#0F172A] shadow-swiss'
            }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior [←]</span>
        </button>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentSlide(idx + 1)}
              className={`h-2 rounded-full transition-all ${currentSlide === idx + 1
                ? 'w-7 bg-[#EA580C]'
                : 'w-2 bg-[#E2E8F0] hover:bg-[#CBD5E1]'
                }`}
              title={`Ir a diapositiva ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentSlide === totalSlides}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border font-mono text-xs font-semibold transition-all ${currentSlide === totalSlides
            ? 'border-transparent text-[#CBD5E1] cursor-not-allowed'
            : 'border-[#EA580C] bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-swiss'
            }`}
        >
          <span>Siguiente [→ / Espacio]</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

      {/* High-Resolution Real Cutting Inspection Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#CBD5E1] flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F8F9FA]">
              <div>
                <span className="text-xs font-mono font-bold text-[#EA580C] uppercase tracking-wider block">
                  {previewImage.badge}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mt-0.5 font-display">
                  {previewImage.title}
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {previewImage.subtitle}
                </p>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-2 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
                title="Cerrar [Esc]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal High-Res Photographic Container */}
            <div className="relative bg-slate-950 flex items-center justify-center overflow-hidden max-h-[58vh]">
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="w-full h-auto max-h-[58vh] object-contain select-none"
              />
            </div>

            {/* Modal Telemetry Specs Grid */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#E2E8F0] grid grid-cols-2 sm:grid-cols-4 gap-3">
              {previewImage.specs.map((spec, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#E2E8F0]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block">{spec.label}</span>
                  <span className="text-xs font-mono font-bold text-[#0F172A] mt-0.5 block truncate" title={spec.value}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
