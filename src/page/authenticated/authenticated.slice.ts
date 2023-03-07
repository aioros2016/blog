/*
 * @Author: lizhigang
 * @Date: 2023-02-17 12:50:20
 * @Company: orientsec.com.cn
 * @Description: 已登录全局状态管理
 */
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface State {
	draft: {
		title?: string;
		content?: string;
	};
	searchParams: string;
}

const initialState: State = {
	draft: {
		title: '',
		content: ''
	},
	searchParams: ''
}

export const authenticatedSlice = createSlice({
	name: 'authenticatedSlice',
	initialState,
	reducers: {
		setDraft(state, { payload }) {
			const [position, text] = payload
			position === 'title' && (state.draft.title = text)
			position === 'content' && (state.draft.content = text)
			if (position === 'all') {
				state.draft.title = text
				state.draft.content = text
			}
		},
		setSearchParams(state, { payload }) {
			state.searchParams = payload
		}
	}
})

export const authenticatedAction = authenticatedSlice.actions
export const selectDraftState = (state: RootState) => state.authenticated.draft
export const selectSearchParams = (state: RootState) => state.authenticated.searchParams
