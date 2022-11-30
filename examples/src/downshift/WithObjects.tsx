import { useCombobox } from 'downshift'
import { useState } from 'react'
import { FzfHighlight, useFzf } from 'react-fzf'

import { posts } from '../utils/data'
import { Example } from '../utils/Example'

function postToString(post: typeof posts[number] | null): string {
  return post?.title ?? ''
}

export function WithObjects() {
  const [query, setQuery] = useState('')

  const { getFzfHighlightProps, results } = useFzf({
    items: posts,
    itemToString: postToString,
    query,
  })

  const {
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
    isOpen,
    selectedItem,
  } = useCombobox({
    items: results,
    itemToString: postToString,
    onInputValueChange: ({ inputValue }) => {
      setQuery(inputValue ?? '')
    },
  })

  return (
    <Example title="with objects">
      <Example.Input>
        <ul>
          {posts.map((post) => (
            <li key={post.title}>{JSON.stringify(post)}</li>
          ))}
        </ul>
      </Example.Input>
      <Example.Output>
        <label {...getLabelProps()}>
          query:
          <input {...getInputProps()} />
          <button type="button" {...getToggleButtonProps()} aria-label="toggle menu">
            &#8595;
          </button>
        </label>
        <ul {...getMenuProps({ className: 'menu' })}>
          {isOpen &&
            results.map((item, index) => (
              <li
                key={item.id}
                style={{
                  ...(highlightedIndex === index ? { backgroundColor: 'lightblue' } : {}),
                  ...(selectedItem === item ? { color: 'red' } : {}),
                }}
                {...getItemProps({ item, index })}
              >
                <FzfHighlight {...getFzfHighlightProps({ index, item })} />
              </li>
            ))}
        </ul>
      </Example.Output>
    </Example>
  )
}
