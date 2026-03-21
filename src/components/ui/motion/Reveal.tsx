'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Reveal.module.css';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export default function Reveal({
  children,
  className = '',
  delay = 0,
  distance = 36,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        styles.reveal,
        visible ? styles.visible : '',
        className,
      ].join(' ')}
      style={
        {
          '--reveal-delay': `${delay}ms`,
          '--reveal-distance': `${distance}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
