import { renderHook } from '@testing-library/react'
import { expect, test } from 'vitest'

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

test('should return all items for an empty query', () => {
  const { result } = renderHook(() => useFzf({ items: animals, query: '' }))

  expect(result.current).toHaveLength(animals.length)
  expect(result.current).toEqual(resultsContaining(animals))
})

test('should return no results for an invalid query', () => {
  const { result } = renderHook(() => useFzf({ items: animals, query: 'test' }))

  expect(result.current).toHaveLength(0)
})

test('should return a single result matching the query', () => {
  const { result } = renderHook(() => useFzf({ items: animals, query: 'gold' }))

  expect(result.current).toHaveLength(1)
  expect(result.current).toEqual(resultsContaining(['Goldfish']))
})

test('should return multiple results matching the query', () => {
  const { result } = renderHook(() => useFzf({ items: animals, query: 'tt' }))

  expect(result.current).toHaveLength(2)
  expect(result.current).toEqual(resultsContaining(['Turtle', 'Kitten']))
})

test('should update the results when updating the query', () => {
  const initialProps = { items: animals, query: '' }

  const { result, rerender } = renderHook((props) => useFzf(props), {
    initialProps: initialProps,
  })

  expect(result.current).toHaveLength(animals.length)
  expect(result.current).toEqual(resultsContaining(animals))

  rerender({ ...initialProps, query: 'rr' })

  expect(result.current).toHaveLength(1)
  expect(result.current).toEqual(resultsContaining(['Parrot']))

  rerender({ ...initialProps, query: 'rrr' })

  expect(result.current).toHaveLength(0)

  rerender({ ...initialProps, query: 'mou' })

  expect(result.current).toHaveLength(1)
  expect(result.current).toEqual(resultsContaining(['Mouse']))
})

test('should update the results when updating the items', () => {
  const initialProps = { items: animals, query: 'ra' }

  const { result, rerender } = renderHook((props) => useFzf(props), {
    initialProps: initialProps,
  })

  expect(result.current).toHaveLength(2)
  expect(result.current).toEqual(resultsContaining(['Rabbit', 'Tropical fish']))

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

  expect(result.current).toHaveLength(1)
  expect(result.current).toEqual(resultsContaining(['Crab']))

  rerender({ ...initialProps, items: newAnimals, query: 'rad' })

  expect(result.current).toHaveLength(0)

  rerender({ ...initialProps, items: newAnimals, query: 'eer' })

  expect(result.current).toHaveLength(1)
  expect(result.current).toEqual(resultsContaining(['Deer']))
})

test('should add the characters lists to the results', () => {
  const { result } = renderHook(() => useFzf({ items: animals, query: 'tt' }))

  expect(result.current).toHaveLength(2)
  expect(result.current).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ item: 'Kitten', characters: ['K', 'i', 't', 't', 'e', 'n'] }),
      expect.objectContaining({ item: 'Turtle', characters: ['T', 'u', 'r', 't', 'l', 'e'] }),
    ])
  )
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

  expect(result.current).toHaveLength(vehicles.length)
  expect(result.current).toEqual(resultsContaining(vehicles))

  rerender({ ...initialProps, query: 'ai' })

  expect(result.current).toHaveLength(3)
  expect(result.current).toEqual(
    resultsContaining([
      expect.objectContaining({ name: 'Racing Car' }),
      expect.objectContaining({ name: 'Airplane' }),
      expect.objectContaining({ name: 'Submarine' }),
    ])
  )

  rerender({ ...initialProps, query: 'aian' })

  expect(result.current).toHaveLength(1)
  expect(result.current).toEqual(resultsContaining([expect.objectContaining({ name: 'Airplane' })]))

  rerender({ ...initialProps, query: 'aiana' })

  expect(result.current).toHaveLength(0)
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

  expect(result.current).toHaveLength(animals.length)
  expect(result.current).toEqual(resultsContaining(animals))

  rerender({ ...initialProps, query: 'do' })

  expect(result.current).toHaveLength(1)
  expect(result.current).toEqual(
    expect.arrayContaining([expect.objectContaining({ item: 'Dog', characters: ['D', 'O', 'G'] })])
  )
})

test('should add the characters lists to non-string results', () => {
  const { result } = renderHook(() =>
    useFzf({
      items: vehicles,
      itemToString(item) {
        return item.name
      },
      query: 'ci ar',
    })
  )

  expect(result.current).toHaveLength(1)
  expect(result.current).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        item: expect.objectContaining({ name: 'Racing Car' }),
        characters: ['R', 'a', 'c', 'i', 'n', 'g', ' ', 'C', 'a', 'r'],
      }),
    ])
  )
})

function resultsContaining(expectedItems: unknown[]) {
  return expect.arrayContaining(expectedItems.map((item) => expect.objectContaining({ item })))
}
