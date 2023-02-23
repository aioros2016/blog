/*
 * @Author: lizhigang
 * @Date: 2023-02-20 12:30:27
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfoState, unAuthenticatedAction } from '../unAuthenticated/unAuthenticated.slice'
import { useCallback, useEffect } from 'react'
import { request } from '../../service/base'
import { RequestSuccess, UserInfo } from '../../types'
import { UnAuthenticated } from '../unAuthenticated'
import { Authenticated } from '../authenticated'
import { userToken } from '../../const'

export const Home = () => {
	const dispatch = useDispatch()
	const userInfo = useSelector(selectUserInfoState)

	const fetchUserInfo = useCallback(async () => {
		if (!userToken) return
		try {
			const { result } = await request<{}, RequestSuccess<UserInfo>>({ url: 'user/info' })
			dispatch(unAuthenticatedAction.userInfo(result))
		} catch (e) {

		}
	}, [dispatch])

	useEffect(() => {
		console.log('Home Page')
		dispatch(unAuthenticatedAction.setPrevStack(window.history.length))
		fetchUserInfo()
	}, [dispatch, fetchUserInfo])

	return (
		<div className='container'>
			{
				!userInfo ? <UnAuthenticated /> : <Authenticated />
			}
		</div>
	)
}
