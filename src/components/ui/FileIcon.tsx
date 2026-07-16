import type { FileEntry } from '../../data/content';

const STYLES: Record<FileEntry['lang'] | 'pdf', { label: string; className: string }> = {
  tsx: { label: 'TS', className: 'bg-[#3178c6] text-white' },
  ts: { label: 'TS', className: 'bg-[#3178c6] text-white' },
  js: { label: 'JS', className: 'bg-[#f7df1e] text-black' },
  json: { label: '{}', className: 'bg-[#cbcb41]/20 text-[#cbcb41]' },
  md: { label: 'M↓', className: 'bg-[#519aba]/20 text-[#519aba]' },
  css: { label: '#', className: 'bg-[#519aba]/20 text-[#42a5f5]' },
  log: { label: '›_', className: 'bg-[#9a9aae]/20 text-fg-dim' },
  pdf: { label: 'PDF', className: 'bg-[#e34c26]/20 text-[#e34c26]' },
};

export function FileIcon({ lang }: { lang: FileEntry['lang'] | 'pdf' }) {
  const { label, className } = STYLES[lang];
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-4 w-5 shrink-0 items-center justify-center rounded-[3px] font-mono text-[8px] font-bold leading-none ${className}`}
    >
      {label}
    </span>
  );
}
