import { useState } from 'react'
import { FzfResult, useFzf } from 'react-fzf'

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
  const [filter, setFilter] = useState('')

  const results = useFzf({
    items: colors,
    itemToString(item) {
      return item.name
    },
    query: filter,
  })

  return (
    <fieldset>
      <legend>with objects</legend>
      <label>
        query:
        <input type="text" placeholder="filter…" value={filter} onChange={(event) => setFilter(event.target.value)} />
      </label>
      <div className="example">
        <fieldset>
          <legend>input</legend>
          <ul>
            {colors.map((color) => (
              <li key={color.name}>{JSON.stringify(color)}</li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          <legend>output</legend>
          <ul>
            {results.map((result) => (
              <li key={result.item.name}>
                <FzfResult result={result} />
              </li>
            ))}
          </ul>
        </fieldset>
      </div>
    </fieldset>
  )
}
