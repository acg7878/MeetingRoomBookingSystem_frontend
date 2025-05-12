export interface meetingRoomShow {
    meetingRoomName: string
    status: meetingRoomStatus
}

export interface meetingRoom {
    roomName: string
    pricePerHour: number
    seatCount: number
    status: meetingRoomStatus
    roomType: "classroom" | "round_table";
    equipments: string[]
}


export interface meetingRoomUpdate {
  oldRoomName: string; // 原会议室名称
  newRoomName: string; // 新会议室名称
  roomType: "classroom" | "round_table"; // 会议室类型
  seatCount: number; // 座位数
  pricePerHour: number; // 每小时价格
  status: meetingRoomStatus; // 会议室状态
  equipments: string[]; // 设备列表
}