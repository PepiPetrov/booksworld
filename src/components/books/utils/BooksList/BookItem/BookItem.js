import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import * as dayjs from 'dayjs'
import { Link } from "react-router-dom"
import { getAvatar, getImageUrl } from '../../../../../services/image-service'
import styles from './BookItem.module.css'

export default function BookItem({ book }) {
    const [url, setUrl] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [avatarUrl, setAvatarUrl] = useState('')
    const date = dayjs(book.createdOn).format('DD/MM/YYYY h:mm A')

    useEffect(() => {
        if (isLoading) {
            getImageUrl(book._id).then(x => {
                setUrl(x)
            })
            getAvatar(book.creator).then(x => {
                setAvatarUrl(x)
            })
        }

        if (avatarUrl === '') {
            setAvatarUrl('https://media.istockphoto.com/illustrations/blank-man-profile-head-icon-placeholder-illustration-id1298261537?k=20&m=1298261537&s=612x612&w=0&h=8plXnK6Ur3LGqG9s-Xt2ZZfKk6bI0IbzDZrNH9tr9Ok=')
        }

        return () => {
            setIsLoading(false)
        }
    }, [isLoading, book._id, book.creator, avatarUrl])


    if (book.description.length > 255) {
        book.description = book.description.slice(0, 256)
        book.description += '...'
    }

    return <Card className={styles['card']}>
        <Image src={avatarUrl} alt="No avatar" className="avatar" style={{ marginLeft: "36%", marginTop: "5%" }} />
        <Card.Body>
            <Card.Img src={url} style={{ width: '60%', height: "40%" }} alt="No image" />
            <Card.Title style={{ marginTop: "5%", textDecoration: "underline", fontSize: "20px" }}><Link to={`/details/${book._id}`} style={{ color: "grey" }}>{book.title}</Link></Card.Title>
            <Card.Text style={{ fontSize: "12px" }}>Book added on {date} <Link to={`/user/${book.creator}`} style={{ fontSize: "12px", color: "black" }}> by {book.creator}</Link></Card.Text>
            {book.likes
                ? <Card.Text style={{ fontSize: "12px" }}>{book.likes.length} like{book.likes.length > 1 ? 's' : ''}</Card.Text>
                : <Card.Text style={{ fontSize: "12px" }}>0 likes</Card.Text>
            }
            <Card.Text style={{ wordBreak: 'break-all', fontSize: "15px" }}>
                {book.description}
            </Card.Text>
            <Card.Link as={Link} to={`/details/${book._id}`} style={{ color: 'grey', textDecoration: 'none', fontSize: "15px" }}>See more...</Card.Link>
        </Card.Body>
    </Card>
}