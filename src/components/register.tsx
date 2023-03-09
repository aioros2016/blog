/*
 * @Author: lizhigang
 * @Date: 2023-02-16 18:54:38
 * @Company: orientsec.com.cn
 * @Description: 注册组件
 */
import { Button, Form, Input, InputNumber } from 'antd'
import { formBaseProps } from '../const'
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import {
	selectRegisterDataState
} from '../page/unAuthenticated/unAuthenticated.slice'
import FileUpload, { onRequest } from './upload'
import { request, requestError } from '../service/base'
import { RequestSuccess, UserInfo } from '../types'
import { useUrlQueryParams } from '../utils'

export const Register = ({ hide = false, children }: { hide?: boolean; children: ReactNode }) => {
	const submitData = useSelector(selectRegisterDataState)
	const [form] = Form.useForm()
	const [params, setParam] = useUrlQueryParams(['type'])

	const onFinish = async (values: any) => {
		delete values.confirm
		try {
			let avatar
			if (values.avatar?.length) {
				avatar = await onRequest(values.avatar[0].originFileObj)
			}
			await request<typeof submitData, RequestSuccess<UserInfo>>({
				url: 'user/register',
				method: 'POST',
				data: {
					...values,
					username: values.username.trim(),
					password: values.password.trim(),
					email: values.email.trim(),
					mobile: values.mobile.trim(),
					channelDes: values.channelDes,
					avatar
				}
			})
			form.resetFields()
			setParam({ type: 'login' })
		} catch (e) {
			requestError(e)
		}
	}

	return (
		<div className={`authenticated-wrapper ${hide ? 'hide' : ''}`}>
			<h1 className='greeting-title'>你好</h1>
			<Form
				form={form}
				name='register'
				{...formBaseProps}
				onFinish={onFinish}
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
					name='confirm'
					label='确认密码'
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: '请确认密码'
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve()
								}
								return Promise.reject(new Error('密码输入不一致'))
							}
						})
					]}
				>
					<Input.Password />
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
					<Input placeholder='请输入您的手机号' allowClear />
				</Form.Item>

				<Form.Item name='avatar' label='头像' valuePropName='fileList' getValueFromEvent={e => console.log(e)}>
					<FileUpload form={form} />
				</Form.Item>

				<Form.Item name='channelDes' label='自我描述'>
					<Input.TextArea maxLength={500} />
				</Form.Item>

				<Form.Item style={{ marginTop: '40px' }}
									 wrapperCol={{ offset: formBaseProps.labelCol.span, span: formBaseProps.wrapperCol.span }}>
					<Button style={{ marginRight: '20px' }} type='primary' htmlType='submit'>
						注册
					</Button>
					{/*<Button htmlType='button' onClick={skipLogin}>*/}
					{/*	跳过*/}
					{/*</Button>*/}
				</Form.Item>
				{children}
			</Form>

		</div>
	)
}
