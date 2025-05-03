import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://matrimony-nexus-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
