import { expectTypeOf, test } from 'vitest'

import { type UseFzfOptions } from './useFzf'

type StringItems = string[]
type ObjectItems = { name: string }[]

test('should always expect a list of items and a query', () => {
  expectTypeOf<UseFzfOptions<StringItems>>().toHaveProperty('items').toEqualTypeOf<StringItems>()
  expectTypeOf<UseFzfOptions<ObjectItems>>().toHaveProperty('items').toEqualTypeOf<ObjectItems>()

  expectTypeOf<UseFzfOptions<StringItems>>().toHaveProperty('query').toEqualTypeOf<string>()
  expectTypeOf<UseFzfOptions<ObjectItems>>().toHaveProperty('query').toEqualTypeOf<string>()
})

test('should optionally expect itemToString for a list of string items', () => {
  expectTypeOf<UseFzfOptions<StringItems>>()
    .toHaveProperty('itemToString')
    .toEqualTypeOf<((item: string) => string) | undefined>()
})

test('should expect itemToString for a list of non-string items', () => {
  expectTypeOf<UseFzfOptions<ObjectItems>>()
    .toHaveProperty('itemToString')
    .toEqualTypeOf<(item: ObjectItems[number]) => string>()
})
