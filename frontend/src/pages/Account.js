import React from 'react';
import { UserAuth } from '../context/AuthContext';

const Account = () => {
  const {  user } = UserAuth();
  
  return (
    
    <div className='w-[300px] m-auto'>
      <h1 className='text-center text-2xl font-bold pt-12'>Account</h1>
      <div>
        <img src={user?.photoURL} alt="sdg" width="200" height="70"/>
        <h1>Welcome, {user?.displayName}</h1>
        <h1>Mail id:- {user?.email}</h1>
        <h1>Uid:- {user?.uid}</h1>
       
      </div>
    </div>
  );
};

export default Account;
