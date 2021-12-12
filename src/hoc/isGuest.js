import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const isGuest = (Component) => {

    const WrapperComponent = (props) => {
        const user = useSelector((state) => state.user)

        return user.token === null
            ? <Component {...props} />
            : <Navigate to="/books/all" />
    }

    return WrapperComponent
}
