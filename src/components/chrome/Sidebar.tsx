import { files, profile } from '../../data/content';
import type { SectionId } from '../../data/content';
import { FileIcon } from '../ui/FileIcon';

interface SidebarProps {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}

/** The file explorer *is* the navigation. Rows are 44px on touch, tighter on desktop. */
export function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="shrink-0 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-fg-faint">
        Explorer
      </div>

      <div className="shrink-0 px-2 pb-1 font-mono text-[11px] font-semibold text-fg-dim">
        <span aria-hidden="true" className="mr-1 inline-block">
          ⌄
        </span>
        PORTFOLIO
      </div>

      <nav aria-label="Sections" className="vs-scroll min-h-0 flex-1 overflow-y-auto pb-2">
        <ul>
          {files.map((f) => {
            const isActive = f.id === active;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => onSelect(f.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex min-h-11 w-full items-center gap-2 border-l-2 py-1 pl-4 pr-3 text-left font-mono text-[13px] transition-colors md:min-h-0 md:py-[3px] md:text-[12px] ${
                    isActive
                      ? 'border-accent-hi bg-editor-hi text-fg'
                      : 'border-transparent text-fg-dim hover:bg-chrome-hi hover:text-fg'
                  }`}
                >
                  <FileIcon lang={f.lang} />
                  <span className="truncate">{f.file}</span>
                </button>
              </li>
            );
          })}

          <li className="mt-1 border-t border-border pt-1">
            <a
              href={import.meta.env.BASE_URL + profile.resume}
              download
              className="flex min-h-11 w-full items-center gap-2 border-l-2 border-transparent py-1 pl-4 pr-3 font-mono text-[13px] text-fg-dim transition-colors hover:bg-chrome-hi hover:text-fg md:min-h-0 md:py-[3px] md:text-[12px]"
            >
              <FileIcon lang="pdf" />
              <span className="truncate">Nimish_Bhandari_Resume.pdf</span>
              <span aria-hidden="true" className="ml-auto shrink-0 text-accent-hi">
                ↓
              </span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="shrink-0 border-t border-border px-4 py-2 font-mono text-[10px] text-fg-faint">
        <span aria-hidden="true">⎇ </span>master
      </div>
    </div>
  );
}
