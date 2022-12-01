<div align="center">
  <h1>react-fzf 🪡</h1>
  <p>A tiny headless React <a href="https://github.com/ajitid/fzf-for-js">fzf</a> wrapper.</p>
  <p>
    <a href="https://user-images.githubusercontent.com/494699/204834216-19549950-717f-4da4-a6dd-66589e6e8446.gif" title="Screenshot of react-fzf">
      <img alt="Screenshot of react-fzf" src="https://user-images.githubusercontent.com/494699/204834216-19549950-717f-4da4-a6dd-66589e6e8446.gif" width="520" />
    </a>
  </p>
</div>

<div align="center">
  <a href="https://github.com/HiDeoo/react-fzf/actions/workflows/integration.yml">
    <img alt="Integration Status" src="https://github.com/HiDeoo/react-fzf/actions/workflows/integration.yml/badge.svg" />
  </a>
  <a href="https://github.com/HiDeoo/react-fzf/blob/main/LICENSE">
    <img alt="License" src="https://badgen.net/github/license/HiDeoo/react-fzf" />
  </a>
  <br />
</div>

## Features

`react-fzf` is a tiny headless React wrapper for the <a href="https://github.com/ajitid/fzf-for-js">fzf library</a> providing a hook and a component to quickly add fuzzy matching & highlighting to your React application.

```tsx
import { useState } from 'react'
import { FzfHighlight, useFzf } from 'react-fzf'

import { items } from './data'

export function Example() {
  const [query, setQuery] = useState('')

  const { results, getFzfHighlightProps } = useFzf({ items, query })

  return (
    <>
      <input type="text" placeholder="Filter…" value={query} onChange={(event) => setQuery(event.target.value)} />
      <ul>
        {results.map((item, index) => (
          <li key={item}>
            <FzfHighlight {...getFzfHighlightProps({ item, index })} />
          </li>
        ))}
      </ul>
    </>
  )
}
```

## Examples

Before diving into the documentation, you can visit this [codesandbox.io demo](https://codesandbox.io/p/sandbox/react-fzf-demo-x5wr61) or check out the various examples provided in this repository. To run them locally, you can use the `pnpm dev` command and open the URL from the output (usually `http://localhost:5173`) in your browser.

- React only examples:
  - [Example with string items](examples/src/basic/WithStrings.tsx)
  - [Example with object items](examples/src/basic/WithObjects.tsx)
  - [Example with various fzf options](examples/src/basic/WithOptions.tsx)
- [Downshift](https://www.downshift-js.com) combobox/autocomplete dropdown examples:
  - [Example with string items](examples/src/downshift/WithStrings.tsx)
  - [Example with object items](examples/src/downshift/WithObjects.tsx)
  - [Example with generic items](examples/src/downshift/WithGenerics.tsx)
- [React Select](https://react-select.com) examples:
  - [Example with string values](examples/src/react-select/WithValues.tsx)

## Documentation

### Installation

Using your favorite package manager, run one of the following commands:

```shell
pnpm add react-fzf
```

```shell
yarn add react-fzf
```

```shell
npm install react-fzf
```

And then import the hook and component in your React application:

```tsx
import { useFzf, FzfHighlight } from 'react-fzf'
```

---

### `useFzf()` hook

This React hook handles fuzzy filtering the provided items based on a query.

```tsx
const { results, getFzfHighlightProps } = useFzf({ items, query })
```

#### Parameters

The hook expects an object of options as its only argument with the following properties:

##### `items`

> `any[]` | _required_

An array containing all the items to fuzzy filter.

##### `query`

> `string` | _required_

The query to use for fuzzy matching.

##### `itemToString`

> `(item: any) => string` | _optional_ for string items, _required_ for other items

A function used to get the string representation of an item. This is optional for string items but if the provided items are objects for example, this function is required to transform them into strings.

##### Fzf options

If needed, you can also optionally pass down any of the supported fzf library options, e.g. `limit`, `sort`, etc. You can find the full list of supported options in the <a href="https://fzf.netlify.app/docs/latest#api-new-fzf-list-options">fzf library documentation</a>.

#### Return value

The `useFzf()` hook returns an object with the following properties:

##### `results`

An array containing all the items fuzzy filtered based on the provided query.

##### `getFzfHighlightProps`

A function used to get the props to pass down to the `<FzfHighlight />` component to optionally highlight matched characters. See the [`<FzfHighlight />` component documentation](#fzfhighlight--component) for more informations.

This function also expects an object of options as its only argument with the following properties:

- `item`: _required_ - The item to highlight.
- `index`: _optional_ - The index of the item in the results array. This is optional but recommended for faster lookups.
- `as`: _optional_ - The HTML element to use for wrapping highlighted characters. Defaults to `strong`.

You can also pass down any properties that you wish to apply to the elements that will be used to highlight the matched characters, e.g. `className`, `style`, etc.

---

### `<FzfHighlight />` component

Optionally, if you want to highlight the characters in the results matching the provided query, you can use the `<FzfHighlight />` component.

This component does not wrap the provided item in a container element, it only wraps the matched characters in the provided item with an HTML element (`strong` by default).

Use the [`getFzfHighlightProps()` function](#getfzfhighlightprops) returned by the `useFzf()` hook to apply props to the `<FzfHighlight />` component.

```tsx
const { results, getFzfHighlightProps } = useFzf({ items, query })

return (
  <ul>
    {results.map((item, index) => (
      <li key={item}>
        <FzfHighlight {...getFzfHighlightProps({ item, index })} />
      </li>
    ))}
  </ul>
)
```

You can customize the HTML element used to wrap matched characters by passing down the `as` prop, and also pass down any other properties that you wish to apply to the wrapping element.

```tsx
<li>
  <FzfHighlight {...getFzfHighlightProps({ item, index, as: 'mark', className: 'text-blue-600' })} />
  {/**
   * With the query "fa", this will render:
   *
   *    <li>
   *      <mark class="text-blue-600">f</mark>oob<mark class="text-blue-600">a</mark>r
   *    </li>
   */}
</li>
```

## License

Licensed under the MIT License, Copyright © HiDeoo.

See [LICENSE](https://github.com/HiDeoo/react-fzf/blob/main/LICENSE) for more information.
