/*
 * @Author: lizhigang
 * @Date: 2023-02-28 14:26:50
 * @Company: orientsec.com.cn
 * @Description: 文章编辑组件
 */

import { Button, Drawer, Form, Input, message } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { request, requestError } from '../service/base'
import { RequestSuccess, StoreArticle, SubmitArticle } from '../types'
import { CloseOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfoState } from '../page/unAuthenticated/unAuthenticated.slice'
import { authenticatedAction, selectDraftState } from '../page/authenticated/authenticated.slice'

const EditArticle = (props: any, ref: any) => {
	const [form] = Form.useForm()
	const dispatch = useDispatch()
	const userInfo = useSelector(selectUserInfoState)
	const draft = useSelector(selectDraftState)
	const [openDrawer, setOpenDrawer] = useState(false)
	const [titleFocus, setTitleFocus] = useState(false)
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const queryClient = useQueryClient()

	/**
	 * 设置本地草稿
	 * @param text 草稿内容
	 * @param position 标题或内容
	 */
	const setStorage = (text: string, position: 'title' | 'content') => {
		let storage: string | null = localStorage.getItem('ARTICLE_INPUT') || '{}'
		const draftData: StoreArticle = JSON.parse(storage!)
		draftData[userInfo?._id!] = {
			title: position === 'title' ? text : draft.title,
			content: position === 'content' ? text : draft.content
		}
		localStorage.setItem('ARTICLE_INPUT', JSON.stringify(draftData))
	}

	/**
	 * 清除草稿
	 */
	const removeStorage = () => {
		let store: StoreArticle | string | null = localStorage.getItem('ARTICLE_INPUT')
		if (store) {
			store = JSON.parse(store)
			delete (store as StoreArticle)[userInfo?._id!]
			dispatch(authenticatedAction.setDraft(['all', '']))
			localStorage.setItem('ARTICLE_INPUT', JSON.stringify(store as StoreArticle))
		}
	}

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
			const { msg } = await request<SubmitArticle, RequestSuccess<{}, string>>({
				url: 'article/publish',
				method: 'PUT',
				data: values
			})
			message.success(msg)
			setOpenDrawer(false)
			removeStorage()
			form.resetFields()
			if (location.pathname === '/articles') {
				queryClient.invalidateQueries('articles')
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

	useEffect(() => {
		let store: StoreArticle | string | null = localStorage.getItem('ARTICLE_INPUT')
		if (store) {
			store = JSON.parse(store as string)
			const keys = Object.keys(store as StoreArticle).includes(userInfo?._id!)
			if (store && keys) {
				const { title, content } = (store as StoreArticle)[userInfo?._id!]
				dispatch(authenticatedAction.setDraft(['title', title]))
				dispatch(authenticatedAction.setDraft(['content', content]))
				form.setFieldsValue({
					title,
					content
				})
			}
		}
	}, [form, userInfo?._id])

	return (
		<Drawer
			forceRender
			title='发表文章'
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
			>
				<Form.Item
					name='title'
					style={{ marginBottom: 0 }}
				>
					<Input maxLength={50} bordered={false} placeholder='这里是标题' onFocus={() => setTitleFocus(true)}
								 onBlur={() => setTitleFocus(false)}
								 onChange={(e: any) => {
									 const { value } = e.target
									 dispatch(authenticatedAction.setDraft(['title', value]))
									 setStorage(value, 'title')
								 }}
								 allowClear />
				</Form.Item>
				<div className={`divider ${titleFocus ? 'focus' : ''}`} style={{ marginLeft: '11px' }} />
				<Form.Item
					name='content'
					style={{ marginTop: '10px' }}
					rules={[{ max: 20000, message: '最多输入20000个字符' }]}
				>
					<Input.TextArea
						onChange={(e: any) => {
							const { value } = e.target
							dispatch(authenticatedAction.setDraft(['content', value]))
							setStorage(value, 'content')
						}}
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

export default forwardRef(EditArticle)
