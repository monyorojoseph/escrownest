import useSWR from "swr";
import { fetcher } from "../services/utils";
import { AgreementType } from "../types/agreement.type";
import { AxiosResponse } from "axios";

export function getAgreement(id: string) {
    const { data, isLoading, mutate } = useSWR(`/api/payment-agreement/${id}/get/`, fetcher)
    const response = data as AxiosResponse;
    let agreement: AgreementType | null = null;
    if (response?.status === 200) {
        agreement = response.data;
    }
    return { agreement, isLoading, mutate }
}