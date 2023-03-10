/*
 * @Author: lizhigang
 * @Date: 2023-02-16 17:33:44
 * @Company: orientsec.com.cn
 * @Description: 未登录组件
 */
import React, { useEffect } from 'react'
import { Button, Form, Col, Row } from 'antd'
import { Login } from '../../components/login'
import { Register } from '../../components/register'
import { formBaseProps } from '../../const'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoginState, unAuthenticatedAction } from './unAuthenticated.slice'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useUrlQueryParams } from '../../utils'

const Tip = () => {
	const [params, setParam] = useUrlQueryParams(['type'])
	const isLogin = !params.type || params.type === 'login'

	return (
		<Form.Item
			wrapperCol={{ offset: formBaseProps.labelCol.span, span: formBaseProps.wrapperCol.span }}>
			<Button type='link' className='toggle-text' onClick={() => setParam({
				type: isLogin ? 'register' : 'login'
			})}>{
				isLogin ? '注册新账号' : '已有账号？直接登录！'
			}</Button>
		</Form.Item>
	)
}

export const UnAuthenticated = () => {
	const [params, setParam] = useUrlQueryParams(['type'])
	const isLogin = !params.type || params.type === 'login'

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>发贴吧</title>
					<meta name='description' content='发贴吧' />
				</Helmet>
			</HelmetProvider>
			<Login hide={!isLogin} children={
				<Tip />}
			/>
			<Register hide={isLogin} children={
				<Tip />}
			/>
		</>
	)
}
