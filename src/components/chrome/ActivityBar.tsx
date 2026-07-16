interface ActivityBarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const ICONS = {
  explorer: (
    <path
      d="M2.5 3.5h4l1.5 2h5.5v9h-11z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  search: (
    <>
      <circle cx="7" cy="7" r="4.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M10.4 10.4L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  git: (
    <>
      <circle cx="4.5" cy="4" r="1.8" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="4.5" cy="12.5" r="1.8" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="12" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M4.5 5.8v4.9M6.3 4.6h2.4a1.5 1.5 0 011.5 1.5v.4" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </>
  ),
  run: (
    <path d="M5 3.5l8 4.5-8 4.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
  ),
};

/** Icon rail. Only the explorer icon is interactive — it toggles the sidebar on tablet. */
export function ActivityBar({ sidebarOpen, onToggleSidebar }: ActivityBarProps) {
  return (
    <div className="hidden w-12 shrink-0 flex-col items-center border-r border-border bg-chrome py-2 md:flex">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? 'Hide file explorer' : 'Show file explorer'}
        aria-expanded={sidebarOpen}
        className={`relative flex h-11 w-11 items-center justify-center transition-colors ${
          sidebarOpen ? 'text-fg' : 'text-fg-faint hover:text-fg'
        }`}
      >
        {sidebarOpen && (
          <span aria-hidden="true" className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 bg-accent-hi" />
        )}
        <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true">
          {ICONS.explorer}
        </svg>
      </button>

      {(['search', 'git', 'run'] as const).map((key) => (
        <span
          key={key}
          aria-hidden="true"
          className="flex h-11 w-11 cursor-default items-center justify-center text-fg-faint transition-colors hover:text-fg-dim"
        >
          <svg width="18" height="18" viewBox="0 0 16 16">
            {ICONS[key]}
          </svg>
        </span>
      ))}
    </div>
  );
}
