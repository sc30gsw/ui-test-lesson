import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import { UserSearch } from './UserSearch'

const user = userEvent.setup()
jest.mock('axios')
const mockAxios = jest.mocked(axios)

describe('UserSearch', () => {
  beforeEach(() => mockAxios.get.mockReset())

  it('入力フィールドに値を入力し、検索ボンタンをクリックすると適切なAPIリクエストが発生する', async () => {
    render(<UserSearch />)
    expect(screen.getByDisplayValue('')).toBeInTheDocument()
    const input = screen.getByRole('textbox')
    await user.type(input, 'Test query')
    expect(screen.getByDisplayValue('Test query')).toBeInTheDocument()

    mockAxios.get.mockResolvedValue({ data: { id: 1, name: 'testUser1' } })
    const button = screen.getByRole('button', { name: 'Search' })
    await user.click(button)
    expect(mockAxios.get).toHaveBeenCalledWith('/api/users?query=Test query')
  })

  it('APIから取得したユーザー情報が正しく画面に表示される', async () => {
    render(<UserSearch />)
    expect(screen.getByDisplayValue('')).toBeInTheDocument()
    const input = screen.getByRole('textbox')
    await user.type(input, 'Test query')
    expect(screen.getByDisplayValue('Test query')).toBeInTheDocument()

    mockAxios.get.mockResolvedValue({ data: { id: 1, name: 'testUser1' } })
    const button = screen.getByRole('button', { name: 'Search' })
    await user.click(button)
    expect(mockAxios.get).toHaveBeenCalledWith('/api/users?query=Test query')
    expect(screen.getByText('testUser1')).toBeInTheDocument()
  })
})
