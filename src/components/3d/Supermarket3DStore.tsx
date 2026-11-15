import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Store, ShoppingCart, Eye, ArrowLeft, Plus, Check,
  Sparkles, Maximize2, Zap, Info, Volume2, VolumeX, ShieldCheck
} from 'lucide-react';
import { Product, SupermarketCategory, PerformanceMode } from '../../types';

interface Supermarket3DStoreProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onClose: () => void;
  performanceMode?: PerformanceMode;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Supermarket3DStore: React.FC<Supermarket3DStoreProps> = ({
  products,
  onAddToCart,
  onSelectProduct,
  onClose,
  performanceMode = 'high',
  cartCount = 0,
  onOpenCart
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeAisle, setActiveAisle] = useState<string>('all');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [fps, setFps] = useState<number>(60);
  const [perf, setPerf] = useState<PerformanceMode>(performanceMode);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const productMeshMap = useRef<Map<THREE.Object3D, Product>>(new Map());
  const cartGroupRef = useRef<THREE.Group | null>(null);

  const aisles = [
    { id: 'all', name: 'Supermarket Overview', icon: '🏪' },
    { id: 'Rice & Grains', name: 'Aisle 1: Grains & Staples', icon: '🍚' },
    { id: 'Dairy & Eggs', name: 'Aisle 2: Dairy & Fresh', icon: '🥛' },
    { id: 'Snacks', name: 'Aisle 3: Snacks & Munchies', icon: '🍿' },
    { id: 'Home Cleaning', name: 'Aisle 4: Home & Cleaning', icon: '🧼' },
    { id: 'Breakfast Items', name: 'Aisle 5: Breakfast & Bakery', icon: '☕' },
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0f1d);
    scene.fog = new THREE.FogExp2(0x0a0f1d, perf === 'high' ? 0.025 : 0.04);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 3.5, 11);
    camera.lookAt(0, 1.5, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: perf !== 'lite', powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(perf === 'high' ? Math.min(window.devicePixelRatio, 2) : 1);
    if (perf === 'high') {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
    }
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, perf === 'high' ? 1.0 : 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff5ea, 1.8);
    mainLight.position.set(5, 12, 6);
    if (perf === 'high') {
      mainLight.castShadow = true;
      mainLight.shadow.mapSize.width = 1024;
      mainLight.shadow.mapSize.height = 1024;
      mainLight.shadow.bias = -0.001;
    }
    scene.add(mainLight);

    // Store Ceiling Spotlights (Warm & Modern supermarket glow)
    const aisleColors = [0x10b981, 0x06b6d4, 0xf59e0b, 0xec4899];
    aisleColors.forEach((col, idx) => {
      const x = (idx - 1.5) * 5;
      const spot = new THREE.PointLight(col, 1.2, 10);
      spot.position.set(x, 4.5, 0);
      scene.add(spot);
    });

    // 5. Floor (Clean Supermarket Polished Tile Grid)
    const floorGeo = new THREE.PlaneGeometry(36, 36, 16, 16);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = perf === 'high';
    scene.add(floor);

    // Floor Aisle Guides
    const guideGeo = new THREE.PlaneGeometry(28, 0.08);
    const guideMat = new THREE.MeshBasicMaterial({ color: 0x10b981, opacity: 0.3, transparent: true });
    for (let z = -6; z <= 6; z += 4) {
      const g = new THREE.Mesh(guideGeo, guideMat);
      g.rotation.x = -Math.PI / 2;
      g.position.set(0, 0.01, z);
      scene.add(g);
    }

    // 6. Supermarket Shelving Units & Products
    productMeshMap.current.clear();
    const shelfCategories: SupermarketCategory[] = [
      'Rice & Grains',
      'Dairy & Eggs',
      'Snacks',
      'Home Cleaning',
      'Breakfast Items'
    ];

    shelfCategories.forEach((cat, aisleIdx) => {
      const aisleX = (aisleIdx - 2) * 5.2;

      // Shelf Frame
      const shelfGroup = new THREE.Group();
      shelfGroup.position.set(aisleX, 0, 0);

      // Shelf Pillars
      const pillarMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
      const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.2, 0.12), pillarMat);
      p1.position.set(-1.6, 1.6, -1.8);
      const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.2, 0.12), pillarMat);
      p2.position.set(1.6, 1.6, -1.8);
      const p3 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.2, 0.12), pillarMat);
      p3.position.set(-1.6, 1.6, 1.8);
      const p4 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.2, 0.12), pillarMat);
      p4.position.set(1.6, 1.6, 1.8);
      shelfGroup.add(p1, p2, p3, p4);

      // 3 Shelf Planks
      const plankMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
      [0.6, 1.4, 2.2].forEach((y, tierIdx) => {
        const plank = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.08, 3.8), plankMat);
        plank.position.y = y;
        plank.receiveShadow = perf === 'high';
        shelfGroup.add(plank);

        // Populate Products on this plank
        const categoryProducts = products.filter(p => p.category === cat);
        const prod = categoryProducts[tierIdx % categoryProducts.length] || products[0];

        if (prod) {
          // Add 3 item replicas on each shelf tier
          [-0.9, 0, 0.9].forEach((itemX, slotIdx) => {
            const itemMesh = createProduct3DMesh(prod, perf);
            itemMesh.position.set(itemX, y + 0.32, (slotIdx % 2 === 0 ? 0.6 : -0.6));
            itemMesh.castShadow = perf === 'high';
            shelfGroup.add(itemMesh);

            // Register in raycast map
            productMeshMap.current.set(itemMesh, prod);
          });
        }
      });

      // Neon Overhead Aisle Board
      const signGroup = new THREE.Group();
      signGroup.position.set(0, 3.6, 0);

      const signBoard = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.6, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x022c22, roughness: 0.2 })
      );
      signGroup.add(signBoard);

      const neonRim = new THREE.Mesh(
        new THREE.BoxGeometry(2.45, 0.65, 0.08),
        new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true })
      );
      signGroup.add(neonRim);

      shelfGroup.add(signGroup);
      scene.add(shelfGroup);
    });

    // 7. Animated Shopping Cart Model
    const cartGroup = new THREE.Group();
    cartGroup.position.set(1.5, 0, 4.5);

    // Cart Basket
    const basketMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.9, roughness: 0.1 });
    const basket = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.65, 1.2), basketMat);
    basket.position.y = 0.85;
    basket.castShadow = perf === 'high';
    cartGroup.add(basket);

    // Cart Handle
    const handle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.9, 12),
      new THREE.MeshStandardMaterial({ color: 0xef4444 })
    );
    handle.rotation.z = Math.PI / 2;
    handle.position.set(0, 1.2, -0.65);
    cartGroup.add(handle);

    // Cart Wheels
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
    [[-0.4, 0.15, -0.5], [0.4, 0.15, -0.5], [-0.4, 0.15, 0.5], [0.4, 0.15, 0.5]].forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16), wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wx, wy, wz);
      cartGroup.add(wheel);
    });

    scene.add(cartGroup);
    cartGroupRef.current = cartGroup;

    // 8. Raycasting for Product Clicks & Drag Orbiting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let isDragging = false;
    let pointerDownX = 0;
    let pointerDownY = 0;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let targetCameraX = 0;
    let targetCameraY = 3.5;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      pointerDownX = e.clientX;
      pointerDownY = e.clientY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      targetCameraX = THREE.MathUtils.clamp(targetCameraX - deltaX * 0.02, -9, 9);
      targetCameraY = THREE.MathUtils.clamp(targetCameraY + deltaY * 0.015, 1.8, 6.0);
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      const distance = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);
      // If moved less than 8px, it was a click/tap on a product!
      if (distance < 8) {
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(Array.from(productMeshMap.current.keys()), true);

        if (intersects.length > 0) {
          let hitObj: THREE.Object3D | null = intersects[0].object;
          while (hitObj && !productMeshMap.current.has(hitObj)) {
            hitObj = hitObj.parent;
          }
          if (hitObj && productMeshMap.current.has(hitObj)) {
            const hitProd = productMeshMap.current.get(hitObj)!;
            setSelectedProduct(hitProd);

            // Bounce effect on clicked mesh
            hitObj.scale.set(1.25, 1.25, 1.25);
            setTimeout(() => {
              hitObj?.scale.set(1, 1, 1);
            }, 300);
          }
        }
      }
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // 10. Animation Loop & FPS calculation
    let animId: number;
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      // Smooth camera interpolation
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(targetCameraX * 0.5, 1.5, 0);

      // Subtle Cart Hover & Wheel rotation
      if (cartGroupRef.current) {
        cartGroupRef.current.position.y = Math.sin(time * 0.003) * 0.03;
      }

      // FPS tracking
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = time;
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      renderer.dispose();
    };
  }, [products, perf]);

  // Navigate to specific aisle
  const handleAisleJump = (aisleCategory: string) => {
    setActiveAisle(aisleCategory);
    if (!cameraRef.current) return;

    if (aisleCategory === 'all') {
      cameraRef.current.position.set(0, 3.5, 11);
    } else if (aisleCategory === 'Rice & Grains') {
      cameraRef.current.position.set(-8.5, 2.2, 5.0);
    } else if (aisleCategory === 'Dairy & Eggs') {
      cameraRef.current.position.set(-4.5, 2.2, 5.0);
    } else if (aisleCategory === 'Snacks') {
      cameraRef.current.position.set(0, 2.2, 5.0);
    } else if (aisleCategory === 'Home Cleaning') {
      cameraRef.current.position.set(4.5, 2.2, 5.0);
    } else if (aisleCategory === 'Breakfast Items') {
      cameraRef.current.position.set(8.5, 2.2, 5.0);
    }
  };

  const handleAddProduct = (prod: Product) => {
    onAddToCart(prod);
    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col text-slate-100 font-sans select-none animate-in fade-in duration-300">
      
      {/* Top Supermarket HUD Bar */}
      <div className="px-6 py-3 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Return to 2D Store</span>
          </button>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-extrabold text-white tracking-wide">
              SUPER MART 3D <span className="text-emerald-400">VIRTUAL AISLE WALKTHROUGH</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono hidden md:inline">
              WebGL 60 FPS
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 text-xs">
          {/* Performance Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-[11px] font-semibold">
            {(['high', 'balanced', 'lite'] as PerformanceMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setPerf(mode)}
                className={`px-2.5 py-1 rounded-lg capitalize cursor-pointer transition-all ${
                  perf === mode
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Toggle Supermarket Ambient Audio"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Viewport */}
      <div className="relative flex-1 w-full overflow-hidden">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating Quick Aisle Navigator */}
        <div className="absolute top-4 left-6 right-6 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pointer-events-auto">
          {aisles.map((a) => {
            const isActive = activeAisle === a.id;
            return (
              <button
                key={a.id}
                onClick={() => handleAisleJump(a.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md shadow-lg ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                    : 'bg-slate-900/85 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{a.icon}</span>
                <span>{a.name}</span>
              </button>
            );
          })}
        </div>

        {/* Instructions Overlay Bottom Left */}
        <div className="absolute bottom-6 left-6 p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5 max-w-xs pointer-events-none hidden md:block">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            <span>How to navigate 3D Supermarket:</span>
          </div>
          <p>• <strong>Click & Drag:</strong> Rotate your view across shelves</p>
          <p>• <strong>Click any Product:</strong> Inspect 3D packaging & add to cart</p>
          <p>• <strong>Aisle Buttons:</strong> Teleport directly to grocery aisles</p>
        </div>

        {/* Selected Product Inspection Drawer (Responsive bottom sheet on mobile, docked right on desktop) */}
        {selectedProduct && (
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-emerald-500/40 p-4 sm:p-5 shadow-2xl space-y-3 sm:space-y-4 animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto z-20">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="w-14 h-14 object-cover rounded-2xl bg-slate-950 border border-slate-800"
                />
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                    {selectedProduct.category}
                  </span>
                  <h4 className="text-sm font-bold text-white line-clamp-1">
                    {selectedProduct.name}
                  </h4>
                  <span className="text-xs text-slate-400 font-medium">
                    Weight: {selectedProduct.unit}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Price & Delivery */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-white font-mono">
                  ₹{selectedProduct.finalPrice}
                </span>
                {selectedProduct.mrp > selectedProduct.finalPrice && (
                  <span className="text-xs text-slate-500 line-through font-mono">
                    ₹{selectedProduct.mrp}
                  </span>
                )}
                {selectedProduct.discountPercentage > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    {selectedProduct.discountPercentage}% OFF
                  </span>
                )}
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {selectedProduct.deliveryEstimate}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onSelectProduct(selectedProduct)}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>360° View</span>
              </button>

              <button
                onClick={() => handleAddProduct(selectedProduct)}
                className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-md shadow-emerald-500/20"
              >
                {addedId === selectedProduct.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper: Generates procedural 3D Supermarket Item Mesh
function createProduct3DMesh(product: Product, perf: PerformanceMode): THREE.Group {
  const group = new THREE.Group();
  const archetype = product.model3D;

  if (archetype === 'grain_sack' || archetype === 'pouch_dal' || archetype === 'salt_pack') {
    // Grain sack / pouch
    const sackGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.55, perf === 'high' ? 16 : 8);
    const sackMat = new THREE.MeshStandardMaterial({
      color: archetype === 'salt_pack' ? 0x0284c7 : 0xd97706,
      roughness: 0.8
    });
    const sack = new THREE.Mesh(sackGeo, sackMat);
    sack.scale.set(1.1, 1, 0.75);
    group.add(sack);

    // Tied neck
    const tie = new THREE.Mesh(
      new THREE.TorusGeometry(0.12, 0.04, 8, 12),
      new THREE.MeshStandardMaterial({ color: 0x78350f })
    );
    tie.position.y = 0.3;
    tie.rotation.x = Math.PI / 2;
    group.add(tie);
  } else if (archetype === 'oil_bottle' || archetype === 'sauce_bottle' || archetype === 'cleaning_bottle') {
    // Oil/Sauce/Cleaner bottle
    const bodyGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.6, perf === 'high' ? 16 : 8);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: archetype === 'oil_bottle' ? 0xf59e0b : archetype === 'sauce_bottle' ? 0xdc2626 : 0x0284c7,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.92
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(body);

    // Cap
    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.12, 12),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
    );
    cap.position.y = 0.36;
    group.add(cap);
  } else if (archetype === 'milk_carton') {
    // Gable-top milk carton
    const cartonGeo = new THREE.BoxGeometry(0.35, 0.65, 0.35);
    const cartonMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.4 });
    const carton = new THREE.Mesh(cartonGeo, cartonMat);
    group.add(carton);
  } else if (archetype === 'beverage_can') {
    // Aluminum Soda Can
    const canGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.5, perf === 'high' ? 16 : 8);
    const canMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.9, roughness: 0.2 });
    const can = new THREE.Mesh(canGeo, canMat);
    group.add(can);
  } else if (archetype === 'chips_bag') {
    // Chips Pillow Bag
    const bagGeo = new THREE.BoxGeometry(0.4, 0.6, 0.2);
    const bagMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, metalness: 0.4, roughness: 0.3 });
    const bag = new THREE.Mesh(bagGeo, bagMat);
    group.add(bag);
  } else {
    // Standard Supermarket Grocery Box
    const boxGeo = new THREE.BoxGeometry(0.38, 0.55, 0.25);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.5 });
    const box = new THREE.Mesh(boxGeo, boxMat);
    group.add(box);
  }

  return group;
}
