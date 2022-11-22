import { RenameMe, useFzf } from 'react-fzf'

function App() {
  const { increment, value } = useFzf()

  return (
    <div>
      <RenameMe />
      <div>
        <button onClick={() => increment()}>Count is {value}.</button>
      </div>
    </div>
  )
}

export default App
