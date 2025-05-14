import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})
const useAxiosSecure = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('error caught in interceptor', error.status);

            if (error.response?.status === 401 || error.response?.status === 403) {
                console.log('need to logout the user');
                signOutUser()
                    .then(() => {
                        console.log('log out user');
                        
                        //send the user to the login page
                        navigate('/login');
                    })
                    .catch(error => console.log(error))
            }
            return Promise.reject(error);
        })
    }, [])



    return axiosInstance;
};

export default useAxiosSecure;

/* 
1. axios: get, post, put/patch delete -> easily
2. interceptors: client -------------|------------->server
 client<-------------------|----------------------server
3. in the interceptor for response == needs two function
*/