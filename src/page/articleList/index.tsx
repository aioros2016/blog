/*
 * @Author: lizhigang
 * @Date: 2023-02-17 12:15:49
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { useDispatch, useSelector } from 'react-redux'
import {
	selectPrevStackState,
	selectUserInfoState,
	unAuthenticatedAction
} from '../unAuthenticated/unAuthenticated.slice'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { tokenKey } from '../../const'

export const ArticleList = () => {
	const prevStack = useSelector(selectPrevStackState)
	const userInfo = useSelector(selectUserInfoState)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	/**
	 * 账号登出
	 */
	const logout = () => {
		const currentStack = window.history.length - prevStack
		dispatch(unAuthenticatedAction.logout())
		currentStack > 1 ? navigate(-currentStack) : navigate('/', { replace: true })
		localStorage.removeItem(tokenKey)
	}

	return (
		<div>
			<div>文章列表</div>
			<div>{JSON.stringify(userInfo)}</div>
			<Button
				onClick={logout}
			>
				登出
			</Button>
		</div>
	)
}
