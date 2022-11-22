import { act, renderHook } from '@testing-library/react'
import { expect, test } from 'vitest'

import { useFzf } from './useFzf'

test('should increment the value', () => {
  const { result } = renderHook(() => useFzf())

  expect(result.current.value).toBe(0)

  act(() => {
    result.current.increment()
  })

  expect(result.current.value).toBe(1)
})
