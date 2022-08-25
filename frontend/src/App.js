import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home';
import Addfile from './pages/Addfile';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/addfile" element={
            <Protected>
          <Addfile />
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
    </div>
  );
}

export default App;
