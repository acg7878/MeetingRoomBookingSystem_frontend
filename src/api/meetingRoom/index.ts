import axios from "axios";
import { takeAccessToken } from "@/api/auth";

import type {
  MeetingRoom,
  MeetingRoomCreateData,
  MeetingRoomUpdateData,
  ResponseData,

} from "./index.types";

const BASE_URL = "http://localhost:8080";

axios.interceptors.request.use((config) => {
  const token = takeAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleRequest = async <T>(
  request: Promise<any>
): Promise<ResponseData<T>> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data || {
          code: 500,
          message: "请求失败",
          data: null,
        }
      );
    }
    throw error;
  }
};

export const createMeetingRoom = (data: MeetingRoomCreateData) =>
  handleRequest<void>(axios.post(`${BASE_URL}/meeting-rooms/create`, data));

export const deleteMeetingRoom = (meetingRoomName: string) =>
  handleRequest<void>(
    axios.post(`${BASE_URL}/meeting-rooms/delete`, { meetingRoomName })
  );

export const getMeetingRoomList = () =>
  handleRequest<MeetingRoom[]>(axios.get(`${BASE_URL}/meeting-rooms/list`));

export const updateMeetingRoom = (data: MeetingRoomUpdateData) =>
  handleRequest<void>(axios.put(`${BASE_URL}/meeting-rooms/update`, data));

export const getMeetingRoomEquipment = (meetingRoomName: String) =>
  handleRequest<string[]>(
    axios.get(`${BASE_URL}/meeting-rooms/equipment`, {
      params: { meetingRoomName },
    })
  );
