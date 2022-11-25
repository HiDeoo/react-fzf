import { useCombobox } from 'downshift'
import { useState } from 'react'
import { FzfResult, useFzf } from 'react-fzf'

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

export function WithObjects() {
  const [filter, setFilter] = useState('')

  const results = useFzf({
    items: colors,
    itemToString(item) {
      return item.name
    },
    query: filter,
  })

  const { getInputProps, getItemProps, getLabelProps, getMenuProps, getToggleButtonProps, highlightedIndex, isOpen } =
    useCombobox({
      items: results,
      itemToString(item) {
        return item?.item.name ?? ''
      },
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
