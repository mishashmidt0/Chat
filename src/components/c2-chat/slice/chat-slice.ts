import { createSlice } from '@reduxjs/toolkit';

import { MessagesApi } from '../../../api/messagesApi';
import { initialState } from '../../../constants/ChatInitData';
import { limit, skip } from '../../../constants/constants';
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
          ...payload.map((el: message) => ({ ...el, lvl: 10 })),
        ],
      };
    },
  },
});

export default ChatSlice.reducer;

// action
export const { setMessage } = ChatSlice.actions;

// thunks
export const getMessage = () => async (dispatch: TypedDispatch) => {
  try {
    const data = await MessagesApi.getMessages(skip, limit);

    dispatch(setMessage(data.data));
  } catch (error: any) {
    console.log(`error${error}`);
  }
};

// type
export type chatType = {
  message: finalMessage[];
};
