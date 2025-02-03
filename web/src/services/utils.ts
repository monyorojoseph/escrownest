import axiosInstance from "./axios";

export const fetcher = async (url: string)=> {
    return axiosInstance.get(url).catch((error)=> console.log(error))
}
