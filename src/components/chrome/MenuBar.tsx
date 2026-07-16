const ITEMS = ['File', 'Edit', 'View', 'Go', 'Run', 'Terminal', 'Help'];

/** Decorative — sells the editor frame on wide screens, hidden entirely below lg
 *  where the space is better spent on content. */
export function MenuBar() {
  return (
    <nav
      aria-hidden="true"
      className="hidden h-7 shrink-0 items-center gap-1 border-b border-border bg-chrome px-3 lg:flex"
    >
      {ITEMS.map((item) => (
        <span
          key={item}
          className="cursor-default rounded px-2 py-0.5 font-mono text-[11px] text-fg-dim transition-colors hover:bg-chrome-hi hover:text-fg"
        >
          {item}
        </span>
      ))}
    </nav>
  );
}
