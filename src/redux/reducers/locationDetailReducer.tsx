import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { http } from '../../util/setting';
import { AppDispatch } from '../configStore';
import { message } from 'antd';

export interface ViTri {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

export interface ViTriState {
  viTri: ViTri[];
  arrPageLocation: ViTri[];
  locationDetail: ViTri[];
}

const initialState: ViTriState = {
  viTri: [],
  arrPageLocation: [],
  locationDetail: [],
};

const vitriDetailReducer = createSlice({
  name: 'locationDetailReducer',
  initialState,
  reducers: {
    getLocationDetail: (state, action) => {
      state.locationDetail = [action.payload];
    },
    setArrLocation: (state, action) => {
      state.viTri = action.payload;
    },
    setArrPageLocation: (state: any, action: any) => {
      state.arrPageLocation = action.payload;
    },
  },
});

export const { getLocationDetail, setArrLocation, setArrPageLocation } = vitriDetailReducer.actions;

export default vitriDetailReducer.reducer;

//-----------------api---------------------
export const getLocationDetailApi = (maVitri: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/vi-tri/${maVitri}`);
      const action = getLocationDetail(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getLocationAPI = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get('/vi-tri');
      const action = setArrLocation(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getLocationPageApi = (page: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/vi-tri/phan-trang-tim-kiem?pageIndex=${page}&pageSize=${pageSize}`);

      const action = setArrPageLocation(result.data.content.data);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const postLocationAdminApi = (location: ViTri, page: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const value = {
        id: 0,
        tenViTri: location.tenViTri,
        tinhThanh: location.tinhThanh,
        quocGia: location.quocGia,
        hinhAnh: '',
      };
      const result = await http.post('/vi-tri', value);
      await dispatch(uploadImgLocationApi(result.data.content.id, location.hinhAnh));

      dispatch(getLocationPageApi(page, pageSize));
      dispatch(getLocationAPI());
      message.success(result.data.message);
    } catch (err) {
      console.log(err);
    }
  };
};

export const uploadImgLocationApi = (idLoction: number, img: string) => {
  return async () => {
    const formData = new FormData();
    formData.append('formFile', img);
    try {
      const result = await http.post(`/vi-tri/upload-hinh-vitri?maViTri=${idLoction}`, formData);
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteLocationAdminApi = (id: number, page: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(`/vi-tri/${id}`);
      message.success(result.data.message);
      dispatch(getLocationAPI());
      dispatch(getLocationPageApi(page, pageSize));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateLocationAdminApi = (id: number, locationUpdate: ViTri, page: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    const value = {
      id: id,
      tenViTri: locationUpdate.tenViTri,
      tinhThanh: locationUpdate.tinhThanh,
      quocGia: locationUpdate.quocGia,
      hinhAnh: '',
    };
    try {
      const result = await http.put(`/vi-tri/${id}`, value);
      await dispatch(uploadImgLocationApi(id, locationUpdate.hinhAnh));

      dispatch(getLocationAPI());
      dispatch(getLocationPageApi(page, pageSize));
      message.success(result.data.message);
    } catch (err) {
      console.log(err);
    }
  };
};

export const searchLocationAdminApi = (search: string | number | undefined, page: number, pageSize: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=${pageSize}&keyword=${search}`);
      dispatch(setArrPageLocation(result.data.content.data));
    } catch (err) {
      console.log(err);
    }
  };
};
