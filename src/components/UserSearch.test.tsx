import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import { UserSearch } from './UserSearch'

const user = userEvent.setup()
jest.mock('axios')
const mockAxios = jest.mocked(axios)

describe('UserSearch', () => {
  beforeEach(() => mockAxios.get.mockReset())

  it('入力フィールドに値を入力し、検索ボンタンをクリックすると適切なAPIリクエストが発生する', async () => {
    const userInfo = { id: 1, name: 'testUser1' }
    mockAxios.get.mockResolvedValue({ data: userInfo })

    render(<UserSearch />)
    expect(screen.getByDisplayValue('')).toBeInTheDocument()
    const input = screen.getByRole('textbox')
    await user.type(input, userInfo.name)
    expect(screen.getByDisplayValue(userInfo.name)).toBeInTheDocument()

    const button = screen.getByRole('button', { name: 'Search' })
    await user.click(button)
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/api/users?query=${userInfo.name}`,
    )
  })

  it('APIから取得したユーザー情報が正しく画面に表示される', async () => {
    const userInfo = { id: 1, name: 'testUser1' }
    mockAxios.get.mockResolvedValue({ data: userInfo })

    render(<UserSearch />)
    expect(screen.getByDisplayValue('')).toBeInTheDocument()
    const input = screen.getByRole('textbox')
    await user.type(input, userInfo.name)
    expect(screen.getByDisplayValue(userInfo.name)).toBeInTheDocument()

    const button = screen.getByRole('button', { name: 'Search' })
    await user.click(button)
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/api/users?query=${userInfo.name}`,
    )
    await waitFor(() =>
      expect(screen.getByText(userInfo.name)).toBeInTheDocument(),
    )
  })
})
