import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const isAuth = (Component) => {

    const WrapperComponent = (props) => {
        const user = useSelector((state) => state.user)

        return user.token !== null
            ? <Component {...props} />
            : <Navigate to="/login" />
    }

    return WrapperComponent
}
