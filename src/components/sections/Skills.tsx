import type { ReactNode } from 'react';
import { skills, stack } from '../../data/content';
import { CodeBlock } from '../ui/CodeBlock';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

/** Builds skills.json line by line so the gutter numbers match what's rendered. */
function buildLines(): ReactNode[] {
  const entries = Object.entries(skills);
  const lines: ReactNode[] = [<span className="text-fg-dim">{'{'}</span>];

  entries.forEach(([key, values], i) => {
    const last = i === entries.length - 1;
    lines.push(
      <>
        {'  '}
        <span className="text-syn-var">"{key}"</span>
        <span className="text-fg-dim">: [</span>
        {values.map((v, j) => (
          <span key={v}>
            <span className="text-syn-str">"{v}"</span>
            {j < values.length - 1 && <span className="text-fg-dim">, </span>}
          </span>
        ))}
        <span className="text-fg-dim">]{last ? '' : ','}</span>
      </>,
    );
  });

  lines.push(<span className="text-fg-dim">{'}'}</span>);
  return lines;
}

export function Skills() {
  const lines = buildLines();

  return (
    <Section id="skills" comment="// skills.json — the working set" title="Skills">
      <Reveal>
        <CodeBlock lines={lines} />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-fg-faint">
            Tech stack
          </p>

          {/* Marquee is masked at both edges and clipped by overflow-hidden, so the
              duplicated track can't widen the page. */}
          <div
            className="relative overflow-hidden"
            style={{
              maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
            }}
          >
            <ul className="animate-marquee flex w-max gap-3 py-1">
              {/* Track is duplicated; the copy is aria-hidden so it isn't announced twice. */}
              {[...stack, ...stack].map((tech, i) => (
                <li
                  key={`${tech}-${i}`}
                  aria-hidden={i >= stack.length ? 'true' : undefined}
                  className="shrink-0 rounded-md border border-border bg-editor-hi/60 px-3 py-2 font-mono text-[11px] text-fg-dim"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
