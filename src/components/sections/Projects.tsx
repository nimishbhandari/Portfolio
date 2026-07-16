import { profile, projects } from '../../data/content';
import { Reveal } from '../ui/Reveal';
import { RichText } from '../ui/RichText';
import { Section } from '../ui/Section';

export function Projects() {
  return (
    <Section id="projects" comment="// personal work — shipped and live" title="Projects">
      <ul className="space-y-6">
        {projects.map((p, i) => (
          <li key={p.name}>
            <Reveal delay={0.05 * i}>
              <article className="group relative overflow-hidden rounded-xl border border-border bg-editor-hi/40 p-5 transition-colors hover:border-accent/50 sm:p-7">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-2 font-mono text-6xl font-bold text-fg/[0.04] transition-colors group-hover:text-accent/10 sm:text-7xl"
                >
                  {p.index}
                </span>

                <div className="relative">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-mono text-xl font-bold text-fg sm:text-2xl">{p.name}</h3>
                    <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent-hi">
                      {p.kind}
                    </span>
                  </div>

                  <p className="mt-1 font-mono text-[11px] text-fg-faint">{p.period}</p>

                  <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-fg-dim sm:text-[15px]">
                    <RichText>{p.blurb}</RichText>
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded border border-border bg-editor px-2 py-1 font-mono text-[10px] text-fg-dim sm:text-[11px]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center gap-2 rounded-md bg-accent/90 px-4 font-mono text-[12px] text-white transition-colors hover:bg-accent-hi"
                    >
                      <span aria-hidden="true">↗</span> Live demo
                    </a>
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center gap-2 rounded-md border border-border px-4 font-mono text-[12px] text-fg-dim transition-colors hover:border-accent/60 hover:text-fg"
                    >
                      <span aria-hidden="true">⌥</span> Source
                    </a>
                  </div>

                  <p className="mt-3 break-all font-mono text-[10px] text-fg-faint">{p.liveLabel}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={0.15}>
        <div className="mt-8 rounded-xl border border-dashed border-border p-6 text-center">
          <p className="font-mono text-[13px] text-fg-dim">Want to see more?</p>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-4 font-mono text-[12px] text-accent-hi transition-colors hover:border-accent/60 hover:bg-accent/10"
          >
            Everything on GitHub <span aria-hidden="true">→</span>
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
