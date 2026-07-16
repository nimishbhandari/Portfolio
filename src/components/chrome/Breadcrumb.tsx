import { files, profile } from '../../data/content';
import type { SectionId } from '../../data/content';

export function Breadcrumb({ active }: { active: SectionId }) {
  const file = files.find((f) => f.id === active) ?? files[0];

  return (
    <div
      aria-hidden="true"
      className="no-scrollbar flex h-7 shrink-0 items-center gap-1.5 overflow-x-auto whitespace-nowrap border-b border-border bg-editor px-4 font-mono text-[11px] text-fg-faint"
    >
      <span>{profile.githubHandle}</span>
      <span className="text-fg-faint/60">›</span>
      <span>src</span>
      <span className="text-fg-faint/60">›</span>
      <span className="text-fg-dim">{file.file}</span>
    </div>
  );
}
