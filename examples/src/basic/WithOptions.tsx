import { useState } from 'react'
import { basicMatch, byLengthAsc, extendedMatch, type UseFzfOptions, FzfHighlight, useFzf } from 'react-fzf'

import { Example } from '../utils/Example'

const names = [
  'Samuel Galloway',
  'Nathanael Sawyer',
  'Nichola Stark',
  'Sabah Reeve',
  'Aleksander Nieves',
  'Ansh Corrigan',
  'Ellesha Mcdermott',
  'Terrence Reid',
  'Zakk Krueger',
  'Zoë Everett',
  'Rupert Knight',
  'Fenella Doyle',
]

function nameToLastname(name: string) {
  return name.split(' ')[1] ?? ''
}

export function WithOptions() {
  const [query, setQuery] = useState('')

  const [casing, setCasing] = useState<Casing>('smart-case')
  const [forward, setForward] = useState(true)
  const [fuzzy, setFuzzy] = useState<Fuzzy>('v2')
  const [lastNameOnly, setLastNameOnly] = useState(false)
  const [lengthTiebreaker, setLengthTiebreaker] = useState(false)
  const [limit, setLimit] = useState(20)
  const [normalize, setNormalize] = useState(true)
  const [sort, setSort] = useState(true)
  const [useExtendedMatch, setUseExtendedMatch] = useState(false)

  const { getFzfHighlightProps, results } = useFzf({
    casing,
    forward,
    fuzzy,
    items: names,
    itemToString: lastNameOnly ? nameToLastname : undefined,
    limit,
    match: useExtendedMatch ? extendedMatch : basicMatch,
    normalize,
    query,
    sort,
    tiebreakers: lengthTiebreaker ? [byLengthAsc] : [],
  })

  return (
    <Example
      title="with options"
      header={
        <>
          <label>
            query:
            <input type="text" placeholder="filter…" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <label>
            limit:
            <input
              min={0}
              onChange={(event) => setLimit(event.target.valueAsNumber)}
              placeholder="limit"
              type="number"
              value={limit}
            />
          </label>
          <label>
            last name only:
            <input onChange={(event) => setLastNameOnly(event.target.checked)} type="checkbox" checked={lastNameOnly} />
          </label>
          <label>
            casing:
            <select value={casing} onChange={(event) => setCasing(event.target.value as Casing)}>
              <option value="smart-case">smart-case</option>
              <option value="case-sensitive">case-sensitive</option>
              <option value="case-insensitive">case-insensitive</option>
            </select>
          </label>
          <label>
            normalize:
            <input onChange={(event) => setNormalize(event.target.checked)} type="checkbox" checked={normalize} />
          </label>
          <label>
            sort:
            <input checked={sort} onChange={(event) => setSort(event.target.checked)} type="checkbox" />
          </label>
          <label>
            use length tiebreaker:
            <input
              checked={lengthTiebreaker}
              disabled={!sort}
              onChange={(event) => setLengthTiebreaker(event.target.checked)}
              type="checkbox"
            />
          </label>
          <label>
            fuzzy:
            <select value={fuzzy.toString()} onChange={(event) => setFuzzy(event.target.value as Fuzzy)}>
              <option value="v1">v1</option>
              <option value="v2">v2</option>
              <option value="false">false</option>
            </select>
          </label>
          <label>
            use extended match:
            <input
              checked={useExtendedMatch}
              onChange={(event) => setUseExtendedMatch(event.target.checked)}
              type="checkbox"
            />
          </label>
          <label>
            forward:
            <input checked={forward} onChange={(event) => setForward(event.target.checked)} type="checkbox" />
          </label>
        </>
      }
    >
      <Example.Input>
        <ul>
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </Example.Input>
      <Example.Output>
        <ul>
          {results.map((item, index) => (
            <li key={item}>
              <FzfHighlight {...getFzfHighlightProps({ index, item })} />
            </li>
          ))}
        </ul>
      </Example.Output>
    </Example>
  )
}

type Casing = NonNullable<UseFzfOptions<string[]>['casing']>
type Fuzzy = NonNullable<UseFzfOptions<string[]>['fuzzy']>
