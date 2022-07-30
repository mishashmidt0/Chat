import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { MessagesApi } from '../../../api/messagesApi';
import { initialState, limit } from '../../../constants/ChatInitData';
import { TypedDispatch } from '../../../redux/store';
import { finalMessage, message } from '../../../types/ChatType/ChatType';

// toolkit
const ChatSlice = createSlice({
  name: 'ChatSlice',
  initialState,
  reducers: {
    setMessage(state, { payload }) {
      return {
        ...state,
        message: [
          ...state.message,
          ...payload.map((el: message) => ({ ...el, lvl: 10, id: uuidv4() })),
        ],
      };
    },
    addMyMessage(state, { payload }) {
      return { ...state, message: [payload, ...state.message] };
    },
    changeSkipLimit(state) {
      return { ...state, limit: state.limit + limit, skip: state.skip + limit };
    },
  },
});

export default ChatSlice.reducer;

// action
export const { setMessage, addMyMessage, changeSkipLimit } = ChatSlice.actions;

// thunks
export const getMessage =
  (skip: number, limit: number) => async (dispatch: TypedDispatch) => {
    try {
      const data = await MessagesApi.getMessages(skip, limit);

      dispatch(setMessage(data.data));
      dispatch(changeSkipLimit());
    } catch (error: any) {
      console.log(`error${error}`);
    }
  };

// type
export type chatType = {
  message: finalMessage[];
  skip: number;
  limit: number;
};
