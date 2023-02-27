/*
 * @Author: lizhigang
 * @Date: 2023-02-26 17:01:17
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { formBaseProps } from '../const'
import { Button, Form, Input, InputNumber, InputRef, Popconfirm } from 'antd'
import FileUpload, { onRequest } from './upload'
import React, { useEffect, useRef, useState } from 'react'
import { RequestSuccess, UserInfo } from '../types'
import { request, requestError } from '../service/base'
import { selectRegisterDataState, unAuthenticatedAction } from '../page/unAuthenticated/unAuthenticated.slice'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router'

export const UserEdit = ({
													 userInfo,
													 drawerOpen,
													 onSuccess
												 }: { userInfo: UserInfo | null, drawerOpen: boolean, onSuccess?: () => void }) => {
	const dispatch = useDispatch()
	const params = useParams()
	const [form] = Form.useForm()
	const submitData = useSelector(selectRegisterDataState)
	const [popconfirmState, setPopconfirmState] = useState(false)
	const [loading, setLoading] = useState(false)
	const [password, setPassword] = useState('')
	const inputRef = useRef<InputRef>(null)

	/**
	 * 打开确认框
	 */
	const openPopconfirm = () => {
		setPopconfirmState(true)
		setTimeout(() => {
			inputRef.current!.focus({
				cursor: 'start'
			})
		}, 300)
	}

	/**
	 * 提交修改信息
	 * @param values 修改的键值对
	 */
	const onFinish = async (values: any) => {
		// values.avatar = userInfo?.avatar
		console.log(values)
		setLoading(true)
		try {
			let avatar
			if (values.avatar?.length) {
				avatar = await onRequest(values.avatar[0].originFileObj)
			}
			const { result } = await request<Omit<typeof submitData, 'password'>, RequestSuccess<UserInfo>>({
				url: `user/update/${params.userId}`,
				method: 'PUT',
				data: {
					...values,
					username: values.username.trim(),
					email: values.email.trim(),
					mobile: values.mobile.trim(),
					channelDes: values.channelDes,
					avatar
				}
			})
			dispatch(unAuthenticatedAction.setUserInfo(result))
		} catch (error) {
			requestError(error)
			return Promise.reject(error)
		} finally {
			setLoading(false)
		}
	}

	/**
	 * 提交修改处理
	 */
	const submitHandle = async () => {
		try {
			await onFinish({
				...form.getFieldsValue(),
				password
			})
			setPassword('')
			setPopconfirmState(false)
			onSuccess?.()
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (!drawerOpen) {
			setPopconfirmState(false)
		}
	}, [drawerOpen])

	const ComfirmPop = () => (
		<>
			<div>输入密码以继续</div>
			<Input.Password ref={inputRef} value={password} onChange={e => setPassword(e.target.value)} size='small'
											placeholder='8-16位，大小写字母与数字的组合' allowClear />
		</>
	)

	return (
		<Form
			form={form}
			name='login'
			{...formBaseProps}
			onFinish={onFinish}
			size='large'
			className='form-style'
		>
			<Form.Item
				label='用户名'
				name='username'
				initialValue={userInfo?.username}
				rules={[
					{ required: true, message: '请输入用户名' },
					{ min: 2, message: '至少输入2个字符' },
					{ max: 16, message: '最多输入16个字符' }
				]}
			>
				<Input allowClear />
			</Form.Item>

			<Form.Item
				label='年龄'
				name='age'
				initialValue={userInfo?.age}
			>
				<InputNumber precision={0} min={1} max={150} />
			</Form.Item>

			<Form.Item
				label='邮箱'
				name='email'
				initialValue={userInfo?.email}
				rules={[
					{ required: true, message: '请输入邮箱' },
					{ type: 'email', message: '邮箱格式不正确' }
				]}
			>
				<Input placeholder='请输入您的邮箱' allowClear />
			</Form.Item>

			<Form.Item
				label='手机号'
				name='mobile'
				initialValue={userInfo?.mobile}
				rules={[
					{ required: true, message: '请输入手机号' },
					{
						pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
						message: '手机号格式不正确'
					}
				]}
			>
				<Input placeholder='请输入您的手机号' allowClear />
			</Form.Item>

			<Form.Item name='avatar' label='头像' valuePropName='fileList' getValueFromEvent={e => console.log(e)}>
				<FileUpload form={form} file={userInfo?.avatar} />
			</Form.Item>

			<Form.Item name='channelDes' label='自我描述' initialValue={userInfo?.channelDes}>
				<Input.TextArea maxLength={500} />
			</Form.Item>
			{/*<Form.Item style={{ marginTop: '40px' }}*/}
			{/*					 wrapperCol={{ offset: formBaseProps.labelCol.span, span: formBaseProps.wrapperCol.span }}>*/}
			<Popconfirm
				placement='topLeft'
				title='确认要修改个人资料吗？'
				description={ComfirmPop}
				okText='确认'
				cancelText='取消'
				okButtonProps={{ disabled: !password }}
				open={popconfirmState}
				onConfirm={submitHandle}
				onCancel={() => {
					setPopconfirmState(false)
					form.setFieldValue('password', '')
				}}
			>
				<Button style={{ marginRight: '20px' }} type='primary' loading={loading}
								onClick={openPopconfirm}>
					提交
				</Button>
			</Popconfirm>
			{/*</Form.Item>*/}
		</Form>
	)
}
