import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Protected from './components/Protected';
import { AuthContextProvider, UserAuth } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home';
import Addfile from './pages/Addfile';
import MyStuff from './pages/MyStuff';
import 'bootstrap/dist/css/bootstrap.min.css';
import GridExample from './components/navbar2'
import { auth } from './firebase.js';
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
      {/* <GridExample /> */}
      {
        isUserLoaded && 
        <AuthContextProvider>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />} />
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
