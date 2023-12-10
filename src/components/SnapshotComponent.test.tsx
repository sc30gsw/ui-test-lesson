import { render } from '@testing-library/react'

import SnapshotComponent from './SnapshotComponent'

describe('SnapshotComponent', () => {
  it('Snapshotテスト', () => {
    const { container } = render(<SnapshotComponent text="Next.js" />)
    expect(container).toMatchSnapshot()
  })
})
