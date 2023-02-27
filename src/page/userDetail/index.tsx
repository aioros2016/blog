/*
 * @Author: lizhigang
 * @Date: 2023-02-24 16:21:27
 * @Company: orientsec.com.cn
 * @Description: 用户详情
 */
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { selectUserInfoState } from '../unAuthenticated/unAuthenticated.slice'
import React, { useEffect, useState } from 'react'
import { request, requestError } from '../../service/base'
import { RequestSuccess, UserInfo } from '../../types'
import { Button, Descriptions, Drawer, Form, Input, InputNumber } from 'antd'
import { UserEdit } from '../../components/userEdit'
import { formatDateTime } from '../../utils'

export const UserDetail = () => {
	const params = useParams<'userId'>()
	const storeUserInfo = useSelector(selectUserInfoState)
	const [form] = Form.useForm()
	const [userInfo, setUserInfo] = useState<typeof storeUserInfo>(null)
	const [open, setOpen] = useState(false)

	const showDrawer = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	const fetchUserInfo = async () => {
		try {
			const { result } = await request<{}, RequestSuccess<UserInfo>>({ url: 'user/info' })
			console.log(result)
			setUserInfo(result!)
		} catch (error) {
			requestError(error)
		}
	}

	useEffect(() => {
		console.log('user detail page')
		setUserInfo(storeUserInfo)
		// !storeUserInfo ? fetchUserInfo() : setUserInfo(storeUserInfo)
	}, [params.userId, storeUserInfo])

	return (
		<div className='user-info'>
			{userInfo?.avatar?.url && (
				<div className='left-column'>
					<div className='user-avatar' style={{ backgroundImage: `url(${userInfo.avatar.url})` }}>我的头像</div>
				</div>
			)}
			<div className='right-column'>
				<Descriptions title={userInfo?.username} layout='vertical'>
					<Descriptions.Item label='年龄'>{userInfo?.age ?? '--'}</Descriptions.Item>
					<Descriptions.Item label='邮箱'>{userInfo?.email}</Descriptions.Item>
					<Descriptions.Item label='手机号'>{userInfo?.mobile}</Descriptions.Item>
					<Descriptions.Item label='粉丝数'>{userInfo?.fans}</Descriptions.Item>
					<Descriptions.Item label='创建用户时间'>{formatDateTime(userInfo?.createAt)}</Descriptions.Item>
					<Descriptions.Item label='更新用户时间'>{formatDateTime(userInfo?.updateAt)}</Descriptions.Item>
					<Descriptions.Item label='自我描述' span={3}>
						<div style={{ whiteSpace: 'pre-wrap' }}>{userInfo?.channelDes || '--'}</div>
					</Descriptions.Item>
				</Descriptions>
				<div style={{ textAlign: 'right' }}>
					<Button type='primary' size='large' onClick={showDrawer}>
						编辑
					</Button>
				</div>
			</div>
			<Drawer title='编辑个人资料' placement='right' width={500} onClose={onClose} open={open}>
				<UserEdit userInfo={userInfo} drawerOpen={open} onSuccess={onClose} />
			</Drawer>
		</div>
	)
}
