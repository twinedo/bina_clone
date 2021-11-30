import {HandlerAPI} from '../api/HandlerAPI';
import {API_BINA} from '@env';

export const GetDetailUmkm = async id => {
  try {
    const response = await HandlerAPI(
      `${API_BINA}api/v1/mentors/detailumkm/${id}`,
      'get',
    );
    return Promise.resolve(response.data);
    // }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetListUMKMbyMentor = async idMentor => {
  try {
    const response = await HandlerAPI(
      `${API_BINA}api/v1/mentors/listumkm/${idMentor}`,
      'get',
    );
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetMateriUmkm = async id => {
  try {
    const response = await HandlerAPI(`${API_BINA}api/v1/materi/${id}`, 'get');
    return Promise.resolve(response.data);
    // }
  } catch (error) {
    return Promise.reject(error);
  }
};
