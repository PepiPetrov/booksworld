import { useContext, useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import Form from 'react-bootstrap/Form'
import { useParams, useNavigate } from "react-router"
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
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (isLoading) {
            getBook(id).then(x => {
                x.genres = x.genres.join(', ')
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
        <p>Created by <Link to={`/user/${book.creator}`}>{book.creator}</Link></p>
        {isImgLoading
            ? <p>Image is loading ... Please wait</p>
            : <Image src={url} alt="No image" style={{ width: "40%" }} />}
        <div>
            <p>Description: </p>
            <p style={{ wordBreak: 'break-all', width: "50%", marginLeft: "25%" }}>{book.description}</p>
        </div>
        <p>This book is published in {book.year}</p>
        {book.series
            ? <p>This is the {book.seriesRow}th book of the series <Button href={`/series/${book.series}`}>{book.series}</Button></p>
            : null}
        <p>Genres: {book.genres}</p>
        {isURL(book.buyLink)
            ? <p>Buy the book from the link here: <Button href={book.buyLink} target="_blank">{book.buyLink}</Button></p>
            : <p>No buy link</p>
        }
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
            <div>
                <Button href={`/edit/${book._id}`} variant="warning">Edit book</Button>
                {'  '}
                <Button onClick={e => onRemoveBtnClick(book._id, navigate)} variant="danger">Remove book</Button>
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
            <Button onClick={e => onLike(book._id, login)} style={{ marginTop: "5%" }}>Like</Button>
            : null
        }
        {showDislike ?
            <Button onClick={e => onDislike(book._id)}>Dislike</Button>
            : null
        }
        <h4>Comments</h4>
        <Comments bookId={id}></Comments>
    </div>
}

function onRemoveBtnClick(bookId, navigate) {
    confirm('Are you sure you want to remove the book?').then(x => {
        if (x) {
            removeBook(bookId).then(x => {
                navigate('/books/all')
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
        return <Form onSubmit={onSubmit} style={{ marginTop: "5%" }}>
            <Form.Control type="number" max="10" min="1" onChange={e => setRating(e.target.value)}></Form.Control>
            <Button type="submit">Submit rating</Button>
        </Form>
    }
    if (book.ratings === undefined) {
        return <Form onSubmit={onSubmit} style={{ marginTop: "5%", width: "50%", marginLeft: "26%" }}>
            <Form.Control type="number" max="10" min="1" onChange={e => setRating(e.target.value)}></Form.Control>
            <Button type="submit" style={{ marginTop: "5%" }}>Submit rating</Button>
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

    console.log(favourites)

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
        return <Button onClick={addToFavouritesBtnClick}>Add to favourites</Button>
    } else {
        return <Button onClick={removeFromFavouritesBtnClick}>Remove from favourites</Button>
    }
}