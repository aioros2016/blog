/*
 * @Author: lizhigang
 * @Date: 2023-03-08 17:01:54
 * @Company: orientsec.com.cn
 * @Description: 权限管理
 */
import { Button, Form, Input, InputNumber, message } from 'antd'
import { request, requestError } from '../../service/base'
import { RequestSuccess, UserInfo } from '../../types'
import { useState } from 'react'

export const Authority = () => {
	const [loading, setLoading] = useState(false)

	/**
	 * 新增权限
	 * @param values
	 */
	const onFinish = async (values: any) => {
		try {
			setLoading(true)
			await request<{
				auth: string;
				name: string;
			}, RequestSuccess<UserInfo>>({
				url: 'auth/add',
				method: 'PUT',
				data: {
					auth: values.authWeight,
					name: values.authName.trim()
				}
			})
			message.success('添加权限成功')
		} catch (error) {
			requestError(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<section style={{ marginTop: '100px' }}>
			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				onFinish={onFinish}
				autoComplete='off'
			>
				<Form.Item
					label='权限名称'
					name='authName'
					rules={[{ required: true, message: '请输入权限名称' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='权限权重'
					name='authWeight'
					initialValue={0}
				>
					<InputNumber min={0} max={100} />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='primary' htmlType='submit' loading={loading}>
						提交
					</Button>
				</Form.Item>
			</Form>
		</section>
	)
}
