import { useContext, useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useParams } from "react-router"
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { confirm } from 'react-bootstrap-confirmation'

import { getBook, removeBook, like, dislike, addRating, addToFavourites, removeFromFavourites } from "../../../services/books-service"
import { getUserFavourites } from "../../../services/profile-service"
import { getImageUrl } from "../../../services/image-service"
import { isURL } from '../../../validators'
import AuthContext from '../../../contexts/AuthContext'
import styles from './Details.module.css'
import Comments from "../comments/Comments"

export default function Details() {
    const user = useSelector(state => state.user)
    const { login } = useContext(AuthContext)
    const [book, setBook] = useState({})
    const [showDislike, setShowDislike] = useState(false)
    const [ratings, setRatings] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [url, setUrl] = useState('')
    const [isImgLoading, setIsImgLoading] = useState(true)
    const [isRemoving, setIsRemoving] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        if (isLoading) {
            getBook(id).then(x => {
                if (x.genres) {
                    x.genres = x.genres.join(', ')
                }
                if (x.likes !== undefined && x.likes.includes(user.username)) {
                    setShowDislike(true)
                }
                if (x.ratings !== undefined) {
                    let sum = 0
                    for (let item of x.ratings) {
                        sum += Number(item.rating)
                    }
                    setRatings(sum / x.ratings.length)

                }


                setBook(x)

                return x
            }).then(x => {
                getImageUrl(x._id).then(url => {
                    setUrl(url)
                    setIsImgLoading(false)
                })
            })

        }


        return () => {
            setIsLoading(false)
        }
    }, [id, user, isLoading])


    return <div className={`text-center ${styles['grey-text']}`} style={{ marginTop: "1%" }}>
        <p>Title: {book.title}</p>
        <p>Author: {book.author}</p>
        <p>Created by <Link to={`/user/${book.creator}`} style={{ color: "#157347" }}>{book.creator}</Link></p>
        {isImgLoading
            ? <p>Image is loading ... Please wait</p>
            : <Image src={url} alt="No image" style={{ width: "40%" }} />}
        <div style={{ marginTop: "1%" }}>
            <p style={{ marginBottom: "0.1%" }}>Description: </p>
            <p style={{ wordBreak: 'break-all', width: "50%", marginLeft: "25%" }}>{book.description}</p>
        </div>
        <p>Publisher: {book.publisher}</p>
        <p>This book is published in {book.year}</p>
        {book.series
            // eslint-disable-next-line
            ? <p>This is the {book.seriesRow}th book of the series <Button variant="success" href={`/series/${book.series}`} variant="success">{book.series}</Button></p>
            : null}
        {book.genres
            ? <p>Genres: {book.genres}</p>
            : <p>No selected genres</p>
        }
        {isURL(book.buyLink)
            ? <p>You can buy the book here:<br></br> <Button variant="secondary" href={book.buyLink} target="_blank">{book.buyLink}</Button></p>
            : <p >No buy link</p>
        }
        {isURL(book.downloadLink)
            ? <p>You can download the book here:<br></br> <Button variant="secondary" href={book.buyLink} target="_blank">{book.downloadLink}</Button></p>
            : <p>No download link</p>
        }
        {isURL(book.onlineLink)
            ? <p>You can read the book here:<br></br> <Button variant="secondary" href={book.buyLink} target="_blank">{book.onlineLink}</Button></p>
            : <p>No read online link</p>
        }
        <p style={{ marginTop: "2%" }}></p>
        {book.ratings !== undefined
            ? <p>Average rating: {ratings}</p>
            : null}
        {localStorage.getItem('token')
            ? <Favourites bookId={book._id} />
            : null
        }
        {localStorage.getItem('token')
            ? <Rating book={book} />
            : null
        }
        <br />
        {user.username === book.creator ?
            <div style={{ marginTop: "0.5%", marginBottom: "2%" }}>
                <Button href={`/edit/${book._id}`} variant="warning">Edit book</Button>
                {'  '}
                <Button onClick={e => onRemoveBtnClick(book._id, setIsRemoving)} variant="danger">Remove book</Button>
            </div>
            : null
        }

        {
            book.likes && book.likes.length > 0
                ? <p>This book has {book.likes.length} like{book.likes.length > 1 ? 's' : ''}</p>
                : null
        }

        {user.username !== book.creator &&
            user.username !== null && showDislike === false ?
            <Button onClick={e => onLike(book._id, login)} variant="success" style={{ marginTop: "0.5%", marginBottom: "2%" }}>Like this book</Button>
            : null
        }
        {showDislike ?
            <Button onClick={e => onDislike(book._id)} variant="success" style={{ marginTop: "0.5%", marginBottom: "2%" }}>Dislike this book</Button>
            : null
        }
        <h4>Comments</h4>
        <Comments bookId={id}></Comments>
        <Modal
            show={isRemoving}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                Book is being removed...
            </Modal.Body>
        </Modal>
    </div>
}

function onRemoveBtnClick(bookId, setIsRemoving) {
    confirm('Are you sure you want to remove the book?').then(x => {
        if (x) {
            setIsRemoving(true)
            removeBook(bookId).then(x => {
                setIsRemoving(false)
                window.location.pathname = "/books/all"
            })
        }
    })
}

function onLike(bookId, login) {
    like(bookId, login).then(() => {
        window.location.reload()
    })
}

function onDislike(bookId) {
    confirm('Are you sure you want to dislike the book?').then(x => {
        if (x) {
            dislike(bookId).then(() => {
                window.location.reload()
            })
        }
    })
}

function Rating({ book }) {
    const [rating, setRating] = useState(1)
    const onSubmit = (e) => {
        e.preventDefault()
        addRating(book._id, rating).then(() => {
            window.location.reload()
        })
    }
    if (book.ratings !== undefined && book.ratings.filter(x => x.username === localStorage.getItem('username')).length === 0) {
        return <Form onSubmit={onSubmit} style={{ marginTop: "1%", width: "50%", marginLeft: "25%" }}>
            <Form.Label>Rating</Form.Label>
            <Form.Control style={{ width: "50%", marginLeft: "25%" }} type="number" max="10" min="1" onChange={e => setRating(e.target.value)}></Form.Control>
            <Button type="submit" variant="success" style={{ marginTop: "2%" }}>Submit rating</Button>
        </Form>
    }
    if (book.ratings === undefined) {
        return <Form onSubmit={onSubmit} style={{ marginTop: "1%", width: "50%", marginLeft: "24.9%" }}>
            <Form.Label>Rating</Form.Label>
            <Form.Control style={{ width: "50%", marginLeft: "25%" }} type="number" max="10" min="1" onChange={e => setRating(e.target.value)}></Form.Control>
            <Button type="submit" variant="success" style={{ marginTop: "2%" }}>Submit rating</Button>
        </Form>
    }
    return null
}

function Favourites({ bookId }) {
    const [favourites, setFavourites] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (isLoading) {
            getUserFavourites().then(x => {
                setFavourites(x)
            })
        }

        return () => {
            setIsLoading(false)
        }
    }, [isLoading])

    const addToFavouritesBtnClick = () => {
        addToFavourites(bookId).then(() => {
            window.location.reload()
        })
    }
    const removeFromFavouritesBtnClick = () => {
        removeFromFavourites(bookId).then(x => {
            window.location.reload()
        })
    }
    if (favourites === [] || !favourites.includes(bookId)) {
        return <Button onClick={addToFavouritesBtnClick} variant="success" style={{ marginBottom: "2%" }}>Add this book to your favourite books</Button>
    } else {
        return <Button onClick={removeFromFavouritesBtnClick} variant="success" style={{ marginBottom: "2%" }}>Remove this book from your favourite books</Button>
    }
}