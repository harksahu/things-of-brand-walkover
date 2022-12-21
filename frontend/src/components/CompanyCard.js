import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function CompanyCard(props) {
    return ( <div
        key={props?.props?._id}
        className="d-flex justify-content-center item "
      >
        <Link to={"/" + props?.props?.domain}>
          <Card className="item-company">
            <div style={{ overflow: "auto" }} className="img_size  pattern-square">
              {

                props?.props?.logo !== undefined && props?.props?.logo !== "null"
                  ?  <img src={props?.props?.logo} alt="" />
                  :  <img src="/assets/picture.svg" alt="" />
             
            }
            </div>

            <Card.Body>
              <Card.Title
                style={{ textDecoration: "none" }}
                className="text-center"
              >
                {props?.props?.name ? props?.props?.name : props?.props?.domain}
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </div>)
}