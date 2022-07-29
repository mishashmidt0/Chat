import { createSlice } from '@reduxjs/toolkit';

const initialState: messageType = {
  message: '',
};
// toolkit
const MessageSlice = createSlice({
  name: 'MessageSlice',
  initialState,
  reducers: {
    changeMessage(state, { payload }) {
      return { ...state, message: payload };
    },
  },
});

export default MessageSlice.reducer;

// action
export const { changeMessage } = MessageSlice.actions;

// type
export type messageType = {
  message: string;
};
