import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getCollection,updateCollection } from "../api/Index";
import { Container, Card } from "react-bootstrap";
import { MdArrowBackIos } from "react-icons/md";
import Button from "react-bootstrap/Button";

import DeleteIcon from '@mui/icons-material/Delete';

const Collection = () => {
  const [allLogos, setallLogos] = useState([]);
  const [logoId,setLogoId] = useState([]);
  const [collectionId,setCollectionId] = useState("");
  const { user } = UserAuth();
  const navigate = useNavigate();
  const id = useParams();

  const getAllLogosFromCollection = async () => {
    var data = await getCollection({
      _id: id.id,
      email: user?.email,
    });
    setLogoId(data?.data?.data[0]?.Logos)
    setallLogos(data?.data?.data[0]?.logo);
    setCollectionId(data?.data?.data[0]._id);
  };
  const deleteLogo = async (logoIdd,_id)=>{
    const index = logoId.indexOf(logoIdd);
      if (index > -1) { 
        logoId.splice(index, 1);
    }
    setLogoId[logoIdd]
        const data = await updateCollection({
          _id:_id,
          Logos:logoId
        })
        getAllLogosFromCollection();
      console.log(data);
  }
  
  useEffect(() => {
    if (user?.email && id) getAllLogosFromCollection();
  }, [user]);
  return (
    <div>
        <Container>
      <Button
        variant="outline-dark"
        onClick={() => {
          navigate(-1);
        }}
      >
        <MdArrowBackIos />
        
      </Button>
    
        <div className="grid">
          {allLogos?.length
            ? allLogos?.map((collection, index) => {
                return (
                  <div key={index}>
                    <div className="d-flex justify-content-center item ">
                      <Card className="item-company">
                     
                        <div
                          style={{ overflow: "auto" }}
                          className="img_size  pattern-square"
                        >
                          {collection?.url !== undefined &&
                          collection?.url !== "null" ? (
                            <img src={collection?.url} alt="" />
                          ) : (
                            <img src="/assets/picture.svg" alt="" />
                          )}
                        </div>
                        <Card.Body>
                          <Card.Title
                            style={{ textDecoration: "none" }}
                            className="text-center"
                          >
                            {collection.name}
                            <DeleteIcon onClick={()=>{deleteLogo(logoId[index],collectionId)}}/>
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                );
              })
            : "Please add logos to collection"}
        </div>
      </Container>
    </div>
  );
};

export default Collection;
