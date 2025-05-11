export interface Order {
  orderId: number
  meetingRoomName: string;
  startTime: number;
  endTime: number;
  createTime: number
  updateTime: number
  totalPrice: number;
  paymentStatus: "unpaid" | "paid" | "cancelled";
}