import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getCollection } from "../api/Index";
import { Container, Form, Card } from "react-bootstrap";
const Collection = (props) => {
  const [allLogos, setallLogos] = useState(null);
  const { user } = UserAuth();
  const id = useParams();
  const getAllLogosFromCollection = async (req, res) => {
    const data = await getCollection({
      CollectionName: id,
      email: user?.email,
    });
    setallLogos(data?.data?.data[0]?.logo);
  };
  useEffect(() => {
    if (user?.email && id) getAllLogosFromCollection();
  }, [user]);
  return (
    <div>
      <Container>
        {console.log(allLogos)}
        <div className="grid">
          {allLogos &&
            allLogos?.map((collection) => {
              return (
                <div key={collection._id}>
                  <div className="d-flex justify-content-center item ">
                    <Card className="item-company">
                      <div
                        style={{ overflow: "auto" }}
                        className="img_size  pattern-square"
                      >
                        {collection?.logo !== undefined &&
                        collection?.logo !== "null" ? (
                          <img src={collection?.logo} alt="" />
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
            })}
        </div>
      </Container>
    </div>
  );
};

export default Collection;
