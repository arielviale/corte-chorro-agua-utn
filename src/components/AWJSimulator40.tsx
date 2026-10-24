import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  Zap, 
  Activity, 
  DollarSign, 
  Layers, 
  RotateCw, 
  ShieldCheck, 
  Gauge, 
  HelpCircle,
  FileSpreadsheet,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { MATERIALS, QUALITY_LEVELS } from '../data/waterjetData';

export default function AWJSimulator40() {
  const [materialId, setMaterialId] = useState<string>('aisi304');
  const [thicknessMm, setThicknessMm] = useState<number>(20);
  const [pressureBar, setPressureBar] = useState<number>(6200); // 3800 a 6500 bar
  const [orificeMm, setOrificeMm] = useState<number>(0.33); // 0.25, 0.33, 0.38 mm
  const [abrasiveGMin, setAbrasiveGMin] = useState<number>(400); // 150 a 650 g/min
  const [meshSize, setMeshSize] = useState<number>(80); // 50, 80, 120
  const [qualityIndex, setQualityIndex] = useState<number>(3);
  const [fiveAxisActive, setFiveAxisActive] = useState<boolean>(true);
  const [pumpType, setPumpType] = useState<'intensifier' | 'direct'>('intensifier');

  const selectedMaterial = useMemo(
    () => MATERIALS.find((m) => m.id === materialId) || MATERIALS[0],
    [materialId]
  );

  const selectedQuality = useMemo(
    () => QUALITY_LEVELS.find((q) => q.q === qualityIndex) || QUALITY_LEVELS[2],
    [qualityIndex]
  );

  const metrics = useMemo(() => {
    // 1. Conversión de presión y velocidad de chorro por Bernoulli modificada
    const pressurePsi = Math.round(pressureBar * 14.5038);
    const pressurePa = pressureBar * 1e5;
    const cd = 0.72; // Coeficiente de descarga en orificio de diamante
    const rhoWater = 1000 * (1 + 0.000028 * pressureBar); // Compresibilidad a UHP (15-18% más denso)
    const jetVelocityMs = cd * Math.sqrt((2 * pressurePa) / rhoWater);
    const machNumber = jetVelocityMs / 343;

    // 2. Caudal volumétrico de agua y potencia hidráulica
    const areaOrificeM2 = Math.PI * Math.pow((orificeMm * 1e-3) / 2, 2);
    const waterFlowLMin = areaOrificeM2 * jetVelocityMs * 60 * 1000;
    const waterMassKgMin = waterFlowLMin;
    const abrasiveKgMin = abrasiveGMin / 1000;

    // 3. Velocidad de partículas abrasivas por transferencia de momento
    const mixingEfficiency = 0.71;
    const abrasiveVelocityMs =
      mixingEfficiency * (waterMassKgMin / (waterMassKgMin + abrasiveKgMin)) * jetVelocityMs;

    // 4. Potencia hidráulica y eléctrica según arquitectura de bomba
    const hydraulicPowerKw = (pressureBar * waterFlowLMin) / 600;
    const pumpEfficiency = pumpType === 'direct' ? 0.88 : 0.71;
    const electricPowerKw = hydraulicPowerKw / pumpEfficiency;
    const electricPowerHp = electricPowerKw * 1.341;

    // 5. Velocidad de avance CNC (Modelo empírico calibrado tipo Zeng & Kim)
    const meshFactor = meshSize === 50 ? 1.12 : meshSize === 120 ? 0.82 : 1.0;
    const pressureFactor = Math.pow(pressureBar / 4100, 1.35);
    const abrasiveFactor = Math.pow(abrasiveGMin / 380, 0.62) * (abrasiveGMin > 550 ? 0.93 : 1.0);
    const orificeFactor = Math.pow(orificeMm / 0.33, 1.15);

    const maxSeparationSpeedMmMin =
      (selectedMaterial.machinability * 14.5 * pressureFactor * abrasiveFactor * orificeFactor * meshFactor) /
      Math.pow(thicknessMm, 1.08);

    const feedRateMmMin = Math.max(4, maxSeparationSpeedMmMin * selectedQuality.speedFactor);

    // 6. Rugosidad superficial Ra (µm) y Conicidad (Kerf Taper)
    const meshRaMultiplier = meshSize === 50 ? 1.28 : meshSize === 120 ? 0.68 : 1.0;
    const estimatedRaUm = +(selectedQuality.raBase * meshRaMultiplier).toFixed(2);

    const nozzleDiamMm = +(orificeMm * 3.05).toFixed(2);
    const topKerfMm = +(nozzleDiamMm * 1.08).toFixed(2);
    const effectiveTaperDeg = fiveAxisActive ? 0.015 : selectedQuality.taperDeg;
    const taperPerSideMm = +(
      Math.tan((effectiveTaperDeg * Math.PI) / 180) * thicknessMm
    ).toFixed(3);
    const bottomKerfMm = +(Math.max(0.35, topKerfMm - 2 * taperPerSideMm)).toFixed(2);

    // 7. Retardo de cola (Jet Lag) y Costo Operativo por Metro Lineal (USD/m)
    const jetLagMm = +(
      0.18 * thicknessMm * Math.pow(selectedQuality.speedFactor, 0.85) * (fiveAxisActive ? 0.35 : 1.0)
    ).toFixed(2);

    const cutTimeMinPerMeter = 1000 / feedRateMmMin;
    const abrasiveCostPerMeterUsd = cutTimeMinPerMeter * abrasiveKgMin * 0.65; // ~0.65 USD/kg Garnet 80 HPA
    const powerAndConsumablesPerMeterUsd = cutTimeMinPerMeter * (electricPowerKw * 0.14 / 60 + 0.38);
    const totalCostPerMeterUsd = +(abrasiveCostPerMeterUsd + powerAndConsumablesPerMeterUsd).toFixed(2);

    return {
      pressurePsi,
      jetVelocityMs: Math.round(jetVelocityMs),
      machNumber: machNumber.toFixed(2),
      waterFlowLMin: waterFlowLMin.toFixed(2),
      abrasiveVelocityMs: Math.round(abrasiveVelocityMs),
      hydraulicPowerKw: hydraulicPowerKw.toFixed(1),
      electricPowerKw: electricPowerKw.toFixed(1),
      electricPowerHp: Math.round(electricPowerHp),
      feedRateMmMin: Math.round(feedRateMmMin),
      estimatedRaUm,
      nozzleDiamMm,
      topKerfMm,
      bottomKerfMm,
      effectiveTaperDeg: effectiveTaperDeg.toFixed(2),
      taperPerSideMm,
      jetLagMm,
      cutTimeMinPerMeter: cutTimeMinPerMeter.toFixed(1),
      abrasiveCostPerMeterUsd: abrasiveCostPerMeterUsd.toFixed(2),
      powerAndConsumablesPerMeterUsd: powerAndConsumablesPerMeterUsd.toFixed(2),
      totalCostPerMeterUsd,
    };
  }, [
    selectedMaterial,
    thicknessMm,
    pressureBar,
    orificeMm,
    abrasiveGMin,
    meshSize,
    selectedQuality,
    fiveAxisActive,
    pumpType,
  ]);

  // Presets for university presentation demo
  const applyPreset = (preset: 'aero' | 'thick_hardox' | 'copper' | 'aluminum') => {
    switch (preset) {
      case 'aero':
        setMaterialId('ti6al4v');
        setThicknessMm(15);
        setPressureBar(6200);
        setAbrasiveGMin(400);
        setQualityIndex(5);
        setFiveAxisActive(true);
        break;
      case 'thick_hardox':
        setMaterialId('sae1020');
        setThicknessMm(60);
        setPressureBar(6500);
        setAbrasiveGMin(550);
        setMeshSize(50);
        setQualityIndex(2);
        setFiveAxisActive(true);
        break;
      case 'copper':
        setMaterialId('cobre');
        setThicknessMm(25);
        setPressureBar(6000);
        setAbrasiveGMin(450);
        setQualityIndex(4);
        setFiveAxisActive(true);
        break;
      case 'aluminum':
        setMaterialId('al6061');
        setThicknessMm(30);
        setPressureBar(5500);
        setAbrasiveGMin(350);
        setQualityIndex(3);
        setFiveAxisActive(false);
        break;
    }
  };

  return (
    <div className="bg-[#0B0F19] text-slate-100 p-6 rounded-2xl border border-cyan-500/30 shadow-2xl">
      {/* Simulator SCADA Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-800 pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
              Gemelo Digital Industria 4.0 • UTN FRP Mecatrónica
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              Modelo Zeng & Kim
            </span>
          </div>
          <h2 className="text-2xl font-bold mt-2 text-white flex items-center gap-2">
            Simulador Mecatrónico de Corte por Chorro de Agua (AWJ)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Cálculo hidrodinámico en tiempo real: velocidad supersónica, potencia hidráulica, velocidad de avance CNC, rugosidad Ra y conicidad.
          </p>
        </div>

        {/* 5-Axis Compensation Toggle & Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFiveAxisActive(!fiveAxisActive)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition border flex items-center gap-1.5 ${
              fiveAxisActive
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20 font-bold'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{fiveAxisActive ? '5 Ejes Dynamic XD: ACTIVO (0° Conicidad)' : '3 Ejes Estándar (Conicidad Natural)'}</span>
          </button>
        </div>
      </div>

      {/* Demo Preset Buttons for Quick Testing */}
      <div className="mb-6 bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-mono text-slate-400 flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-amber-400" /> Presets de Demostración para la Exposición:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset('aero')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 transition"
          >
            🚀 Titanio Aeroespacial 15mm (Q5)
          </button>
          <button
            onClick={() => applyPreset('thick_hardox')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 transition"
          >
            🚜 Hardox 500 / 60mm Desbaste
          </button>
          <button
            onClick={() => applyPreset('copper')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-slate-700 transition"
          >
            ⚡ Cobre Busbar 25mm (Reflectivo)
          </button>
          <button
            onClick={() => applyPreset('aluminum')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
          >
            ⚙️ Aluminio 6061 30mm (Sin 5 Ejes)
          </button>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sliders and Selections */}
        <div className="lg:col-span-5 space-y-4 bg-slate-900/90 p-5 rounded-xl border border-slate-800 shadow-inner">
          {/* Material Selection */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              ALEACIÓN METÁLICA (FACTOR M DE MAQUINABILIDAD)
            </label>
            <select
              value={materialId}
              onChange={(e) => setMaterialId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
            >
              {MATERIALS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (M = {m.machinability} • {m.category})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-cyan-400/90 mt-1 font-mono">
              {selectedMaterial.hardnessNote}
            </p>
          </div>

          {/* Pressure Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">PRESIÓN UHP DE BOMBA (P)</span>
              <span className="text-cyan-400 font-bold">
                {pressureBar} bar ({metrics.pressurePsi.toLocaleString()} PSI)
              </span>
            </div>
            <input
              type="range"
              min={3800}
              max={6500}
              step={100}
              value={pressureBar}
              onChange={(e) => setPressureBar(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>3.800 bar (Bomba estándar)</span>
              <span>6.500 bar (HyperJet / STREAMLINE PRO)</span>
            </div>
          </div>

          {/* Thickness Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">ESPESOR DE PIEZA (h)</span>
              <span className="text-cyan-400 font-bold">{thicknessMm} mm</span>
            </div>
            <input
              type="range"
              min={2}
              max={150}
              step={1}
              value={thicknessMm}
              onChange={(e) => setThicknessMm(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>2 mm (Chapa delgada)</span>
              <span>150 mm (Planchón pesado)</span>
            </div>
          </div>

          {/* Abrasive Mass Flow Slider & Mesh Size */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">CAUDAL ABRASIVO GRANATE (ṁ_a)</span>
              <span className="text-amber-400 font-bold">{abrasiveGMin} g/min</span>
            </div>
            <input
              type="range"
              min={150}
              max={650}
              step={25}
              value={abrasiveGMin}
              onChange={(e) => setAbrasiveGMin(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800 text-xs">
              <span className="text-slate-400 font-mono">Malla Barton Garnet:</span>
              <div className="flex gap-2">
                {[50, 80, 120].map((mesh) => (
                  <button
                    key={mesh}
                    onClick={() => setMeshSize(mesh)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition ${
                      meshSize === mesh
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Mesh {mesh}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Orifice Diameter and Pump Architecture */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Ø ORIFICIO DIAMANTE
              </label>
              <select
                value={orificeMm}
                onChange={(e) => setOrificeMm(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              >
                <option value={0.25}>Ø 0,25 mm (Bajo caudal)</option>
                <option value={0.33}>Ø 0,33 mm (Estándar metales)</option>
                <option value={0.38}>Ø 0,38 mm (Alto desbaste)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                TIPO DE BOMBA UHP
              </label>
              <select
                value={pumpType}
                onChange={(e) => setPumpType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              >
                <option value="intensifier">Intensificadora (η=71%)</option>
                <option value="direct">Accionamiento Directo (η=88%)</option>
              </select>
            </div>
          </div>

          {/* Quality Level Buttons Q1 - Q5 */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              ÍNDICE DE CALIDAD CNC (Q1 DESBASTE A Q5 ULTRA-PRECISIÓN)
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {QUALITY_LEVELS.map((q) => (
                <button
                  key={q.q}
                  onClick={() => setQualityIndex(q.q)}
                  className={`py-2 rounded-lg text-xs font-bold transition flex flex-col items-center ${
                    qualityIndex === q.q
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span>Q{q.q}</span>
                  <span className="text-[9px] font-normal opacity-80">{Math.round(q.speedFactor * 100)}% Vel</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-2 italic bg-slate-950 p-2 rounded border border-slate-800">
              "{selectedQuality.description}"
            </p>
          </div>
        </div>

        {/* Right Column: SCADA Telemetry Cards & Interactive Cut Profile SVG */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* SCADA Telemetry Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Velocidad Chorro
              </span>
              <p className="text-2xl font-bold text-cyan-400 mt-1 font-mono">
                {metrics.jetVelocityMs} <span className="text-sm font-normal text-slate-400">m/s</span>
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span className="text-cyan-300 font-bold">Mach {metrics.machNumber}</span>
                <span>Partículas: {metrics.abrasiveVelocityMs} m/s</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Avance CNC (Vf)
              </span>
              <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">
                {metrics.feedRateMmMin} <span className="text-sm font-normal text-slate-400">mm/min</span>
              </p>
              <div className="text-[11px] text-slate-400 mt-1 font-mono">
                <span>Tiempo/metro: <strong className="text-white">{metrics.cutTimeMinPerMeter} min</strong></span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Rugosidad (Ra)
              </span>
              <p className="text-2xl font-bold text-amber-400 mt-1 font-mono">
                {metrics.estimatedRaUm} <span className="text-sm font-normal text-slate-400">µm</span>
              </p>
              <div className="text-[11px] text-emerald-400 mt-1 font-mono font-semibold">
                ZAC / HAZ = 0,00 mm (Cold Cut)
              </div>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Sangría (Kerf) & Taper
              </span>
              <p className="text-lg font-bold text-white mt-1 font-mono">
                {metrics.topKerfMm} → {metrics.bottomKerfMm} mm
              </p>
              <div className="text-[11px] text-cyan-300 mt-1 font-mono">
                θ: {metrics.effectiveTaperDeg}° ({metrics.taperPerSideMm} mm/lado)
              </div>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Caudal & Potencia Hidráulica
              </span>
              <p className="text-lg font-bold text-white mt-1 font-mono">
                {metrics.waterFlowLMin} <span className="text-xs font-normal text-slate-400">L/min</span> • <span className="text-cyan-400">{metrics.hydraulicPowerKw} kW_h</span>
              </p>
              <div className="text-[10px] text-slate-400 mt-1 font-mono leading-tight truncate">
                <span>Motor Eléctrico: <strong className="text-amber-400">{metrics.electricPowerKw} kW</strong> ({metrics.electricPowerHp} HP)</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Costo Operativo Estimado
              </span>
              <p className="text-2xl font-bold text-rose-400 mt-1 font-mono">
                ${metrics.totalCostPerMeterUsd} <span className="text-xs font-normal text-slate-400">USD/m</span>
              </p>
              <div className="text-[10px] text-slate-400 mt-1 font-mono leading-tight truncate">
                <span>Granate: ${metrics.abrasiveCostPerMeterUsd}</span> • <span>Energía: ${metrics.powerAndConsumablesPerMeterUsd}</span>
              </div>
            </div>
          </div>

          {/* Real-Time Kerf & Jet Lag SVG Cross-Section Visualizer */}
          <div className="bg-[#060911] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <Activity className="w-3.5 h-3.5" />
                Visualización Gráfica del Frente de Corte y Deformación (Kerf Geometry)
              </span>
              <span className="text-amber-400 font-mono">
                Jet Lag L_lag: {metrics.jetLagMm} mm
              </span>
            </div>

            {/* SVG Visualizer */}
            <div className="w-full h-52 bg-slate-950/80 rounded-lg border border-slate-900 flex items-center justify-center p-2">
              <svg viewBox="0 0 520 180" className="w-full h-full">
                {/* Background Grid */}
                <line x1="20" y1="40" x2="500" y2="40" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="20" y1="140" x2="500" y2="140" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

                {/* Left Side: Front View (Kerf Taper) */}
                <g transform="translate(45, 0)">
                  <text x="75" y="16" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    VISTA FRONTAL: CONICIDAD (TAPER)
                  </text>
                  {/* Upper Material Surface */}
                  <rect x="0" y="40" width="65" height="100" fill="#334155" stroke="#475569" strokeWidth="1" />
                  <rect x="85" y="40" width="65" height="100" fill="#334155" stroke="#475569" strokeWidth="1" />

                  {/* Cut Slot Kerf Polygon */}
                  <polygon
                    points={`65,40 ${65 + (fiveAxisActive ? 20 : 20)},40 ${85 - (fiveAxisActive ? 0 : 6)},140 ${65 + (fiveAxisActive ? 0 : 6)},140`}
                    fill="#00F0FF"
                    fillOpacity="0.25"
                    stroke="#00F0FF"
                    strokeWidth="1.5"
                  />

                  {/* Dimension Annotations */}
                  <text x="75" y="56" fill="#00F0FF" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                    W_top: {metrics.topKerfMm} mm
                  </text>
                  <text x="75" y="132" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                    W_bottom: {metrics.bottomKerfMm} mm
                  </text>

                  {/* 5 Axis Status Label */}
                  <text x="75" y="162" fill={fiveAxisActive ? '#10B981' : '#F59E0B'} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    {fiveAxisActive ? 'Pared Recta a 90,00°' : `Conicidad: ${metrics.effectiveTaperDeg}°`}
                  </text>
                </g>

                {/* Right Side: Side View (Stream / Jet Lag Curve) */}
                <g transform="translate(265, 0)">
                  <text x="105" y="16" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    VISTA LATERAL: RETARDO DE COLA (JET LAG)
                  </text>

                  {/* CNC Travel Vector Arrow (Clear separation below title) */}
                  <line x1="30" y1="32" x2="175" y2="32" stroke="#EA580C" strokeWidth="1.5" />
                  <text x="102" y="27" fill="#EA580C" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    Avance CNC ({metrics.feedRateMmMin} mm/min) ──►
                  </text>

                  {/* Metal Block */}
                  <rect x="20" y="40" width="170" height="100" fill="#1e293b" stroke="#334155" strokeWidth="1" />

                  {/* Curved Stream Lag Front Line */}
                  <path
                    d={`M 140,40 Q 135,90 ${140 - Math.min(60, Number(metrics.jetLagMm) * 8)},140`}
                    fill="none"
                    stroke="#00F0FF"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Vertical Reference Line */}
                  <line x1="140" y1="40" x2="140" y2="140" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Lag Distance Annotation */}
                  <line
                    x1={140 - Math.min(60, Number(metrics.jetLagMm) * 8)}
                    y1="148"
                    x2="140"
                    y2="148"
                    stroke="#EA580C"
                    strokeWidth="1.5"
                  />
                  <text x={140 - Math.min(60, Number(metrics.jetLagMm) * 4)} y="164" fill="#EA580C" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    L_lag: {metrics.jetLagMm} mm
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
