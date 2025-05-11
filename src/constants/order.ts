// 状态映射
export const STATUS_MAP: Record<string, string> = {
  unpaid: "未支付",
  paid: "已支付",
  cancelled: "已取消",
};

// 状态对应的标签类型
export const STATUS_TAG_TYPE: Record<string, string> = {
  unpaid: "warning",
  paid: "success",
  cancelled: "info",
};