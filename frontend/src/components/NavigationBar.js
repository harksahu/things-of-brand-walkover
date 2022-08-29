import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { GoogleButton } from "react-google-button";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

const NavigationBar = () => {
  const { logOut } = UserAuth();
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      // console.log(object);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (

<div className='flex justify-between bg-gray-200 w-full p-4'>

  <h1 className='text-center text-2xl font-bold'>
    Things of Brand
  </h1>

  <div className="d-flex form-inputs">
    <input className="form-control" type="text" placeholder="Search any product..."/>
    <i className="bx bx-search"></i>
    </div>

  {user?.displayName ? (
    <div>

    <Link to="/addfile" className='btn btn-success'>add</Link>
      <button onClick={handleSignOut} className='btn btn-danger'>Sign Out </button>
      {/* <img
            className="w-8 h-8 rounded-full"
            src={user?.photoURL}
            alt={user?.displayName}
          /> */}

      </div>

  ) : (
    <div>
  <div>
    <GoogleButton onClick={handleGoogleSignIn} />
  </div>
</div>
  )}
</div>


  );
};

export default NavigationBar;










// <section className="header-main border-bottom bg-white float-start">
// <div className="container-fluid">
//   <div className="row p-2 pt-3 pb-3 d-flex align-items-center ">
//     <div className="col-md-2">
//       {/* <img  className="d-none d-md-flex" src="https://i.imgur.com/R8QhGhk.png" width="100" /> */}
//       Things of Brand
//     </div>
//     <div className="col-md-7">
//       <div className="d-flex form-inputs">
//         <input
//           className="form-control"
//           type="text"
//           placeholder="Search any product..."
//         />
//         <i className="bx bx-search"></i>
//       </div>
//     </div>
//       {user?.displayName ? (
//         <div className="col-md-2">
//           <Link to="/addfile" className="btn btn-success">
//             add
//           </Link>
//           <button onClick={handleSignOut} className="btn btn-danger">
//             Sign Out{" "}
//           </button>
//           {/* <img
//           className="w-8 h-8 rounded-full"
//           src={user?.photoURL}
//           alt={user?.displayName}
//         /> */}
//         </div>
//       ) : (
//         <div>
//           <div className="col-md-2">
//             <GoogleButton onClick={handleGoogleSignIn} />
//           </div>
//         </div>
//       )}
   
//   </div>
// </div>
// </section>
