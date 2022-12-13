import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Protected from './components/Protected';
import DomainValidate from './components/DomainValidate';
import { AuthContextProvider, UserAuth } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home';
import Addfile from './pages/Addfile';
import MyStuff from './pages/MyStuff';
import AllCompanies from "./pages/AllCompanies";
import MyCompany from "./pages/MyCompanies";
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { auth } from './firebase.js';
import MyVerticallyCenteredModal from './pages/ImageEditer';
import Brand from './pages/Brand.js';
import SearchLogo from './pages/SearchLogo.js';
import Home2 from './pages/Home2';
import Profile from './pages/profile';
import DomainVerificationPage from './pages/DomainVerificationPage';

import PageNotFound from './pages/PageNotFound.js';
import { Switch } from '@mui/material';

function App() {
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const location = useLocation()
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

            {window.location.pathname ? (window.location.pathname.slice(0, 7).toLocaleLowerCase() === '/stuff/' ? "" : <NavigationBar />) : <NavigationBar />}

            <Routes>

              <Route path='/' element={<Home />} />
              <Route path="/home" element={<Protected> <Home2 /> </Protected>} />
              <Route path='/all-companies' element={<AllCompanies />} />
              <Route path='/searchlogo' element={<SearchLogo />} />
              <Route path='/stuff/:id' element={<MyVerticallyCenteredModal />} />
              <Route path='/:title' element={<DomainValidate>
                <Brand />
              </DomainValidate>} />
              <Route path="/addfile" element={<Protected> <Addfile /> </Protected>} />
              <Route path='/domainverify' element={<DomainVerificationPage />} />
              <Route path='/editprofile' element={<Profile />} />
              <Route path="/my-stuff" element={<Protected> <MyStuff /> </Protected>} />
              <Route path='/account' element={<Protected> <Account /> </Protected>} />
              <Route path='/my-companies' element={<Protected> <MyCompany /> </Protected>} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>

            {window.location.pathname ? (window.location.pathname.slice(0, 7).toLocaleLowerCase() === '/stuff/'? "" : <Footer />) :<Footer />}
          </AuthContextProvider>
        </ThemeProvider>
      }
    </>
  );
}

export default App;