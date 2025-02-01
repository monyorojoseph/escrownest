import useSWR  from "swr";
import { fetcher } from "../services/utils";
import { AxiosResponse } from "axios";
import { UserType } from "../types/user.types";

export function getUser () {
    const { data, isLoading } = useSWR('/api/user/get/', fetcher)
    const response = data as AxiosResponse;
    let user: UserType | null = null;
    if (response?.status === 200) {
        user = response.data;
    }
    
    return { user, isLoading }
  }