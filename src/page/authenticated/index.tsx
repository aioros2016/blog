/*
 * @Author: lizhigang
 * @Date: 2023-02-17 12:19:31
 * @Company: orientsec.com.cn
 * @Description: 已登录组件
 */
import { Route, Routes, Navigate, useLocation, NavLink } from 'react-router-dom'
import { ArticleList } from '../articleList'
import { UserDetail } from '../userDetail'
import { ArticleDetail } from '../articleDetail'
import { BlogHeader } from '../../components/header'
import { useSelector } from 'react-redux'
import { selectUserInfoState } from '../unAuthenticated/unAuthenticated.slice'
import { Button, Tooltip, Badge } from 'antd'
import { EditOutlined, FormOutlined, DoubleLeftOutlined, TeamOutlined } from '@ant-design/icons'
import './index.scss'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import EditArticle from '../../components/writeArticle'
import { ResetPassword } from '../resetPassword'
import { StoreArticle, UserInfo } from '../../types'
import { selectDraftState } from './authenticated.slice'
import WriteComment from '../../components/writeComment'
import { Authority } from '../authority'
import { Admin } from '../admin'
import { Users } from '../users'
import { MyCollect } from '../myCollect'

export default () => {
	const location = useLocation()
	const userInfo = useSelector(selectUserInfoState)
	const draft = useSelector(selectDraftState)
	const drawerRef = useRef<Record<string, any>>(null)
	const commentRef = useRef<Record<string, any>>(null)
	const [hasDraft, setHasDraft] = useState(false)

	/**
	 * 查看本地是否有文章草稿
	 */
	const checkStorage = useCallback(() => {
		let store: StoreArticle | string | null = localStorage.getItem('ARTICLE_INPUT')
		if (!store) return
		const myDraft = JSON.parse(store)[(userInfo as UserInfo)._id]
		if (myDraft) {
			const { title = '', content = '' } = myDraft
			setHasDraft(title || content)
		} else {
			setHasDraft(false)
		}
	}, [userInfo])

	useEffect(() => {
		checkStorage()
	}, [checkStorage])

	useEffect(() => {
		setHasDraft(!!(draft.title ?? '') || !!(draft.content ?? ''))
	}, [draft])

	return (
		<>
			{/*<Router>*/}
			<BlogHeader userInfo={userInfo} />
			<Routes>
				<Route path='/articles' element={<ArticleList />} />
				<Route path='/articles/:id' element={<ArticleDetail />} />
				<Route path='/userdetail/:userId' element={<UserDetail />} />
				<Route path='/resetpassword' element={<ResetPassword />} />
				<Route path='/mycollect' element={<MyCollect />} />
				<Route path='/admin' element={<Admin />}>
					<Route index path='users' element={<Users />} />
					<Route path='auth' element={<Authority />} />
				</Route>
				<Route path='/' element={<Navigate to='/articles' />} />
			</Routes>
			<EditArticle ref={drawerRef} />
			<WriteComment ref={commentRef} />

			<div className='float-bar'>
				<DoubleLeftOutlined className='animation' />
				<div className='float-button-wrpper'>
					<Tooltip title='写文章'>
						{hasDraft ? (
							<Badge.Ribbon text='已存入草稿' color='#faad14'>
								<Button className='float-button geek-blue' type='primary' shape='circle' block
												icon={<EditOutlined className='float-button-icon' />} onClick={() => {
									drawerRef.current?.open()
								}} />
							</Badge.Ribbon>
						) : (
							<Button className='float-button geek-blue' type='primary' shape='circle' block
											icon={<EditOutlined className='float-button-icon' />} onClick={() => {
								drawerRef.current?.open()
							}} />
						)}
					</Tooltip>
				</div>
				{location.pathname.match(/^\/articles\/\w+$/) && (
					<div className='float-button-wrpper'>
						<Tooltip title='评论'>
							<Button className='float-button polar-green' type='primary' shape='circle' block
											icon={<FormOutlined className='float-button-icon' />} onClick={() => {
								commentRef.current?.open()
							}} />
						</Tooltip>
					</div>
				)}
				{
					userInfo?.auth.auth! >= 99 && (
						<div className='float-button-wrpper'>
							<NavLink to='/admin'>
								<Tooltip title='用户与权限管理' placement='topRight'>
									<Button className='float-button dust-red' type='primary' shape='circle' block
													icon={<TeamOutlined className='float-button-icon' />} />
								</Tooltip>
							</NavLink>
						</div>
					)
				}
			</div>
			{/*</Router>*/}
		</>
	)
}
