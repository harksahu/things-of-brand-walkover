import React, { useEffect, useState } from 'react';
import { Route, Routes,useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Protected from './components/Protected';
import DomainValidate from './components/DomainValidate';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import MyCollection from './pages/MyCollection';
import Collection from './pages/Collection';
import Home from './pages/Home';
import MyStuff from './pages/MyStuff';
import AllCompanies from "./pages/AllCompanies";
import MyCompany from "./pages/MyCompanies";
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { auth } from './firebase.js';
import ImageEditer from './pages/ImageEditer';
import Company from './pages/Company.js';
import SearchLogo from './pages/SearchLogo.js';
import Profile from './pages/CompanyEditer.js';
import DomainVerificationPage from './pages/DomainVerificationPage';

import PageNotFound from './pages/PageNotFound.js';

function App() {
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const location= useLocation()
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
          
            {location?.pathname ? (location?.pathname.slice(0, 7).toLowerCase() === '/stuff/' || location?.pathname?.includes(".") ?  "" : <NavigationBar />) : <NavigationBar />}
            {/* <SearchBar /> */}
            <Routes>

              <Route path='/' element={<Home />} />
              <Route path='/all-companies' element={<AllCompanies />} />
              <Route path='/searchlogo' element={<SearchLogo />} />
              <Route path='/stuff/:id' element={<ImageEditer />} />
              <Route path='/:title' element={<DomainValidate>
                <Company />
              </DomainValidate>} />
              <Route path='/domainverify' element={<DomainVerificationPage />} />
              <Route path='/editprofile' element={<Profile />} />
              <Route path="/my-stuff" element={<Protected> <MyStuff /> </Protected>} />
              <Route path='/account' element={<Protected> <Account /> </Protected>} />
              <Route path='/my-companies' element={<Protected> <MyCompany /> </Protected>} />
              <Route path='/collection' element={<Protected> <MyCollection /> </Protected>} />
              <Route path='/collection/:id' element={<Protected> <Collection /> </Protected>} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>            
            {location?.pathname ? (location?.pathname.slice(0, 7).toLocaleLowerCase() === '/stuff/' ? "" : <Footer />) : <Footer />}
          </AuthContextProvider>
        </ThemeProvider>
      }
    </>
  );
}

export default App;