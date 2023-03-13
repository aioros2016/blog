/*
 * @Author: lizhigang
 * @Date: 2023-02-24 16:21:27
 * @Company: orientsec.com.cn
 * @Description: 用户详情
 */
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfoState } from '../unAuthenticated/unAuthenticated.slice'
import React, { useCallback, useEffect, useState } from 'react'
import { requestError } from '../../service/base'
import { RequestSuccess, UserInfo } from '../../types'
import { Avatar, Button, Descriptions, Drawer } from 'antd'
import { UserEdit } from '../../components/userEdit'
import { formatDateTime, reLogin } from '../../utils'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import { userInfoService } from '../../service/user'
import { AxiosResponse } from 'axios'
import { UserOutlined } from '@ant-design/icons'

export const UserDetail = () => {
	const dispatch = useDispatch()
	const params = useParams<'userId'>()
	const storeUserInfo = useSelector(selectUserInfoState)
	const [userInfo, setUserInfo] = useState<typeof storeUserInfo>(null)
	const [open, setOpen] = useState(false)
	const isMe = params.userId === storeUserInfo?._id

	/**
	 * 显示编辑框
	 */
	const showDrawer = () => {
		setOpen(true)
	}

	/**
	 * 隐藏编辑框
	 */
	const onClose = () => {
		setOpen(false)
	}

	const fetchUserInfo = useCallback(async () => {
		try {
			const { result } = await userInfoService<RequestSuccess<UserInfo>>(`user/detail/${params.userId}`)
			setUserInfo(result!)
		} catch (e) {
			const error = e as AxiosResponse
			if (![401, 402].includes(error.status)) {
				requestError(error.data)
			}
			reLogin(error, dispatch)
		}
	}, [params.userId])

	useEffect(() => {
		console.log('user detail page')
		!isMe ? fetchUserInfo() : setUserInfo(storeUserInfo)
	}, [fetchUserInfo, params.userId, storeUserInfo])

	return (
		<div className='user-info'>
			<HelmetProvider>
				<Helmet>
					<title>个人资料</title>
					<meta name='description' content='个人资料' />
				</Helmet>
			</HelmetProvider>
			<div className='left-column'>
				{userInfo?.avatar?.url ? (
					<Avatar size={130} src={userInfo?.avatar?.url} />
				) : (
					<Avatar size={130} icon={<UserOutlined />} />
				)}
			</div>
			<div className='right-column'>
				<Descriptions title={userInfo?.username} layout='vertical'>
					<Descriptions.Item label='年龄'>{userInfo?.age ?? '--'}</Descriptions.Item>
					{isMe ? (
						<>
							<Descriptions.Item label='邮箱'>{userInfo?.email}</Descriptions.Item>
							<Descriptions.Item label='手机号'>{userInfo?.mobile}</Descriptions.Item>
							<Descriptions.Item label='创建用户时间'>{formatDateTime(userInfo?.createAt)}</Descriptions.Item>
							<Descriptions.Item label='更新用户时间'>{formatDateTime(userInfo?.updateAt)}</Descriptions.Item>
						</>
					) : (
						<Descriptions.Item> </Descriptions.Item>
					)}
					<Descriptions.Item label='粉丝数'>{userInfo?.fans}</Descriptions.Item>
					<Descriptions.Item label='自我描述' span={3}>
						<div dangerouslySetInnerHTML={{
							__html: userInfo?.channelDes || '--'
						}}></div>
					</Descriptions.Item>
				</Descriptions>
				{isMe && (
					<div style={{ textAlign: 'right' }}>
						<Button type='primary' size='large' onClick={showDrawer}>
							编辑
						</Button>
					</div>
				)}
			</div>
			<Drawer title='编辑个人资料' placement='right' width='50%' onClose={onClose} open={open}>
				<UserEdit userInfo={userInfo} drawerOpen={open} onSuccess={onClose} />
			</Drawer>
		</div>
	)
}
