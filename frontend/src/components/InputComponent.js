import React from "react";
import {

  Form,

} from "react-bootstrap";
import PropTypes from 'prop-types';

function InputComponent({ label, setValue, valuee, placeholderr,smalll,autoFocus }) {
  return (
    <>
      <Form.Group className="mb-3">
        {label && <Form.Label>{label}{<small>{smalll}</small>}</Form.Label>}
        {}
        <Form.Control
        id ="inputComponentBox"
          type="text"
          placeholder={placeholderr}
          aria-describedby="btnGroupAddon"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={valuee}
          autoFocus ={autoFocus}
        />
      </Form.Group>
    </>
  );
}



InputComponent.propTypes = {
  label: PropTypes.string,
  setValue: PropTypes.func,
  valuee: PropTypes.string,
  placeholderr: PropTypes.string
}



export default InputComponent;

