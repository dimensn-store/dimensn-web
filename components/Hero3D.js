'use client';
import { useEffect, useRef, useState } from 'react';

// Three.js hero: slow idle rotation, mouse parallax, scroll orbit.
// Falls back to the poster image if WebGL or the model is unavailable.
export default function Hero3D({ model, alt }) {
  const box = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!model || !box.current) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import('three');
      const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
      if (disposed) return;

      const el = box.current;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch {
        return; // no WebGL: poster stays
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      el.appendChild(renderer.domElement);
      renderer.domElement.setAttribute('aria-hidden', 'true');

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0, 5);

      scene.add(new THREE.HemisphereLight(0xc9ccd1, 0x0a0a0b, 0.6));
      const key = new THREE.DirectionalLight(0xf2f3f5, 1.6); key.position.set(2.5, 3, 4); scene.add(key);
      const rim = new THREE.DirectionalLight(0xbfd8ff, 2.4); rim.position.set(-3, 1.5, -3); scene.add(rim);
      const sage = new THREE.PointLight(0x9fbfa8, 6, 10); sage.position.set(2, -1.5, 1.5); scene.add(sage);

      const pivot = new THREE.Group();
      scene.add(pivot);

      const resize = () => {
        const w = el.clientWidth, h = el.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / Math.max(h, 1);
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize); ro.observe(el);

      let gltf;
      try {
        gltf = await new GLTFLoader().loadAsync(model);
      } catch {
        renderer.dispose(); renderer.domElement.remove(); ro.disconnect();
        return;
      }
      if (disposed) return;

      const obj = gltf.scene;
      const b = new THREE.Box3().setFromObject(obj);
      const size = b.getSize(new THREE.Vector3()).length() || 1;
      const center = b.getCenter(new THREE.Vector3());
      obj.position.sub(center);
      obj.scale.setScalar(3.2 / size);
      pivot.add(obj);
      setLive(true);

      let mx = 0, my = 0, visible = true, raf = 0;
      const onMove = (e) => { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = (e.clientY / window.innerHeight - 0.5) * 2; };
      if (!reduce) window.addEventListener('pointermove', onMove, { passive: true });

      const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) loop(); });
      io.observe(el);
      const onVis = () => { if (!document.hidden) loop(); };
      document.addEventListener('visibilitychange', onVis);

      const clock = new THREE.Clock();
      function loop() {
        cancelAnimationFrame(raf);
        if (!visible || document.hidden) return;
        const t = clock.getElapsedTime();
        if (!reduce) {
          const scroll = Math.min(window.scrollY / Math.max(el.clientHeight, 1), 1);
          pivot.rotation.y = t * 0.25 + scroll * 1.2;
          pivot.position.y = Math.sin(t * 0.8) * 0.05;
          camera.position.x += (mx * 0.35 - camera.position.x) * 0.05;
          camera.position.y += (-my * 0.25 + scroll * 0.4 - camera.position.y) * 0.05;
          camera.lookAt(0, 0, 0);
        } else {
          pivot.rotation.y = 0.5;
        }
        renderer.render(scene, camera);
        if (!reduce) raf = requestAnimationFrame(loop);
      }
      loop();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect(); ro.disconnect();
        window.removeEventListener('pointermove', onMove);
        document.removeEventListener('visibilitychange', onVis);
        obj.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
          mats.forEach((m) => { Object.values(m).forEach((v) => v && v.isTexture && v.dispose()); m.dispose(); });
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, [model]);

  return (
    <div className={'hero-stage' + (live ? ' is-live' : '')} ref={box} role="img" aria-label={alt}>
    </div>
  );
}
