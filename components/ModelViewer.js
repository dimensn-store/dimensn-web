'use client';
import { useEffect, useState } from 'react';

export default function ModelViewer({ src, poster, alt }) {
  const [ready, setReady] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    import('@google/model-viewer').then(() => setReady(true)).catch(() => {});
  }, []);

  if (!ready) return <img src={poster} alt={alt} className="mv-poster" />;

  const extra = reduce ? {} : { 'auto-rotate': '' };
  return (
    <model-viewer
      src={src}
      poster={poster}
      alt={alt}
      camera-controls=""
      touch-action="pan-y"
      shadow-intensity="0.9"
      exposure="1.15"
      environment-image="neutral"
      ar=""
      ar-modes="webxr scene-viewer quick-look"
      {...extra}
      class="mv"
    >
      <button slot="ar-button" className="btn btn-ghost mv-ar">View in your space</button>
    </model-viewer>
  );
}
