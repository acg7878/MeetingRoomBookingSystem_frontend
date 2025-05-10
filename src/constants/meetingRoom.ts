export const statusMap = {
  available: "可用",
  locked: "锁定",
  booked: "已预定",
  in_use: "正在使用",
  under_maintenance: "维修中",
};

export const roomTypeMap = {
  classroom: "教室",
  round_table: "圆桌",
};

export const statusColorMap = {
    "可用": "success",
    "锁定": "info", 
    "已预定": "warning",
    "正在使用": "primary",
    "维修中": "danger"
  };

export const statusMapReverse = {
    "可用": "available",
    "锁定": "locked",
    "已预定": "booked",
    "正在使用": "in_use",
    "维修中": "under_maintenance"
  };
  
  export const roomTypeMapReverse = {
    "教室": "classroom",
    "圆桌": "round_table"
  };
  