import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginAPI} from '../api/LoginApi';
import {API_BINA} from '@env';
import axios from 'axios';

export const LoginHandler = async (email, password) => {
  const json = {
    email,
    password,
  };
  console.log('tesss', json);

  try {
    const response = await LoginAPI(
      `${API_BINA}api/v1/auth/login`,
      'post',
      null,
      json,
    );
    console.log('respon trycatch', response.data);

    await AsyncStorage.setItem(
      '@token_bina_umkm',
      JSON.stringify(response.data.token),
    );
    await AsyncStorage.setItem('@user_bina', JSON.stringify(response.data));

    return Promise.resolve(response.data);
  } catch (error) {
    console.log('errrrr', error.request);
    // let errorMessage = JSON.parse(error.request?.response);

    // return Promise.reject(errorMessage);
    return Promise.reject(error.request?.status);
  }
};

export const UpdateUser = async (userId, deviceToken) => {
  try {
    const response = await axios.put(`${API_BINA}api/v1/users/${userId}`, {
      deviceToken,
    });
    console.log('response upd user', response.data);
    return Promise.resolve(response.data);
  } catch (error) {
    console.log('error upd', error.request);
    return Promise.reject(error.request?.status);
  }
};

// export const RefreshTokenHandler = async (resToken, resRefToken) => {
//   try {
//     // var resToken =
//     //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JvbGUiOiJEcml2ZXIiLCJhdWQiOlsiYWxsc3RvcmUiXSwiY29tcGFueV9pZCI6IlRLLVRSU0NNUC0yMDIwMDkxODIwNDc1OTAwMDAwMTMiLCJ1c2VyX2lkIjoiVEstRFJWLTIwMjAwOTIxMDgxMDUyMDAwMDAzMiIsInVzZXJfbmFtZSI6Im1yLnBhbnR1cmFAZ21haWwuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImNvbXBhbnlfbmFtZSI6IlBUIEJlcnRhaGFuIEhpZHVwIiwiZXhwIjoxNjAzMjA1NzE2LCJhdXRob3JpdGllcyI6WyJEcml2ZXIiXSwianRpIjoiZGU4NTcwNDQtYzUwYi00ZmUwLTkwZTUtNmNkNjZhNzY5MmQyIiwiY2xpZW50X2lkIjoidHJ1Y2tpbmdjbGllbnQifQ.lgE9QimXTazH6nF49XFTgSpqEgr1SWTWfLaLB3axxTA'; //jika token utama di local storage basi
//     var decoded = decode(resToken);
//     var exp = decoded.exp;
//     var now = new Date().getTime() / 1000;

//     // var resToken = null; //jika tokennya null (localstorage diapus/logout)
//     // var resToken =
//     //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JvbGUiOiJEcml2ZXIiLCJhdWQiOlsiYWxsc3RvcmUiXSwiY29tcGFueV9pZCI6IlRLLVRSU0NNUC0yMDIwMDkxODIwNDc1OTAwMDAwMTMiLCJ1c2VyX2lkIjoiVEstRFJWLTIwMjAwOTIxMDgxMDUyMDAwMDAzMiIsInVzZXJfbmFtZSI6Im1yLnBhbnR1cmFAZ21haWwuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImNvbXBhbnlfbmFtZSI6IlBUIEJlcnRhaGFuIEhpZHVwIiwiZXhwIjoxNjAzMjA1NzE2LCJhdXRob3JpdGllcyI6WyJEcml2ZXIiXSwianRpIjoiZGU4NTcwNDQtYzUwYi00ZmUwLTkwZTUtNmNkNjZhNzY5MmQyIiwiY2xpZW50X2lkIjoidHJ1Y2tpbmdjbGllbnQifQ.lgE9QimXTazH6nF49XFTgSpqEgr1SWTWfLaLB3axxTA'; //jika token utama di local storage basi

//     if (resToken === null) {
//       console.log('restoken nullll', resToken);
//       let changeItemNew = {
//         dataSignIn: null,
//         token: null,
//         isLoading: false,
//         error: null,
//       };
//       return Promise.reject(changeItemNew);
//     } else if (exp <= now) {
//       //exp token udah abis
//       console.log('token utama udah basi');
//       // var resRefToken =
//       //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JvbGUiOiJEcml2ZXIiLCJhdWQiOlsiYWxsc3RvcmUiXSwiY29tcGFueV9pZCI6IlRLLVRSU0NNUC0yMDIwMDkxODIwNDc1OTAwMDAwMTMiLCJ1c2VyX2lkIjoiVEstRFJWLTIwMjAwOTIxMDgxMDUyMDAwMDAzMiIsInVzZXJfbmFtZSI6Im1yLnBhbnR1cmFAZ21haWwuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImNvbXBhbnlfbmFtZSI6IlBUIEJlcnRhaGFuIEhpZHVwIiwiZXhwIjoxNjAzMjA1NzE2LCJhdXRob3JpdGllcyI6WyJEcml2ZXIiXSwianRpIjoiZGU4NTcwNDQtYzUwYi00ZmUwLTkwZTUtNmNkNjZhNzY5MmQyIiwiY2xpZW50X2lkIjoidHJ1Y2tpbmdjbGllbnQifQ.lgE9QimXTazH6nF49XFTgSpqEgr1SWTWfLaLB3axxTA'; //jika token utama di local storage basi
//       var decodedRefToken = decode(resRefToken);
//       var refExp = decodedRefToken.exp;
//       if (refExp > now) {
//         //ref token masih nyala
//         try {
//           const resRefreshTokenHandler = await RefreshAPIHandler(resRefToken);

//           console.log('res refExp > now', resRefreshTokenHandler);

//           return Promise.resolve(resRefreshTokenHandler);
//         } catch (error) {
//           console.log('err refExp > now', error);
//           return Promise.reject(error.message);
//         }
//       } else {
//         // ref token udah abis
//         Alert.alert(
//           'Perhatian',
//           'Waktu Koneksi selesai. Silahkan Login kembali',
//         );
//         let changeItemNew = {
//           dataSignIn: null,
//           token: null,
//           isLoading: false,
//           error: 'Waktu Koneksi selesai. Silahkan Login kembali',
//         };
//         console.log('error yg ada alert', changeItemNew);
//         return Promise.reject(changeItemNew);
//       }
//     } else {
//       //token masih nyala
//       try {
//         const resRefreshTokenHandler = await RefreshAPIHandler(resRefToken);
//         console.log('res token masih nyala', resRefreshTokenHandler);
//         return Promise.resolve(resRefreshTokenHandler);
//       } catch (error) {
//         console.log('error token masih nyala', error);
//         return Promise.reject(error.message);
//       }
//     }
//   } catch (error) {
//     console.log('errTryCatchUtama', error.message);
//     return Promise.reject(error.message);
//   }
// };

// const RefreshAPIHandler = async refresh_token => {
//   var fd = new FormData();
//   fd.append('grant_type', 'refresh_token');
//   fd.append('refresh_token', refresh_token);

//   try {
//     const response = await LoginApi.post('/user/v1/signinDriver', fd, {
//       headers: {
//         Authorization: `Basic ${BASIC_AUTH}`,
//       },
//     });
//     await AsyncStorage.setItem('@token', response.data.access_token);
//     await AsyncStorage.setItem('@refresh_token', response.data.refresh_token);
//     return Promise.resolve(response.data);
//   } catch (error) {
//     return Promise.reject(error.message);
//   }
// };
