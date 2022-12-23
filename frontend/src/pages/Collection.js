import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getCollection } from "../api/Index";
import { Container, Card } from "react-bootstrap";
import { MdArrowBackIos } from "react-icons/md";
import Button from "react-bootstrap/Button";

const Collection = () => {
  const [allLogos, setallLogos] = useState([]);
  const { user } = UserAuth();
  const navigate = useNavigate();
  const id = useParams();
  const getAllLogosFromCollection = async () => {
    const data = await getCollection({
      _id: id.id,
      email: user?.email,
    });
    setallLogos(data?.data?.data[0]?.logo);
  };
  useEffect(() => {
    if (user?.email && id) getAllLogosFromCollection();
  }, [user]);
  return (
    <div>
      <Button
        variant="outline-dark"
        onClick={() => {
          navigate(-1);
        }}
      >
        <MdArrowBackIos />
      </Button>
      <Container>
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
