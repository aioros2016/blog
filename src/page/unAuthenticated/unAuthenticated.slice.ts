/*
 * @Author: lizhigang
 * @Date: 2023-02-17 12:50:20
 * @Company: orientsec.com.cn
 * @Description: 未登录全局状态管理
 */
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { UserInfo } from '../../types'

export interface RegisterSumbmitData {
	username: string;
	password: string;
	age: number;
	email: string;
	mobile: string;
	avatar?: string;
	channelDes?: string;
}

export interface LoginSumbmitData {
	email: string;
	password: string;
}

interface State {
	isLogin: boolean;
	isGuest: boolean;
	userInfo: UserInfo | null;
	prevStack: number;
	loginSubmitData: LoginSumbmitData | null;
	registerSubmitData: RegisterSumbmitData | null;
}

const initialState: State = {
	isLogin: true,
	isGuest: false,
	userInfo: null,
	prevStack: 0,
	loginSubmitData: null,
	registerSubmitData: null
}

export const unAuthenticatedSlice = createSlice({
	name: 'unAuthenticatedSlice',
	initialState,
	reducers: {
		setLogin(state, { payload }) {
			state.isLogin = payload
		},
		setGuest(state, { payload }) {
			state.isGuest = payload
		},
		setUserInfo(state, { payload }) {
			state.userInfo = payload
			state.isGuest = false
		},
		logout(state) {
			state.userInfo = null
		},
		userInfo(state, { payload }) {
			state.userInfo = payload
		},
		setPrevStack(state, { payload }) {
			state.prevStack = payload
		},
		storeSubmitData(state, { payload }) {
			const [key, val] = payload
			key === 'login' && (state.loginSubmitData = val)
			key === 'register' && (state.registerSubmitData = val)
		}
	}
})

export const unAuthenticatedAction = unAuthenticatedSlice.actions
export const selectIsLoginState = (state: RootState) => state.unAuthenticated.isLogin
export const selectIsGuestState = (state: RootState) => state.unAuthenticated.isGuest
export const selectUserInfoState = (state: RootState) => state.unAuthenticated.userInfo
export const selectPrevStackState = (state: RootState) => state.unAuthenticated.prevStack
export const selectRegisterDataState = (state: RootState) => state.unAuthenticated.registerSubmitData
export const selectLoginDataState = (state: RootState) => state.unAuthenticated.loginSubmitData
