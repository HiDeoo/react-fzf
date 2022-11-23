import { useState } from 'react'
import { FzfResult, useFzf } from 'react-fzf'

const colors = [
  'aqua',
  'black',
  'blue',
  'fushsia',
  'gray',
  'green',
  'lime',
  'maroon',
  'navy',
  'olive',
  'red',
  'silver',
  'teal',
  'white',
  'yellow',
]

export function WithStrings() {
  const [filter, setFilter] = useState('')

  const results = useFzf({ items: colors, query: filter })

  return (
    <fieldset>
      <legend>with strings</legend>
      <input type="text" placeholder="filter…" value={filter} onChange={(event) => setFilter(event.target.value)} />
      <div className="example">
        <fieldset>
          <legend>input</legend>
          <ul>
            {colors.map((color) => (
              <li key={color}>{color}</li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          <legend>output</legend>
          <ul>
            {results.map((result) => (
              <li key={result.item}>
                <FzfResult result={result} />
              </li>
            ))}
          </ul>
        </fieldset>
      </div>
    </fieldset>
  )
}
