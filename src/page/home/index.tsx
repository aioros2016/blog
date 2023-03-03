/*
 * @Author: lizhigang
 * @Date: 2023-02-20 12:30:27
 * @Company: orientsec.com.cn
 * @Description: 博客首页
 */
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectUserInfoState,
	unAuthenticatedAction
} from '../unAuthenticated/unAuthenticated.slice'
import React, { useCallback, useEffect } from 'react'
import { request, requestError } from '../../service/base'
import { RequestError, RequestSuccess, UserInfo } from '../../types'
import { UnAuthenticated } from '../unAuthenticated'
import { Authenticated } from '../authenticated'
import { userToken } from '../../const'

export const Home = () => {
	const dispatch = useDispatch()
	const userInfo = useSelector(selectUserInfoState)

	const fetchUserInfo = useCallback(async () => {
		if (!userToken) return
		try {
			const { result } = await request<{}, RequestSuccess<UserInfo>>({ url: `user/info` })
			dispatch(unAuthenticatedAction.userInfo(result))
		} catch (e) {
			console.error(e)
			const error = e as RequestError & { code: number }
			if (error.error !== '无效的token') {
				requestError(e)
			}
		}
	}, [dispatch])


	useEffect(() => {
		console.log('Home Page')
		fetchUserInfo()
	}, [dispatch, fetchUserInfo])

	return (
		<div className='container'>
			<Router>
				{
					!userInfo ? <UnAuthenticated /> : <Authenticated />
				}
			</Router>
		</div>
	)
}
