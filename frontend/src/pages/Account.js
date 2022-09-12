import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { storeAuthKey } from "../api";
import { setAuthKey } from "../api";
import { deleteAuthKey } from "../api";
import DeleteIcon from "@mui/icons-material/Delete";

const Account = () => {
  const { user } = UserAuth();
  const [key, setKey] = useState();
  const rand = () => {
    return Math.random().toString(36).substr(2);
  };

  const token = async () => {
    try {
      const keyValue = rand() + rand();
      setKey(keyValue);
      document.getElementById("authKeybtn").style.display = "none";
      console.log("in token");
      const data = await storeAuthKey({
        authKey: keyValue,
        email: user?.email,
      });
      console.log("data - " + data);
    } catch (error) {
      console.log(error);
    }
  };

  const setAuth = async () => {
    const x = await setAuthKey(user.email);
    console.log("hello = ");
    const authinfo = x?.data?.data[0];
    console.log(authinfo);

    setKey(authinfo.authKey);
  };

  const deleteKey = async () => {
    // console.log(key);
    console.log("delete authKey");
    const data = await deleteAuthKey({
      authKey: key ,
      email: user?.email
    });
  };

  useEffect(() => {
    setAuth();
  }, []);

  return (
    <Card style={{ width: "23rem" }} className="m-auto">
      <Card.Img variant="top" src={user?.photoURL} />
      <Card.Body>
        <Card.Title>Welcome, {user?.displayName}</Card.Title>
        <Card.Text>
          Mail id:- {user?.email}
          <br />
          Uid:- {user?.uid}
          <br />
          auth key :-{" "}
          {key ? (<>
            {key}
            <DeleteIcon onClick={() => {
            deleteKey();
          }} style={{ color: "red" }} />
          
          
          </>
          ) : (
            <Button
              id="authKeybtn"
              onClick={() => {
                token();
              }}
            >
              generate{" "}
            </Button>
          )}
{/* {key ? (
         
          ) : (
            "a"
          ) */}

{/* } */}

          {/* <Button  id = "authKeybtn" onClick={() => {token()}} style={{display: 'none'}}> delete </Button> */}
          {/* <p></p> */}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Account;
