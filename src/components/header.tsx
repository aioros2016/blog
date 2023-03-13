/*
 * @Author: lizhigang
 * @Date: 2023-02-24 15:32:20
 * @Company: orientsec.com.cn
 * @Description: 页头通用组件
 */
import { Avatar, Button, Dropdown, Input, Popconfirm } from 'antd'
import { UserInfo } from '../types'
import { selectUserInfoState, unAuthenticatedAction } from '../page/unAuthenticated/unAuthenticated.slice'
import { tokenKey } from '../const'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { authenticatedAction, selectSearchParams } from '../page/authenticated/authenticated.slice'
import { SearchOutlined } from '@ant-design/icons'
import { useDebounce } from '../hooks'

export const BlogHeader = ({ userInfo }: { userInfo: UserInfo | null }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const storeUserInfo = useSelector(selectUserInfoState)
	const storeSearchParams = useSelector(selectSearchParams)
	const { username, avatar } = userInfo || {}
	const [searchVal, setSearchVal] = useState('')
	const [searchFocus, setSearchFocus] = useState(false)

	const debounceVal = useDebounce(searchVal, 500)
	dispatch(authenticatedAction.setSearchParams(debounceVal))

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

	useEffect(() => {
		setSearchVal(storeSearchParams)
	}, [storeSearchParams])

	return (
		<header className='bolg-header'>
			<NavLink className='left-area' to='/articles'>
				<div className='logo'>发帖吧</div>
				<div className='sub-title'>Mini</div>
			</NavLink>
			{location.pathname === '/articles' && (
				<div className='search-wrapper'>
					<SearchOutlined className={`search-icon ${searchFocus ? 'search-activate' : ''}`} />
					<Input
						placeholder='输入内容以搜索'
						value={searchVal}
						onChange={e => {
							const event: any = e
							setSearchVal(event.target.value.trim())
						}}
						onFocus={() => setSearchFocus(true)}
						onBlur={() => setSearchFocus(false)}
						size='large'
						bordered={false}
						allowClear />
				</div>
			)}
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
