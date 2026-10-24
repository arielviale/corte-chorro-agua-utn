import React, { useState } from 'react';
import SwissPresentationDeck from './components/SwissPresentationDeck';
import AWJSimulator40 from './components/AWJSimulator40';
import HeadDiagramInteractive from './components/HeadDiagramInteractive';
import WaterjetTechComparison from './components/WaterjetTechComparison';
import DefectsAnalysis from './components/DefectsAnalysis';
import SafetyEnvironment from './components/SafetyEnvironment';
import AcademicSections from './components/AcademicSections';
import SplineScene from './components/SplineScene';
import WaterjetHead3D from './components/WaterjetHead3D';
import { 
  X, 
  Sliders, 
  Crosshair, 
  Layers, 
  Flame, 
  ShieldCheck, 
  BookOpen, 
  ArrowLeft,
  ExternalLink,
  Box
} from 'lucide-react';

export default function App() {
  const [activeAnnexTab, setActiveAnnexTab] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] flex flex-col font-sans antialiased selection:bg-[#EA580C] selection:text-white">
      {/* Primary Swiss Industrial Presentation Deck (Strictly follows AGENTS.md) */}
      <SwissPresentationDeck 
        onOpenTechnicalAnnex={(tabId) => setActiveAnnexTab(tabId || 'simulator')}
      />

      {/* Technical Annex Modal / Interactive Sandbox for Tribunal Q&A */}
      {activeAnnexTab && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-md flex flex-col overflow-hidden animate-fadeIn">
          {/* Top Annex Header */}
          <div className="h-16 bg-[#0F172A] border-b border-slate-800 px-6 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveAnnexTab(null)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-[#EA580C]" />
                <span>Volver a la Presentación [ESC]</span>
              </button>
              <div className="h-4 w-px bg-slate-700 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                <span className="text-xs font-mono text-slate-400 uppercase font-semibold">
                  Anexo Técnico Interactivo • AWJ 4.0
                </span>
              </div>
            </div>

            {/* Annex Navigation Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-xl py-1 text-xs font-medium">
              {[
                { id: 'simulator', label: 'Simulador CNC', icon: Sliders },
                { id: 'head', label: 'Cabezal & Venturi', icon: Crosshair },
                { id: 'head3d', label: 'Cabezal 3D Fotorrealista', icon: Box },
                { id: 'technologies', label: 'Láser vs Plasma vs AWJ', icon: Layers },
                { id: 'defects', label: 'Defectología', icon: Flame },
                { id: 'safety', label: 'Seguridad UHP', icon: ShieldCheck },
                { id: 'academic', label: 'Memoria Técnica', icon: BookOpen },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeAnnexTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAnnexTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs whitespace-nowrap ${
                      isActive
                        ? 'bg-[#EA580C] text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setActiveAnnexTab(null)}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-rose-950/80 hover:text-rose-400 transition-colors"
              title="Cerrar Anexo Técnico"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Annex Body Content */}
          <div className="flex-1 overflow-y-auto bg-[#0B0F19] text-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {activeAnnexTab === 'simulator' && <AWJSimulator40 />}
              {activeAnnexTab === 'head' && <HeadDiagramInteractive />}
              {activeAnnexTab === 'head3d' && (
                <div className="bg-[#0F172A] rounded-2xl border border-slate-800 p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Box className="w-5 h-5 text-[#EA580C]" />
                        Cabezal de Corte AWJ 4.0 (Modelo 3D Interactivo)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Rotación 360° con el ratón, zoom, alternancia de inclinación 5 ejes (θ = 0,00° vs biselado) y chorro supersónico con salpicadura activa.
                      </p>
                    </div>
                    <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded border border-slate-700">
                      Motor WebGL Nativo • 60 FPS
                    </div>
                  </div>
                  <div className="h-[540px] w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl relative">
                    <WaterjetHead3D theme="dark" showControls={true} />
                  </div>
                </div>
              )}
              {activeAnnexTab === 'technologies' && <WaterjetTechComparison />}
              {activeAnnexTab === 'defects' && <DefectsAnalysis />}
              {activeAnnexTab === 'safety' && <SafetyEnvironment />}
              {activeAnnexTab === 'academic' && <AcademicSections />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
