export interface WaterLevelRawType {
  obscd: string; // like an ID
  agctype: string;
  obsnm: string; // DAM/River basin name
  wl: string; // current water level
  wl30m: string; // water level 30 minutes ago
  wl1h: string; // water level 1 hour ago
  wl2h: string; // water level 2 hours ago
  alertwl: string; // alert water level, like level 1
  alarmwl: string; // alarm water level, like level 2
  criticalwl: string; // critical water level, like level 3
}

export interface WaterLevelType {
  id: string; // obscd
  agctype: string;
  name: string; // DAM/River basin name
  currentWaterLevel: number; // current water level
  waterLevel30minAgo: number; // water level 30 minutes ago
  waterLevel1hrAgo: number; // water level 1 hour ago
  waterLevel2hrAgo: number; // water level 2 hours ago
  alertWaterLevel: number; // alert water level, like level 1
  alarmWaterLevel: number; // alarm water level, like level 2
  criticalWaterLevel: number; // critical water level, like level 3
  currentDateTime: string;
  asOfTime: string; // current time in hh:mm tt format
  status: 'normal' | 'alert' | 'alarm' | 'critical';
}
