/*
 * @Author: lizhigang
 * @Date: 2023-02-24 15:32:20
 * @Company: orientsec.com.cn
 * @Description: 页头通用组件
 */
import { Avatar, Button, Dropdown, Popconfirm } from 'antd'
import { UserInfo } from '../types'
import { selectUserInfoState, unAuthenticatedAction } from '../page/unAuthenticated/unAuthenticated.slice'
import { tokenKey } from '../const'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import React from 'react'
import { authenticatedAction } from '../page/authenticated/authenticated.slice'

export const BlogHeader = ({ userInfo }: { userInfo: UserInfo | null }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const storeUserInfo = useSelector(selectUserInfoState)
	const { username, avatar } = userInfo || {}

	const items = [{
		key: '1',
		label: (
			<NavLink to={`/userdetail/${storeUserInfo?._id}`}>
				<Button type='link'>个人资料</Button>
			</NavLink>
		)
	}, {
		key: '2',
		label: (
			<NavLink to={`/resetpassword`}>
				<Button type='link'>修改密码</Button>
			</NavLink>
		)
	}]

	/**
	 * 账号登出
	 */
	const logout = () => {
		dispatch(authenticatedAction.setDraft(['all', '']))
		dispatch(unAuthenticatedAction.logout())
		localStorage.removeItem(tokenKey)
		navigate('/', { replace: true })
	}

	return (
		<header className='bolg-header'>
			<div className='logo'>Mini Blog</div>
			<div className='user-status-bar'>
				<Dropdown menu={{ items }} placement='bottomRight' arrow>
					<Button type='link'>
						{avatar && (
							<Avatar src={avatar.url} />
						)}
						<span className='user-name'>{username}</span>
					</Button>
				</Dropdown>\
				<Popconfirm
					title='确定要登出账号吗？'
					placement='bottomRight'
					onConfirm={logout}
					okText='确认'
					cancelText='取消'
				>
					<Button type='link'>登出</Button>
				</Popconfirm>
			</div>
		</header>
	)
}
