import React, { useEffect } from 'react';
import {useState} from   'react';

function Pagination({postsPerPage,totalPosts,paginate}) {
    const [index,setIndex] = useState(0);
    const [temp,setTemp] = useState(1);
   

    const pageNumbers= [];
    useEffect(() => {

      },[index]);
    const handlePrevious = () =>{
        
        if(index > 0 )
        {
            console.log("entered",index);
            paginate(pageNumbers[index-1]) 
            setIndex(index-1);
        }
       
    }
    const handleNext = () =>{

        if(index < pageNumbers.length-1)
        {
            console.log("pagiate to = ",index+1);
            paginate(pageNumbers[index+1]);

        }
        if(index !== pageNumbers.length-1)
        {
            console.log("index seted = ",index+1);
            setIndex(index+1);
        }
    }
   
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }
  return (
    <nav>
        <ul className="pagination">
        <button id = "previous"  onClick={
            ()=>
        handlePrevious()
    }> Previous</button>

                    <button id = "next" onClick={()=>handleNext()}>Next</button>

        </ul>
    </nav>

  );
}

export default Pagination