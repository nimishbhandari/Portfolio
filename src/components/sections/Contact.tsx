import type { ReactNode } from 'react';
import { profile } from '../../data/content';
import { CodeBlock } from '../ui/CodeBlock';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

function decl(prop: string, value: string): ReactNode {
  return (
    <>
      {'  '}
      <span className="text-syn-var">{prop}</span>
      <span className="text-fg-dim">: </span>
      <span className="text-syn-str">{value}</span>
      <span className="text-fg-dim">;</span>
    </>
  );
}

const LINKS = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: '✉' },
  { label: 'GitHub', value: profile.githubHandle, href: profile.github, icon: '⌥', external: true },
  { label: 'LinkedIn', value: profile.linkedinHandle, href: profile.linkedin, icon: 'in', external: true },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`, icon: '☎' },
];

export function Contact() {
  const lines: ReactNode[] = [
    <>
      <span className="text-syn-fn">.nimish</span> <span className="text-fg-dim">{'{'}</span>
    </>,
    decl('email      ', `"${profile.email}"`),
    decl('github     ', `"${profile.githubHandle}"`),
    decl('linkedin   ', `"${profile.linkedinHandle}"`),
    decl('location   ', `"${profile.location}"`),
    decl('status     ', '"open to interesting problems"'),
    <span className="text-fg-dim">{'}'}</span>,
  ];

  return (
    <Section id="contact" comment="/* contact.css — let's talk */" title="Contact">
      <Reveal>
        <CodeBlock lines={lines} />
      </Reveal>

      <Reveal delay={0.1}>
        {/* The real, tappable version of the same data — the CSS block above is the styling. */}
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex min-h-14 items-center gap-3 rounded-lg border border-border bg-editor-hi/40 px-4 py-3 transition-colors hover:border-accent/50 hover:bg-editor-hi"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/15 font-mono text-[12px] text-accent-hi"
                >
                  {l.icon}
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-fg-faint">
                    {l.label}
                  </span>
                  <span className="block break-all font-mono text-[12px] text-fg-dim">{l.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-10 text-center font-mono text-[11px] text-fg-faint">
          Designed & built by {profile.firstName} {profile.lastName} · {new Date().getFullYear()}
        </p>
      </Reveal>
    </Section>
  );
}
