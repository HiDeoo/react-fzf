import { useState } from 'react'
import { FzfHighlight, useFzf, type UseFzfResults } from 'react-fzf'
import Select, { components, type GroupBase, type OptionProps } from 'react-select'

import { Example } from '../utils/Example'

const colors = [
  { label: 'Aqua', value: 'aqua' },
  { label: 'Black', value: 'black' },
  { label: 'Blue', value: 'blue' },
  { label: 'Fushsia', value: 'fushsia' },
  { label: 'Gray', value: 'gray' },
  { label: 'Green', value: 'green' },
  { label: 'Lime', value: 'lime' },
  { label: 'Maroon', value: 'maroon' },
  { label: 'Navy', value: 'navy' },
  { label: 'Olive', value: 'olive' },
  { label: 'Red', value: 'red' },
  { label: 'Silver', value: 'silver' },
  { label: 'Teal', value: 'teal' },
  { label: 'White', value: 'white' },
  { label: 'Yellow', value: 'yellow' },
]

export function Option(props: OptionProps<typeof colors[number]>) {
  return (
    <components.Option {...props}>
      <FzfHighlight {...props.selectProps.getFzfHighlightProps({ item: props.data })} />
    </components.Option>
  )
}

export function WithValues() {
  const [query, setQuery] = useState('')

  const { getFzfHighlightProps, results } = useFzf({
    items: colors,
    itemToString(item) {
      return item.value
    },
    query,
  })

  return (
    <Example title="with string values">
      <Example.Input>
        <ul>
          {colors.map(({ value }) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </Example.Input>
      <Example.Output>
        <Select
          components={{ Option }}
          filterOption={() => true}
          getFzfHighlightProps={getFzfHighlightProps}
          inputValue={query}
          onInputChange={setQuery}
          options={results}
        />
      </Example.Output>
    </Example>
  )
}

declare module 'react-select/dist/declarations/src/Select' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    getFzfHighlightProps: UseFzfResults<typeof colors[number]>['getFzfHighlightProps']
  }
}
