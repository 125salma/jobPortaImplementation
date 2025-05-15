import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://job-box-portal-server.vercel.app',
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;