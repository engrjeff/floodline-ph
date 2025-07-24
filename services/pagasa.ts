import { API_ENDPOINTS, apiClient } from './api-client';
import { WaterLevelRawType, WaterLevelType } from './types';

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');

  return [year, month, day, hour, minute].join('');
}

function getCurrentFormattedTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function cleanValue(value: string) {
  if (isNaN(parseFloat(value))) {
    return 0; // or handle it as needed
  }
  return Number(value.replace('(*)', ''));
}

function getStatus(data: WaterLevelRawType): WaterLevelType['status'] {
  if (data.wl < data.alertwl) return 'normal';
  if (data.wl < data.alarmwl) return 'alert';
  if (data.wl < data.criticalwl) return 'alarm';
  return 'critical';
}

export const getWaterLevelData = async (): Promise<WaterLevelType[]> => {
  const dateTimeNow = getCurrentDateTime();

  const response = await apiClient.post<WaterLevelRawType[]>(
    API_ENDPOINTS.WATER_LEVEL_TABLE,
    {
      ymdhm: dateTimeNow,
    }
  );

  const mappedData = response.data
    .map((d) => ({
      id: d.obscd,
      name: d.obsnm === 'Sto Nino' ? 'Marikina' : d.obsnm,
      agctype: d.agctype,
      currentWaterLevel: cleanValue(d.wl),
      waterLevel30minAgo: cleanValue(d.wl30m),
      waterLevel1hrAgo: cleanValue(d.wl1h),
      waterLevel2hrAgo: cleanValue(d.wl2h),
      alertWaterLevel: cleanValue(d.alertwl),
      alarmWaterLevel: cleanValue(d.alarmwl),
      criticalWaterLevel: cleanValue(d.criticalwl),
      currentDateTime: dateTimeNow,
      asOfTime: getCurrentFormattedTime(),
      status: getStatus(d),
    }))
    .reverse();

  return mappedData;
};
