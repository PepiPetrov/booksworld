import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Home from './Home'
import store from '../../../redux/store'

describe('on page load', () => {
    jest.setTimeout(6000)
    test('h1 loads correctly', async () => {
        // render()
    })
})