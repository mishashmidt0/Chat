import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { MessagesApi } from '../../../api/messagesApi';
import { GeneralId } from '../../../constants/const-channels';
import { initialState, limit } from '../../../constants/const-chat';
import { EnumChat } from '../../../enums/enum-chat';
import { storeType, TypedDispatch } from '../../../redux/store';
import { finalMessage, message, messageKey } from '../../../types/ChatType/ChatType';
import { changeScroll } from '../../c3-superInput/slice/message-slice';
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
            ...payload.map((el: message) => ({ ...el, lvl: getRandom(), id: uuidv4() })),
            ...state.messages[GeneralId],
          ],
        },
      };
    },

    addMessages(state, { payload }) {
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
      return { ...state, limit: state.limit, skip: state.skip + limit };
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
export const {
  setMessage,
  addMyMessage,
  changeSkipLimit,
  changeLoading,
  setMyName,
  addMessages,
} = ChatSlice.actions;

// thunks
export const getMessage =
  () => async (dispatch: TypedDispatch, getState: () => storeType) => {
    const { skip } = getState().chat;
    const { limit } = getState().chat;

    dispatch(changeLoading(true));
    try {
      const data = await MessagesApi.getMessages(skip, limit);

      dispatch(addMessages(data.data));
      dispatch(changeSkipLimit());
    } catch (error: any) {
      console.log(`error${error}`);
    } finally {
      dispatch(changeLoading(false));
    }
  };

export const initMessage =
  () => async (dispatch: TypedDispatch, getState: () => storeType) => {
    const { skip } = getState().chat;
    const { limit } = getState().chat;

    dispatch(changeLoading(true));
    try {
      const data = await MessagesApi.getMessages(skip, limit);

      dispatch(setMessage(data.data));
      dispatch(changeSkipLimit());
      dispatch(changeScroll(true));
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
