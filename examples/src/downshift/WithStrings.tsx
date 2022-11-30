import { useCombobox } from 'downshift'
import { useState } from 'react'
import { FzfHighlight, useFzf } from 'react-fzf'

import { colors } from '../utils/data'
import { Example } from '../utils/Example'

export function WithStrings() {
  const [query, setQuery] = useState('')

  const { getFzfHighlightProps, results } = useFzf({ items: colors, query })

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
    onInputValueChange: ({ inputValue }) => {
      setQuery(inputValue ?? '')
    },
  })

  return (
    <Example title="with strings">
      <Example.Input>
        <ul>
          {colors.map((color) => (
            <li key={color}>{color}</li>
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
                key={`${item}${index}`}
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
