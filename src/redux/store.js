import { createStore } from "@reduxjs/toolkit"
import authReducer from './slices/authSlice'

function saveToLocalStorage(state) {
    try {
        const serialisedState = JSON.stringify(state)
        localStorage.setItem("persistantState", serialisedState)
    } catch (e) {
        console.warn(e)
    }
}

function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistantState")
        if (serialisedState === null) return undefined
        return JSON.parse(serialisedState)
    } catch (e) {
        console.warn(e)
        return undefined
    }
}

const store = createStore(authReducer, loadFromLocalStorage())
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store