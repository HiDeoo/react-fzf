import { useMemo, useState } from 'react'

export function useFzf() {
  const [value, setValue] = useState(0)

  const increment = useMemo(() => {
    return () => {
      setValue((currentValue) => currentValue + 1)
    }
  }, [])

  return { increment, value }
}
