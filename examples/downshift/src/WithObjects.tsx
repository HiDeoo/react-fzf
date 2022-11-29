import { useCombobox } from 'downshift'
import { useState } from 'react'
import { FzfHighlight, useFzf } from 'react-fzf'

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
  const [filter, setFilter] = useState('')

  const { getFzfHighlightProps, results } = useFzf({
    items: colors,
    itemToString: colorToString,
    query: filter,
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
      setFilter(inputValue ?? '')
    },
  })

  return (
    <fieldset>
      <legend>with objects</legend>
      <label {...getLabelProps()}>
        query:
        <input {...getInputProps()} />
        <button type="button" {...getToggleButtonProps()} aria-label="toggle menu">
          &#8595;
        </button>
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
          <ul {...getMenuProps()}>
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
        </fieldset>
      </div>
    </fieldset>
  )
}

interface Color {
  name: string
}
