import { createContext, useContext } from 'react';
import type { RefObject } from 'react';

/** The scrolling editor pane. Reveal observes against this rather than the browser
 *  viewport — content lives in a nested scroller, so the viewport is the wrong root. */
export const EditorPaneContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

export const useEditorPane = () => useContext(EditorPaneContext);
