import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import { confirm } from 'react-bootstrap-confirmation'
import { useSelector, useDispatch } from 'react-redux'
import { isAuth } from '../../../../hoc/isAuth'
import { logout } from '../../../../redux/slices/authSlice'
import { getCreatedBooks, getLikedBooks, getUserFavourites, removeProfile } from '../../../../services/profile-service'
import { setAvatar, getAvatar } from '../../../../services/image-service'

function ProfileInfo() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [createdLength, setCreatedLength] = useState(0)
    const [likedLength, setLikedLength] = useState(0)
    const [favouritesLength, setFavouritesLength] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState('')
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(false)

    useEffect(() => {
        getCreatedBooks().then(x => {
            if (x !== undefined) {
                setCreatedLength(x.length)
            }
        })
        getLikedBooks().then(x => {
            if (x !== undefined) {
                setLikedLength(x.length)
            }
        })
        getUserFavourites().then(x => {
            if (x !== undefined) {
                setFavouritesLength(x.length)
            }
        })

        getAvatar(localStorage.getItem('username')).then(x => {
            setUrl(x)
        }).catch(x => {
            setUrl('https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png')
        })

        return () => {
            setIsLoading(false)
        }
    }, [isLoading, url])

    const handleBtnClick = () => {
        confirm('Are you sure you want to remove your profile? The action is irreversible!').then(x => {
            if (x) {
                removeProfile().then(x => {
                    dispatch(logout())
                    navigate('/')
                })
            }
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (file !== null) {
            setIsLoadingAvatar(true)
            if (!isFileImage(file)) {
                fetch('https://media.istockphoto.com/illustrations/blank-man-profile-head-icon-placeholder-illustration-id1298261537?k=20&m=1298261537&s=612x612&w=0&h=8plXnK6Ur3LGqG9s-Xt2ZZfKk6bI0IbzDZrNH9tr9Ok=')
                    .then(res => res.blob())
                    .then(blob => {
                        const noAvatar = new File([blob], "avatar.jpg", {
                            type: blob.type,
                        });
                        setAvatar(localStorage.getItem('username'), noAvatar).then(() => {
                            setIsLoadingAvatar(false)
                            window.location.reload()
                        })
                    });
            }
            setAvatar(localStorage.getItem('username'), file).then(() => {
                setIsLoadingAvatar(false)
                window.location.reload()
            })
        }
    }

    return !isLoading
        ? <>
            <Card style={{ width: "300px", marginTop: "2%" }}>
                <Card.Header>
                    <h1 style={{ marginTop: "0.5%" }}>Profile info</h1>
                    <p>Username: {user.username}</p>
                </Card.Header>
                <Card.Body>
                    <div>
                        <p>Avatar preview: <Image src={url} alt="No avatar" className="avatar"></Image></p>
                    </div>
                    <p>Added books: {createdLength}</p>
                    <p>Liked books: {likedLength}</p>
                    <p>Favourite books: {favouritesLength}</p>
                    <Button variant="danger" onClick={handleBtnClick}>Remove profile</Button>
                </Card.Body>
            </Card>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>Set Avatar</Form.Label>
                    <Form.Control type="file" onChange={e => setFile(e.target.files[0])}></Form.Control>
                </Form.Group>
                <Button type="submit" style={{ marginTop: "5%" }}>Upload new avatar</Button>
            </Form>
            <Modal show={isLoadingAvatar}>
                <Modal.Body>Avatar is loading...</Modal.Body>
            </Modal>
        </>
        : <p>Loading your info...</p>
}

function isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
}

export default isAuth(ProfileInfo)