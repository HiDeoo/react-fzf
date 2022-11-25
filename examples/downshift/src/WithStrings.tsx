import { useCombobox } from 'downshift'
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

  const { getInputProps, getItemProps, getLabelProps, getMenuProps, getToggleButtonProps, highlightedIndex, isOpen } =
    useCombobox({
      items: results,
      itemToString(item) {
        return item?.item ?? ''
      },
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
              results.map((result, index) => (
                <li
                  key={`${result.item}${index}`}
                  style={highlightedIndex === index ? { backgroundColor: 'lightblue' } : {}}
                  {...getItemProps({ item: result, index })}
                >
                  <FzfResult result={result} />
                </li>
              ))}
          </ul>
        </fieldset>
      </div>
    </fieldset>
  )
}
