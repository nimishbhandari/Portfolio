import { useEffect, useMemo, useRef, useState } from 'react';
import { files, profile } from '../../data/content';
import type { SectionId } from '../../data/content';
import { FileIcon } from '../ui/FileIcon';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onSelect: (id: SectionId) => void;
}

export function CommandPalette({ open, onClose, onSelect }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return files;
    return files.filter(
      (f) => f.file.toLowerCase().includes(q) || f.label.toLowerCase().includes(q),
    );
  }, [query]);

  // Reset per-open so the palette never reopens showing a stale query.
  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  if (!open) return null;

  const choose = (id: SectionId) => {
    onSelect(id);
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter' && results[cursor]) {
      e.preventDefault();
      choose(results[cursor].id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center px-4 pt-[8vh]" role="presentation">
      <button
        type="button"
        aria-label="Close command palette"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/50"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Go to file"
        onKeyDown={onKeyDown}
        className="relative z-10 h-fit w-full max-w-lg overflow-hidden rounded-lg border border-border bg-chrome shadow-2xl shadow-black/60"
      >
        <div className="border-b border-border p-2">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Go to file…"
            aria-label="Search sections"
            className="w-full bg-editor px-3 py-2 font-mono text-[13px] text-fg outline-none placeholder:text-fg-faint"
          />
        </div>

        <ul className="max-h-72 overflow-y-auto py-1">
          {results.length === 0 && (
            <li className="px-4 py-3 font-mono text-[12px] text-fg-faint">No matching files</li>
          )}
          {results.map((f, i) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => choose(f.id)}
                onMouseEnter={() => setCursor(i)}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left font-mono text-[12px] ${
                  i === cursor ? 'bg-accent/25 text-fg' : 'text-fg-dim'
                }`}
              >
                <FileIcon lang={f.lang} />
                <span>{f.file}</span>
                <span className="ml-auto text-[10px] text-fg-faint">{f.label}</span>
              </button>
            </li>
          ))}
          <li className="mt-1 border-t border-border pt-1">
            <a
              href={import.meta.env.BASE_URL + profile.resume}
              download
              onClick={onClose}
              className="flex w-full items-center gap-2 px-4 py-2 font-mono text-[12px] text-fg-dim hover:bg-accent/25 hover:text-fg"
            >
              <FileIcon lang="pdf" />
              <span>Download résumé</span>
              <span aria-hidden="true" className="ml-auto text-accent-hi">
                ↓
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
