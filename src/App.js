import { Provider } from 'react-redux'
import Button from 'react-bootstrap/Button'
import store from './redux/store'
import Nav from './components/nav/Nav/Nav'
import AuthContext from './contexts/AuthContext'
import useLocalStorage from './hooks/useLocalStorage'
import AppRoutes from './AppRoutes'

import './App.css'
import ErrorBoundary from './ErrorBoundary'

const initialState = {
  username: null,
  _id: null
}

function App() {
  const [user, setUser] = useLocalStorage('user', initialState)

  const login = (authData) => {
    setUser(authData)
  }

  const logout = () => {
    setUser(initialState)
  }

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthContext.Provider value={{ user, login, logout }}>
          <div className="App d-flex flex-column align-items-center">
            <Nav></Nav>
            <AppRoutes></AppRoutes>
            <footer style={{ backgroundColor: "greenyellow", width: "90%", marginTop: "1%" }}>
              <p style={{ marginTop: "2%", textAlign: "center", fontSize: "14px" }}>This site was created by <Button style={{fontSize:"13px"}} variant="dark" href="mailto:pepi_petrov@outlook.com">Petar Petroff</Button></p>
            </footer>
          </div>
        </AuthContext.Provider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
