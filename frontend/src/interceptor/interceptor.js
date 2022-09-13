import axios from "axios";
import { auth } from "../firebase";


//request interceptor
axios.interceptors.request.use(
    async(config) =>{
        const token =await auth.currentUser?.getIdToken()
        if(token)
        {
            config.headers['Authorization'] =token
        }
        return config
    },
    (error)=>{
        Promise.reject(error)
    }
)

//response interceptor

axios.interceptors.response.use(
    response=>{
        // console.log("RESPONSE");
        return response
    },
    function(error){
        // const originalRequest = error.config

        // if(
        //     error.response.status === 401 && originalRequest.url === 'http://127.0.0.1:3000/v1/auth/token'
        // ){
        //         router.push('/login')
        //         return promise.reject(error)

        // }
        // if(error.response.status === 401 && !originalRequest._retry)
        // {
        //     originalRequest._retry =  true;
        //     const refreshToken = localStorageService.getRefreshToken()
        //     return axios.post('/auth/token',{
        //         refresh_token:refreshToken
        //     })
        //     .then(res =>{
        //         if(res.status === 201){
        //             localStorageService.setToken(res.data)
        //             axios.defaults.headers.common['Authorization'] = 
        //             'Bearer' + localStorageService.getAccessToken()
        //             return axios(originalRequest)
        //         }
        //     })
        // }
        return Promise.reject(error)
    }
)

export default axios