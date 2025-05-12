export interface meetingRoomShow {
    meetingRoomName: string
    status: meetingRoomStatus
}

export interface meetingRoom{
    roomName: string
    pricePerHour: number
    seatCount: number
    status: meetingRoomStatus
    roomType: "classroom" | "round_table";
    equipments: string[]
}


