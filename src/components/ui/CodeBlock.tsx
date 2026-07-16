import type { ReactNode } from 'react';

interface CodeBlockProps {
  /** One entry per rendered line — the gutter numbers these for real, so they stay aligned. */
  lines: ReactNode[];
  className?: string;
}

/** Used by the sections whose content genuinely is code (skills.json, contact.css,
 *  education.log). Scrolls horizontally inside itself so the page never does. */
export function CodeBlock({ lines, className }: CodeBlockProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-border bg-editor-hi/50 ${className ?? ''}`}
    >
      <div className="vs-scroll overflow-x-auto">
        <div className="flex min-w-fit">
          <div
            aria-hidden="true"
            className="hidden shrink-0 select-none border-r border-border/60 bg-editor/40 py-3 text-right font-mono text-[12px] leading-6 text-fg-faint/50 sm:block"
          >
            {lines.map((_, i) => (
              <div key={i} className="px-3">
                {i + 1}
              </div>
            ))}
          </div>

          <pre className="min-w-0 flex-1 py-3 font-mono text-[12px] leading-6 sm:text-[13px]">
            <code className="block">
              {lines.map((line, i) => (
                <div key={i} className="whitespace-pre px-3 sm:px-4">
                  {line}
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
