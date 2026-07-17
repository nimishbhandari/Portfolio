import { profile, stats } from '../../data/content';
import type { SectionId } from '../../data/content';
import { Reveal } from '../ui/Reveal';
import { Typewriter } from '../ui/Typewriter';

const DOT = ['bg-emerald-400', 'bg-violet-400', 'bg-sky-400', 'bg-pink-400'];

export function Hero({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <section
      id="home"
      aria-label="Home"
      className="relative scroll-mt-4 overflow-hidden border-b border-border/60 px-4 py-16 sm:px-8 md:py-24"
    >
      {/* Ambient glow. Pointer-events-none so it never eats a click. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px]"
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <Reveal>
          <p className="font-mono text-[12px] text-syn-comment sm:text-[14px]">
            // hello world !! welcome to my portfolio
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          {/* aria-label: the two display lines would otherwise be read as "NimishBhandari". */}
          <h1
            aria-label={`${profile.firstName} ${profile.lastName}`}
            className="mt-4 font-mono font-extrabold leading-[0.95] tracking-tight"
          >
            {/* clamp keeps "BHANDARI" inside a 375px viewport without breaking mid-word. */}
            <span
              className="block text-fg"
              style={{ fontSize: 'clamp(2.5rem, 12vw, 7rem)' }}
            >
              {profile.firstName}
            </span>
            <span
              className="block bg-gradient-to-r from-accent-hi via-violet-400 to-sky-400 bg-clip-text text-transparent"
              style={{ fontSize: 'clamp(2.5rem, 12vw, 7rem)' }}
            >
              {profile.lastName}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-accent-hi/60 to-transparent" />
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.chips.map((chip, i) => (
              <li
                key={chip}
                className="flex items-center gap-2 rounded-md border border-border bg-editor-hi/60 px-3 py-1.5 font-mono text-[11px] text-fg-dim sm:text-[12px]"
              >
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${DOT[i % DOT.length]}`} />
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 font-mono text-base text-fg-dim sm:text-lg">
            <span className="text-syn-key">const</span> <span className="text-syn-var">focus</span>{' '}
            <span className="text-fg-faint">=</span>{' '}
            <span className="text-syn-str">'</span>
            <Typewriter phrases={profile.typewriter} className="text-syn-str" />
            <span className="text-syn-str">'</span>
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-fg-dim sm:text-base">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="flex min-h-11 items-center gap-2 rounded-md bg-accent px-5 font-mono text-[13px] font-medium text-white transition-colors hover:bg-accent-hi"
            >
              <span aria-hidden="true">📁</span> Projects
            </button>
            <button
              type="button"
              onClick={() => onNavigate('experience')}
              className="flex min-h-11 items-center gap-2 rounded-md border border-border bg-editor-hi/60 px-5 font-mono text-[13px] text-fg-dim transition-colors hover:border-accent/60 hover:text-fg"
            >
              <span aria-hidden="true">⚡</span> Experience
            </button>
            <a
              href={import.meta.env.BASE_URL + profile.resume}
              download={profile.resumeFilename}
              className="flex min-h-11 items-center gap-2 rounded-md border border-border bg-editor-hi/60 px-5 font-mono text-[13px] text-fg-dim transition-colors hover:border-accent/60 hover:text-fg"
            >
              <span aria-hidden="true">↓</span> Résumé
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          {/* 2×2 on phones — four across is unreadable at 375px. */}
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
            {stats.map((s) => (
              /* Value in dd, label in dt — reading order is handled by column-reverse
                 so the number still sits on top. */
              <div
                key={s.label}
                className="flex flex-col-reverse bg-editor px-4 py-5 text-center"
              >
                <dt className="mt-1 font-mono text-[9px] uppercase tracking-widest text-fg-faint sm:text-[10px]">
                  {s.label}
                </dt>
                <dd className="font-mono text-2xl font-bold text-fg sm:text-3xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
