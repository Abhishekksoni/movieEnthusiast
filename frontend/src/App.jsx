import { useState } from 'react'

import './App.css'

import VideoAnimation from './components/video-animation'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AboutWeb from './pages/about-web';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import Dashboard from './pages/dashboard';
import Feed from './pages/Home/feed';
import Chat from './pages/chat';
import Activity from './pages/activity';
import {Toaster} from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import ProfileHome from './pages/Profile/profile-home';
import ProfileFilm from './pages/Profile/profile-flim';
import Films from './pages/Home/films';
import ProfileFav from './pages/Profile/profile-fav';
import About from './components/about';
import MovieDetails from './pages/Profile/movie-detail';
import ProfileEdit from './pages/Profile/profile-edit';
import MovieList from './pages/Profile/movie-list';
function App() {
  const {authUser} = useAuthContext();

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<VideoAnimation />} />
        <Route path="/about" element={<About />} />
        <Route path='/signin' element={authUser ? <Navigate to='/dashboard/home'/> : <SignIn/>} />
        <Route path='/signup' element={authUser ? <Navigate to='/dashboard/home'/> : <SignUp/>} />
        {/* <Route path='/dashboard' element={<Dashboard/>} /> */}
       <Route path='/dashboard/home' element={authUser ? <Feed/> : <Navigate to='/signin'/>} />
       <Route path='/dashboard/chat' element={authUser ? <Chat/> : <Navigate to='/'/>} />
       <Route path='/dashboard/films' element={authUser ? <Films/> : <Navigate to='/'/>} />
       <Route path='/dashboard/activity' element={authUser ? <Activity/> : <Navigate to='/'/>} />
       <Route path='/dashboard/profile/:userId'  element={authUser ? <ProfileHome/> : <Navigate to='/'/>} />
       <Route path='/dashboard/profile-edit/:userId'  element={authUser ? <ProfileEdit/> : <Navigate to='/'/>} />
       <Route path='/dashboard/profile/films' element={authUser ? <ProfileFilm/> : <Navigate to='/'/>} />
       <Route path='/dashboard/profile/favourites/:userId' element={authUser ? <ProfileFav/> : <Navigate to='/'/>} />
       <Route path='/dashboard/films/movie/:id' element={authUser ? <MovieDetails/> : <Navigate to = '/'/> } />
       {/* <Route path='/dashboard/films/movie/:id/create-list' element={authUser ? <MovieList/> : <Navigate to = '/'/> } /> */}
      
   
      </Routes>
      <Toaster/>
    </Router>
  
    </>
  )
}

export default App
