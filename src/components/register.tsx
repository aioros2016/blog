/*
 * @Author: lizhigang
 * @Date: 2023-02-16 18:54:38
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { Button, Form, Input, InputNumber } from 'antd'
import { formBaseProps } from '../const'
import React, { ReactNode, useState } from 'react'
import { useStoreFormVals } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { selectRegisterDataState, unAuthenticatedAction } from '../page/unAuthenticated/unAuthenticated.slice'
import FileUpload from './upload'
import { request, requestError } from '../service/base'
import { RequestSuccess, UserInfo } from '../types'
import { useNavigate } from 'react-router-dom'

export const Register = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const submitData = useSelector(selectRegisterDataState)
	const [form] = Form.useForm()
	const [formVals, setFormVals] = useState(submitData)

	useStoreFormVals<typeof submitData>(
		form,
		formVals,
		'register',
		submitData
	)

	const onRequest = async (imgList: any) => {
		console.log(imgList)
		const formData = new FormData()
		formData.append('avatar', imgList)
		console.log(formData)
		try {
			const { result } = await request<FormData, RequestSuccess<string>>({
				url: 'user/avatar',
				method: 'POST',
				data: formData
			})
			return Promise.resolve(result)
		} catch (error) {
			console.error(error)
		}
	}

	const onFinish = async (values: any) => {
		console.log('Success:', values)
		try {
			let avatar = undefined
			if (values.avatar?.length) {
				avatar = await onRequest(values.avatar[0].originFileObj)
			}

			const { result } = await request<typeof submitData, RequestSuccess<UserInfo>>({
				url: 'user/register',
				method: 'POST',
				data: {
					...values,
					avatar
				}
			})
			console.log(result)
			form.resetFields()
			dispatch(unAuthenticatedAction.storeSubmitData(['register', null]))
			navigate('/login')
		} catch (e) {
			requestError(e)
		}
	}

	return (
		<div className='authenticated-wrapper'>
			<h1 className='greeting-title'>你好</h1>
			<Form
				form={form}
				name='login'
				{...formBaseProps}
				onFinish={onFinish}
				onValuesChange={changedValues => {
					setFormVals(Object.assign({ ...submitData }, changedValues))
				}
				}
				autoComplete='off'
				size='large'
				className='form-style'
			>
				<Form.Item
					label='用户名'
					name='username'
					rules={[
						{ required: true, message: '请输入用户名' },
						{ min: 2, message: '至少输入2个字符' },
						{ max: 16, message: '最多输入16个字符' }
					]}
				>
					<Input allowClear />
				</Form.Item>

				<Form.Item
					label='密码'
					name='password'
					rules={[
						{ required: true, message: '请输入密码' },
						{ max: 16, message: '最多输入16个字符' },
						{ min: 8, message: '最少输入8个字符' },
						{
							pattern: /^.*(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$/,
							message: '必须包含大小写字母和数字的组合'
						}
					]}
				>
					<Input.Password allowClear />
				</Form.Item>

				<Form.Item
					label='年龄'
					name='age'
					initialValue={18}
					rules={[
						{ required: true, message: '请输入年龄' }
					]}
				>
					<InputNumber precision={0} min={1} max={150} />
				</Form.Item>

				<Form.Item
					label='邮箱'
					name='email'
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
					rules={[
						{ required: true, message: '请输入手机号' },
						{
							pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
							message: '手机号格式不正确'
						}
					]}
				>
					<Input placeholder='请输入您的邮箱' allowClear />
				</Form.Item>

				<Form.Item name='avatar' label='头像' valuePropName='fileList' getValueFromEvent={e => console.log(e)}>
					<FileUpload form={form} />
				</Form.Item>

				<Form.Item name='channelDes' label='自我描述'>
					<Input.TextArea />
				</Form.Item>

				<Form.Item style={{ marginTop: '40px' }}
									 wrapperCol={{ offset: formBaseProps.labelCol.span, span: formBaseProps.wrapperCol.span }}>
					<Button style={{ marginRight: '20px' }} type='primary' htmlType='submit'>
						注册
					</Button>
					<Button htmlType='button'>
						跳过
					</Button>
				</Form.Item>
			</Form>
			{children}
		</div>
	)
}
