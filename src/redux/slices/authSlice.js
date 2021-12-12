import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            username: null,
            token: null
        }
    },
    reducers: {
        login: (state) => {
            const newState =
            {
                user: {
                    username: localStorage.getItem('username'),
                    token: localStorage.getItem('token')
                }
            }
            return newState
        },
        logout: (state) => {
            return {
                user: {
                    username: null,
                    token: null
                }
            }
        }
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer