export interface Order {
  orderId: number
  meetingRoomName: string;
  startTime: string;
  endTime: string;
  createTime: string
  totalPrice: number;
  paymentStatus: "unpaid" | "paid" | "cancelled";
}