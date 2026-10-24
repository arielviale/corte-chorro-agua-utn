import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Play, Pause, Layers, Sliders, ShieldCheck, Zap, Info } from 'lucide-react';

interface WaterjetHead3DProps {
  className?: string;
  theme?: 'dark' | 'light';
  showControls?: boolean;
}

export default function WaterjetHead3D({
  className = 'w-full h-full min-h-[300px]',
  theme = 'dark',
  showControls = true
}: WaterjetHead3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [tiltAngle, setTiltAngle] = useState<number>(0); // 5-axis tilt in degrees
  const [activeComponent, setActiveComponent] = useState<string>('all');
  const [isWaterActive, setIsWaterActive] = useState<boolean>(true);

  // References for animation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const headGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const jetMeshRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(2.8, 1.6, 3.8);
    camera.lookAt(0, 0.2, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- Lighting (Clean Industrial Studio Lighting) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 0.7 : 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.2);
    fillLight.position.set(-4, 2, -3);
    scene.add(fillLight);

    const orangeAccentLight = new THREE.PointLight(0xea580c, 3.5, 5);
    orangeAccentLight.position.set(0, 0.8, 1.2);
    scene.add(orangeAccentLight);

    // --- Materials (PBR Industrial Steel & Anodized Orange) ---
    const stainlessSteel = new THREE.MeshStandardMaterial({
      color: 0xc8d1dc,
      metalness: 0.9,
      roughness: 0.18,
    });

    const brushedAlloy = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.85,
      roughness: 0.35,
    });

    const tungstenCarbide = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.92,
      roughness: 0.12,
    });

    const precisionOrange = new THREE.MeshStandardMaterial({
      color: 0xea580c,
      metalness: 0.5,
      roughness: 0.25,
      emissive: 0xea580c,
      emissiveIntensity: 0.2,
    });

    const diamondGlow = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.1,
      roughness: 0.05,
      emissive: 0x0284c7,
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0.9,
    });

    // --- The 3D Waterjet Head Assembly Group ---
    const headGroup = new THREE.Group();
    headGroupRef.current = headGroup;
    scene.add(headGroup);

    // 1. Actuador Neumático Superior (Pneumatic On/Off Actuator)
    const actuatorGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.65, 32);
    const actuator = new THREE.Mesh(actuatorGeo, stainlessSteel);
    actuator.position.y = 1.6;
    actuator.castShadow = true;
    headGroup.add(actuator);

    // Actuator Top Cap & Autofrettaged UHP High Pressure Fitting
    const topCapGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.1, 32);
    const topCap = new THREE.Mesh(topCapGeo, brushedAlloy);
    topCap.position.y = 1.95;
    headGroup.add(topCap);

    const uhpPortGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.35, 16);
    const uhpPort = new THREE.Mesh(uhpPortGeo, precisionOrange);
    uhpPort.position.y = 2.15;
    headGroup.add(uhpPort);

    // High Pressure autofrettaged coiled line ring
    const coilGeo = new THREE.TorusGeometry(0.18, 0.04, 16, 32);
    const coil = new THREE.Mesh(coilGeo, stainlessSteel);
    coil.position.set(0, 2.2, 0);
    coil.rotation.x = Math.PI / 2;
    headGroup.add(coil);

    // 2. Bloque de Válvula y Orificio Primario de Diamante
    const valveBlockGeo = new THREE.BoxGeometry(0.48, 0.42, 0.48);
    const valveBlock = new THREE.Mesh(valveBlockGeo, stainlessSteel);
    valveBlock.position.y = 1.15;
    valveBlock.castShadow = true;
    headGroup.add(valveBlock);

    // Diamond Jewel Orifice Visual Indicator Ring
    const jewelIndicatorGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.08, 24);
    const jewelIndicator = new THREE.Mesh(jewelIndicatorGeo, diamondGlow);
    jewelIndicator.position.y = 0.92;
    headGroup.add(jewelIndicator);

    // 3. Cámara de Mezcla Venturi (Vacuum Chamber Body)
    const chamberGeo = new THREE.CylinderGeometry(0.24, 0.20, 0.45, 32);
    const chamber = new THREE.Mesh(chamberGeo, stainlessSteel);
    chamber.position.y = 0.72;
    chamber.castShadow = true;
    headGroup.add(chamber);

    // Entrada lateral a 45° para Granate Abrasivo (Abrasive Inlet Port)
    const inletGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.55, 20);
    const inlet = new THREE.Mesh(inletGeo, stainlessSteel);
    inlet.position.set(0.24, 0.76, 0);
    inlet.rotation.z = -Math.PI / 4;
    inlet.castShadow = true;
    headGroup.add(inlet);

    // Abrasive Feed Hose Coupling (Anodized Orange Ring)
    const couplingGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.12, 20);
    const coupling = new THREE.Mesh(couplingGeo, precisionOrange);
    coupling.position.set(0.42, 0.94, 0);
    coupling.rotation.z = -Math.PI / 4;
    headGroup.add(coupling);

    // 4. Tuerca Collet & Tubo Focalizador ROCTEC (Carburo de Tungsteno)
    const colletNutGeo = new THREE.CylinderGeometry(0.22, 0.16, 0.18, 6); // Hexagonal nut
    const colletNut = new THREE.Mesh(colletNutGeo, brushedAlloy);
    colletNut.position.y = 0.45;
    headGroup.add(colletNut);

    const roctecTubeGeo = new THREE.CylinderGeometry(0.045, 0.04, 0.9, 24);
    const roctecTube = new THREE.Mesh(roctecTubeGeo, tungstenCarbide);
    roctecTube.position.y = -0.05;
    roctecTube.castShadow = true;
    headGroup.add(roctecTube);

    // Boquilla de carburo pulida
    const nozzleTipGeo = new THREE.ConeGeometry(0.045, 0.08, 24);
    const nozzleTip = new THREE.Mesh(nozzleTipGeo, tungstenCarbide);
    nozzleTip.position.y = -0.52;
    nozzleTip.rotation.x = Math.PI;
    headGroup.add(nozzleTip);

    // 5. Chorro de Agua Supersónico (Mach 3.06 Jet Stream)
    const jetGeo = new THREE.CylinderGeometry(0.015, 0.022, 0.55, 16);
    const jetMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.8,
      transparent: true,
      opacity: 0.92,
      roughness: 0.05,
    });
    const jetMesh = new THREE.Mesh(jetGeo, jetMat);
    jetMesh.position.y = -0.82;
    headGroup.add(jetMesh);
    jetMeshRef.current = jetMesh;

    // 6. Placa de Corte / Chapa de Acero con Sangría (Workpiece Plate)
    const plateGroup = new THREE.Group();
    scene.add(plateGroup);

    const plateMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x334155 : 0x94a3b8,
      metalness: 0.8,
      roughness: 0.3,
    });

    const plateGeo = new THREE.BoxGeometry(2.4, 0.12, 1.8);
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.set(0, -1.15, 0);
    plate.receiveShadow = true;
    plateGroup.add(plate);

    // Kerf Slit Line (Ranura de Corte en la chapa)
    const slitGeo = new THREE.BoxGeometry(1.6, 0.14, 0.035);
    const slitMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const slit = new THREE.Mesh(slitGeo, slitMat);
    slit.position.set(0, -1.14, 0);
    plateGroup.add(slit);

    // Micro-erosion Kerf Glow Indicator
    const kerfGlowGeo = new THREE.BoxGeometry(0.25, 0.145, 0.05);
    const kerfGlowMat = new THREE.MeshBasicMaterial({ color: 0xea580c });
    const kerfGlow = new THREE.Mesh(kerfGlowGeo, kerfGlowMat);
    kerfGlow.position.set(0, -1.135, 0);
    plateGroup.add(kerfGlow);

    // 7. Sistema de Partículas de Salpicadura / Erosión Abrasiva
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = -1.08;
      positions[i * 3 + 2] = 0;

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.03 + Math.random() * 0.06;
      velocities.push({
        x: Math.cos(angle) * speed,
        y: 0.02 + Math.random() * 0.05,
        z: Math.sin(angle) * speed,
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.04,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // --- Interactive Orbit Drag via Mouse ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0.4;
    let targetRotationX = 0.15;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-0.4, Math.min(0.8, targetRotationX));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(2.2, Math.min(6.5, camera.position.z + e.deltaY * 0.003));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // --- Animation Loop ---
    let time = 0;
    const animate = () => {
      time += 0.02;

      // Rotation damping
      if (!isDragging && isPlaying) {
        targetRotationY += 0.004;
      }

      scene.rotation.y += (targetRotationY - scene.rotation.y) * 0.08;
      scene.rotation.x += (targetRotationX - scene.rotation.x) * 0.08;

      // Jet stream pulse animation
      if (jetMeshRef.current) {
        jetMeshRef.current.scale.x = 0.95 + Math.sin(time * 30) * 0.08;
        jetMeshRef.current.scale.z = 0.95 + Math.cos(time * 30) * 0.08;
      }

      // Splash particles update
      if (particlesRef.current && isWaterActive) {
        const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          posArray[idx] += velocities[i].x;
          posArray[idx + 1] += velocities[i].y;
          posArray[idx + 2] += velocities[i].z;
          velocities[i].y -= 0.003; // gravity

          // Reset particle if it falls below plate or travels too far
          if (posArray[idx + 1] < -1.15 || Math.hypot(posArray[idx], posArray[idx + 2]) > 0.8) {
            posArray[idx] = 0;
            posArray[idx + 1] = -1.08;
            posArray[idx + 2] = 0;
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.025 + Math.random() * 0.055;
            velocities[i].x = Math.cos(angle) * speed;
            velocities[i].y = 0.02 + Math.random() * 0.045;
            velocities[i].z = Math.sin(angle) * speed;
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [theme, isPlaying, isWaterActive]);

  // Update Tilt Angle dynamically (5-Axis Demonstration)
  useEffect(() => {
    if (headGroupRef.current) {
      const rad = (tiltAngle * Math.PI) / 180;
      headGroupRef.current.rotation.z = rad;
    }
  }, [tiltAngle]);

  return (
    <div className={`relative flex flex-col justify-between overflow-hidden rounded-2xl select-none ${
      theme === 'dark' ? 'bg-[#0B0F19] text-white border border-slate-800' : 'bg-white text-[#0F172A] border border-[#E2E8F0]'
    } ${className}`}>
      
      {/* 3D WebGL Canvas Viewport */}
      <div 
        ref={containerRef} 
        className="w-full h-full min-h-[300px] flex-1 cursor-grab active:cursor-grabbing"
        title="Arrastra con el ratón para rotar en 3D 360° • Rueda para zoom"
      />

      {/* Floating 3D Badges & Telemetry */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none flex flex-col gap-1.5 font-mono text-xs">
        <div className="flex items-center gap-2 bg-[#0F172A]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 shadow-md">
          <div className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
          <span className="font-bold text-white text-[11px]">Cabezal AWJ 4.0</span>
          <span className="text-slate-400 text-[10px]">P_UHP: 6.480 bar</span>
        </div>

        <div className="bg-[#0F172A]/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-800 text-[10px] text-slate-300 w-fit">
          <span>Inclinación 5 Ejes: </span>
          <strong className="text-[#EA580C]">{tiltAngle.toFixed(1)}°</strong>
          <span> {tiltAngle === 0 ? '(θ = 0,00° Compensado)' : '(Biselado Activo)'}</span>
        </div>
      </div>

      {/* Floating Action Controls for Presentation */}
      {showControls && (
        <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 bg-[#0F172A]/85 backdrop-blur-md p-2.5 rounded-xl border border-slate-700 text-xs font-mono">
          {/* Left: 5-Axis Kinematic Tilt Toggles */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] hidden sm:inline">Cinemática:</span>
            <button
              onClick={() => setTiltAngle(0)}
              className={`px-2.5 py-1 rounded transition text-[11px] font-semibold ${
                tiltAngle === 0
                  ? 'bg-[#EA580C] text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              θ = 0,00° (Perpendicular)
            </button>
            <button
              onClick={() => setTiltAngle(-4)}
              className={`px-2.5 py-1 rounded transition text-[11px] font-semibold ${
                tiltAngle === -4
                  ? 'bg-[#EA580C] text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              -4° Taper
            </button>
            <button
              onClick={() => setTiltAngle(8)}
              className={`px-2.5 py-1 rounded transition text-[11px] font-semibold ${
                tiltAngle === 8
                  ? 'bg-[#EA580C] text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              +8° Bisel 3D
            </button>
          </div>

          {/* Right: Jet and Orbit Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWaterActive(!isWaterActive)}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition ${
                isWaterActive
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : 'bg-slate-800 text-slate-400'
              }`}
              title="Encender / Apagar chorro supersónico"
            >
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>{isWaterActive ? 'Chorro ON' : 'Chorro OFF'}</span>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title={isPlaying ? 'Pausar rotación automática' : 'Reanudar rotación automática'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
