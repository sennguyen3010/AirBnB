import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";

import commentReducer from "./reducers/commentReducer";
import locationDetailReducer from "./reducers/locationDetailReducer";
import guestDetailReducer from "./reducers/guestDetailReducer";
import roomDetailReducer from "./reducers/roomDetailReducer";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    roomDetailReducer: roomDetailReducer,
    locationDetailReducer: locationDetailReducer,
    commentReducer: commentReducer,
    guestDetailReducer: guestDetailReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {pots: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
