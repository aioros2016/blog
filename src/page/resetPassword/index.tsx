/*
 * @Author: lizhigang
 * @Date: 2023-03-02 16:22:00
 * @Company: orientsec.com.cn
 * @Description: 密码重置
 */
import { formBaseProps } from '../../const'
import { Button, Form, Input, message, Popconfirm } from 'antd'
import './index.scss'
import { request, requestError } from '../../service/base'
import { RequestSuccess } from '../../types'
import { useState } from 'react'

interface submitData {
	oldPassword: string
	newPassword: string
}

export const ResetPassword = () => {
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)

	/**
	 * 表单提交
	 */
	const submitHandle = async () => {
		try {
			const values = await form.validateFields()
			onFinish(values)
		} catch (errorInfo) {
			console.log('提交效验失败', errorInfo)
		}
	}

	/**
	 * 重置密码
	 * @param values 提交的数据
	 */
	const onFinish = async (values: {
		oldPassword: string;
		password: string;
		confirm: string;
	}) => {
		try {
			setLoading(true)
			const { msg } = await request<submitData, RequestSuccess<'更新成功'>>({
				url: 'user/resetpassword',
				method: 'POST',
				data: {
					oldPassword: values!.oldPassword.trim(),
					newPassword: values!.password.trim()
				}
			})
			message.success(msg)
			form.resetFields()
		} catch (error) {
			requestError(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='reset-password vertical-centering'>
			<Form
				form={form}
				name='login'
				{...formBaseProps}
				autoComplete='off'
				size='large'
				className='form-style'
			>
				<Form.Item
					label='旧密码'
					name='oldPassword'
					rules={[
						{ required: true, message: '请输入旧密码' },
						{ max: 16, message: '最多输入16个字符' },
						{ min: 8, message: '最少输入8个字符' }
					]}
				>
					<Input.Password placeholder='请输入您的旧密码' allowClear />
				</Form.Item>

				<Form.Item
					label='新密码'
					name='password'
					dependencies={['oldPassword']}
					rules={[
						{ required: true, message: '请输入新密码' },
						{ max: 16, message: '最多输入16个字符' },
						{ min: 8, message: '最少输入8个字符' },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('oldPassword') !== value) {
									return Promise.resolve()
								}
								return Promise.reject(new Error('旧密码与新密码必须不同'))
							}
						})
					]}
				>
					<Input.Password placeholder='请输入您的新密码' allowClear />
				</Form.Item>

				<Form.Item
					name='confirm'
					label='确认新密码'
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: '请确认新密码'
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

				<Form.Item style={{ marginTop: '40px' }}
									 wrapperCol={{ offset: formBaseProps.labelCol.span, span: formBaseProps.wrapperCol.span }}>
					<Popconfirm
						placement='rightTop'
						title='确认要修改密码吗？'
						onConfirm={submitHandle}
						okButtonProps={{
							loading,
							htmlType: 'submit'
						}}
						okText='确认'
						cancelText='取消'
					>
						<Button style={{ marginRight: '20px' }} loading={loading} type='primary'>
							提交
						</Button>
					</Popconfirm>
				</Form.Item>
			</Form>
		</div>
	)
}
