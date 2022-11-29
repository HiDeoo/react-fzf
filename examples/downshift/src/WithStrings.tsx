import { useCombobox } from 'downshift'
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
  const [filter, setFilter] = useState('')

  const { getFzfHighlightProps, results } = useFzf({ items: colors, query: filter })

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
      setFilter(inputValue ?? '')
    },
  })

  return (
    <fieldset>
      <legend>with strings</legend>
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
              <li key={color}>{color}</li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          <legend>output</legend>
          <ul {...getMenuProps()}>
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
        </fieldset>
      </div>
    </fieldset>
  )
}
