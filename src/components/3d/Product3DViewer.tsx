import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCw, ZoomIn, ZoomOut, RefreshCw, Layers, Eye,
  Image as ImageIcon, Box, Sparkles, ShieldCheck, Check
} from 'lucide-react';
import { Model3DType, ColorVariant } from '../../types';

interface Product3DViewerProps {
  modelType: Model3DType;
  colorVariants?: ColorVariant[];
  selectedColor?: string;
  onColorChange?: (colorName: string) => void;
  fallbackImage?: string;
  productName: string;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({
  modelType,
  colorVariants = [],
  selectedColor = '',
  onColorChange,
  fallbackImage,
  productName
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'image'>('3d');
  const [autoRotate, setAutoRotate] = useState(true);
  const [isExploded, setIsExploded] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [lightingMode, setLightingMode] = useState<'studio' | 'fresh' | 'warm'>('fresh');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const productGroupRef = useRef<THREE.Group | null>(null);
  const materialRefs = useRef<THREE.MeshStandardMaterial[]>([]);
  const explodedPartsRef = useRef<{ mesh: THREE.Object3D; origY: number; expY: number }[]>([]);

  useEffect(() => {
    if (viewMode !== '3d') return;
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.8, 3.8);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Ground Pedestal (Supermarket Showcase Platter)
    const pedestalGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.15, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.4,
      metalness: 0.3
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.0;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    const ringGeo = new THREE.RingGeometry(1.62, 1.68, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide });
    const glowRing = new THREE.Mesh(ringGeo, ringMat);
    glowRing.rotation.x = -Math.PI / 2;
    glowRing.position.y = -0.92;
    scene.add(glowRing);

    // 5. Lighting Setup
    const ambient = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(3, 4, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x10b981, 1.4, 10);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    rimLight.position.set(0, -2, -3);
    scene.add(rimLight);

    // 6. Build High-Fidelity Procedural 3D Supermarket Item
    const productGroup = new THREE.Group();
    scene.add(productGroup);
    productGroupRef.current = productGroup;
    materialRefs.current = [];
    explodedPartsRef.current = [];

    buildSupermarket3DModel(modelType, productGroup, materialRefs, explodedPartsRef);

    // 7. Mouse Orbit Dragging
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !productGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      productGroupRef.current.rotation.y += deltaX * 0.01;
      productGroupRef.current.rotation.x += deltaY * 0.01;
      productGroupRef.current.rotation.x = THREE.MathUtils.clamp(productGroupRef.current.rotation.x, -0.6, 0.6);
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Zoom via wheel
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z = THREE.MathUtils.clamp(
        cameraRef.current.position.z + e.deltaY * 0.003,
        2.0,
        6.0
      );
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // 8. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging && productGroupRef.current) {
        productGroupRef.current.rotation.y += 0.008;
      }

      // Smooth Exploded View transition
      explodedPartsRef.current.forEach(part => {
        const target = isExploded ? part.expY : part.origY;
        part.mesh.position.y += (target - part.mesh.position.y) * 0.1;
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      renderer.dispose();
    };
  }, [viewMode, modelType]);

  // Wireframe Toggle
  useEffect(() => {
    materialRefs.current.forEach(mat => {
      mat.wireframe = isWireframe;
    });
  }, [isWireframe]);

  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const delta = direction === 'in' ? -0.5 : 0.5;
    cameraRef.current.position.z = THREE.MathUtils.clamp(cameraRef.current.position.z + delta, 2.0, 6.0);
  };

  const handleResetView = () => {
    if (productGroupRef.current && cameraRef.current) {
      productGroupRef.current.rotation.set(0, 0, 0);
      cameraRef.current.position.set(0, 0.8, 3.8);
      setAutoRotate(true);
      setIsExploded(false);
      setIsWireframe(false);
    }
  };

  return (
    <div className="relative w-full h-[460px] bg-slate-900/60 rounded-3xl border border-slate-800 overflow-hidden flex flex-col select-none">
      
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 pointer-events-auto shadow-lg">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
              viewMode === '3d'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Interactive</span>
          </button>
          {fallbackImage && (
            <button
              onClick={() => setViewMode('image')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                viewMode === 'image'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Packaging Photo</span>
            </button>
          )}
        </div>

        {/* 3D Action Tools */}
        {viewMode === '3d' && (
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 pointer-events-auto shadow-lg">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                autoRotate ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Toggle Auto Spin"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsExploded(!isExploded)}
              className={`p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                isExploded ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Packaging Layers (Exploded View)"
            >
              <Layers className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsWireframe(!isWireframe)}
              className={`p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                isWireframe ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Mesh Wireframe"
            >
              <Eye className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-800" />

            <button
              onClick={() => handleZoom('in')}
              className="p-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleZoom('out')}
              className="p-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetView}
              className="p-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
              title="Reset View"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Viewport Content */}
      <div className="relative flex-1 w-full h-full">
        {viewMode === '3d' ? (
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-8 bg-slate-950">
            <img
              src={fallbackImage}
              alt={productName}
              className="max-h-full max-w-full object-contain drop-shadow-2xl rounded-2xl"
            />
          </div>
        )}

        {/* 360 Drag Hint Tag */}
        {viewMode === '3d' && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-800 text-[11px] font-semibold text-slate-400 pointer-events-none flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Drag to rotate 360° • Scroll to zoom packaging</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Procedural Supermarket 3D Model Generator
function buildSupermarket3DModel(
  type: Model3DType,
  group: THREE.Group,
  materials: React.MutableRefObject<THREE.MeshStandardMaterial[]>,
  explodedParts: React.MutableRefObject<{ mesh: THREE.Object3D; origY: number; expY: number }[]>
) {
  if (type === 'grain_sack' || type === 'pouch_dal' || type === 'salt_pack') {
    // 1. Woven Burlap / Poly Pouch
    const bodyGeo = new THREE.CylinderGeometry(0.55, 0.65, 1.3, 32);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: type === 'salt_pack' ? 0x0284c7 : type === 'pouch_dal' ? 0xd97706 : 0x78350f,
      roughness: 0.8,
      bumpScale: 0.05
    });
    materials.current.push(bodyMat);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.scale.set(1.2, 1, 0.7);
    body.castShadow = true;
    group.add(body);
    explodedParts.current.push({ mesh: body, origY: 0, expY: -0.2 });

    // Top Sealed Hem / Tie
    const hemGeo = new THREE.BoxGeometry(1.3, 0.15, 0.2);
    const hemMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    materials.current.push(hemMat);
    const hem = new THREE.Mesh(hemGeo, hemMat);
    hem.position.y = 0.72;
    group.add(hem);
    explodedParts.current.push({ mesh: hem, origY: 0.72, expY: 1.1 });

    // Front Nutrition / Brand Label Plaque
    const labelGeo = new THREE.PlaneGeometry(0.8, 0.7);
    const labelMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3
    });
    materials.current.push(labelMat);
    const label = new THREE.Mesh(labelGeo, labelMat);
    label.position.set(0, 0, 0.46);
    group.add(label);
  } else if (type === 'oil_bottle' || type === 'sauce_bottle' || type === 'cleaning_bottle') {
    // 2. Oil / Sauce Squeezy Bottle with Liquid Core
    const bottleGeo = new THREE.CylinderGeometry(0.42, 0.48, 1.4, 32);
    const bottleMat = new THREE.MeshStandardMaterial({
      color: type === 'oil_bottle' ? 0xf59e0b : type === 'sauce_bottle' ? 0xdc2626 : 0x0284c7,
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85
    });
    materials.current.push(bottleMat);
    const bottle = new THREE.Mesh(bottleGeo, bottleMat);
    bottle.castShadow = true;
    group.add(bottle);
    explodedParts.current.push({ mesh: bottle, origY: 0, expY: 0 });

    // Flip Cap / Dispenser Nozzle
    const capGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.25, 24);
    const capMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    materials.current.push(capMat);
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 0.82;
    group.add(cap);
    explodedParts.current.push({ mesh: cap, origY: 0.82, expY: 1.3 });

    // Printed Product Wrap Label
    const wrapGeo = new THREE.CylinderGeometry(0.43, 0.43, 0.7, 32, 1, true);
    const wrapMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4 });
    materials.current.push(wrapMat);
    const wrap = new THREE.Mesh(wrapGeo, wrapMat);
    group.add(wrap);
    explodedParts.current.push({ mesh: wrap, origY: 0, expY: 0.2 });
  } else if (type === 'milk_carton') {
    // 3. Gable-Top Paper Milk Carton
    const cartonGeo = new THREE.BoxGeometry(0.8, 1.4, 0.8);
    const cartonMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.5 });
    materials.current.push(cartonMat);
    const carton = new THREE.Mesh(cartonGeo, cartonMat);
    carton.castShadow = true;
    group.add(carton);
    explodedParts.current.push({ mesh: carton, origY: 0, expY: 0 });

    // Gable Triangular Roof
    const roofGeo = new THREE.ConeGeometry(0.65, 0.4, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4 });
    materials.current.push(roofMat);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = 0.85;
    group.add(roof);
    explodedParts.current.push({ mesh: roof, origY: 0.85, expY: 1.25 });

    // Plastic Screw Cap
    const capGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16);
    const capMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    materials.current.push(capMat);
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(0.2, 0.95, 0.2);
    group.add(cap);
    explodedParts.current.push({ mesh: cap, origY: 0.95, expY: 1.45 });
  } else if (type === 'beverage_can') {
    // 4. Aluminum Soda Can
    const canGeo = new THREE.CylinderGeometry(0.42, 0.42, 1.3, 32);
    const canMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      metalness: 0.85,
      roughness: 0.2
    });
    materials.current.push(canMat);
    const can = new THREE.Mesh(canGeo, canMat);
    can.castShadow = true;
    group.add(can);
    explodedParts.current.push({ mesh: can, origY: 0, expY: 0 });

    // Silver Top Rim & Pull Tab
    const topGeo = new THREE.CylinderGeometry(0.4, 0.42, 0.08, 32);
    const silverMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 });
    materials.current.push(silverMat);
    const top = new THREE.Mesh(topGeo, silverMat);
    top.position.y = 0.69;
    group.add(top);
    explodedParts.current.push({ mesh: top, origY: 0.69, expY: 1.15 });
  } else if (type === 'bread_loaf') {
    // 5. Golden Baked Bread Loaf
    const loafGeo = new THREE.BoxGeometry(1.4, 0.75, 0.75);
    const loafMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.9 });
    materials.current.push(loafMat);
    const loaf = new THREE.Mesh(loafGeo, loafMat);
    loaf.castShadow = true;
    group.add(loaf);
    explodedParts.current.push({ mesh: loaf, origY: 0, expY: 0 });

    // Plastic Protective Sleeve
    const sleeveGeo = new THREE.BoxGeometry(1.45, 0.78, 0.78);
    const sleeveMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
      roughness: 0.1
    });
    materials.current.push(sleeveMat);
    const sleeve = new THREE.Mesh(sleeveGeo, sleeveMat);
    group.add(sleeve);
    explodedParts.current.push({ mesh: sleeve, origY: 0, expY: 0.4 });
  } else {
    // 6. Generic Supermarket Box / Carton
    const boxGeo = new THREE.BoxGeometry(0.85, 1.3, 0.45);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.4 });
    materials.current.push(boxMat);
    const box = new THREE.Mesh(boxGeo, boxMat);
    box.castShadow = true;
    group.add(box);
    explodedParts.current.push({ mesh: box, origY: 0, expY: 0 });

    // Inner foil liner
    const foilGeo = new THREE.BoxGeometry(0.8, 1.25, 0.4);
    const foilMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.1 });
    materials.current.push(foilMat);
    const foil = new THREE.Mesh(foilGeo, foilMat);
    group.add(foil);
    explodedParts.current.push({ mesh: foil, origY: 0, expY: 0.6 });
  }
}
