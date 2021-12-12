import { lazy, Suspense } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Routes, Route } from 'react-router'

const Home = lazy(() => import('./components/util/Home/Home'))
const Signup = lazy(() => import('./components/auth/Register/Register'))
const Signin = lazy(() => import('./components/auth/Login/Login'))
const AllBooks = lazy(() => import('./components/books/catalog-components/all-books/AllBooks'))
const NewestBooks = lazy(() => import('./components/books/catalog-components/newest-books/NewestBooks'))
const MostLiked = lazy(() => import('./components/books/catalog-components/most-liked-books/MostLiked'))
const UserBooks = lazy(() => import('./components/books/user-books/UserBooks'))
const Create = lazy(() => import('./components/books/create/Create'))
const Details = lazy(() => import('./components/books/details/Details'))
const Series = lazy(() => import('./components/books/series/Series'))
const Edit = lazy(() => import('./components/books/edit/Edit'))
const CreatedBooks = lazy(() => import('./components/books/profile-components/created/CreatedBooks'))
const LikedBooks = lazy(() => import('./components/books/profile-components/liked/LikedBooks'))
const FavouriteBooks = lazy(() => import('./components/books/profile-components/favourite/FavouriteBooks'))
const Preferences = lazy(() => import('./components/books/profile-components/preferences/Preferences'))
const ProfileInfo = lazy(() => import('./components/books/profile-components/profile-info/ProfileInfo'))
const RecommendedBooks = lazy(() => import('./components/books/recommended/RecommendedBooks'))
const SearchByTitle = lazy(() => import('./components/books/search-components/title/Title'))
const SearchByAuthor = lazy(() => import('./components/books/search-components/author/Author'))
const SearchByGenre = lazy(() => import('./components/books/search-components/genre/Genre'))
const SearchBySeries = lazy(() => import('./components/books/search-components/series/Series'))

export default function AppRoutes() {
    return <Suspense fallback={<Spinner variant="primary" animation="border"></Spinner>}>
        <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route path="/register" element={<Signup></Signup>}></Route>
            <Route path="/login" element={<Signin></Signin>}></Route>
            <Route path="/books/all" element={<AllBooks></AllBooks>}></Route>
            <Route path="/books/newest" element={<NewestBooks></NewestBooks>}></Route>
            <Route path="/books/liked" element={<MostLiked></MostLiked>}></Route>
            <Route path="/user/:username" element={<UserBooks></UserBooks>}></Route>
            <Route path="/create" element={<Create></Create>}></Route>
            <Route path="/details/:id" element={<Details></Details>}></Route>
            <Route path="/edit/:id" element={<Edit></Edit>}></Route>
            <Route path="/series/:name" element={<Series></Series>}></Route>
            <Route path="/profile/my" element={<CreatedBooks></CreatedBooks>}></Route>
            <Route path="/profile/liked" element={<LikedBooks></LikedBooks>}></Route>
            <Route path="/profile/favourite" element={<FavouriteBooks></FavouriteBooks>}></Route>
            <Route path="/profile/preferences" element={<Preferences></Preferences>}></Route>
            <Route path="/profile/info" element={<ProfileInfo></ProfileInfo>}></Route>
            <Route path="/profile/recommended" element={<RecommendedBooks></RecommendedBooks>}></Route>
            <Route path="/search/title" element={<SearchByTitle></SearchByTitle>}></Route>
            <Route path="/search/author" element={<SearchByAuthor></SearchByAuthor>}></Route>
            <Route path="/search/genre" element={<SearchByGenre></SearchByGenre>}></Route>
            <Route path="/search/series" element={<SearchBySeries></SearchBySeries>}></Route>
        </Routes>
    </Suspense>
}