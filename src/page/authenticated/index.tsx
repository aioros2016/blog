/*
 * @Author: lizhigang
 * @Date: 2023-02-17 12:19:31
 * @Company: orientsec.com.cn
 * @Description: 已登录组件
 */
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { ArticleList } from '../articleList'
import { UserDetail } from '../userDetail'
import { BlogHeader } from '../../components/header'
import { useSelector } from 'react-redux'
import { selectUserInfoState } from '../unAuthenticated/unAuthenticated.slice'
import { Button, Tooltip, Drawer } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import './index.scss'
import { useRef, useState } from 'react'
import EditArticle from '../../components/writeArticle'

export const Authenticated = () => {
	const userInfo = useSelector(selectUserInfoState)
	const drawerRef = useRef<Record<string, any>>(null)
	console.log('Authenticated page')

	return (
		<>
			<Router>
				<BlogHeader userInfo={userInfo} />
				<Routes>
					<Route path='/articles' element={<ArticleList />} />
					<Route path='/userdetail/:userId' element={<UserDetail />} />
					<Route index element={<ArticleList />} />
				</Routes>
				<EditArticle ref={drawerRef} />
				<div className='float-bar'>
					<Tooltip title='写文章'>
						<div className='float-button-wrpper'>
							<Button className='float-button' type='primary' shape='circle' block
											icon={<EditOutlined className='float-button-icon' />} onClick={() => {
								drawerRef.current?.open()
							}} />
						</div>
					</Tooltip>
				</div>
			</Router>
		</>
	)
}
