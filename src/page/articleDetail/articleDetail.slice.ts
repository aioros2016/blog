/*
 * @Author: lizhigang
 * @Date: 2023-03-06 17:30:51
 * @Company: orientsec.com.cn
 * @Description: 文章详情全局状态
 */
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface State {
	commentOpen: boolean
}

const initialState: State = {
	commentOpen: false
}

export const articleDetailSlice = createSlice({
	name: 'articleDetailSlice',
	initialState,
	reducers: {
		setCommentOpen(state, { payload }) {
			state.commentOpen = payload
		}
	}
})

export const articleDetailAction = articleDetailSlice.actions
export const selectCommentOpenState = (state: RootState) => state.articleDetail.commentOpen
