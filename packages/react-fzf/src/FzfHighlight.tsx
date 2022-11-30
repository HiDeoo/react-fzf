import { type ComponentPropsWithoutRef, type ElementType, Fragment } from 'react'

import { type UseFzfHighlight } from './useFzf'

export function FzfHighlight<TItem, TElement extends ElementType = 'strong'>({
  as,
  highlight,
  ...props
}: FzfHighlightProps<TItem, TElement>) {
  const Component = as ?? 'strong'

  return (
    <>
      {highlight.characters.map((char, index) => {
        return highlight.positions.has(index) ? (
          <Component key={index} {...props}>
            {char}
          </Component>
        ) : (
          <Fragment key={index}>{char}</Fragment>
        )
      })}
    </>
  )
}

interface FzfHighlightBaseProps<TItem, TElement extends ElementType = 'strong'> {
  as?: TElement
  highlight: UseFzfHighlight<TItem>
}

export type FzfHighlightProps<TItem, TElement extends ElementType = 'strong'> = FzfHighlightBaseProps<TItem, TElement> &
  Omit<ComponentPropsWithoutRef<TElement>, keyof FzfHighlightBaseProps<TItem, TElement>>
