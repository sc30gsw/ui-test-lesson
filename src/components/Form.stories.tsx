import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'

import Form from './Form'

const meta = { title: 'Form', component: Form } as Meta<typeof Form>

export default meta

type Story = StoryObj<typeof Form>

export const Default: Story = {}

export const Testing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    expect(input).toHaveTextContent('')
    await userEvent.type(input, 'play function')
    expect(canvas.getByDisplayValue('play function')).toBeInTheDocument()
  },
}
