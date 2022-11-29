import { useState } from 'react'
import { FzfHighlight, useFzf } from 'react-fzf'

import { Example } from '../utils/Example'

const colors = [
  { name: 'aqua' },
  { name: 'black' },
  { name: 'blue' },
  { name: 'fushsia' },
  { name: 'gray' },
  { name: 'green' },
  { name: 'lime' },
  { name: 'maroon' },
  { name: 'navy' },
  { name: 'olive' },
  { name: 'red' },
  { name: 'silver' },
  { name: 'teal' },
  { name: 'white' },
  { name: 'yellow' },
]

export function WithObjects() {
  const [query, setQuery] = useState('')

  const { getFzfHighlightProps, results } = useFzf({
    items: colors,
    itemToString(item) {
      return item.name
    },
    query,
  })

  return (
    <Example
      title="with objects"
      header={
        <label>
          query:
          <input type="text" placeholder="filter…" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
      }
    >
      <Example.Input>
        <ul>
          {colors.map((color) => (
            <li key={color.name}>{JSON.stringify(color)}</li>
          ))}
        </ul>
      </Example.Input>
      <Example.Output>
        <ul>
          {results.map((item, index) => (
            <li key={item.name}>
              <FzfHighlight {...getFzfHighlightProps({ index, item })} />
            </li>
          ))}
        </ul>
      </Example.Output>
    </Example>
  )
}
