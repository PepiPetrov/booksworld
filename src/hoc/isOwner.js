import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const isOwner = (Component) => {

    const WrapperComponent = (props) => {
        const user = useSelector((state) => state.user)

        return user.username === localStorage.getItem('username')
            ? <Component {...props} />
            : <Navigate to="/login" />
    }

    return WrapperComponent
}
