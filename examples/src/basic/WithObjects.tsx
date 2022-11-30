import { useState } from 'react'
import { FzfHighlight, useFzf } from 'react-fzf'

import { posts } from '../utils/data'
import { Example } from '../utils/Example'

export function WithObjects() {
  const [query, setQuery] = useState('')

  const { getFzfHighlightProps, results } = useFzf({
    items: posts,
    itemToString(item) {
      return item.title
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
          {posts.map((post) => (
            <li key={post.title}>{JSON.stringify(post)}</li>
          ))}
        </ul>
      </Example.Input>
      <Example.Output>
        <ul>
          {results.map((item, index) => (
            <li key={item.title}>
              <FzfHighlight {...getFzfHighlightProps({ index, item })} />
            </li>
          ))}
        </ul>
      </Example.Output>
    </Example>
  )
}
