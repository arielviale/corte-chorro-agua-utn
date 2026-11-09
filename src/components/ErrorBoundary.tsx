import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, X, Zap, Box, Cpu } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  contextName: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error(`[ErrorBoundary:${this.props.contextName}]`, error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isWebGL = this.state.error?.message.includes('WebGL') ||
                      this.state.error?.message.includes('canvas') ||
                      this.state.error?.message.includes('context') ||
                      this.state.error?.message.includes('three') ||
                      this.state.error?.message.includes('THREE');

      return (
        <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-slate-950/80 border border-rose-500/30 rounded-2xl relative">
          <div className="absolute top-3 right-3">
            <button
              onClick={this.handleReset}
              className="p-2 rounded-lg bg-rose-950/50 border border-rose-500/30 text-rose-300 hover:bg-rose-950 hover:text-rose-100 transition-colors"
              title="Recargar página completa"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="w-16 h-16 rounded-full bg-rose-950/50 border border-rose-500/30 flex items-center justify-center mb-4">
            {isWebGL ? <Cpu className="w-8 h-8 text-rose-400" /> : <AlertTriangle className="w-8 h-8 text-rose-400" />}
          </div>

          <h3 className="text-lg font-semibold text-white mb-2 text-center">
            Error en {this.props.contextName}
          </h3>

          <p className="text-sm text-slate-400 text-center mb-4 max-w-md">
            {isWebGL
              ? 'El motor 3D (WebGL) falló al inicializar. Puede ser por drivers de GPU, contexto perdido o memoria insuficiente.'
              : 'Ocurrió un error inesperado en este componente.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <button
              onClick={this.handleRetry}
              className="flex-1 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reintentar componente</span>
            </button>
            <button
              onClick={this.handleReset}
              className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors flex items-center justify-center gap-2 border border-slate-600"
            >
              <X className="w-4 h-4" />
              <span>Recargar todo</span>
            </button>
          </div>

          {this.props.showDetails && this.state.error && (
            <details className="mt-6 w-full max-w-md text-xs text-slate-500">
              <summary className="cursor-pointer font-mono text-rose-400 mb-1">Detalles técnicos</summary>
              <pre className="bg-slate-900 p-3 rounded overflow-auto max-h-40 font-mono text-[10px]">
                {this.state.error.message}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Fallbacks especializados por contexto
export const SimulatorErrorFallback = () => (
  <div className="w-full h-[500px] flex flex-col items-center justify-center p-8 bg-slate-950/80 border border-rose-500/30 rounded-2xl">
    <Zap className="w-12 h-12 text-rose-400 mb-3" />
    <h3 className="text-lg font-semibold text-white mb-2">Simulador no disponible</h3>
    <p className="text-slate-400 text-center mb-4 max-w-md">
      El motor de cálculo falló. Los perfiles preconfigurados siguen funcionando desde la interfaz.
    </p>
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-xs font-mono text-slate-300 space-y-1 max-w-xs">
      <div><span className="text-cyan-400">Perfiles rápidos:</span> Titanio 15 mm Q5 • Hardox 60 mm • Cobre 25 mm • Alu 30 mm</div>
      <div><span className="text-amber-400">Controles:</span> Deslizadores de presión, espesor, abrasivo y calidad Q1-Q5</div>
      <div><span className="text-emerald-400">5 Ejes:</span> Conmutador de compensación de conicidad θ=0°</div>
    </div>
  </div>
);

export const Head3DErrorFallback = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => (
  <div className={`w-full h-[400px] flex flex-col items-center justify-center p-8 rounded-2xl ${
    theme === 'dark'
      ? 'bg-slate-950/80 border border-rose-500/30'
      : 'bg-white border border-rose-200'
  }`}>
    <Box className="w-12 h-12 text-rose-400 mb-3" />
    <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      Modelo 3D no disponible
    </h3>
    <p className={`text-sm text-center mb-4 max-w-md ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
      WebGL no pudo inicializarse. Verificá los controladores gráficos o utilizá el modo 2D.
    </p>
    <div className={`p-3 rounded-lg text-xs font-mono text-center ${
      theme === 'dark' ? 'bg-slate-900 border border-slate-700 text-slate-300' : 'bg-slate-100 border border-slate-200 text-slate-700'
    }`}>
      Controles: Clic y arrastrar = rotar • Rueda = acercar/alejar • Botones θ = inclinar cabezal
    </div>
  </div>
);

export const SplineErrorFallback = () => (
  <div className="w-full h-[300px] flex flex-col items-center justify-center p-6 bg-slate-950/80 border border-rose-500/30 rounded-2xl">
    <Box className="w-10 h-10 text-rose-400 mb-2" />
    <h3 className="text-base font-semibold text-white mb-1">Escena Spline no cargó</h3>
    <p className="text-xs text-slate-400 text-center max-w-sm">
      Fallo de red o WebGL. La presentación continúa sin el modelo 3D externo.
    </p>
  </div>
);

export const AnnexErrorFallback = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="bg-slate-900 border border-rose-500/30 rounded-2xl p-8 max-w-md w-full text-center">
      <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-white mb-2">Anexo técnico no disponible</h3>
      <p className="text-slate-400 text-sm mb-6">
        Error crítico en el módulo interactivo. La presentación principal sigue funcional.
      </p>
      <button
        onClick={onClose}
        className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors"
      >
        Volver a presentación
      </button>
    </div>
  </div>
);