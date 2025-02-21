import useSWR from "swr";
import { fetcher } from "../services/utils";
import { AgreementType } from "../types/agreement.type";
import { AxiosResponse } from "axios";

export function getAgreements(name?: string) {
    const { data, isLoading, mutate } = useSWR(`/api/payment-agreement/list/${name ? `?name=${name}` : ''}`, fetcher)
    const response = data as AxiosResponse;
    let agreements: AgreementType[] = [];
    if (response?.status === 200) {
        agreements = response.data;
    }
    return { agreements, isLoading, mutate }
}