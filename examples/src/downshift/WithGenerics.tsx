import { useCombobox } from 'downshift'
import { useState } from 'react'
import { FzfHighlight, useFzf } from 'react-fzf'

import { posts } from '../utils/data'
import { Example } from '../utils/Example'

function postToString(post: typeof posts[number] | null): string {
  return post?.title ?? ''
}

export function WithGenerics() {
  return <Combobox items={posts} itemToString={postToString} />
}

export function Combobox<TItem>({ items, itemToString }: ComboboxProps<TItem>) {
  const [query, setQuery] = useState('')

  const { getFzfHighlightProps, results } = useFzf({
    items,
    itemToString,
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
    itemToString,
    onInputValueChange: ({ inputValue }) => {
      setQuery(inputValue ?? '')
    },
  })

  return (
    <Example title="with generics">
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
            results.map((item, index) => {
              const itemStr = itemToString(item)

              return (
                <li
                  key={`${itemStr}${index}`}
                  style={{
                    ...(highlightedIndex === index ? { backgroundColor: 'lightblue' } : {}),
                    ...(selectedItem === item ? { color: 'red' } : {}),
                  }}
                  {...getItemProps({ item, index })}
                >
                  <FzfHighlight {...getFzfHighlightProps({ index, item })} />
                </li>
              )
            })}
        </ul>
      </Example.Output>
    </Example>
  )
}

interface ComboboxProps<TItem> {
  items: TItem[]
  itemToString: (item: TItem | null) => string
}
