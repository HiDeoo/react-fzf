import { Fzf, type FzfResultItem } from 'fzf'
import { type ArrayElement, type SyncOptsToUse } from 'fzf/dist/types/finders'
import { type SyncOptions, type Tiebreaker } from 'fzf/dist/types/types'
import { useMemo } from 'react'

export function useFzf<TItems extends readonly unknown[]>({
  items,
  itemToString,
  query,
  ...fzfOptions
}: UseFzfOptions<TItems>): UseFzfResults<TItems> {
  const fzf = useMemo(() => {
    const options: SyncOptsToUse<ArrayElement<TItems>> = fzfOptions

    if (itemToString) {
      options.selector = itemToString
    }

    // @ts-expect-error - fzf options type does not support generics.
    return new Fzf(items, fzfOptions)
  }, [fzfOptions, items, itemToString])

  return useMemo(() => {
    return fzf.find(query).map((result) => {
      return {
        ...result,
        characters: [...(itemToString || typeof result.item !== 'string' ? itemToString(result.item) : result.item)],
      }
    })
  }, [fzf, itemToString, query])
}

// Omitting `selector` (renamed to `itemToString`) breaks `sort` and `tiebreakers`.
export type FzfOptions<TItems extends readonly unknown[]> = Partial<
  Omit<SyncOptions<ArrayElement<TItems>>, 'selector' | 'sort' | 'tiebreakers'>
> &
  (
    | {
        sort?: true
        tiebreakers?: Tiebreaker<ArrayElement<TItems>>[]
      }
    | {
        sort: false
      }
  ) &
  (TItems extends string[]
    ? { itemToString?: ItemToString<string> }
    : { itemToString: ItemToString<ArrayElement<TItems>> })

export type UseFzfOptions<TItems extends readonly unknown[]> = {
  items: TItems
  query: string
} & FzfOptions<TItems>

type UseFzfResults<TItems extends readonly unknown[]> = UseFzfResult<ArrayElement<TItems>>[]

export type UseFzfResult<TItem> = FzfResultItem<TItem> & {
  characters: string[]
}

type ItemToString<TItem> = (item: TItem) => string
