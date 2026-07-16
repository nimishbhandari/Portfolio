import type { ReactNode } from 'react';
import { education } from '../../data/content';
import { CodeBlock } from '../ui/CodeBlock';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

function logLine(level: 'INFO' | 'DONE', key: string, value: string): ReactNode {
  return (
    <>
      <span className="text-fg-faint">[{level === 'DONE' ? 'DONE' : 'INFO'}]</span>{' '}
      <span className={level === 'DONE' ? 'text-syn-num' : 'text-syn-type'}>{key}</span>
      <span className="text-fg-dim"> → </span>
      <span className="text-fg">{value}</span>
    </>
  );
}

export function Education() {
  const lines: ReactNode[] = [
    <span className="text-syn-comment"># education.log — tail -f</span>,
    logLine('INFO', 'institution', education.school),
    logLine('INFO', 'location   ', education.location),
    logLine('INFO', 'degree     ', education.degree),
    logLine('INFO', 'branch     ', education.branch),
    logLine('INFO', 'gpa        ', education.gpa),
    logLine('INFO', 'duration   ', education.period),
    logLine('DONE', 'status     ', 'Graduated'),
    <>
      <span className="text-fg-faint">$</span>{' '}
      <span className="text-fg-dim">_</span>
    </>,
  ];

  return (
    <Section id="education" comment="$ tail -f education.log" title="Education">
      <Reveal>
        <CodeBlock lines={lines} />
      </Reveal>
    </Section>
  );
}
