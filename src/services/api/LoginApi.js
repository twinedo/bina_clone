import axios from 'axios';

export const LoginAPI = async (
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
