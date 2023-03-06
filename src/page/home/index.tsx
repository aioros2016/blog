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
import React, { useCallback, useEffect, useState } from 'react'
import { requestError } from '../../service/base'
import { RequestSuccess, UserInfo } from '../../types'
import { UnAuthenticated } from '../unAuthenticated'
import { Authenticated } from '../authenticated'
import { userToken } from '../../const'
import { AxiosResponse } from 'axios'
import { userInfoService } from '../../service/user'
import { LoadingSpin } from '../../components/loading'

export const Home = () => {
	const dispatch = useDispatch()
	const userInfo = useSelector(selectUserInfoState)
	const [loading, setLoading] = useState(false)

	const fetchUserInfo = useCallback(async () => {
		if (!userToken) return
		setLoading(true)
		try {
			const { result } = await userInfoService<RequestSuccess<UserInfo>>(`user/info`)
			dispatch(unAuthenticatedAction.userInfo(result))
		} catch (e) {
			const error = e as AxiosResponse
			if (![401, 402].includes(error.status)) {
				requestError(error.data)
			}
		} finally {
			setLoading(false)
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
					loading ? <LoadingSpin /> : !userInfo ? <UnAuthenticated /> : <Authenticated />
				}
			</Router>
		</div>
	)
}
