/*
 * @Author: lizhigang
 * @Date: 2023-02-28 14:26:50
 * @Company: orientsec.com.cn
 * @Description: 文章编辑组件
 */

import { Button, Drawer, Form, Input, message } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { request, requestError } from '../service/base'
import { RequestSuccess, SubmitArticle } from '../types'
import { CloseOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'

const EditArticle = (props: any, ref: any) => {
	const [form] = Form.useForm()
	const [openDrawer, setOpenDrawer] = useState(false)
	const [titleFocus, setTitleFocus] = useState(false)
	const [loading, setLoading] = useState(false)
	const location = useLocation()

	const onFinish = async (values: {
		title?: string;
		content?: string;
	}) => {
		console.log(values)
		const { title, content } = values
		if (!title && !content) {
			message.error('只有写点什么才能提交哦')
			return
		}
		setLoading(true)
		try {
			const { msg } = await request<SubmitArticle, RequestSuccess<{}, string>>({
				url: 'article/publish',
				method: 'PUT',
				data: values
			})
			message.success(msg)
			setOpenDrawer(false)
			form.resetFields()
			console.log(location)
			if (location.pathname === '/') {

			}
		} catch (error) {
			requestError(error)
		} finally {
			setLoading(false)
		}
	}

	useImperativeHandle(ref, () => {
		return {
			open: () => setOpenDrawer(true),
			hide: () => setOpenDrawer(false)
		}
	})

	return (
		<Drawer
			title='写点什么...'
			placement='bottom'
			closable={false}
			extra={<CloseOutlined onClick={() => setOpenDrawer(false)} />}
			onClose={() => setOpenDrawer(false)}
			open={openDrawer}
		>
			<Form
				form={form}
				name='article'
				onFinish={onFinish}
				autoComplete='off'
				size='large'
				className='form-style'
			>
				<Form.Item
					name='title'
					style={{ marginBottom: 0 }}
				>
					<Input maxLength={50} bordered={false} placeholder='这里是标题' onFocus={() => setTitleFocus(true)}
								 onBlur={() => setTitleFocus(false)}
								 allowClear />
				</Form.Item>
				<div className={`divider ${titleFocus ? 'focus' : ''}`} style={{ marginLeft: '11px' }} />
				<Form.Item
					name='content'
					style={{ marginTop: '10px' }}
					rules={[{ max: 20000, message: '最多输入20000个字符' }]}
				>
					<Input.TextArea rows={5} showCount maxLength={20000} bordered={false} placeholder='写点什么吧...'
													allowClear />
				</Form.Item>
				<Form.Item style={{ textAlign: 'right' }}>
					<Button type='primary' htmlType='submit' loading={loading}>提交</Button>
				</Form.Item>
			</Form>
		</Drawer>
	)
}

export default forwardRef(EditArticle)
