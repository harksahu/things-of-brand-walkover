import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function CompanyCard(props) {
    return ( 
        <Link 
        key={props?.props?._id}
        to={"/" + props?.props?.domain}
        target="_blank">
          <Card className="item-company">
            <Card.Body className="img-size  pattern-square">
              {
                props?.props?.logo !== undefined && props?.props?.logo !== "null"
                  ?  <img src={props?.props?.logo} alt="" />
                  :  <img src="/assets/picture.svg" alt="" />
             
              }
            </Card.Body>
            <div className="item-footer ellipsis">
              {props?.props?.name ? props?.props?.name : props?.props?.domain}
            </div>
          </Card>
        </Link>)
}