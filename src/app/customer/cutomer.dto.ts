export interface CUSTOMER_DTO {
  CUSTOMER_ID: number;
  GENDER: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  EMAIL_ADDRESS: string;
  LOGIN_NAME: string;
  PHONE_NUMBER: string;
  ADDRESS: string;
  AVATAR: string;
  orders: Orders;
}
export interface CUSTOMER_INFO_FULL_DTO {
  CUSTOMER_ID: number;
  GENDER: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  EMAIL_ADDRESS: string;
  LOGIN_NAME: string;
  PHONE_NUMBER: string;
  ADDRESS: string;
  AVATAR: string;
  PASSWORD: string;
}
export interface Orders {
  deliveringOrders: Order[];
  otherOrders: Order[];
}

export interface Order {
  ORDER_ID: number;
  ORDER_ADDRESS: string;
  PAYMENT_ID: number;
  ORDER_DATE: string;
  order_status: OrderStatus;
  PRICE: number;
  ORDER_NAME: string;
}

export interface OrderStatus {
  ORDER_STATUS: number;
  STATUS_NAME: string;
}
