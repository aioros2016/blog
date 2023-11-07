/*
 * @Author: lizhigang
 * @Date: 2023-03-08 21:00:15
 * @Company: orientsec.com.cn
 * @Description: 用户管理后台
 */
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import React, { useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Outlet, useNavigate } from 'react-router-dom'

export const Admin = () => {
	const navigate = useNavigate()
	const [current, setCurrent] = useState('users')

	const items: MenuProps['items'] = [
		{
			label: '用户管理',
			key: 'users'
		},
		{
			label: '权限管理',
			key: 'auth'
		}
	]

	const onClick: MenuProps['onClick'] = (e) => {
		setCurrent(e.key)
		navigate(`/admin/${e.key}`, { replace: true })
	}

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>用户管理后台</title>
					<meta name='description' content='用户管理后台' />
				</Helmet>
			</HelmetProvider>
			<Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' items={items} />
			<Outlet />
		</>

	)
}
