import type { ReactNode } from 'react';
import type { SectionId } from '../../data/content';

interface SectionProps {
  id: SectionId;
  /** The `// comment` line that opens each section, echoing the file's language. */
  comment: string;
  title?: string;
  children: ReactNode;
}

export function Section({ id, comment, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={title ?? id}
      className="scroll-mt-4 border-b border-border/60 px-4 py-14 last:border-b-0 sm:px-8 md:py-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-6 font-mono text-[12px] text-syn-comment sm:text-[13px]">{comment}</p>
        {title && (
          <h2 className="mb-8 font-mono text-2xl font-bold text-fg sm:text-3xl">
            <span className="text-accent-hi">#</span> {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
