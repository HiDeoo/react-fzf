import { renderHook } from '@testing-library/react'
import { assert, describe, expect, test } from 'vitest'

import { useFzf } from './useFzf'

const animals = [
  'Dog',
  'Puppy',
  'Turtle',
  'Rabbit',
  'Parrot',
  'Cat',
  'Kitten',
  'Goldfish',
  'Mouse',
  'Tropical fish',
  'Hamster',
]

const vehicles = [
  { name: 'Car', environment: 'land' },
  { name: 'Bicycle', environment: 'land' },
  { name: 'Motorcycle', environment: 'land' },
  { name: 'Racing Car', environment: 'land' },
  { name: 'Airplane', environment: 'air' },
  { name: 'Boat', environment: 'water' },
  { name: 'Submarine', environment: 'water' },
]

describe('results', () => {
  test('should return all items for an empty query', () => {
    const { result } = renderHook(() => useFzf({ items: animals, query: '' }))

    expect(result.current.results).toHaveLength(animals.length)
    expect(result.current.results).toEqual(animals)
  })

  test('should return no results for an invalid query', () => {
    const { result } = renderHook(() => useFzf({ items: animals, query: 'test' }))

    expect(result.current.results).toHaveLength(0)
  })

  test('should return a single result matching the query', () => {
    const { result } = renderHook(() => useFzf({ items: animals, query: 'gold' }))

    expect(result.current.results).toHaveLength(1)
    expect(result.current.results).toEqual(resultsContaining(['Goldfish']))
  })

  test('should return multiple results matching the query', () => {
    const { result } = renderHook(() => useFzf({ items: animals, query: 'tt' }))

    expect(result.current.results).toHaveLength(2)
    expect(result.current.results).toEqual(resultsContaining(['Turtle', 'Kitten']))
  })

  test('should update the results when updating the query', () => {
    const initialProps = { items: animals, query: '' }

    const { result, rerender } = renderHook((props) => useFzf(props), {
      initialProps: initialProps,
    })

    expect(result.current.results).toHaveLength(animals.length)
    expect(result.current.results).toEqual(resultsContaining(animals))

    rerender({ ...initialProps, query: 'rr' })

    expect(result.current.results).toHaveLength(1)
    expect(result.current.results).toEqual(resultsContaining(['Parrot']))

    rerender({ ...initialProps, query: 'rrr' })

    expect(result.current.results).toHaveLength(0)

    rerender({ ...initialProps, query: 'mou' })

    expect(result.current.results).toHaveLength(1)
    expect(result.current.results).toEqual(resultsContaining(['Mouse']))
  })

  test('should update the results when updating the items', () => {
    const initialProps = { items: animals, query: 'ra' }

    const { result, rerender } = renderHook((props) => useFzf(props), {
      initialProps: initialProps,
    })

    expect(result.current.results).toHaveLength(2)
    expect(result.current.results).toEqual(resultsContaining(['Rabbit', 'Tropical fish']))

    const newAnimals = [
      'Cow',
      'Ducks',
      'Shrimp',
      'Pig',
      'Goat',
      'Crab',
      'Deer',
      'Bee',
      'Sheep',
      'Turkey',
      'Dove',
      'Chicken',
      'Horse',
    ]

    rerender({ ...initialProps, items: newAnimals })

    expect(result.current.results).toHaveLength(1)
    expect(result.current.results).toEqual(resultsContaining(['Crab']))

    rerender({ ...initialProps, items: newAnimals, query: 'rad' })

    expect(result.current.results).toHaveLength(0)

    rerender({ ...initialProps, items: newAnimals, query: 'eer' })

    expect(result.current.results).toHaveLength(1)
    expect(result.current.results).toEqual(resultsContaining(['Deer']))
  })

  test('should support filtering non-string items', () => {
    const initialProps = {
      items: vehicles,
      itemToString(item: typeof vehicles[number]) {
        return item.name
      },
      query: '',
    }

    const { result, rerender } = renderHook((props) => useFzf(props), {
      initialProps: initialProps,
    })

    expect(result.current.results).toHaveLength(vehicles.length)
    expect(result.current.results).toEqual(resultsContaining(vehicles))

    rerender({ ...initialProps, query: 'ai' })

    expect(result.current.results).toHaveLength(3)
    expect(result.current.results).toEqual(
      resultsContaining([
        expect.objectContaining({ name: 'Racing Car' }),
        expect.objectContaining({ name: 'Airplane' }),
        expect.objectContaining({ name: 'Submarine' }),
      ])
    )

    rerender({ ...initialProps, query: 'aian' })

    expect(result.current.results).toHaveLength(1)
    expect(result.current.results).toEqual(resultsContaining([expect.objectContaining({ name: 'Airplane' })]))

    rerender({ ...initialProps, query: 'aiana' })

    expect(result.current.results).toHaveLength(0)
  })
})

describe('getFzfHighlightProps', () => {
  test('should return the highlight with characters for string items', () => {
    const { result } = renderHook(() => useFzf({ items: animals, query: 'tt' }))

    expect(result.current.results).toHaveLength(2)

    const [item_0, item_1] = result.current.results

    assert(item_0)
    assert(item_1)

    expect(result.current.getFzfHighlightProps({ item: item_0, index: 0 }).highlight).toEqual(
      expect.objectContaining({ item: 'Turtle', characters: ['T', 'u', 'r', 't', 'l', 'e'] })
    )

    expect(result.current.getFzfHighlightProps({ item: item_1, index: 1 }).highlight).toEqual(
      expect.objectContaining({ item: 'Kitten', characters: ['K', 'i', 't', 't', 'e', 'n'] })
    )
  })

  test('should return the highlight with characters for non-string items', () => {
    const { result } = renderHook(() =>
      useFzf({
        items: vehicles,
        itemToString(item) {
          return item.name
        },
        query: 'ci ar',
      })
    )

    expect(result.current.results).toHaveLength(1)

    const [item_0] = result.current.results

    assert(item_0)

    expect(result.current.getFzfHighlightProps({ item: item_0, index: 0 }).highlight).toEqual(
      expect.objectContaining({
        item: expect.objectContaining({ name: 'Racing Car' }),
        characters: ['R', 'a', 'c', 'i', 'n', 'g', ' ', 'C', 'a', 'r'],
      })
    )
  })

  test('should use `itemToString` if provided even for string items', () => {
    const initialProps = {
      items: animals,
      itemToString(item: typeof animals[number]) {
        return item.toUpperCase()
      },
      query: '',
    }

    const { result, rerender } = renderHook((props) => useFzf(props), {
      initialProps: initialProps,
    })

    expect(result.current.results).toHaveLength(animals.length)
    expect(result.current.results).toEqual(animals)

    rerender({ ...initialProps, query: 'do' })

    expect(result.current.results).toHaveLength(1)

    const [item_0] = result.current.results

    assert(item_0)

    expect(result.current.getFzfHighlightProps({ item: item_0, index: 0 }).highlight).toEqual(
      expect.objectContaining({
        item: 'Dog',
        characters: ['D', 'O', 'G'],
      })
    )
  })

  test('should return the highlight with characters even with no index provided', () => {
    const { result } = renderHook(() => useFzf({ items: animals, query: 'tt' }))

    expect(result.current.results).toHaveLength(2)

    const [item_0, item_1] = result.current.results

    assert(item_0)
    assert(item_1)

    expect(result.current.getFzfHighlightProps({ item: item_0 }).highlight).toEqual(
      expect.objectContaining({ item: 'Turtle', characters: ['T', 'u', 'r', 't', 'l', 'e'] })
    )

    expect(result.current.getFzfHighlightProps({ item: item_1 }).highlight).toEqual(
      expect.objectContaining({ item: 'Kitten', characters: ['K', 'i', 't', 't', 'e', 'n'] })
    )
  })

  test('should throw if an invalid index is provided', () => {
    const { result } = renderHook(() => useFzf({ items: animals, query: 'tt' }))

    const [item_0] = result.current.results

    assert(item_0)

    expect(() => result.current.getFzfHighlightProps({ item: item_0, index: 10 })).toThrowErrorMatchingInlineSnapshot(
      '"getFzfHighlightProps: Unable to find highlight for item \'\\"Turtle\\"\'."'
    )
  })

  test('should throw if an invalid item is provided with no index', () => {
    const { result } = renderHook(() => useFzf({ items: animals, query: 'tt' }))

    expect(() => result.current.getFzfHighlightProps({ item: 'test' })).toThrowErrorMatchingInlineSnapshot(
      '"getFzfHighlightProps: Unable to find highlight for item \'\\"test\\"\'."'
    )
  })

  test('should pass down other props', () => {
    const { result } = renderHook(() => useFzf({ items: animals, query: 'tt' }))

    expect(result.current.results).toHaveLength(2)

    const [item_0] = result.current.results

    assert(item_0)

    const className = 'test'

    expect(result.current.getFzfHighlightProps({ className, item: item_0, index: 0 }).className).toBe(className)
  })
})

function resultsContaining(expectedItems: unknown[]) {
  return expect.arrayContaining(expectedItems)
}
