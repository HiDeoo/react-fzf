import { Fragment } from 'react'

import { type UseFzfResult } from './useFzf'

export function FzfResult<TItem>({ result }: FzfResultProps<TItem>) {
  return (
    <>
      {result.characters.map((char, index) => {
        // TODO(HiDeoo) Add as prop?
        // TODO(HiDeoo) Is strong the proper tag? Mark?
        // TODO(HiDeoo) Rest props
        return result.positions.has(index) ? (
          <strong key={index}>{char}</strong>
        ) : (
          <Fragment key={index}>{char}</Fragment>
        )
      })}
    </>
  )
}

interface FzfResultProps<TItem> {
  result: UseFzfResult<TItem>
}
