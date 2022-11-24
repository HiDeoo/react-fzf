import { byLengthAsc, byStartAsc } from 'fzf'
import { type ArrayElement } from 'fzf/dist/types/finders'
import { type SyncOptions } from 'fzf/dist/types/types'
import { assertType, expectTypeOf, test } from 'vitest'

import { useFzf, type UseFzfOptions, type UseFzfResult } from './useFzf'

type Strings = string[]
type Objects = { name: string }[]

test('should always expect a list of items and a query', () => {
  expectTypeOf<UseFzfOptions<Strings>>().toHaveProperty('items').toEqualTypeOf<Strings>()
  expectTypeOf<UseFzfOptions<Objects>>().toHaveProperty('items').toEqualTypeOf<Objects>()

  expectTypeOf<UseFzfOptions<Strings>>().toHaveProperty('query').toEqualTypeOf<string>()
  expectTypeOf<UseFzfOptions<Objects>>().toHaveProperty('query').toEqualTypeOf<string>()
})

test('should optionally expect the itemToString option for a list of string items', () => {
  expectTypeOf<UseFzfOptions<Strings>>()
    .toHaveProperty('itemToString')
    .toEqualTypeOf<Optional<(item: string) => string>>()
})

test('should expect the itemToString option for a list of non-string items', () => {
  expectTypeOf<UseFzfOptions<Objects>>()
    .toHaveProperty('itemToString')
    .toEqualTypeOf<(item: Objects[number]) => string>()
})

test('should optionally expect the casing option', () => {
  expectTypeOf<UseFzfOptions<Strings>>().toHaveProperty('casing').toEqualTypeOf<FzfOptions<Strings, 'casing'>>()
  expectTypeOf<UseFzfOptions<Objects>>().toHaveProperty('casing').toEqualTypeOf<FzfOptions<Objects, 'casing'>>()
})

test('should optionally expect the forward option', () => {
  expectTypeOf<UseFzfOptions<Strings>>().toHaveProperty('forward').toEqualTypeOf<FzfOptions<Strings, 'forward'>>()
  expectTypeOf<UseFzfOptions<Objects>>().toHaveProperty('forward').toEqualTypeOf<FzfOptions<Objects, 'forward'>>()
})

test('should optionally expect the fuzzy option', () => {
  expectTypeOf<UseFzfOptions<Strings>>().toHaveProperty('fuzzy').toEqualTypeOf<FzfOptions<Strings, 'fuzzy'>>()
  expectTypeOf<UseFzfOptions<Objects>>().toHaveProperty('fuzzy').toEqualTypeOf<FzfOptions<Objects, 'fuzzy'>>()
})

test('should optionally expect the limit option', () => {
  expectTypeOf<UseFzfOptions<Strings>>().toHaveProperty('limit').toEqualTypeOf<FzfOptions<Strings, 'limit'>>()
  expectTypeOf<UseFzfOptions<Objects>>().toHaveProperty('limit').toEqualTypeOf<FzfOptions<Objects, 'limit'>>()
})

test('should optionally expect the match option', () => {
  expectTypeOf<UseFzfOptions<Strings>>().toHaveProperty('match').toEqualTypeOf<FzfOptions<Strings, 'match'>>()
  expectTypeOf<UseFzfOptions<Objects>>().toHaveProperty('match').toEqualTypeOf<FzfOptions<Objects, 'match'>>()
})

test('should optionally expect the normalize option', () => {
  expectTypeOf<UseFzfOptions<Strings>>().toHaveProperty('normalize').toEqualTypeOf<FzfOptions<Strings, 'normalize'>>()
  expectTypeOf<UseFzfOptions<Objects>>().toHaveProperty('normalize').toEqualTypeOf<FzfOptions<Objects, 'normalize'>>()
})

test('should optionally expect the sort option set to false with no tiebreakers', () => {
  assertType<UseFzfResult<ArrayElement<Strings>>[]>(useFzf<Strings>({ items: [], query: '' }))
  assertType<UseFzfResult<ArrayElement<Strings>>[]>(useFzf<Strings>({ items: [], query: '', sort: false }))
  // @ts-expect-error - should not accept a tiebreaker
  assertType(useFzf<Strings>({ items: [], query: '', sort: false, tiebreakers: [byLengthAsc, byStartAsc] }))

  assertType<UseFzfResult<ArrayElement<Objects>>[]>(
    useFzf<Objects>({
      items: [],
      itemToString(item) {
        return item.name
      },
      query: '',
    })
  )
  assertType<UseFzfResult<ArrayElement<Objects>>[]>(
    useFzf<Objects>({
      items: [],
      itemToString(item) {
        return item.name
      },
      query: '',
      sort: false,
    })
  )
  // @ts-expect-error - should not accept a tiebreaker
  assertType(useFzf<Objects>({ items: [], query: '', sort: false, tiebreakers: [byLengthAsc, byStartAsc] }))
})

test('should optionally expect the sort option set to false with an optional tiebreaker', () => {
  assertType<UseFzfResult<ArrayElement<Strings>>[]>(useFzf<Strings>({ items: [], query: '' }))
  assertType<UseFzfResult<ArrayElement<Strings>>[]>(useFzf<Strings>({ items: [], query: '', sort: true }))
  assertType(useFzf<Strings>({ items: [], query: '', sort: true, tiebreakers: [byLengthAsc, byStartAsc] }))

  assertType<UseFzfResult<ArrayElement<Objects>>[]>(
    useFzf<Objects>({
      items: [],
      itemToString(item) {
        return item.name
      },
      query: '',
    })
  )
  assertType<UseFzfResult<ArrayElement<Objects>>[]>(
    useFzf<Objects>({
      items: [],
      itemToString(item) {
        return item.name
      },
      query: '',
      sort: true,
    })
  )
  assertType(
    useFzf<Objects>({
      items: [],
      itemToString(item) {
        return item.name
      },
      query: '',
      sort: true,
      tiebreakers: [byLengthAsc, byStartAsc],
    })
  )
})

type FzfOptions<TItems extends readonly unknown[], TOption extends keyof SyncOptions<ArrayElement<TItems>>> = Optional<
  SyncOptions<ArrayElement<TItems>>[TOption]
>

type Optional<TType> = TType | undefined
