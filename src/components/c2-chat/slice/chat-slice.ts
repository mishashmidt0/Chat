import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { MessagesApi } from '../../../api/messagesApi';
import { GeneralId } from '../../../constants/const-channels';
import { initialState, limit } from '../../../constants/const-chat';
import { EnumChat } from '../../../enums/enum-chat';
import { TypedDispatch } from '../../../redux/store';
import { finalMessage, message, messageKey } from '../../../types/ChatType/ChatType';
import { getRandom } from '../util/random';

// toolkit
const ChatSlice = createSlice({
  name: EnumChat.name,
  initialState,
  reducers: {
    setMessage(state, { payload }) {
      return {
        ...state,
        messages: {
          ...state.messages,
          [GeneralId]: [
            ...state.messages[GeneralId],
            ...payload.map((el: message) => ({ ...el, lvl: getRandom(), id: uuidv4() })),
          ],
        },
      };
    },
    addMyMessage(state, { payload }) {
      return {
        ...state,
        messages: {
          ...state.messages,
          [GeneralId]: [
            { ...payload, lvl: getRandom(), id: uuidv4() },
            ...state.messages[GeneralId],
          ],
        },
      };
    },
    changeSkipLimit(state) {
      return { ...state, limit: state.limit + limit, skip: state.skip + limit };
    },
    changeLoading(state, { payload }) {
      return { ...state, isLoading: payload };
    },
    setMyName(state, { payload }) {
      return { ...state, myName: payload };
    },
  },
});

export default ChatSlice.reducer;

// action
export const { setMessage, addMyMessage, changeSkipLimit, changeLoading, setMyName } =
  ChatSlice.actions;

// thunks
export const getMessage =
  (skip: number, limit: number) => async (dispatch: TypedDispatch) => {
    try {
      const data = await MessagesApi.getMessages(skip, limit);

      dispatch(setMessage(data.data));
      dispatch(changeSkipLimit());
    } catch (error: any) {
      console.log(`error${error}`);
    } finally {
      dispatch(changeLoading(false));
    }
  };

// type
export type chatType = {
  messages: Record<messageKey, finalMessage[]>;
  skip: number;
  limit: number;
  isLoading: boolean;
  myName: string | null;
};
