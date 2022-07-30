import { createSlice } from '@reduxjs/toolkit';

const initialState: messageType = {
  message: '',
  scroll: false,
};
// toolkit
const MessageSlice = createSlice({
  name: 'MessageSlice',
  initialState,
  reducers: {
    changeMessage(state, { payload }) {
      return { ...state, message: payload };
    },
    changeScroll(state, { payload }) {
      return { ...state, scroll: payload };
    },
  },
});

export default MessageSlice.reducer;

// action
export const { changeMessage, changeScroll } = MessageSlice.actions;

// type
export type messageType = {
  message: string;
  scroll: boolean;
};
