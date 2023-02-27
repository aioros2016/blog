/*
 * @Author: lizhigang
 * @Date: 2023-02-16 17:33:44
 * @Company: orientsec.com.cn
 * @Description: 未登录组件
 */
import React from 'react'
import { Button, Col, Row } from 'antd'
import { Login } from '../../components/login'
import { Register } from '../../components/register'
import { formBaseProps } from '../../const'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoginState, unAuthenticatedAction } from './unAuthenticated.slice'

const Tip = () => {
	const dispatch = useDispatch()
	const isLogin = useSelector(selectIsLoginState)
	return (
		<Row className='toggle-text'>
			<Col span={formBaseProps.labelCol.span} />
			<Col span={formBaseProps.wrapperCol.span}>
				<Button type='link' className='toggle-text' onClick={() => dispatch(unAuthenticatedAction.setLogin(!isLogin))}>{
					isLogin ? '注册新账号' : '已有账号？直接登录！'
				}</Button>
			</Col>
		</Row>
	)
}

export const UnAuthenticated = () => {
	const isLogin = useSelector(selectIsLoginState)
	return (
		<>
			<Login hide={!isLogin} children={<Tip />} />
			<Register hide={isLogin} children={<Tip />} />
		</>
	)
}
