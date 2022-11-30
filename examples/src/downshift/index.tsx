import { WithGenerics } from './WithGenerics'
import { WithObjects } from './WithObjects'
import { WithStrings } from './WithStrings'

export function Downshift() {
  return (
    <>
      <WithStrings />
      <WithObjects />
      <WithGenerics />
    </>
  )
}
