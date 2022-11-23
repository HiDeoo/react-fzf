import { Fzf, type FzfResultItem } from 'fzf'
import { type ArrayElement, type SyncOptsToUse } from 'fzf/dist/types/finders'
import { useMemo } from 'react'

export function useFzf<TItems extends readonly unknown[]>({
  items,
  itemToString,
  query,
}: UseFzfOptions<TItems>): UseFzfResults<TItems> {
  const fzf = useMemo(() => {
    // TODO(HiDeoo) Support fzf options
    // TODO(HiDeoo) Support updating fzf options
    const options: SyncOptsToUse<ArrayElement<TItems>> = {}

    if (itemToString) {
      options.selector = itemToString
    }

    // @ts-expect-error - fzf options type does not support generics.
    return new Fzf(items, options)
  }, [items, itemToString])

  return useMemo(() => {
    return fzf.find(query).map((result) => {
      return {
        ...result,
        characters: [...(typeof result.item === 'string' ? result.item : itemToString(result.item))],
      }
    })
  }, [fzf, itemToString, query])
}

type UseFzfOptions<TItems extends readonly unknown[]> = {
  items: TItems
  query: string
} & (TItems extends string[]
  ? { itemToString?: ItemToString<string> }
  : { itemToString: ItemToString<ArrayElement<TItems>> })

type UseFzfResults<TItems extends readonly unknown[]> = UseFzfResult<ArrayElement<TItems>>[]

export type UseFzfResult<TItem> = FzfResultItem<TItem> & {
  characters: string[]
}

type ItemToString<TItem> = (item: TItem) => string
