import './App.css'

import { WithGenerics } from './WithGenerics'
import { WithObjects } from './WithObjects'
import { WithStrings } from './WithStrings'

function App() {
  return (
    <>
      <WithStrings />
      <WithObjects />
      <WithGenerics />
    </>
  )
}

export default App
