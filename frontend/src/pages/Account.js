import React from 'react';
import { UserAuth } from '../context/AuthContext';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const Account = () => {
  const {  user } = UserAuth();
  
  return (
    <Card style={{ width: '23rem' }} className="m-auto">
    <Card.Img variant="top" src={user?.photoURL} />
    <Card.Body>
      <Card.Title>Welcome, {user?.displayName}</Card.Title>
      <Card.Text>
      Mail id:- {user?.email}<br/>
      Uid:- {user?.uid}
      </Card.Text>
     
    </Card.Body>
  </Card>


  );
};

export default Account;
