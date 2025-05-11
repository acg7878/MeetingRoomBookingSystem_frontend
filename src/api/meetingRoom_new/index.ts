import axios from "axios";
import { handleRequest } from "@/utils/axios";
import type { meetingRoom } from "@/types/meetingRoom";
import { takeAccessToken } from "@/api/auth";

axios.interceptors.request.use((config) => {
  const token = takeAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 获取会议室列表
export const getMeetingRoomList = () =>
  handleRequest<meetingRoom[]>(axios.get(`/meeting-rooms/list`));


export const updateMeetingRoomStatus = (meetingRoomName: string, status: string) =>
  handleRequest<void>(
    axios.put(`/meeting-rooms/update-status`, {
      meetingRoomName,
      status,
    })
  );