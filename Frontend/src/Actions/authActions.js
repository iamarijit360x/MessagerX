import axios from 'axios';
import { apiSignin, apiSignUp } from '../Apis/authApis';

export const signup = async (email, password) => {
  try {
    const response = await axios.post(apiSignUp, {
      username: email,
      password: password,
    });
    return { message:response.data.message,status:response.status };
 
  } catch (error) {
    console.error('An error occurred during signup:', error);
    return { message:error.response.data.message,status:error.response.status };
  }
};
export const signin = async (email, password) => {
  try {
    const response = await axios.post(apiSignin, {
      username: email,
      password: password,
    });
    return { message:response.data.message,status:response.status,token:response.data.token };
 
  } catch (error) {
    console.error('An error occurred during signup:', error);
    return { message:error.response.data.message,status:error.response.status };
  }
};
