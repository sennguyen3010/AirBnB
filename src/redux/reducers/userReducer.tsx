import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { history } from '../..';
import { openNotificationWithIcon } from '../../components/Notification/Notification';
import {
  ACCESS_TOKEN,
  getStoreJSON,
  http,
  setStore,
  setStoreJSON,
  TOKEN_CYBERSOFT,
  USER_LOGIN,
} from '../../util/setting';
import { AppDispatch } from '../configStore';

export interface userLogin {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  birthday?: string;
  gender?: boolean;
  role?: string;
  avatar?: string;
}
export interface TAIKHOAN {
  user: userLogin;
  token: string;
}
export interface userLoginState {
  userLogin: userLogin | null;
  userData: userLogin[];
  totalRow: number;
  updataUser: userLogin;
  taiKhoan: TAIKHOAN;
}
const initialState = {
  userLogin: getStoreJSON('userSignin'),
  userData: [],
  totalRow: 0,
  updataUser: {
    id: 0,
    name: '',
    email: '',
    birthday: '',
    role: '',
    gender: true,
    phone: '',
  },
  taiKhoan: {
    user: {
      id: 0,
      name: '',
      email: '',
      password: '',
      phone: '',
      birthday: '',
      gender: true,
      role: '',
      avatar: '',
    },
    token: '',
  },
};

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUserLogin: (state: userLoginState, action: PayloadAction<userLogin | null>) => {
      let userLogin = action.payload;
      state.userLogin = userLogin;
    },
    getUserData: (state: userLoginState, action: PayloadAction<userLogin[]>) => {
      state.userData = action.payload;
    },
    setTotalRows: (state: userLoginState, action: PayloadAction<number>) => {
      state.totalRow = action.payload;
    },
    handleDelUser: (state: userLoginState, action: PayloadAction<number>) => {
      state.totalRow -= 1;
    },
    setUserUpdata: (state: userLoginState, action: PayloadAction<userLogin>) => {
      state.userLogin = action.payload;
    },
    setTaiKhoan: (state: userLoginState, action: PayloadAction<TAIKHOAN>) => {
      let { user, token } = action.payload;
      state.taiKhoan.user = user;
      state.taiKhoan.token = token;
    },
  },
});

export const { setUserLogin, getUserData, setTotalRows, handleDelUser, setUserUpdata, setTaiKhoan } =
  userReducer.actions;

export default userReducer.reducer;

/// Call api post signup
export const postSignupUser = (data: userLogin) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.post('/auth/signup', data);
      let dataLogin = {
        email: data.email,
        password: data.password,
      };
      openNotificationWithIcon('success', 'Đăng ký tài khoản thành công', 'Tiếp tục khám phá trang');

      let action = postSignin(dataLogin);
      dispatch(action);
    } catch (error: any) {
      openNotificationWithIcon('error', 'Đăng ký tài khoản không thành công', `${error.response.data.content}`);
    }
  };
};

// Call api  post signin
export const postSignin = (data: userLogin) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.post('/auth/signin', data);
      //LƯU TOKEN VÀO LOCALSTORE
      setStore(ACCESS_TOKEN, result.data.content.token);
      // Lưu lại user_Login
      setStoreJSON(USER_LOGIN, result.data.content);
      setStoreJSON('userSignin', result.data.content.user);
      //Đưa userLogin lên redux
      let action1 = setUserLogin(result.data.content.user);
      dispatch(action1);
      let action2 = setTaiKhoan(result.data.content);
      dispatch(action2);
      // if role: user chuyển về page profile còn admin thì chuyển thì template admin
      let role = result.data.content.user.role;
      if (role === 'ADMIN') {
        history.push('/admin');
      } else {
        history.push('/');
      }
    } catch (error: any) {
      openNotificationWithIcon('error', 'Đăng nhập không thành công', `${error.response.data.content}`);
    }
  };
};
// Call api get user
export const getUserAPi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/users/${id}`);
      let action = setUserLogin(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log({ err });
      history.push('/login');
    }
  };
};

// call api put user
export const putUserApi = (id: number, data: userLogin) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.put(`/users/${id}`, data);
      let action = setUserLogin(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log({ error });
    }
  };
};

export const getPaginationUserAPI = (index: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/users/phan-trang-tim-kiem?pageIndex=${index}&pageSize=${pageSize}`);
      const action = getUserData(result.data.content.data);
      dispatch(action);
      const totalrowsAction = setTotalRows(result.data.content.totalRow);
      dispatch(totalrowsAction);
    } catch (err) {
      console.log(err);
    }
  };
};

// Call API delete user

export const delUserAPI = (idUser: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      await http.delete(`/users?id=${idUser}`);
      let action = handleDelUser(idUser);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
