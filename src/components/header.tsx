/*
 * @Author: lizhigang
 * @Date: 2023-02-24 15:32:20
 * @Company: orientsec.com.cn
 * @Description: 页头通用组件
 */
import { Button, Dropdown, Popconfirm } from 'antd'
import { UserInfo } from '../types'
import { unAuthenticatedAction } from '../page/unAuthenticated/unAuthenticated.slice'
import { tokenKey } from '../const'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const BlogHeader = ({ userInfo }: { userInfo: UserInfo | null }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { username, avatar } = userInfo || {}

	const items = [{
		key: '1',
		label: (
			<Button type='link' onClick={() => {
				navigate(`/userdetail/${userInfo?._id}`)
				console.log(window.history.length)
			}}>个人资料</Button>
		)
	}]

	/**
	 * 账号登出
	 */
	const logout = () => {
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
							<span className='user-avatar' style={{ backgroundImage: `url(${avatar.url})` }} />
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
