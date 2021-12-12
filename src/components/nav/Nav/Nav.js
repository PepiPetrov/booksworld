import UserNav from '../UserNav/UserNav'
import GuestNav from '../GuestNav/GuestNav'
import { useSelector } from 'react-redux'

export default function Nav() {
    const user = useSelector((state) => state.user)
    if (user.token == null) {
        return <GuestNav></GuestNav>
    }
    return <UserNav></UserNav>
}