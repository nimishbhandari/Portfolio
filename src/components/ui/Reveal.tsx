import { useCallback, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { usePaneScroll } from '../../hooks/usePaneScroll';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useEditorPane } from './EditorPaneContext';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Reveal once the element's top has risen above this fraction of the pane. */
const TRIGGER = 0.92;

/**
 * Scroll-triggered fade-up, measured against the editor pane. Driven by a shared
 * scroll listener rather than IntersectionObserver: content lives in a nested
 * scroller, and a reveal that fails leaves the page permanently blank, so this
 * uses the mechanism that can be verified end-to-end.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const pane = useEditorPane();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  const check = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const paneEl = pane?.current;
    const top = paneEl ? paneEl.getBoundingClientRect().top : 0;
    const height = paneEl ? paneEl.clientHeight : window.innerHeight;

    // Fail open: a zero-height pane means we can't tell, so show rather than hide.
    if (height === 0) {
      setShown(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top - top < height * TRIGGER && rect.bottom - top > 0) setShown(true);
  }, [pane]);

  // Unsubscribes once shown — the listener set shrinks as the page reveals.
  usePaneScroll(pane, check, !reduced && !shown);

  return (
    <div
      ref={ref}
      className={className}
      style={
        reduced
          ? undefined
          : {
              opacity: shown ? 1 : 0,
              transform: shown ? 'none' : 'translateY(16px)',
              transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
            }
      }
    >
      {children}
    </div>
  );
}
