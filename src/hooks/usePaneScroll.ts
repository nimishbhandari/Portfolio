import { useEffect } from 'react';
import type { RefObject } from 'react';

type Callback = () => void;

interface Entry {
  callbacks: Set<Callback>;
  teardown: () => void;
}

/** One rAF-throttled scroll listener per pane, shared by every subscriber, so N
 *  Reveals don't attach N listeners. */
const registry = new WeakMap<HTMLElement, Entry>();

function entryFor(pane: HTMLElement): Entry {
  const existing = registry.get(pane);
  if (existing) return existing;

  const callbacks = new Set<Callback>();
  let frame = 0;

  const onScroll = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      callbacks.forEach((cb) => cb());
    });
  };

  pane.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  const entry: Entry = {
    callbacks,
    teardown: () => {
      pane.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
      registry.delete(pane);
    },
  };

  registry.set(pane, entry);
  return entry;
}

/**
 * Runs `handler` on pane scroll/resize (rAF-throttled) and once on subscribe.
 * `handler` must be stable — wrap it in useCallback.
 */
export function usePaneScroll(
  paneRef: RefObject<HTMLDivElement | null> | null,
  handler: Callback,
  enabled = true,
) {
  useEffect(() => {
    const pane = paneRef?.current;
    if (!pane || !enabled) return;

    const entry = entryFor(pane);
    entry.callbacks.add(handler);
    handler();

    return () => {
      entry.callbacks.delete(handler);
      if (entry.callbacks.size === 0) entry.teardown();
    };
  }, [paneRef, handler, enabled]);
}
