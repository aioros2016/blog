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
import { userToken } from '../../const'
import { userInfoService } from '../../service/user'
import { LoadingSpin } from '../../components/loading'

const UnAuthenticated = React.lazy(() => import('../unAuthenticated'))
const Authenticated = React.lazy(() => import('../authenticated'))

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
		} catch (error) {
			requestError(error)
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
				<React.Suspense fallback={<LoadingSpin />}>
					{loading ? <LoadingSpin /> : !userInfo ? <UnAuthenticated /> : <Authenticated />}
				</React.Suspense>
			</Router>
		</div>
	)
}
