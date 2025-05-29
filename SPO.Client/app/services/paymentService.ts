import { baseRestApi } from "./api";
import { ApiResponse } from "../types/apiResponse";
import { PaymentMethod, Payment } from "../types/payment";

const entity = "payment";

export interface PaymentRequest {
  paymentMethod: PaymentMethod;
  amount: number;
  status: string;
  userId: string;
}

export const paymentService = baseRestApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation<ApiResponse<Payment>, PaymentRequest>({
      query: (payment) => ({
        url: `${entity}`,
        method: "POST",
        body: payment,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Create payment failed:", error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreatePaymentMutation,
} = paymentService;