export interface PaystackPaymentMethodType {
  id: string;
  method: {
    bin: string;
    bank: string;
    brand: string;
    last4: string;
    channel: string;
    exp_year: string;
    reusable: boolean;
    card_type: string;
    exp_month: string;
    signature: string;
    account_name: string | null;
    country_code: string;   
    receiver_bank: string | null;
    authorization_code: string;
    receiver_bank_account_number: string | null;
  };
  primary: boolean;
  timestamp: string;
  owner: number;
}
