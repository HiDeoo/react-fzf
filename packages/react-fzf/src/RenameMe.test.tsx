import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { RenameMe } from '../src/RenameMe'

test('should render properly', () => {
  render(<RenameMe />)

  expect(screen.getByText('Hello World 0')).toBeDefined()
})
