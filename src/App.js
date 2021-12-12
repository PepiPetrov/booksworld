import { Provider } from 'react-redux'
import Button from 'react-bootstrap/Button'
import store from './redux/store'
import Nav from './components/nav/Nav/Nav'
import AuthContext from './contexts/AuthContext'
import useLocalStorage from './hooks/useLocalStorage'
import AppRoutes from './AppRoutes'

import './App.css'

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
    <Provider store={store}>
      <AuthContext.Provider value={{ user, login, logout }}>
        <div className="App d-flex flex-column align-items-center">
          <Nav></Nav>
          <AppRoutes></AppRoutes>
          <footer style={{ backgroundColor: "#ACD646", width: "85%", marginTop: "1%" }}>
            <p style={{ marginTop: "1%", textAlign: "center" }}>This site was created by <Button href="mailto:pepi_petrov@outlook.com">Petar Petroff</Button></p>
          </footer>
        </div>
      </AuthContext.Provider>
    </Provider>
  )
}

export default App
