import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { http } from '../../util/setting';
import { AppDispatch } from '../configStore';

export interface Guest {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: number;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
}

export interface GuestState {
  arrGuest: Guest[];
}

const initialState: GuestState = {
  arrGuest: [],
};

const guestDetailReducer = createSlice({
  name: 'guestDetailReducer',
  initialState,
  reducers: {
    getGuestDetail: (state, action: PayloadAction<Guest[]>) => {
      state.arrGuest = action.payload;
    },
  },
});

export const { getGuestDetail } = guestDetailReducer.actions;

export default guestDetailReducer.reducer;

//--------------api----------------
export const getGuestDetailApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get('/users');
      const action = getGuestDetail(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
