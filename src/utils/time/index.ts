import dayjs from "dayjs";

/**
 * 格式化时间为固定格式：YYYY-MM-DD HH:mm
 * @param isoString ISO 格式的时间字符串 (如 2025-04-30T16:00:00.000+00:00)
 * @returns 格式化后的时间字符串
 */
export const formatTime = (isoString: string): string => {
  return dayjs(isoString).format("YYYY-MM-DD HH:mm");
};