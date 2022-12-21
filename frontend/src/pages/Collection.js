import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import {getCollection} from "../api/Index"
import { Container, Form, Card } from "react-bootstrap";
const Collection = (props) => {
    const [allLogos,setallLogos] = useState([]);
    const { user } = UserAuth();
    const id = useParams();
   const getAllLogosFromCollection = async (req,res) =>{
    const data =await getCollection(
        {
        CollectionName:id ,
         email:user?.email
        })
        setallLogos(data);
        console.log("data ="+data?.data?.data);
        console.log(data);
    
   }
    useEffect (()=>{
        if(user)
        getAllLogosFromCollection();
    },[id,user]);
  return (
    <div> 
       <Container>
        {/* <div className="grid">
          {allLogos &&
            allLogos?.map((collection) => {
              return (
                <div key={collection._id}>
                  <div
                    className="d-flex justify-content-center item "
                  >
                      <Card className="item-company">
                        <div
                          style={{ overflow: "auto" }}
                          className="img_size  pattern-square"
                        > 
                        <img src="/assets/picture.svg" alt="" />
                        </div>
                        <Card.Body>
                          <Card.Title
                            style={{ textDecoration: "none" }}
                            className="text-center"
                          >{collection.CollectionName}
                          </Card.Title>
                        </Card.Body>
                      </Card>
                  </div>
                </div>
              );
            })}
        </div> */}
      </Container>
    </div>
  )
}

export default Collection