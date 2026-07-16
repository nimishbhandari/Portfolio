import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityBar } from './components/chrome/ActivityBar';
import { Breadcrumb } from './components/chrome/Breadcrumb';
import { CommandPalette } from './components/chrome/CommandPalette';
import { EditorTabs } from './components/chrome/EditorTabs';
import { MenuBar } from './components/chrome/MenuBar';
import { Sidebar } from './components/chrome/Sidebar';
import { StatusBar } from './components/chrome/StatusBar';
import { TitleBar } from './components/chrome/TitleBar';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Education } from './components/sections/Education';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { EditorPaneContext } from './components/ui/EditorPaneContext';
import { files } from './data/content';
import type { SectionId } from './data/content';
import { useIsMobile } from './hooks/useMediaQuery';
import { usePaneScroll } from './hooks/usePaneScroll';

export default function App() {
  const [active, setActive] = useState<SectionId>('home');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const isMobile = useIsMobile();
  // Desktop opens with the explorer pinned; phones start with the drawer shut.
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const navigate = useCallback(
    (id: SectionId) => {
      const pane = editorRef.current;
      const el = document.getElementById(id);
      if (!pane || !el) return;
      // Optimistic — the observer would otherwise lag behind a smooth scroll.
      setActive(id);
      // Scroll the pane by offset rather than el.scrollIntoView(): inside a nested
      // scroller scrollIntoView also scrolls ancestors and is viewport-dependent,
      // which makes it unreliable here. offsetTop is measured against the pane itself.
      pane.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
      if (isMobile) setSidebarOpen(false);
    },
    [isMobile],
  );

  // Scroll spy: the last section whose top has crossed the marker line wins. One
  // state drives the sidebar highlight, tabs and breadcrumb together.
  const spy = useCallback(() => {
    const pane = editorRef.current;
    if (!pane || pane.clientHeight === 0) return;

    const paneTop = pane.getBoundingClientRect().top;
    const marker = pane.clientHeight * 0.35;

    let current: SectionId = files[0].id;
    for (const f of files) {
      const el = document.getElementById(f.id);
      if (el && el.getBoundingClientRect().top - paneTop <= marker) current = f.id;
    }

    // Pin the last section once the pane is scrolled to the very bottom —
    // a short final section may never reach the marker line.
    if (pane.scrollTop + pane.clientHeight >= pane.scrollHeight - 2) {
      current = files[files.length - 1].id;
    }

    setActive(current);
  }, []);

  usePaneScroll(editorRef, spy);

  // Cmd/Ctrl+K toggles the palette; Esc closes the palette, then the drawer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setPaletteOpen(false);
        if (isMobile) setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobile]);

  return (
    // dvh, not vh — 100vh leaves a gap under mobile Safari's collapsing URL bar.
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-chrome">
      <TitleBar
        onOpenPalette={() => setPaletteOpen(true)}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        sidebarOpen={sidebarOpen}
      />
      <MenuBar />

      <div className="relative flex min-h-0 flex-1">
        <ActivityBar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((o) => !o)} />

        {/* Desktop/tablet: in-flow pane. Phone: slide-over drawer with a backdrop. */}
        {sidebarOpen && (
          <>
            <button
              type="button"
              aria-label="Close file explorer"
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 z-20 cursor-default bg-black/60 md:hidden"
            />
            <aside
              className="absolute inset-y-0 left-0 z-30 w-64 shrink-0 border-r border-border shadow-2xl shadow-black/50 md:static md:z-auto md:w-56 md:shadow-none lg:w-64"
              aria-label="File explorer"
            >
              <Sidebar active={active} onSelect={navigate} />
            </aside>
          </>
        )}

        <main className="flex min-w-0 flex-1 flex-col">
          <EditorTabs active={active} onSelect={navigate} />
          <Breadcrumb active={active} />

          {/* `relative` makes this pane the offsetParent for its sections, so
              navigate() can scroll to el.offsetTop exactly. */}
          <div
            ref={editorRef}
            className="vs-scroll relative min-h-0 flex-1 overflow-y-auto bg-editor"
          >
            <EditorPaneContext.Provider value={editorRef}>
              <Hero onNavigate={navigate} />
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Education />
              <Contact />
            </EditorPaneContext.Provider>
          </div>
        </main>
      </div>

      <StatusBar active={active} />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelect={navigate}
      />
    </div>
  );
}
