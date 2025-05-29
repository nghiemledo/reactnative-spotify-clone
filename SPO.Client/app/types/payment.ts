export enum PaymentMethod {
  PayPal = "PAYPAL",
  CreditCard = "CREDIT_CARD",
  BankTransfer = "BANK_TRANSFER",
}

export interface Payment {
  paymentMethod: PaymentMethod;
  amount: number;
  status: string;
  userId: string;
}