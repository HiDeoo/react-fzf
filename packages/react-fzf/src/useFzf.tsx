import { Fzf, type FzfResultItem } from 'fzf'
import { type SyncOptsToUse } from 'fzf/dist/types/finders'
import { useMemo } from 'react'

export function useFzf<TItem>({
  items,
  itemToString,
  query,
  ...fzfOptions
}: UseFzfOptions<TItem>): UseFzfResult<TItem>[] {
  const fzf = useMemo(() => {
    const options: SyncOptsToUse<TItem> = fzfOptions

    if (itemToString) {
      options.selector = itemToString
    }

    // @ts-expect-error - fzf options type does not support generics.
    return new Fzf(items, fzfOptions)
  }, [fzfOptions, items, itemToString])

  return useMemo(() => {
    return fzf.find(query).map((result) => {
      let characters = ''

      if (itemToString) {
        characters = itemToString(result.item)
      } else if (typeof result.item === 'string') {
        characters = result.item
      } else if (typeof result.item !== 'string') {
        throw new TypeError('react-fzf: the `itemToString` option is required for non-string items.')
      }

      return {
        ...result,
        characters: [...characters],
      }
    })
  }, [fzf, itemToString, query])
}

export type UseFzfOptions<TItem> = {
  items: TItem[]
  query: string
} & SyncOptsToUse<TItem> &
  ([TItem] extends [string] ? { itemToString?: ItemToString<TItem> } : { itemToString: ItemToString<TItem> })

export type UseFzfResult<TItem> = FzfResultItem<TItem> & {
  characters: string[]
}

type ItemToString<TItem> = (item: TItem) => string
