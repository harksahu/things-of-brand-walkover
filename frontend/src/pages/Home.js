import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { sendBrandAPI } from "../api";
import saveas from "file-saver";
import { Canvg, presets } from "canvg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import "../utils/svginline.css"
import MyVerticallyCenteredModal from "./Popup";

import { connect } from "react-redux";

import { searchBrand } from "../store/actions/search-brands";

import Figure from 'react-bootstrap/Figure';

import SvgInline from '../utils/SvgInline.js';



function Home({ searchBrandData=[], getSearchBrand }) {
  // console.log(searchBrandData)

  return (
<>
hello world
<Link to = "/search">more...</Link>
</>
  );
}


export default Home;

// export default Home