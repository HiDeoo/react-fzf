import { useCombobox } from 'downshift'
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

function colorToString(color: Color | null): string {
  return color?.name ?? ''
}

export function WithObjects() {
  const [query, setQuery] = useState('')

  const { getFzfHighlightProps, results } = useFzf({
    items: colors,
    itemToString: colorToString,
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
    itemToString: colorToString,
    onInputValueChange: ({ inputValue }) => {
      setQuery(inputValue ?? '')
    },
  })

  return (
    <Example title="with objects">
      <Example.Input>
        <ul>
          {colors.map((color) => (
            <li key={color.name}>{JSON.stringify(color)}</li>
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
                key={`${item.name}${index}`}
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

interface Color {
  name: string
}
