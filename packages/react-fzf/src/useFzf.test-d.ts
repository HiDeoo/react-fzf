import { byLengthAsc, byStartAsc } from 'fzf'
import { type SyncOptions } from 'fzf/dist/types/types'
import { assertType, expectTypeOf, test } from 'vitest'

import { useFzf, type UseFzfOptions, type UseFzfResult } from './useFzf'

type StringItem = string

interface ObjectItem {
  name: string
}

test('should always expect a list of items and a query', () => {
  expectTypeOf<UseFzfOptions<StringItem>>().toHaveProperty('items').toEqualTypeOf<StringItem[]>()
  expectTypeOf<UseFzfOptions<ObjectItem>>().toHaveProperty('items').toEqualTypeOf<ObjectItem[]>()

  expectTypeOf<UseFzfOptions<StringItem>>().toHaveProperty('query').toEqualTypeOf<string>()
  expectTypeOf<UseFzfOptions<ObjectItem>>().toHaveProperty('query').toEqualTypeOf<string>()
})

test('should optionally expect the itemToString option for a list of string items', () => {
  expectTypeOf<UseFzfOptions<StringItem>>()
    .toHaveProperty('itemToString')
    .toEqualTypeOf<Optional<(item: string) => string>>()
})

test('should expect the itemToString option for a list of non-string items', () => {
  expectTypeOf<UseFzfOptions<ObjectItem>>().toHaveProperty('itemToString').toEqualTypeOf<(item: ObjectItem) => string>()
})

test('should optionally expect the casing option', () => {
  expectTypeOf<UseFzfOptions<StringItem>>().toHaveProperty('casing').toEqualTypeOf<FzfOptions<StringItem, 'casing'>>()
  expectTypeOf<UseFzfOptions<ObjectItem>>().toHaveProperty('casing').toEqualTypeOf<FzfOptions<ObjectItem, 'casing'>>()
})

test('should optionally expect the forward option', () => {
  expectTypeOf<UseFzfOptions<StringItem>>().toHaveProperty('forward').toEqualTypeOf<FzfOptions<StringItem, 'forward'>>()
  expectTypeOf<UseFzfOptions<ObjectItem>>().toHaveProperty('forward').toEqualTypeOf<FzfOptions<ObjectItem, 'forward'>>()
})

test('should optionally expect the fuzzy option', () => {
  expectTypeOf<UseFzfOptions<StringItem>>().toHaveProperty('fuzzy').toEqualTypeOf<FzfOptions<StringItem, 'fuzzy'>>()
  expectTypeOf<UseFzfOptions<ObjectItem>>().toHaveProperty('fuzzy').toEqualTypeOf<FzfOptions<ObjectItem, 'fuzzy'>>()
})

test('should optionally expect the limit option', () => {
  expectTypeOf<UseFzfOptions<StringItem>>().toHaveProperty('limit').toEqualTypeOf<FzfOptions<StringItem, 'limit'>>()
  expectTypeOf<UseFzfOptions<ObjectItem>>().toHaveProperty('limit').toEqualTypeOf<FzfOptions<ObjectItem, 'limit'>>()
})

test('should optionally expect the match option', () => {
  expectTypeOf<UseFzfOptions<StringItem>>().toHaveProperty('match').toEqualTypeOf<FzfOptions<StringItem, 'match'>>()
  expectTypeOf<UseFzfOptions<ObjectItem>>().toHaveProperty('match').toEqualTypeOf<FzfOptions<ObjectItem, 'match'>>()
})

test('should optionally expect the normalize option', () => {
  expectTypeOf<UseFzfOptions<StringItem>>()
    .toHaveProperty('normalize')
    .toEqualTypeOf<FzfOptions<StringItem, 'normalize'>>()
  expectTypeOf<UseFzfOptions<ObjectItem>>()
    .toHaveProperty('normalize')
    .toEqualTypeOf<FzfOptions<ObjectItem, 'normalize'>>()
})

test('should optionally expect the sort option set to false with no tiebreakers', () => {
  assertType<UseFzfResult<StringItem>[]>(useFzf<StringItem>({ items: [], query: '' }))
  assertType<UseFzfResult<StringItem>[]>(useFzf<StringItem>({ items: [], query: '', sort: false }))
  // @ts-expect-error - should not accept a tiebreaker
  assertType(useFzf<StringItem>({ items: [], query: '', sort: false, tiebreakers: [byLengthAsc, byStartAsc] }))

  assertType<UseFzfResult<ObjectItem>[]>(
    useFzf<ObjectItem>({
      items: [],
      itemToString(item) {
        return item.name
      },
      query: '',
    })
  )
  assertType<UseFzfResult<ObjectItem>[]>(
    useFzf<ObjectItem>({
      items: [],
      itemToString(item) {
        return item.name
      },
      query: '',
      sort: false,
    })
  )
  // @ts-expect-error - should not accept a tiebreaker
  assertType(useFzf<ObjectItem>({ items: [], query: '', sort: false, tiebreakers: [byLengthAsc, byStartAsc] }))
})

test('should optionally expect the sort option set to false with an optional tiebreaker', () => {
  assertType<UseFzfResult<StringItem>[]>(useFzf<StringItem>({ items: [], query: '' }))
  assertType<UseFzfResult<StringItem>[]>(useFzf<StringItem>({ items: [], query: '', sort: true }))
  assertType<UseFzfResult<StringItem>[]>(
    useFzf<StringItem>({ items: [], query: '', sort: true, tiebreakers: [byLengthAsc, byStartAsc] })
  )

  assertType<UseFzfResult<ObjectItem>[]>(
    useFzf<ObjectItem>({
      items: [],
      itemToString(item) {
        return item.name
      },
      query: '',
    })
  )
  assertType<UseFzfResult<ObjectItem>[]>(
    useFzf<ObjectItem>({
      items: [],
      itemToString(item) {
        return item.name
      },
      query: '',
      sort: true,
    })
  )
  assertType<UseFzfResult<ObjectItem>[]>(
    useFzf<ObjectItem>({
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

type FzfOptions<TItem, TOption extends keyof SyncOptions<TItem>> = Optional<SyncOptions<TItem>[TOption]>

type Optional<TType> = TType | undefined
