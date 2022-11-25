import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../configStore';
import { getStoreJSON, http, TOKEN_CYBERSOFT, USER_LOGIN } from '../../util/setting';
import { message } from 'antd';
import { history } from '../..';
import { openNotificationWithIcon } from '../../components/Notification/Notification';

export interface Room {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: number;
  hinhAnh: string;
}

export interface BookRoom {
  id: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
}

export interface updataRoom {
  room: Room;
  page: number;
  pageSize: number;
}
export interface RoomState {
  room: Room[];
  bookRoom: BookRoom[];
  arrBookRoom: BookRoom[];
  arrRoomPage: Room[];
  updataRoom: updataRoom;
  updataBookRoom: BookRoom;
}

const initialState: RoomState = {
  room: [],
  bookRoom: [],
  arrBookRoom: [],
  arrRoomPage: [],
  updataRoom: {
    room: {
      id: 0,
      tenPhong: '',
      khach: 0,
      phongNgu: 0,
      giuong: 0,
      phongTam: 0,
      moTa: '',
      giaTien: 0,
      mayGiat: true,
      banLa: true,
      tivi: true,
      dieuHoa: true,
      wifi: true,
      bep: true,
      doXe: true,
      hoBoi: true,
      banUi: true,
      maViTri: 0,
      hinhAnh: '',
    },
    page: 0,
    pageSize: 0,
  },
  updataBookRoom: {
    id: 0,
    maPhong: 0,
    ngayDen: '',
    ngayDi: '',
    soLuongKhach: 0,
    maNguoiDung: 0,
  },
};

const roomDetailReducer = createSlice({
  name: 'roomDetailReducer',
  initialState,
  reducers: {
    getRoomDetail: (state, action: PayloadAction<Room>) => {
      state.room = [action.payload];
    },

    filterBookedRoom: (state, action: PayloadAction<BookRoom[]>) => {
      let [roomDetail] = [...state.room];

      let result = action.payload.filter((item: BookRoom) => item.maPhong == roomDetail?.id);
      state.arrBookRoom = result;
    },
    setRoomList: (state, action) => {
      state.room = action.payload;
    },
    setBookRoom: (state, action: PayloadAction<BookRoom[]>) => {
      state.bookRoom = action.payload;
    },

    setRoomPofile: (state: RoomState, action: PayloadAction<Room>) => {
      state.room.push(action.payload);
    },
    setArrRoomPage: (state: RoomState, action: PayloadAction<Room[]>) => {
      state.arrRoomPage = action.payload;
    },
    setUpdataRoom: (state: RoomState, action: PayloadAction<updataRoom>) => {
      let { room, page, pageSize } = action.payload;
      state.updataRoom.room = room;
      state.updataRoom.page = page;
      state.updataRoom.pageSize = pageSize;
    },
    setUpdataBookRoomAction: (state: RoomState, action: PayloadAction<BookRoom>) => {
      state.updataBookRoom = action.payload;
    },
  },
});

export const {
  getRoomDetail,
  filterBookedRoom,
  setRoomList,
  setBookRoom,
  setRoomPofile,
  setArrRoomPage,
  setUpdataRoom,
  setUpdataBookRoomAction,
} = roomDetailReducer.actions;

export default roomDetailReducer.reducer;

//----------------api--------------------------
export const getRoomDetailApi = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/phong-thue/${id}`);
      const action = getRoomDetail(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getBookRoomApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get('/dat-phong');
      const action = filterBookedRoom(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const postBookRoomApi = (room: BookRoom) => {
  return async () => {
    try {
      const result = await http.post(`/dat-phong`, room);
      openNotificationWithIcon('success', 'Đặt phòng thành công', 'Xem lại lịch sử đặt phòng ở trang tài khoản');
      history.push('/profile');
    } catch (err) {
      console.log(err);
    }
  };
};

export const getRoomListByLocation = (locationId: string | undefined) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationId}`);
      const action = setRoomList(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
// Call api lấy danh sách phòng để dàn layout page Quản lý thông tin phòng
export const getRoomALLApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get('/phong-thue');
      // đưa lên redux (setRoomList)
      let action = setRoomList(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log({ error });
    }
  };
};
export const getRoomPageApi = (page: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/phong-thue/phan-trang-tim-kiem?pageIndex=${page}&pageSize=${pageSize}&keyword=`);
      // đưa lên redux (setRoomList)
      let action = setArrRoomPage(result.data.content.data);
      dispatch(action);
    } catch (error) {
      console.log({ error });
    }
  };
};
// call api create Room
export const postRoomApi = (token: string, data: Room) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await axios({
        url: 'https://airbnbnew.cybersoft.edu.vn/api/phong-thue',
        method: 'POST',
        data: data,
        headers: {
          tokenCybersoft: TOKEN_CYBERSOFT,
          token: token,
        },
      });
      message.success(result.data.message);
      dispatch(getRoomALLApi());
    } catch (error) {
      console.log({ error });
    }
  };
};
// Call api updata Room
export const updataRoomApi = (id: number, token: string, data: Room, page: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${id}`,
        method: 'PUT',
        data: data,
        headers: {
          token: token,
          tokenCybersoft: TOKEN_CYBERSOFT,
        },
      });
      message.success(result.data.message);
      dispatch(getRoomPageApi(page, pageSize));
    } catch (error: any) {
      console.log({ error });
      message.success(error.response.data.content);
    }
  };
};
// Call api xóa phòng page Admin quản lý thông tin phòng
export const deleteRoomApi = (id: number, token: string, page: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${id}`,
        method: 'DELETE',
        headers: {
          token: token,
          tokenCybersoft: TOKEN_CYBERSOFT,
        },
      });
      message.success(result.data.message);
      dispatch(getRoomPageApi(page, pageSize));
    } catch (error: any) {
      console.log({ error });
      message.success(error.response.data.content);
    }
  };
};
// Call search api room
export const searchRoomApi = (token: string, data: Room) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await axios({
        url: 'https://airbnbnew.cybersoft.edu.vn/api/phong-thue',
        method: 'POST',
        data: data,
        headers: {
          tokenCybersoft: TOKEN_CYBERSOFT,
          token: token,
        },
      });
      alert(result.data.message);
      // goi
      dispatch(getRoomALLApi());
    } catch (error) {
      console.log({ error });
    }
  };
};
//Call api Search page Quản lý phòng
export const searchRoomAdminApi = (search: string | number | undefined, page: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(
        `/phong-thue/phan-trang-tim-kiem?pageIndex=${page}&pageSize=${pageSize}&keyword=${search}`
      );
      let action = setArrRoomPage(result.data.content.data);
      dispatch(action);
    } catch (error) {
      console.log({ error });
    }
  };
};
//Call api  Đặt phòng theo người dùng => page profile
export const getDatphongApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/dat-phong/lay-theo-nguoi-dung/${getStoreJSON(USER_LOGIN).user.id}`);
      let action = setBookRoom(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log({ error });
    }
  };
};

// -------------- page admin Đặt phòng-----------

export const getBookRoomAdminApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/dat-phong`);
      // đưa lên redux
      dispatch(setBookRoom(result.data.content));
    } catch (error) {
      console.log({ error });
    }
  };
};
// Call delete bookRoom
export const deleteBookRoomAdminApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.delete(`/dat-phong/${id}`);
      // đưa lên redux
      message.success(result.data.message);

      dispatch(getBookRoomAdminApi());
    } catch (error) {
      console.log({ error });
    }
  };
};
// Call Api thêm đặt phòng

export const postBookRoomAdminApi = (data: BookRoom) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.post('dat-phong', data);
      // đưa lên redux
      message.success(result.data.message);

      dispatch(getBookRoomAdminApi());
    } catch (error) {
      console.log({ error });
    }
  };
};
// Call Api updaBookRoomAdmin
export const putBookRoomAdminApi = (data: BookRoom, id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.put(`/dat-phong/${id}`, data);
      // đưa lên redux
      message.success(result.data.message);

      dispatch(getBookRoomAdminApi());
    } catch (error) {
      console.log({ error });
    }
  };
};
