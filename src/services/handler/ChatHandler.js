import axios from 'axios';
import {HandlerAPI} from '../api/HandlerAPI';
import {
  API_BINA,
  GET_CHAT_HISTORY,
  GET_CHAT_RECEIVE_NAME,
  GET_LIST_CHAT_MENTOR,
  UPLOAD_FILE,
  UPLOAD_IMAGE,
} from '@env';

export const GetChatHistory = async (userId, receiverId) => {
  try {
    const response = await axios.get(
      `${API_BINA}${GET_CHAT_HISTORY}/${userId}/${receiverId}`,
    );
    const data = response.data;
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetChatReceiverName = async receiverId => {
  try {
    const response = await axios.get(
      `${API_BINA}${GET_CHAT_RECEIVE_NAME}/${receiverId}`,
    );
    const data = response.data.name;

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetListChatMentor = async mentorId => {
  try {
    const response = await axios.get(
      `${API_BINA}${GET_LIST_CHAT_MENTOR}/${mentorId}`,
    );
    const data = response.data;

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const UploadFile = async (data, id1, id2) => {
  try {
    const response = await HandlerAPI(
      `${API_BINA}${UPLOAD_FILE}/${id1}/${id2}`,
      'post',
      null,
      data,
    );
    return Promise.resolve(response.data);
  } catch (error) {
    console.log('error', error.request);
    return Promise.reject(error);
  }
};

export const UploadImage = async (data, id1, id2) => {
  try {
    const response = await HandlerAPI(
      `${API_BINA}${UPLOAD_IMAGE}/${id1}/${id2}`,
      'post',
      null,
      data,
    );
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
