import React from 'react';

function Pagination({postsPerPage,totalPosts,paginate}) {
    console.log(postsPerPage)
    console.log(totalPosts)
    const pageNumbers= [];

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }
  return (
    <nav>
        <ul className="pagination">
            {console.log(pageNumbers)}
            {pageNumbers.map(number=>{
                return (
                <li key={number} className='page-item'>
                    <a onClick={()=>paginate(number)}  href ='#' className='page-link'>
                        {number}
                    </a>
                </li>
                );  
            })}
        </ul>
    </nav>
  );
}

export default Pagination