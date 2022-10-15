import rp from "request-promise";


const puppy = async(url) => {
   
return rp(url)
.then(function(html){
  
  //success!

  // console.log(html);
  // console.log(url);
  return html;

})
.catch(function(err){
  //handle error
  console.log(err);
});

  };

  export default puppy;