/*
 * @Author: lizhigang
 * @Date: 2023-02-16 17:22:55
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { ReactNode, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { formBaseProps } from '../const'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectLoginDataState
} from '../page/unAuthenticated/unAuthenticated.slice'
import { request, requestError } from '../service/base'
import { RequestSuccess, UserInfo } from '../types'
import { resetUserInfo } from '../utils'

export const Login = ({ hide = false, children }: { hide?: boolean; children?: ReactNode }) => {
	// const navigate = useNavigate()
	const dispatch = useDispatch()
	const submitData = useSelector(selectLoginDataState)
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)

	/**
	 * 提交登录
	 * @param values 提交数据
	 */
	const onFinish = async (values: typeof submitData) => {
		try {
			setLoading(true)
			const { result } = await request<typeof submitData, RequestSuccess<UserInfo>>({
				url: 'user/login',
				method: 'POST',
				data: {
					email: values!.email.trim(),
					password: values!.password.trim()
				}
			})
			console.log(result)
			resetUserInfo(dispatch, result!)
		} catch (e) {
			console.log(e)
			requestError(e)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={`authenticated-wrapper vertical-centering ${hide ? 'hide' : ''}`}>
			<h1 className='greeting-title'>欢迎回来</h1>
			<Form
				form={form}
				name='login'
				{...formBaseProps}
				onFinish={onFinish}
				autoComplete='off'
				size='large'
				className='form-style'
			>
				<Form.Item
					label='邮箱'
					name='email'
					rules={[
						{ required: true, message: '请输入邮箱' },
						{
							pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: '邮箱格式不正确'
						}
					]}
				>
					<Input placeholder='请输入您的邮箱' allowClear />
				</Form.Item>

				<Form.Item
					label='密码'
					name='password'
					rules={[
						{ required: true, message: '请输入密码' },
						{ max: 16, message: '最多输入16个字符' },
						{ min: 8, message: '最少输入8个字符' }
					]}
				>
					<Input.Password placeholder='请输入您的密码' allowClear />
				</Form.Item>

				<Form.Item style={{ marginTop: '40px' }}
									 wrapperCol={{ offset: formBaseProps.labelCol.span, span: formBaseProps.wrapperCol.span }}>
					<Button loading={loading} style={{ marginRight: '20px' }} type='primary' htmlType='submit'>
						登录
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
