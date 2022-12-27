import React from "react";
import {

  Form,

} from "react-bootstrap";
function InputComponent({ label, setValue, valuee, placeholderr,smalll }) {
    return (
    <>
      <Form.Group className="mb-3 " id="name">
        <Form.Label>{label}{<small>{smalll}</small>}</Form.Label>
        <Form.Control
          type="text"
          placeholder={placeholderr}
          aria-describedby="btnGroupAddon"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={valuee}
        
        />
      </Form.Group>
    </>
  );
}

export default InputComponent;
