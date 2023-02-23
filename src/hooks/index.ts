/*
 * @Author: lizhigang
 * @Date: 2023-02-22 13:18:46
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { useState, useEffect } from 'react'
import { unAuthenticatedAction } from '../page/unAuthenticated/unAuthenticated.slice'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { FormInstance } from 'antd'

/**
 * 防抖
 * @param value 防抖的值
 * @param delay 延时
 */
export const useDebounce = <T>(value: T, delay?: number): T => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		// 每次在value变化后，设置一个定时器
		const timeout = setTimeout(() => setDebouncedValue(value), delay)
		// 每次在上一个useEffect处理完后，再运行
		return () => clearTimeout(timeout)
	}, [value, delay])

	return debouncedValue
}

/**
 * 路由切换时存储页面数据
 * @param form 表单实例
 * @param formVals 表单数据
 * @param pathname 路由路径
 * @param storeState redux state
 * @param delay 延时
 */
export const useStoreFormVals = <T>(form: FormInstance, formVals: T, pathname: string, storeState: T, delay = 300) => {
	const dispatch = useDispatch()
	const location = useLocation()
	const debounceVal = useDebounce(formVals, delay)

	useEffect(() => {
		dispatch(unAuthenticatedAction.storeSubmitData([pathname, debounceVal]))
	}, [dispatch, debounceVal, pathname])

	useEffect(() => {
		if (location.pathname === `/${pathname}`) {
			form.setFieldsValue(storeState)
		}
	}, [form, pathname, storeState, location.pathname])
}
