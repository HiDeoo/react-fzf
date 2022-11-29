import { WithObjects } from './WithObjects'
import { WithOptions } from './WithOptions'
import { WithStrings } from './WithStrings'

export function Basic() {
  return (
    <>
      <WithStrings />
      <WithObjects />
      <WithOptions />
    </>
  )
}
