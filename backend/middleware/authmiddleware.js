
import admin from "../config/firebase-config.js"



class Middleware{
    async decodeToken(req,res,next){
        const token = req.headers.authorization
        try{
            const decodeValue = await admin.auth().verifyIdToken(token);
            if(decodeValue){
                return next();
            }
            else{
                res.status(401).json({message: "Unauthorization User"});
            }
        }
        catch(e){
            console.log(e)
            res.status(401).json({message: "Unauthorization User"});
    
        }
    
    
    }
}



export default new Middleware();


// app.use((req,res,next)=>{
//     console.log("http method :- "+req.method + ", Url:-" + req.url);
//     next()

// })

