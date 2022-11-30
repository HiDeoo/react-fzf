import { useState } from 'react'
import { FzfHighlight, useFzf } from 'react-fzf'

import { colors } from '../utils/data'
import { Example } from '../utils/Example'

export function WithStrings() {
  const [query, setQuery] = useState('')

  const { getFzfHighlightProps, results } = useFzf({ items: colors, query })

  return (
    <Example
      title="with strings"
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
            <li key={color}>{color}</li>
          ))}
        </ul>
      </Example.Input>
      <Example.Output>
        <ul>
          {results.map((item, index) => (
            <li key={item}>
              <FzfHighlight {...getFzfHighlightProps({ index, item })} />
            </li>
          ))}
        </ul>
      </Example.Output>
    </Example>
  )
}
