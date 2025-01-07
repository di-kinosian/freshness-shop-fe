import { BillingFormData } from "@components/Cart/types";
import { Cart } from "../cart/types";

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCELED = "canceled",
  FAILED = "failed",
}

export enum PaymentStatus {
  UNPAID = "unpaid",
  PAID = "paid",
  REFUNDED = "refunded",
  FAILED = "failed",
}

export interface Order {
  id?: string;
  checkoutId?: string;
  createdAt?: string;
  updatedAt?: string;
  status: OrderStatus;
  products: Cart[];
  billingInfo: BillingFormData;
  paymentStatus: PaymentStatus;
  totalAmount: number;
}

export interface OrderState {
  orders: Order[];
  order: Order | null;
  orderError: string | null;
  isOrderLoading: boolean;
  confirmationOrder: Order | null;
  confirmOrderError: string | null;
  isConfirmOrderLoading: boolean;
}
