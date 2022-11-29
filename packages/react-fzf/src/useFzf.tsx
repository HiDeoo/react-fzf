import { Fzf, type FzfResultItem } from 'fzf'
import { type SyncOptsToUse } from 'fzf/dist/types/finders'
import { useCallback, useMemo, useRef } from 'react'

import { type FzfHighlightProps } from './FzfHighlight'

export function useFzf<TItem>({
  items,
  itemToString,
  query,
  ...fzfOptions
}: UseFzfOptions<TItem>): UseFzfResults<TItem> {
  const highlights = useRef<UseFzfHighlight<TItem>[]>([])

  const fzf = useMemo(() => {
    const options: SyncOptsToUse<TItem> = fzfOptions

    if (itemToString) {
      options.selector = itemToString
    }

    // @ts-expect-error - fzf options type does not support generics.
    return new Fzf(items, fzfOptions)
  }, [fzfOptions, items, itemToString])

  const getFzfHighlightProps = useCallback<UseFzfResults<TItem>['getFzfHighlightProps']>(
    ({ index, item, ...props }) => {
      const highlight = highlights.current[getHighlightIndex(highlights.current, item, index)]

      if (!highlight) {
        throw new Error(`getFzfHighlightProps: Unable to find highlight for item '${JSON.stringify(item)}'.`)
      }

      return { ...props, highlight }
    },
    []
  )

  const results = useMemo(() => {
    highlights.current = []

    return fzf.find(query).map((result) => {
      let characters = ''

      if (itemToString) {
        characters = itemToString(result.item)
      } else if (typeof result.item === 'string') {
        characters = result.item
      } else if (typeof result.item !== 'string') {
        throw new TypeError('react-fzf: the `itemToString` option is required for non-string items.')
      }

      highlights.current.push({
        ...result,
        characters: [...characters],
      })

      return result.item
    })
  }, [fzf, itemToString, query])

  return { getFzfHighlightProps, results }
}

function getHighlightIndex<TItem>(
  highlights: UseFzfHighlight<TItem>[],
  item: UseFzfHighlight<TItem>['item'],
  index: number | undefined
): number {
  if (index !== undefined) {
    return index
  }

  if (highlights.length === 0) {
    return -1
  }

  return highlights.findIndex((highlight) => highlight.item === item)
}

export type UseFzfOptions<TItem> = {
  items: TItem[]
  query: string
} & SyncOptsToUse<TItem> &
  ([TItem] extends [string] ? { itemToString?: ItemToString<TItem> } : { itemToString: ItemToString<TItem> })

export interface UseFzfResults<TItem> {
  getFzfHighlightProps: (
    props: { index?: number; item: TItem } & Omit<FzfHighlightProps<TItem>, 'highlight'>
  ) => FzfHighlightProps<TItem>
  results: TItem[]
}

export type UseFzfHighlight<TItem> = FzfResultItem<TItem> & {
  characters: string[]
}

type ItemToString<TItem> = (item: TItem) => string
