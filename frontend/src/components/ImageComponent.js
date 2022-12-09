import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  Stack,
} from "react-bootstrap";
import SvgInline from "../utils/SvgInline.js";
import { BsFillPlusCircleFill, BsThreeDotsVertical } from "react-icons/bs";
import { UserAuth } from "../context/AuthContext";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
    getProfileDetails,
    updateProfileFields,
    getFontList,
    createProfile,
    deleteMyStuffAPI,
    saveMyStuffAPI,
    sendSearchAPI,
  } from "../api/index.js";
function ImageComponent({brandData}) {
   
    const { user } = UserAuth();
    const navigate = useNavigate();
    const [show , setShow] = useState(false);
    const [logo,setLogo] =useState();
    const [brand,setBrand] =useState();
    const[title,setTitle] = useState();
    useEffect(()=>{
        setBrand(brandData);
        setTitle(brandData.title)
        console.log("ImageComponent",brandData);
    },[brand])
    const savedata = async (id, n) => {
        const new_data = {
          _id: id,
          title: n,
        };
        await saveMyStuffAPI(new_data);
      };
    return (
  <div 
  key={brand?._id} className=" flex-wrap item">
     <Card>
      <Dropdown className="ms-auto">
        <Dropdown.Toggle variant="light" size="sm">
          <BsThreeDotsVertical />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setShow(true);
            }}
          >
            Rename
          </Dropdown.Item>
          <Dropdown.Item
            onClick={async () => {
              await deleteMyStuffAPI(brand?._id);
              navigate(-1);
            }}
            variant="outline-secondary"
            size="sm"
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Link to={"/stuff/" + brand?._id}>
        <div style={{ overflow: "auto" }} className="img_size">
          <SvgInline {...brand} />
        </div>
      </Link>
      <Card.Body>
        <Card.Title style={{ textDecoration: "none" }} className="text-center">
          <div>
            {show ? (
              <input
                id="userInputBox"
                onChange={(e) => {
                  savedata(title, e.target.value);
                }}
                value={title}
                className="form-control form-control-sm"
                autoFocus
              />
            ) : (
              <div
                id="showname"
                onClick={() => {
                  setShow(true);
                }}
              >
                {title}
              </div>
            )}
          </div>
        </Card.Title>
      </Card.Body>
    </Card>
    {user ? (
      user.email === user.email ? (
        logo === brand?.url ? (
          <Button variant="light" size="sm" disabled>
            Default logo
          </Button>
        ) : (
          <Button
            variant="light"
            size="sm"
            onClick={() => {
              setLogo(brand?.url);
            }}
          >
            Make default
          </Button>
        )
      ) : (
        ""
      )
    ) : (
      ""
    )}
  </div>);
}
export default ImageComponent;
