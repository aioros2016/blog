/*
 * @Author: lizhigang
 * @Date: 2023-02-17 12:44:51
 * @Company: orientsec.com.cn
 * @Description: redux toolkit根配置
 */
import { configureStore } from '@reduxjs/toolkit'
import { unAuthenticatedSlice } from '../page/unAuthenticated/unAuthenticated.slice'
import { authenticatedSlice } from '../page/authenticated/authenticated.slice'

export const rootReducer = {
	unAuthenticated: unAuthenticatedSlice.reducer,
	authenticated: authenticatedSlice.reducer
}

export const store = configureStore({
	reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
