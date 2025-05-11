export interface meetingRoomShow {
    meetingRoomName: string
    status: meetingRoomStatus
}

export interface meetingRoom{
    roomName: string
    pricePerHour: number
    setCount: number
    status: meetingRoomStatus

}


export enum meetingRoomStatus {
    AVAILABLE = "available",
    LOCKED = "locked",
    BOOKED = "booked",
    IN_USE = "in_use",
    UNDER_MAINTENANCE = "under_maintenance"
}