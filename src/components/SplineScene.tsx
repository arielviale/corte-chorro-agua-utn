import React, { Suspense, lazy, useState, Component, ErrorInfo, ReactNode } from 'react';
import { Sparkles, RefreshCw, AlertCircle, Box, ExternalLink } from 'lucide-react';

const Spline = lazy(() => import('@splinetool/react-spline'));

// Error Boundary for WebGL / Network failures
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SplineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Spline 3D Scene could not be loaded:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface SplineSceneProps {
  sceneUrl?: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  interactive?: boolean;
}

export default function SplineScene({
  sceneUrl = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode',
  className = 'w-full h-full',
  fallbackTitle = 'Modelo 3D Interactivo AWJ',
  fallbackSubtitle = 'Visualización cinemática 3D renderizada en WebGL',
  interactive = true,
}: SplineSceneProps) {
  const [currentUrl, setCurrentUrl] = useState<string>(sceneUrl);
  const [customInput, setCustomInput] = useState<string>('');
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      setIsLoaded(false);
      setCurrentUrl(customInput.trim());
    }
  };

  const fallbackUI = (
    <div className="w-full h-full min-h-[220px] rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="w-12 h-12 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 flex items-center justify-center mb-3">
        <Box className="w-6 h-6 text-[#EA580C]" />
      </div>
      <h4 className="text-sm font-bold text-white font-mono">{fallbackTitle}</h4>
      <p className="text-xs text-slate-400 max-w-sm mt-1">{fallbackSubtitle}</p>
      
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-mono rounded border border-slate-700 transition"
        >
          {showConfig ? 'Ocultar Configuración' : 'Configurar URL de Spline'}
        </button>
      </div>

      {showConfig && (
        <form onSubmit={handleApplyCustomUrl} className="mt-4 w-full max-w-md flex gap-2">
          <input
            type="text"
            placeholder="https://prod.spline.design/.../scene.splinecode"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200 font-mono focus:border-[#EA580C] focus:outline-none"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-[#EA580C] hover:bg-[#C2410C] text-xs font-bold text-white rounded transition"
          >
            Cargar
          </button>
        </form>
      )}
    </div>
  );

  return (
    <div className={`relative w-full h-full min-h-[220px] overflow-hidden rounded-xl ${className}`}>
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-sm pointer-events-none transition-opacity duration-500">
          <div className="w-8 h-8 border-2 border-slate-700 border-t-[#EA580C] rounded-full animate-spin mb-2" />
          <span className="text-[11px] font-mono text-slate-300">Cargando Escena 3D Spline...</span>
        </div>
      )}

      {/* Spline Canvas with Error Boundary & Suspense */}
      <SplineErrorBoundary fallback={fallbackUI}>
        <Suspense fallback={fallbackUI}>
          <div className={`w-full h-full ${interactive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <Spline
              scene={currentUrl}
              onLoad={() => setIsLoaded(true)}
              className="w-full h-full"
            />
          </div>
        </Suspense>
      </SplineErrorBoundary>

      {/* Subtle overlay controls */}
      <div className="absolute bottom-2 right-2 z-20 flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="p-1 rounded bg-slate-900/80 hover:bg-slate-900 text-slate-300 text-[10px] font-mono flex items-center gap-1 px-2 border border-slate-700"
          title="Cambiar escena Spline 3D"
        >
          <Sparkles className="w-3 h-3 text-[#EA580C]" />
          <span>Spline 3D</span>
        </button>
      </div>

      {showConfig && (
        <div className="absolute bottom-10 right-2 z-30 bg-[#0F172A] border border-slate-700 rounded-lg p-3 shadow-xl max-w-xs text-xs font-mono">
          <span className="text-slate-300 font-bold block mb-1">Cargar Modelo Spline (.splinecode)</span>
          <form onSubmit={handleApplyCustomUrl} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="https://prod.spline.design/.../scene.splinecode"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-[11px] focus:border-[#EA580C] focus:outline-none"
            />
            <div className="flex justify-end gap-1.5">
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="px-2 py-0.5 rounded text-slate-400 hover:text-white"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="px-2.5 py-0.5 rounded bg-[#EA580C] text-white font-bold hover:bg-[#C2410C]"
              >
                Aplicar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
