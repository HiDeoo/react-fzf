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

export function WithGenerics() {
  return <Combobox items={colors} itemToString={(item) => item.name} />
}

export function Combobox<TItem>({ items, itemToString }: ComboboxProps<TItem>) {
  const [filter, setFilter] = useState('')

  const results = useFzf({
    items,
    itemToString,
    query: filter,
  })

  const { getInputProps, getItemProps, getLabelProps, getMenuProps, getToggleButtonProps, highlightedIndex, isOpen } =
    useCombobox({
      items: results,
      itemToString(item) {
        return item ? itemToString(item.item) : ''
      },
      onInputValueChange: ({ inputValue }) => {
        setFilter(inputValue ?? '')
      },
    })

  return (
    <fieldset>
      <legend>with generics</legend>
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

interface ComboboxProps<TItem> {
  items: TItem[]
  itemToString: (item: TItem) => string
}
