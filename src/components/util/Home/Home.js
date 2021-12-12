import Card from 'react-bootstrap/Card'
import Toast from 'react-bootstrap/Toast'
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from './Home.module.css'


export default function Home() {

    return <div><Card className={`${styles['text-center']}`} style={{ border: 'none' }}>
        <Card.Body>
            <WelcomeMessage></WelcomeMessage>
            <Card.Img className={`${styles['img']}`} src="./book.png" alt="No image" />
        </Card.Body>
    </Card>
    </div>
}

function WelcomeMessage() {
    const user = useSelector((state) => state.user)
    
    if (user.token !== null) {
        return <Toast className={styles['welcome']}>
            <Toast.Body className="user-welcome">Welcome, {user.username}!</Toast.Body>
        </Toast>
    } else {
        return <Toast className={styles['welcome']}>
            <Toast.Body className={styles['link']}><Link to="/login" className={`${styles['link']} link`}>Login</Link> or <Link to="/register" className={styles['link']}>Register</Link></Toast.Body>
        </Toast>
    }
}