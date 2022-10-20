import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Protected from './components/Protected';
import { AuthContextProvider, UserAuth } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home';
import Profile from './pages/profile';
import Addfile from './pages/Addfile';
import MyStuff from './pages/MyStuff';
import Search from "./pages/Search"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { auth } from './firebase.js';
import MyVerticallyCenteredModal from './pages/Popup';
import MyStuffPopup from './pages/MyStuffpopup';
import Brand from './pages/Brand.js';


function App() {
  var isPopup = useLocation().pathname === '/popup' ? true : false;
  // console.log('isPopup', isPopup);
  const [isUserLoaded , setIsUserLoaded] = useState(false);
  useEffect(()=>{
    fetchUser()
  },[])
  const fetchUser = async ()=>{
    await auth.currentUser
    setIsUserLoaded(true)
  }
  return (
    <>

      {
        isUserLoaded && 
        <AuthContextProvider>
          { isPopup ? null : <NavigationBar /> }          
          <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='/search' element={ <Search /> } />
            <Route path='/popup/:id' element={ <MyVerticallyCenteredModal  />} />
            <Route path='/:title' element={ <Brand  />} />
            <Route path='/popup-mystuff' element={ <MyStuffPopup  />} />
            <Route path='/profile' element={ <Profile />} />
            <Route path="/addfile" element={ <Protected> <Addfile /> </Protected>}/>
            <Route path="/MyStuff" element={ <Protected> <MyStuff /> </Protected>}/>
            <Route path='/account' element={ <Protected> <Account /> </Protected>}/>
          </Routes>
        </AuthContextProvider>
      }
    </>
  );
}

export default App;