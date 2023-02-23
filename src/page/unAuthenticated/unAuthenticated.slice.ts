/*
 * @Author: lizhigang
 * @Date: 2023-02-17 12:50:20
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export interface LoginSumbmitData {
	username: string;
	password: string;
	age: number;
	email: string;
	mobile: string;
	avatar?: string;
	channelDes?: string;
}

export interface RegisterSumbmitData {
	username: string;
	password: string;
}

interface State {
	userInfo: {
		_id: string;
		username: string;
	} | null;
	prevStack: number;
	loginSubmitData: LoginSumbmitData | null;
	registerSubmitData: RegisterSumbmitData | null;
}

const initialState: State = {
	userInfo: null,
	prevStack: 0,
	loginSubmitData: null,
	registerSubmitData: null
}

export const unAuthenticatedSlice = createSlice({
	name: 'unAuthenticatedSlice',
	initialState,
	reducers: {
		login(state, { payload }) {
			state.userInfo = payload
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
			console.log(payload)
			key === 'login' && (state.loginSubmitData = val)
			key === 'register' && (state.registerSubmitData = val)
		}
	}
})

export const unAuthenticatedAction = unAuthenticatedSlice.actions
export const selectUserInfoState = (state: RootState) => state.unAuthenticated.userInfo
export const selectPrevStackState = (state: RootState) => state.unAuthenticated.prevStack
export const selectRegisterDataState = (state: RootState) => state.unAuthenticated.registerSubmitData
export const selectLoginDataState = (state: RootState) => state.unAuthenticated.loginSubmitData
