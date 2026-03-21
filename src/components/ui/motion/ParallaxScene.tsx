'use client';

import { useEffect, useRef } from 'react';

type ParallaxSceneProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ParallaxScene({
  children,
  className = '',
}: ParallaxSceneProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      node.style.setProperty('--pointer-x', '0px');
      node.style.setProperty('--pointer-y', '0px');
      node.style.setProperty('--pointer-glow-x', '50%');
      node.style.setProperty('--pointer-glow-y', '50%');
      return;
    }

    const update = (event: PointerEvent) => {
      const bounds = node.getBoundingClientRect();
      const relativeX = event.clientX - bounds.left;
      const relativeY = event.clientY - bounds.top;
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const x = ((relativeX - centerX) / bounds.width) * 32;
      const y = ((relativeY - centerY) / bounds.height) * 32;

      node.style.setProperty('--pointer-x', `${x.toFixed(2)}px`);
      node.style.setProperty('--pointer-y', `${y.toFixed(2)}px`);
      node.style.setProperty(
        '--pointer-glow-x',
        `${((relativeX / bounds.width) * 100).toFixed(2)}%`
      );
      node.style.setProperty(
        '--pointer-glow-y',
        `${((relativeY / bounds.height) * 100).toFixed(2)}%`
      );
    };

    const reset = () => {
      node.style.setProperty('--pointer-x', '0px');
      node.style.setProperty('--pointer-y', '0px');
      node.style.setProperty('--pointer-glow-x', '50%');
      node.style.setProperty('--pointer-glow-y', '50%');
    };

    reset();
    node.addEventListener('pointermove', update);
    node.addEventListener('pointerleave', reset);

    return () => {
      node.removeEventListener('pointermove', update);
      node.removeEventListener('pointerleave', reset);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
