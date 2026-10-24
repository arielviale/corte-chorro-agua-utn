import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Clock, 
  Sparkles, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { PRESENTATION_SLIDES, GOLDEN_EFFECTS, SPEECH_SCRIPT_18MIN, CLOSING_STATEMENTS } from '../data/waterjetData';

interface PresentationModeProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tabId: string) => void;
}

export default function PresentationMode({ isOpen, onClose, onNavigateToTab }: PresentationModeProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speakerFilter, setSpeakerFilter] = useState<'All' | 'Diego' | 'Ariel'>('All');
  const [showGoldenCard, setShowGoldenCard] = useState(false);
  const [viewMode, setViewMode] = useState<'slides' | 'script' | 'closing'>('slides');

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  if (!isOpen) return null;

  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex];

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Color coding according to 15-20 min timeline
  const getTimeColor = () => {
    if (secondsElapsed < 15 * 60) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40';
    if (secondsElapsed <= 18 * 60) return 'text-amber-400 border-amber-500/40 bg-amber-950/40';
    return 'text-rose-400 border-rose-500/40 bg-rose-950/40 animate-pulse';
  };

  const handleNext = () => {
    if (currentSlideIndex < PRESENTATION_SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleInteractiveJump = (index: number) => {
    switch (index) {
      case 0:
        onNavigateToTab('simulator');
        break;
      case 1:
        onNavigateToTab('head');
        break;
      case 2:
        onNavigateToTab('technologies');
        break;
      case 3:
        onNavigateToTab('simulator');
        break;
      case 4:
        onNavigateToTab('defects');
        break;
      case 5:
        onNavigateToTab('safety');
        break;
      default:
        onNavigateToTab('simulator');
    }
    onClose();
  };


  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0B0F19] border border-cyan-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#060911] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Asistente de Exposición Oral (15–20 min)
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  TP Final UTN FRP
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Pauta cronometrada para Diego Francisconi y Ariel Martinez • Cátedra de Corte de Metales
              </p>
            </div>
          </div>

          {/* Stopwatch Controls */}
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-lg border font-mono font-bold text-sm flex items-center gap-2 ${getTimeColor()}`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(secondsElapsed)}</span>
              <span className="text-[10px] text-slate-400 font-normal">/ 20:00</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-1">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`p-1.5 rounded text-xs transition ${
                  isRunning ? 'bg-amber-500 text-black' : 'bg-cyan-500 text-black'
                }`}
                title={isRunning ? 'Pausar Cronómetro' : 'Iniciar Cronómetro'}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setIsRunning(false);
                  setSecondsElapsed(0);
                }}
                className="p-1.5 rounded text-slate-400 hover:text-white text-xs"
                title="Reiniciar Cronómetro"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs: Diapositivas vs Guion 18 min vs Frases de Cierre */}
        <div className="bg-[#080C16] border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setViewMode('slides')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                viewMode === 'slides'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              📊 Diapositivas por Bloques
            </button>
            <button
              onClick={() => setViewMode('script')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                viewMode === 'script'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              🎙️ Guion Minuto a Minuto (18 min)
            </button>
            <button
              onClick={() => setViewMode('closing')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                viewMode === 'closing'
                  ? 'bg-purple-500 text-white font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              ⭐ Frases de Cierre Potentes
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-400">
            Defensa: 10/11/2026 • Diego Francisconi & Ariel Martinez
          </span>
        </div>

        {/* Slide Tracker Navigation (solo en modo slides) */}
        {viewMode === 'slides' && (
          <div className="bg-slate-950/60 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs overflow-x-auto">
            <div className="flex gap-2">
              {PRESENTATION_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`px-3 py-1 rounded-md font-mono transition text-[11px] whitespace-nowrap flex items-center gap-1.5 ${
                    currentSlideIndex === idx
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>B{idx + 1}</span>
                  <span className="hidden md:inline">({slide.speaker})</span>
                </button>
              ))}
            </div>

            <div className="text-slate-400 font-mono text-[11px]">
              Bloque {currentSlideIndex + 1} de {PRESENTATION_SLIDES.length}
            </div>
          </div>
        )}

        {/* Content Area according to viewMode */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {viewMode === 'script' ? (
            /* Guion Minuto a Minuto Ensayado */
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Guion Completo de Exposición Oral (18 Minutos)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Intervenciones alternadas y equilibradas para Diego Francisconi y Ariel Martinez • Cátedra de Corte de Metales UTN FRP
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                  Total: 18:00
                </span>
              </div>

              <div className="space-y-3">
                {SPEECH_SCRIPT_18MIN.map((item, idx) => {
                  const isDiego = item.speaker.includes('Diego');
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition ${
                        isDiego
                          ? 'bg-slate-950/80 border-cyan-500/30'
                          : 'bg-slate-950/80 border-amber-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                            isDiego ? 'bg-cyan-500 text-slate-950' : 'bg-amber-500 text-slate-950'
                          }`}>
                            {item.speaker}
                          </span>
                          <span className="text-xs font-bold text-white font-mono">
                            {item.section}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">
                          {item.interval}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans italic">
                        "{item.dialogue}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : viewMode === 'closing' ? (
            /* Frases de Cierre Potentes */
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Frases de Cierre Potentes para el Remate de la Exposición
                </h3>
                <p className="text-xs text-slate-400">
                  Argumentos de alto impacto para concluir con autoridad frente a la mesa examinadora.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {CLOSING_STATEMENTS.map((c, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-purple-500/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">
                        Enfoque: {c.focus}
                      </span>
                      <span className="text-[10px] font-mono bg-purple-950 text-purple-200 px-2 py-0.5 rounded border border-purple-800">
                        {c.author}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-white font-serif italic leading-relaxed">
                      "{c.quote}"
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-cyan-950/40 to-slate-900 p-4 rounded-xl border border-cyan-500/30 text-xs text-slate-300 space-y-1">
                <strong className="text-cyan-400 font-mono block">Consejo de Oratoria Universitaria:</strong>
                <p>
                  Tras pronunciar la frase de cierre, hagan una pausa de 2 segundos, agradezcan al tribunal docente y abran inmediatamente la demostración interactiva en el gemelo digital diciendo: <em>"Profesores, los invitamos a elegir cualquier aleación de la industria para someterla a la simulación en vivo."</em>
                </p>
              </div>
            </div>
          ) : (
            /* Vista de Diapositivas por Bloques */
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      Expositor: {currentSlide.speaker}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-mono text-cyan-400 bg-cyan-950 border border-cyan-800/50">
                      {currentSlide.time}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {currentSlide.title}
                  </h3>
                </div>

                <button
                  onClick={() => handleInteractiveJump(currentSlideIndex)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 text-xs font-semibold transition self-start sm:self-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir Módulo en Pantalla</span>
                </button>
              </div>

              {/* Guion y Puntos Clave */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    Guion de Argumentación para el Expositor:
                  </h4>
                  <ul className="space-y-2.5">
                    {currentSlide.objectives.map((obj, i) => (
                      <li key={i} className="text-sm text-slate-200 flex items-start gap-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-4 space-y-4">
                  <div className="bg-gradient-to-br from-amber-500/10 to-transparent p-4 rounded-xl border border-amber-500/30">
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Acción en Vivo en la Web:
                    </span>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {currentSlide.interactiveAction}
                    </p>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2 font-mono">
                    <div className="flex justify-between">
                      <span>Tiempo Objetivo:</span>
                      <span className="text-white font-bold">{currentSlide.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ritmo de Voz:</span>
                      <span className="text-emerald-400">Pausado y Técnico</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pregunta Esperada:</span>
                      <span className="text-cyan-300">ZAC y Conicidad</span>
                    </div>
                  </div>

                  {/* Tarjeta Desplegable de Golpes de Efecto para el Orador */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/40 space-y-2">
                    <button
                      onClick={() => setShowGoldenCard(!showGoldenCard)}
                      className="w-full flex items-center justify-between text-left text-xs font-mono font-bold text-amber-300"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Golpes de Efecto ({GOLDEN_EFFECTS.length})
                      </span>
                      <span className="text-[10px] text-slate-400">{showGoldenCard ? 'Ocultar' : 'Ver todos'}</span>
                    </button>

                    {showGoldenCard ? (
                      <div className="space-y-2 pt-2 border-t border-slate-800 max-h-52 overflow-y-auto pr-1">
                        {GOLDEN_EFFECTS.map((g) => (
                          <div key={g.id} className="bg-slate-900 p-2 rounded border border-slate-800 text-[11px]">
                            <span className="text-[9px] font-mono text-cyan-400 uppercase font-semibold block">{g.tag}</span>
                            <strong className="text-white block mt-0.5 leading-snug">{g.highlight}</strong>
                            <p className="text-slate-300 mt-1 text-[10px] leading-relaxed">{g.detail}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400">
                        Dato estelar: <em>"94.000 psi = 1.800 veces una manguera de jardín residencial"</em>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>


        {/* Footer Navigation Controls */}
        <div className="p-4 bg-[#060911] border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              currentSlideIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-600'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Bloque Anterior</span>
          </button>

          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Use las flechas o teclas para avanzar durante la exposición
          </span>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === PRESENTATION_SLIDES.length - 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              currentSlideIndex === PRESENTATION_SLIDES.length - 1
                ? 'opacity-40 cursor-not-allowed text-slate-600'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
            }`}
          >
            <span>Siguiente Bloque</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
