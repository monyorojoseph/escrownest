import axiosInstance from "./axios";
import { AxiosResponse, AxiosError } from "axios";

export const fetcher = async (url: string)=> {
    try {
        const response = await axiosInstance.get(url) as AxiosResponse;
        return response
    } catch (error) {
        const err = error as AxiosError;
        console.log({err})
        return err.response
    }
}

export const postingData = async (url: string, data: any)=> {
    try {
        const response = await axiosInstance.post(url, data) as AxiosResponse;
        return response
    } catch (error) {
        const err = error as AxiosError;
        console.log({err})
        return err.response
    }
}

export const updateItem = async (url: string, data: any)=> {
    try {
        const response = await axiosInstance.put(url, data) as AxiosResponse;
        return response
    } catch (error) {
        const err = error as AxiosError;
        console.log({err})
        return err.response
    }
}
export const deleteItem = async (url: string)=> {
    try {
        const response = await axiosInstance.delete(url) as AxiosResponse;
        return response
    } catch (error) {
        const err = error as AxiosError;
        console.log({err})
        return err.response
    }
}