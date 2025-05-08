export type RoomStatus =
  | "available"
  | "locked"
  | "booked"
  | "in_use"
  | "under_maintenance";
export type RoomType = "classroom" | "round_table";

export interface MeetingRoom {
  roomName: string;
  roomType: RoomType;
  seatCount: number;
  pricePerHour: number;
  status: RoomStatus;
}

export interface MeetingRoomCreateData {
  roomName: string;
  roomType: RoomType;
  seatCount: number;
  pricePerHour: number;
  status: RoomStatus;
}

export interface MeetingRoomUpdateData {
  oldRoomName: string;
  newRoomName: string;
  roomType: RoomType;
  seatCount: number;
  pricePerHour: number;
  status: RoomStatus;
}

export interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}
