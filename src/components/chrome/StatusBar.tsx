import { useEffect, useState } from 'react';
import { files } from '../../data/content';
import type { SectionId } from '../../data/content';

const LANG_LABEL: Record<string, string> = {
  tsx: 'TypeScript React',
  ts: 'TypeScript',
  js: 'JavaScript',
  json: 'JSON',
  md: 'Markdown',
  css: 'CSS',
  log: 'Log',
};

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function StatusBar({ active }: { active: SectionId }) {
  const time = useClock();
  const file = files.find((f) => f.id === active) ?? files[0];

  return (
    <footer className="flex h-6 shrink-0 items-center justify-between gap-3 bg-accent px-3 font-mono text-[10px] text-white/90">
      <div className="flex items-center gap-3">
        <span className="whitespace-nowrap">⎇ master</span>
        <span className="hidden whitespace-nowrap sm:inline">⚠ 0</span>
        <span className="hidden whitespace-nowrap md:inline">✓ Portfolio</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden whitespace-nowrap lg:inline">{LANG_LABEL[file.lang] ?? file.lang}</span>
        <span className="hidden whitespace-nowrap lg:inline">UTF-8</span>
        <span className="hidden whitespace-nowrap md:inline">💜 Nimish Dark</span>
        <span className="whitespace-nowrap tabular-nums">{time}</span>
      </div>
    </footer>
  );
}
