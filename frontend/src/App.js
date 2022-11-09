import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Protected from './components/Protected';
import { AuthContextProvider, UserAuth } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home';

import Addfile from './pages/Addfile';
import MyStuff from './pages/MyStuff';
import Search from "./pages/Search";
import MyCompany from "./pages/MyCompany";
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { auth } from './firebase.js';
import MyVerticallyCenteredModal from './pages/Popup';
import MyStuffPopup from './pages/MyStuffpopup';
import Brand from './pages/Brand.js';
import HomeLogo from './pages/Searchlogo.js';
import Home2 from './pages/Home2';
import Profile from './pages/profile';



function App() {
  var isPopup = useLocation().pathname === '/popup' ? true : false;
  // console.log('isPopup', isPopup);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  useEffect(() => {
    fetchUser()
  }, [])
  const fetchUser = async () => {
    await auth.currentUser
    setIsUserLoaded(true)
  }
  return (
    <>

      {
        isUserLoaded &&
        <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs"
        >
          <AuthContextProvider>
          <NavigationBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/home" element={<Protected> <Home2 /> </Protected>} />
            <Route path='/search' element={<Search />} />
            <Route path='/searchlogo' element={<HomeLogo />} />
            <Route path='/stuff/:id' element={<MyVerticallyCenteredModal />} />
            <Route path='/:title' element={<Brand />} />
            <Route path='/popup-mystuff' element={<MyStuffPopup />} />
            <Route path='/profile' element={<Profile />} />
            <Route path="/addfile" element={<Protected> <Addfile /> </Protected>} />
            <Route path="/MyStuff" element={<Protected> <MyStuff /> </Protected>} />
            <Route path='/account' element={<Protected> <Account /> </Protected>} />
            <Route path='/company' element={<Protected> <MyCompany/> </Protected>} />
          </Routes>
        </AuthContextProvider>
        </ThemeProvider>   
      }
    </>
  );
}

export default App;