import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios;

instance.interceptors.request.use(async config => {
  let token = await AsyncStorage.getItem('@token_bina_umkm');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
});

export const HandlerAPI = async (
  url,
  method,
  params,
  data,
  cancelToken,
  headers,
) => {
  const service = await axios({
    url: url,
    method: method,
    params: params,
    data: data,
    cancelToken: cancelToken,
    headers: headers,
  });

  return service;
};
