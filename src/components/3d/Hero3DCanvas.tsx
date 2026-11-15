import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0f1d, 0.04);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);
    camera.lookAt(0, 0.2, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 2.5, 12);
    emeraldLight.position.set(2, 3, 2);
    scene.add(emeraldLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2.0, 12);
    cyanLight.position.set(-3, 2, 1);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 1.5, 8);
    goldLight.position.set(0, -1, 3);
    scene.add(goldLight);

    // 5. Centerpiece: Stylized 3D Metallic Shopping Cart with Groceries
    const cartGroup = new THREE.Group();
    cartGroup.position.set(0, -0.2, 0);
    scene.add(cartGroup);

    // Cart Basket Wireframe Cage
    const basketGeo = new THREE.BoxGeometry(1.6, 1.0, 2.0);
    const basketMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.85,
      roughness: 0.15,
      wireframe: true
    });
    const basket = new THREE.Mesh(basketGeo, basketMat);
    basket.position.y = 0.5;
    cartGroup.add(basket);

    // Inside Solid Accent Liner
    const linerGeo = new THREE.BoxGeometry(1.55, 0.95, 1.95);
    const linerMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      roughness: 0.4,
      transparent: true,
      opacity: 0.45
    });
    const liner = new THREE.Mesh(linerGeo, linerMat);
    liner.position.y = 0.5;
    cartGroup.add(liner);

    // Cart Wheels
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 });
    const wheelGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.12, 16);
    [
      [-0.75, -0.2, -0.8],
      [0.75, -0.2, -0.8],
      [-0.75, -0.2, 0.8],
      [0.75, -0.2, 0.8]
    ].forEach(([wx, wy, wz]) => {
      const w = new THREE.Mesh(wheelGeo, wheelMat);
      w.rotation.z = Math.PI / 2;
      w.position.set(wx, wy, wz);
      cartGroup.add(w);
    });

    // Grocery Items Packed inside the Cart
    // 1. Milk carton (Blue)
    const milkGeo = new THREE.BoxGeometry(0.4, 0.7, 0.4);
    const milkMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
    const milk = new THREE.Mesh(milkGeo, milkMat);
    milk.position.set(-0.35, 0.65, -0.4);
    milk.rotation.y = 0.2;
    cartGroup.add(milk);

    // 2. Grain sack (Golden amber)
    const grainGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.65, 16);
    const grainMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8 });
    const grain = new THREE.Mesh(grainGeo, grainMat);
    grain.position.set(0.35, 0.6, -0.2);
    grain.rotation.z = -0.15;
    cartGroup.add(grain);

    // 3. Soda Can (Red)
    const canGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.55, 16);
    const canMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.8 });
    const can = new THREE.Mesh(canGeo, canMat);
    can.position.set(0, 0.55, 0.4);
    cartGroup.add(can);

    // 4. Bread Loaf (Brown)
    const breadGeo = new THREE.BoxGeometry(0.5, 0.3, 0.7);
    const breadMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7 });
    const bread = new THREE.Mesh(breadGeo, breadMat);
    bread.position.set(-0.3, 0.45, 0.3);
    bread.rotation.y = -0.3;
    cartGroup.add(bread);

    // 6. Floating Ambient Grocery Particles / Sparkles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 8;
      scales[i / 3] = Math.random() * 0.08 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.06,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Mouse Tilt Interaction
    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = (e.clientX / innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / innerHeight) * 2 + 1;
      targetRotY = mouseX * 0.4;
      targetRotX = mouseY * 0.15;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 8. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle floating bob for the cart
      cartGroup.position.y = -0.2 + Math.sin(elapsed * 1.5) * 0.08;
      cartGroup.rotation.y += (targetRotY - cartGroup.rotation.y) * 0.05 + 0.003;
      cartGroup.rotation.x += (targetRotX - cartGroup.rotation.x) * 0.05;

      // Particle subtle flow
      particles.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
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
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div ref={mountRef} className="w-full h-full opacity-90" />
      
      {/* Subtle bottom vignette gradient to blend seamlessly into UI */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#090D16] to-transparent pointer-events-none" />
    </div>
  );
};
