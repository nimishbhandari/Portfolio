import { Fragment } from 'react';

interface RichTextProps {
  children: string;
  className?: string;
}

/** Renders the `**bold**` spans used throughout content.ts. Deliberately tiny —
 *  a full markdown dependency would be overkill for one inline rule. */
export function RichText({ children, className }: RichTextProps) {
  const parts = children.split(/(\*\*[^*]+\*\*)/g);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
          <strong key={i} className="font-semibold text-fg">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </span>
  );
}
