import { type ComponentPropsWithoutRef, type ElementType, Fragment } from 'react'

import { type UseFzfResult } from './useFzf'

export function FzfResult<TItem, TElement extends ElementType = 'strong'>({
  as,
  result,
  ...props
}: FzfResultProps<TItem, TElement> & Omit<ComponentPropsWithoutRef<TElement>, keyof FzfResultProps<TItem, TElement>>) {
  const Component = as ?? 'strong'

  return (
    <>
      {result.characters.map((char, index) => {
        return result.positions.has(index) ? (
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

interface FzfResultProps<TItem, TElement extends ElementType> {
  as?: TElement
  result: UseFzfResult<TItem>
}
