import { forwardRef, useImperativeHandle, useState } from "react";

const Child = forwardRef((props, ref) => {

  useImperativeHandle(ref, () => {
    xyzCall() {
      clearValue();
      // ...
    }
    //...
    //..
    //..
  }, [])


  const [value, setValue] = useState('');
  

  const clearValue = () => {
    setValue('');
  }

  return <input />
})

export default Child();