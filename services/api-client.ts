import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

export const API_ENDPOINTS = {
  WATER_LEVEL_TABLE: '/water/table_list.do',
} as const;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});
