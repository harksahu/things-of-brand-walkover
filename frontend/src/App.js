import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import { auth } from './firebase.js';
import MyVerticallyCenteredModal from './pages/Popup';
import MyStuffPopup from './pages/MyStuffpopup';


function App() {
  const [isUserLoaded , setIsUserLoaded] = useState(false);
  useEffect(()=>{
    fetchUser()
  },[])
  const fetchUser = async ()=>{
    await auth.currentUser
    setIsUserLoaded(true)
  }
  return (
    <div>

      {
        isUserLoaded && 
        <AuthContextProvider>
        <NavigationBar />
        <Routes>
          <Route path='/' element={

          <Home />
} />
<Route path='/search' element={

<Search />
} />
          <Route path='/popup' element={<MyVerticallyCenteredModal  />} />
          <Route path='/popup-mystuff' element={<MyStuffPopup  />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/addfile" element={
            <Protected>
          <Addfile />
           </Protected>}/>
          <Route path="/MyStuff" element={
            <Protected>
          <MyStuff />
           </Protected>
          } />
          <Route
            path='/account'
            element={
              <Protected>
                <Account />
               </Protected>
            }
            />
        </Routes>
      </AuthContextProvider>
          }
    </div>
  );
}

export default App;
