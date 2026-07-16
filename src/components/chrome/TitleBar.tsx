import { profile } from '../../data/content';

interface TitleBarProps {
  onOpenPalette: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function TitleBar({ onOpenPalette, onToggleSidebar, sidebarOpen }: TitleBarProps) {
  return (
    <header className="flex h-9 shrink-0 items-center gap-2 border-b border-border bg-chrome px-3">
      {/* Hamburger replaces the traffic lights on phones, where the drawer is the only nav. */}
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? 'Close file explorer' : 'Open file explorer'}
        aria-expanded={sidebarOpen}
        className="-ml-1 flex h-8 w-8 items-center justify-center rounded text-fg-dim hover:bg-chrome-hi hover:text-fg md:hidden"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div className="hidden shrink-0 items-center gap-2 md:flex" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>

      <div className="flex flex-1 justify-center px-2">
        <button
          type="button"
          onClick={onOpenPalette}
          className="flex h-6 w-full max-w-md items-center justify-center gap-2 rounded border border-border bg-editor px-3 font-mono text-[11px] text-fg-dim transition-colors hover:border-accent/60 hover:text-fg"
        >
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="truncate">
            {profile.githubHandle} : portfolio
          </span>
          <kbd className="ml-1 hidden shrink-0 rounded border border-border bg-chrome-hi px-1 py-px text-[9px] sm:inline">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Balances the flex row so the search pill stays optically centred. */}
      <div className="w-8 shrink-0 md:w-[52px]" aria-hidden="true" />
    </header>
  );
}
