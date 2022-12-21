import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
} from "react-bootstrap";

import { setAuthKey, storeAuthKey, deleteAuthKey } from "../api/Index.js";
import { BsFillTrashFill } from "react-icons/bs";

import "../scss/account.scss";

const Account = () => {
  const { user } = UserAuth();
  const [key, setKey] = useState();
  const rand = () => {
    return Math.random().toString(36).substr(2);
  };

  const token = async () => {
    try {
      const keyValue = rand() + rand();
      document.getElementById("authKeybtn").style.display = "none";
       await storeAuthKey({
        authKey: keyValue,
        email: user?.email,
      });
      setKey(keyValue);
    } catch (error) {
      //TODO: error message
    }
  };

  const setAuth = async () => {
    try {
      const x = await setAuthKey(user.email);
      const authinfo = x?.data?.data[0];
      setKey(authinfo.authKey);
    } catch (e) { //TODO: error message
    }
  };

  const deleteKey = async () => {
    setKey();
    await deleteAuthKey({
      authKey: key,
      email: user?.email,
    });
    setKey();
  };

  useEffect(() => {
    if (user && user.email) {
      setAuth();
    }
  }, [setAuth, user]);

  return (
    <Container className="wrpr">
      <Row>        
        <Col md={9} lg={10}>
          <Card className="profile-card">
            <Card.Img variant="top" src={user?.photoURL} height="398px" />
            <Card.Body>
              <Card.Title>{user?.displayName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {user?.email}
              </Card.Subtitle>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <div className="small mb-1">Authkey</div>
                {key ? (
                  <div className="d-flex">
                    <div
                      className="flex-fill"
                      id="key"
                      onClick={() => {
                        navigator.clipboard.writeText(key);
                        document.getElementById("key").style.color = "grey";
                      }}
                    >
                      {key}
                    </div>
                    <div>
                      <BsFillTrashFill
                        onClick={() => {
                          deleteKey();
                          setKey(null);
                        }}
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <Button
                      id="authKeybtn"
                      className="btn-sm"
                      onClick={() => {
                        token();
                      }}
                    >
                      generate
                    </Button>
                  </>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="small mb-1">User Id</div>
                {user?.uid}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
