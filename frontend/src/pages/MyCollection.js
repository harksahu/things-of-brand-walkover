import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {  Container,Form,Card} from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import "../scss/company.scss";
import "../utils/SvgInLine.css";
const MyCollection = () => {
    const [show, setShow] = useState(false);
    const [collectionName, setCollectionName] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const createNewCollection = async (req, res) =>{

    }
    useEffect(()=>{

    },[]);
  return (

    <div>
        

        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Your collection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group className="mb-3">
                <Form.Label>
                </Form.Label>
                <Form.Control
                type="domain"
                placeholder="Enter collection name"
                list="doaminBrowsers"
                autoComplete="off"
                name="myBrowser"
                id="domain"
                onChange={(e) => {
                    setCollectionName(e.target.value);
                }}
                />
                <br></br>
                <Button variant="primary" onClick={()=>{
                    createNewCollection();
                }}>Next</Button>
            </Form.Group>
            </Modal.Body>
        </Modal>
        <Container>
        <div className="grid">
        <Card className="h-100 item-company add-new" onClick={handleShow}>
            <Card.Body className="add-icon align-items-center d-flex justify-content-center">
            <Card.Title className="text-center">
                <BsFillPlusCircleFill style={{ fontSize: 40 }} />
            </Card.Title>
            </Card.Body>
            <Card.Body>
            <Card.Title className="text-center">Add New Collection</Card.Title>
            </Card.Body>
        </Card>
        </div>
        </Container>
    </div>  
  )
}

export default MyCollection