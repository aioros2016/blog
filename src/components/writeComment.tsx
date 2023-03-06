/*
 * @Author: lizhigang
 * @Date: 2023-02-28 14:26:50
 * @Company: orientsec.com.cn
 * @Description: 评论回复组件
 */
import { Button, Drawer, Form, Input, message } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { request, requestError } from '../service/base'
import { RequestSuccess, SubmitArticle } from '../types'
import { CloseOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { articleDetailAction, selectCommentOpenState } from '../page/articleDetail/articleDetail.slice'

const WriteComment = (props: any, ref: any) => {
	const dispatch = useDispatch()
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const queryClient = useQueryClient()
	const openDrawer = useSelector(selectCommentOpenState)
	const pathList = location.pathname.split('/')

	const onFinish = async (values: {
		title?: string;
		content?: string;
	}) => {
		const { title, content } = values
		if (!title && !content) {
			message.error('只有写点什么才能提交哦')
			return
		}
		setLoading(true)
		try {
			const { msg } = await request<Omit<SubmitArticle, 'title'>, RequestSuccess<{}, string>>({
				url: `article/comment/${pathList[pathList.length - 1]}`,
				method: 'POST',
				data: values
			})
			message.success(msg)
			dispatch(articleDetailAction.setCommentOpen(false))
			form.resetFields()
			queryClient.invalidateQueries('comments')
		} catch (error) {
			requestError(error)
		} finally {
			setLoading(false)
		}
	}

	useImperativeHandle(ref, () => {
		return {
			open: () => dispatch(articleDetailAction.setCommentOpen(true)),
			hide: () => dispatch(articleDetailAction.setCommentOpen(false))
		}
	})

	useEffect(() => {
		if (!location.pathname.match(/^\/articles\/\w+$/)) {
			dispatch(articleDetailAction.setCommentOpen(false))
		}
	}, [location.pathname])

	return (
		<Drawer
			forceRender
			title='评论回复'
			placement='bottom'
			closable={false}
			extra={<CloseOutlined onClick={() => dispatch(articleDetailAction.setCommentOpen(false))} />}
			onClose={() => dispatch(articleDetailAction.setCommentOpen(false))}
			open={openDrawer}
		>
			<Form
				form={form}
				name='comment'
				onFinish={onFinish}
				autoComplete='off'
				size='large'
			>
				<Form.Item
					name='content'
					style={{ marginTop: '10px' }}
					rules={[{ max: 20000, message: '最多输入20000个字符' }]}
				>
					<Input.TextArea
						rows={5}
						showCount
						maxLength={20000}
						bordered={false}
						placeholder='写点什么吧...'
						allowClear />
				</Form.Item>
				<Form.Item style={{ textAlign: 'right' }}>
					<Button type='primary' htmlType='submit' loading={loading}>提交</Button>
				</Form.Item>
			</Form>
		</Drawer>
	)
}

export default forwardRef(WriteComment)
