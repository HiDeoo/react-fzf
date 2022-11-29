import { useState } from 'react'
import { FzfHighlight, useFzf } from 'react-fzf'

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
  const [query, setQuery] = useState('')

  const { getFzfHighlightProps, results } = useFzf({ items: colors, query })

  return (
    <fieldset>
      <legend>with strings</legend>
      <label>
        query:
        <input type="text" placeholder="filter…" value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>
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
            {results.map((item, index) => (
              <li key={item}>
                <FzfHighlight {...getFzfHighlightProps({ index, item })} />
              </li>
            ))}
          </ul>
        </fieldset>
      </div>
    </fieldset>
  )
}
