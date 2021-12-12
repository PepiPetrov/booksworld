import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

test('Loading app', () => {
    render(<App />, { wrapper: BrowserRouter })

    // verify page content for expected route
    expect(screen.getByText(/Login/i)).toBeInTheDocument()
    expect(screen.getByText(/Register/i)).toBeInTheDocument()
})