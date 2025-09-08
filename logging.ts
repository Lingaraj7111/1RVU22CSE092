import axios from 'axios';
import { storage } from '../utils/storage';

const API_BASE_URL = 'http://20.244.56.144/evaluation-service';

const USER_DETAILS = {
  email: 'lingaraj.btech22@rvu.edu.in',
  name: 'Lingaraj Patil',
  mobileNo: '9113585587',
  githubUsername: 'Lingaraj7111',
  rollNo: '1RVU22CSE092',
  accessCode: 'WPVqkw', 
};

export const registerUser = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, USER_DETAILS);
    const { clientId, clientSecret } = response.data;
    
    storage.set('clientId', clientId);
    storage.set('clientSecret', clientSecret);
    
    console.log('Registration successful. Client ID and Client Secret saved.');
    return { clientId, clientSecret };

  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw error;
  }
};

export const authenticateUser = async (clientId: string, clientSecret: string) => {
  try {
    const requestBody = {
      ...USER_DETAILS,
      clientId,
      clientSecret,
    };
    
    const response = await axios.post(`${API_BASE_URL}/auth`, requestBody);
    const { access_token } = response.data;
    
    storage.set('accessToken', access_token);

    console.log('Authentication successful. Access Token saved.');
    return access_token;

  } catch (error) {
    console.error('Authentication failed:', error.response?.data || error.message);
    throw error;
  }
};