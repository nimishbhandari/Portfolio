import { about, profile } from '../../data/content';
import { Reveal } from '../ui/Reveal';
import { RichText } from '../ui/RichText';
import { Section } from '../ui/Section';

export function About() {
  return (
    <Section id="about" comment="<!-- rendering about.md preview -->" title="About">
      <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-10">
        <Reveal>
          <div className="flex flex-col items-center gap-3 md:items-start">
            {/* Monogram stands in for a photo — drop public/avatar.jpg and swap this block. */}
            <div
              aria-hidden="true"
              className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-accent via-violet-500 to-sky-500 font-mono text-4xl font-bold text-white shadow-lg shadow-accent/20 md:h-32 md:w-32"
            >
              {profile.initials}
            </div>
            <span className="font-mono text-[11px] text-fg-faint">{profile.location}</span>
          </div>
        </Reveal>

        <div className="min-w-0">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p className="mb-4 text-[15px] leading-relaxed text-fg-dim sm:text-base">
                <RichText>{p}</RichText>
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <dl className="mt-8 grid gap-x-6 gap-y-2 font-mono text-[12px] sm:grid-cols-2 sm:text-[13px]">
              {about.facts.map((f) => (
                <div key={f.key} className="flex min-w-0 gap-2 border-l-2 border-accent/40 pl-3">
                  <dt className="shrink-0 text-syn-var">{f.key}:</dt>
                  <dd className="min-w-0 break-words text-fg-dim">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
