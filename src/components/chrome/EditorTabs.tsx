import { useEffect, useRef } from 'react';
import { files } from '../../data/content';
import type { SectionId } from '../../data/content';
import { FileIcon } from '../ui/FileIcon';

interface EditorTabsProps {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}

/** Scrolls horizontally inside its own strip — never widens the page. */
export function EditorTabs({ active, onSelect }: EditorTabsProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<SectionId, HTMLButtonElement | null>>>({});

  // Keep the active tab visible: on a phone the strip is far narrower than its
  // content, so the active tab is otherwise scrolled off-screen.
  useEffect(() => {
    const strip = stripRef.current;
    const tab = tabRefs.current[active];
    if (!strip || !tab) return;

    const left = tab.offsetLeft - strip.clientWidth / 2 + tab.offsetWidth / 2;
    strip.scrollTo({
      left: Math.max(0, Math.min(left, strip.scrollWidth - strip.clientWidth)),
      behavior: 'smooth',
    });
  }, [active]);

  return (
    <div
      ref={stripRef}
      /* `relative` makes this the offsetParent for the tabs above. */
      className="no-scrollbar relative flex h-9 shrink-0 items-stretch overflow-x-auto border-b border-border bg-chrome"
    >
      {files.map((f) => {
        const isActive = f.id === active;
        return (
          <button
            key={f.id}
            ref={(el) => {
              tabRefs.current[f.id] = el;
            }}
            type="button"
            onClick={() => onSelect(f.id)}
            aria-current={isActive ? 'true' : undefined}
            className={`flex shrink-0 items-center gap-2 border-r border-border px-3 font-mono text-[12px] transition-colors ${
              isActive
                ? 'border-t-2 border-t-accent-hi bg-editor pt-0 text-fg'
                : 'border-t-2 border-t-transparent text-fg-faint hover:bg-chrome-hi hover:text-fg-dim'
            }`}
          >
            <FileIcon lang={f.lang} />
            <span>{f.file}</span>
            <span aria-hidden="true" className={isActive ? 'text-fg-dim' : 'text-transparent'}>
              ✕
            </span>
          </button>
        );
      })}
    </div>
  );
}
