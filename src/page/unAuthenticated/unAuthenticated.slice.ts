/*
 * @Author: lizhigang
 * @Date: 2023-02-17 12:50:20
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { createSlice } from "@reduxjs/toolkit";
import {RootState} from "../../store";

interface State {
  loginState: boolean;
  userInfo: {
    _id: string;
    username: string;
  } | null
}

const initialState: State = {
  loginState: false,
  userInfo: null
}

export const unAuthenticatedSlice = createSlice({
  name: 'unAuthenticatedSlice',
  initialState,
  reducers: {
    login(state, {payload}) {
      state.userInfo = payload;
    },
    logout(state) {
      state.userInfo = null;
    },
    userInfo(state, {payload}) {
      console.log(payload)
      state.userInfo = payload;
    }
  }
})

export const unAuthenticatedAction = unAuthenticatedSlice.actions;
export const selectLoginState = (state: RootState) => state.unAuthenticated.loginState;
export const selectUserInfoState = (state: RootState) => state.unAuthenticated.userInfo;
