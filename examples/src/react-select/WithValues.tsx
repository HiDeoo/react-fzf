import { useState } from 'react'
import { FzfHighlight, useFzf, type UseFzfResults } from 'react-fzf'
import Select, { components, type GroupBase, type OptionProps } from 'react-select'

import { colors } from '../utils/data'
import { Example } from '../utils/Example'

const colorOptions = colors.map((color) => ({ label: capitalize(color), value: color }))

export function Option(props: OptionProps<typeof colorOptions[number]>) {
  return (
    <components.Option {...props}>
      <FzfHighlight {...props.selectProps.getFzfHighlightProps({ item: props.data })} />
    </components.Option>
  )
}

export function WithValues() {
  const [query, setQuery] = useState('')

  const { getFzfHighlightProps, results } = useFzf({
    items: colorOptions,
    itemToString(item) {
      return item.value
    },
    query,
  })

  return (
    <Example title="with string values">
      <Example.Input>
        <ul>
          {colorOptions.map(({ value }) => (
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

function capitalize([firstCharacter = '', ...otherCharacters]: string) {
  return [firstCharacter.toUpperCase(), ...otherCharacters].join('')
}

declare module 'react-select/dist/declarations/src/Select' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    getFzfHighlightProps: UseFzfResults<typeof colorOptions[number]>['getFzfHighlightProps']
  }
}
