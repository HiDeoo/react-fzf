import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type ComponentPropsWithoutRef, type ElementType, useState } from 'react'
import { expect, test } from 'vitest'

import { FzfHighlight } from './FzfHighlight'
import { useFzf } from './useFzf'

const chemicalElements = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium',
  'Boron',
  'Carbon',
  'Nitrogen',
  'Oxygen',
  'Fluorine',
  'Neon',
]

function Search<TElement extends ElementType>(props: ComponentPropsWithoutRef<TElement>) {
  const [query, setQuery] = useState('')

  const { getFzfHighlightProps, results } = useFzf({ items: chemicalElements, query })

  return (
    <div>
      <input type="text" placeholder="filter" value={query} onChange={(event) => setQuery(event.target.value)} />
      <ul>
        {results.map((item, index) => (
          <li key={item}>
            <FzfHighlight {...getFzfHighlightProps({ item, index, ...props })} />
          </li>
        ))}
      </ul>
    </div>
  )
}

test('should render all items with no highlight for an empty query', () => {
  render(<Search />)

  const results = screen.getAllByRole('listitem')

  expect(results.length).toBe(chemicalElements.length)
  expect(results.map((result) => result.textContent)).toEqual(chemicalElements)

  expect(results).toMatchInlineSnapshot(`
    [
      <li>
        H
        y
        d
        r
        o
        g
        e
        n
      </li>,
      <li>
        H
        e
        l
        i
        u
        m
      </li>,
      <li>
        L
        i
        t
        h
        i
        u
        m
      </li>,
      <li>
        B
        e
        r
        y
        l
        l
        i
        u
        m
      </li>,
      <li>
        B
        o
        r
        o
        n
      </li>,
      <li>
        C
        a
        r
        b
        o
        n
      </li>,
      <li>
        N
        i
        t
        r
        o
        g
        e
        n
      </li>,
      <li>
        O
        x
        y
        g
        e
        n
      </li>,
      <li>
        F
        l
        u
        o
        r
        i
        n
        e
      </li>,
      <li>
        N
        e
        o
        n
      </li>,
    ]
  `)
})

test('should render highlighted results matching a query', async () => {
  render(<Search />)

  screen.getByPlaceholderText('filter').focus()

  const user = userEvent.setup()
  await user.keyboard('hm')

  const results = screen.getAllByRole('listitem')

  expect(results.length).toBe(2)
  expect(results.map((result) => result.textContent)).toEqual(['Helium', 'Lithium'])

  expect(results).toMatchInlineSnapshot(`
    [
      <li>
        <strong>
          H
        </strong>
        e
        l
        i
        u
        <strong>
          m
        </strong>
      </li>,
      <li>
        L
        i
        t
        <strong>
          h
        </strong>
        i
        u
        <strong>
          m
        </strong>
      </li>,
    ]
  `)
})

test('should render highlighted results matching a query with custom tags & props', async () => {
  render(<Search as="mark" className="highlight" />)

  screen.getByPlaceholderText('filter').focus()

  const user = userEvent.setup()
  await user.keyboard('ll')

  const results = screen.getAllByRole('listitem')

  expect(results).toMatchInlineSnapshot(`
    [
      <li>
        B
        e
        r
        y
        <mark
          class="highlight"
        >
          l
        </mark>
        <mark
          class="highlight"
        >
          l
        </mark>
        i
        u
        m
      </li>,
    ]
  `)
})
