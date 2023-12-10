import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Form from './Form'

const user = userEvent.setup()
describe('Form', () => {
  it('初期状態ではテキストは空欄', () => {
    render(<Form />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveTextContent('')
  })

  it('入力したテキストがサブミットされる', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockReturnValue()
    render(<Form />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'Test Text')
    expect(screen.getByDisplayValue('Test Text')).toBeInTheDocument()

    const button = screen.getByRole('button', { name: 'Submit' })
    await user.click(button)
    expect(alertSpy).toHaveBeenCalledWith('submitted: Test Text')
    alertSpy.mockRestore()
  })
})
