import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface TypewriterProps {
  phrases: string[];
  className?: string;
}

const TYPE_MS = 55;
const DELETE_MS = 30;
const HOLD_MS = 1800;

/** Types each phrase, holds, deletes, advances. Renders the first phrase statically
 *  when the user prefers reduced motion. */
export function Typewriter({ phrases, className }: TypewriterProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const phrase = phrases[index % phrases.length];

    if (!deleting && text === phrase) {
      const t = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(t);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const t = setTimeout(
      () =>
        setText((cur) =>
          deleting ? phrase.slice(0, cur.length - 1) : phrase.slice(0, cur.length + 1),
        ),
      deleting ? DELETE_MS : TYPE_MS,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, reduced]);

  if (reduced) {
    return <span className={className}>{phrases[0]}</span>;
  }

  return (
    <span className={className}>
      {text}
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block w-[2px] translate-y-[2px] self-center bg-accent-hi align-middle"
        style={{ height: '1em', animation: 'blink 1s steps(2) infinite' }}
      />
      <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>
    </span>
  );
}
