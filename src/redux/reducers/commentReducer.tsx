import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, message } from 'antd';
import { openNotificationWithIcon } from '../../components/Notification/Notification';
import { http } from '../../util/setting';
import { AppDispatch } from '../configStore';

export interface Comment {
  id: number;
  maPhong: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
}

export interface CommentState {
  arrComment: Comment[];
  arrCommentId: Comment[];
}

const initialState: CommentState = {
  arrComment: [],
  arrCommentId: [],
};

const commentReducer = createSlice({
  name: 'commentReducer',
  initialState,
  reducers: {
    getAllComment: (state, action) => {
      state.arrComment = action.payload;
    },
    addComment: (state, action) => {
      let userComment = action.payload;
      state.arrComment.push(userComment);
    },
    filterComment: (state, action) => {
      state.arrCommentId = state.arrComment.filter((comment) => comment.maPhong == action.payload);
    },
    reverseComment: (state) => {
      state.arrCommentId = state.arrCommentId.reverse();
    },
  },
});

export const { getAllComment, addComment, filterComment, reverseComment } = commentReducer.actions;

export default commentReducer.reducer;

//--------------------api---------------------------
export const getAllCommentApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get('/binh-luan');
      const action = getAllComment(result.data.content);
      dispatch(action);
      dispatch(filterComment(id));
      dispatch(reverseComment());
    } catch (err) {
      console.log(err);
    }
  };
};

export const postCommentApi = (comment: Comment) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post('/binh-luan', comment);
      openNotificationWithIcon('success', 'Bình luận thành công', '');
      const action = addComment(result.data.content);

      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
