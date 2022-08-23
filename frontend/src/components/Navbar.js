import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { GoogleButton } from 'react-google-button';





// import 
const Navbar = () => {
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



  // useEffect(() => {
  //   // if (user != null) {
  //   //   navigate('/account');
  //   // }
  // }, [userprofile]);

  
  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='flex justify-between bg-gray-200 w-full p-4'>
      <h1 className='text-center text-2xl font-bold'>
        Things of Brand
      </h1>

      <form className="flex items-center">   
    <label for="simple-search" className="sr-only">Search</label>
    <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search" required/>
    </div>
    <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <span className="sr-only">Search</span>
    </button>
</form>

      {user?.displayName ? ( 
        <div>

        <Link to="/addfile" className='mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>add</Link>
          <button onClick={handleSignOut} className='mr-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l'>MY stuff          </button>
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

export default Navbar;
