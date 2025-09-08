import axios from 'axios';
import { storage } from '../utils/storage';

const API_BASE_URL = 'http://20.244.56.144/evaluation-service';

type LogStack = 'frontend' | 'backend';
type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type FrontendPackage = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'auth' | 'config' | 'middleware' | 'utils';

export const Log = async (
  level: LogLevel,
  pkg: FrontendPackage, 
  message: string
) => {
  const accessToken = storage.get('accessToken');

  if (!accessToken) {
    console.error('Logging failed: No access token found.');
    return;
  }

  try {
    await axios.post(
      `${API_BASE_URL}/logs`,
      {
        stack: 'frontend',
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`Log sent successfully: [${level}] [${pkg}] - ${message}`);
  } catch (error) {
    console.error('Failed to send log:', error.response?.data || error.message);
  }
};