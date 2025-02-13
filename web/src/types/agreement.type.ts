// import { UserType } from "./user.types";

export interface AgreementType {
    id: string;
    buyer?: string;
    buyer_email: string;
    seller: string;
    name: string;
    amount: number;
    amount_breakdown?: any;
    currency: string;
    description?: string;
    document?: string;
    days_to_deliver: number;
    transaction_type: 'down_payment' | 'full_payment';
    status: 'pending' | 'active' | 'completed' | 'disputed';
    extra_data?: Record<string, any>;
    created_at: string;
    updated_at: string;
}