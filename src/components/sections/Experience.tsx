import { experience } from '../../data/content';
import { Reveal } from '../ui/Reveal';
import { RichText } from '../ui/RichText';
import { Section } from '../ui/Section';

export function Experience() {
  return (
    <Section id="experience" comment="// export const career = [ ... ]" title="Experience">
      <div className="relative">
        {/* Timeline spine. Sits under the dots, hidden from AT. */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[5px] top-2 w-px bg-gradient-to-b from-accent/60 via-border to-transparent"
        />

        <ol className="space-y-12">
          {experience.map((job, i) => (
            <li key={job.company} className="relative pl-7">
              <Reveal delay={0.05 * i}>
                <span
                  aria-hidden="true"
                  className={`absolute -left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 ${
                    job.current
                      ? 'border-accent-hi bg-accent shadow-[0_0_0_4px] shadow-accent/20'
                      : 'border-border bg-editor'
                  }`}
                />

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-mono text-lg font-bold text-fg sm:text-xl">{job.role}</h3>
                  {job.current && (
                    <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
                      CURRENT
                    </span>
                  )}
                </div>

                <p className="mt-1 flex flex-wrap items-center gap-x-2 font-mono text-[12px] sm:text-[13px]">
                  <span className="text-accent-hi">{job.company}</span>
                  <span aria-hidden="true" className="text-fg-faint">
                    ·
                  </span>
                  <span className="text-fg-faint">{job.location}</span>
                  <span aria-hidden="true" className="text-fg-faint">
                    ·
                  </span>
                  <span className="text-fg-faint">{job.period}</span>
                </p>

                <ul className="mt-5 space-y-4">
                  {job.bullets.map((b) => (
                    <li
                      key={b.title}
                      className="rounded-lg border border-border/70 bg-editor-hi/40 p-4 transition-colors hover:border-accent/40"
                    >
                      <h4 className="font-mono text-[13px] font-semibold text-syn-fn">{b.title}</h4>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-fg-dim">
                        <RichText>{b.body}</RichText>
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
