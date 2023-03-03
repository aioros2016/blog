/*
 * @Author: lizhigang
 * @Date: 2023-02-22 13:18:46
 * @Company: orientsec.com.cn
 * @Description: 自定义Hook
 */
import { useState, useEffect } from 'react'
import { unAuthenticatedAction } from '../page/unAuthenticated/unAuthenticated.slice'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { FormInstance } from 'antd'
import { useQuery } from 'react-query'
import { request, requestError } from '../service/base'
import { Article, ArticleComment, PagingParams, RequestSuccess } from '../types'
import { PAGE_SIZE } from '../const'

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

/**
 * 文章列表查询
 * @param pageNum 第几页
 * @param pageSize 一页几条数据
 */
export const useArticle = (pageNum: number = 1, pageSize: number = PAGE_SIZE) => {
	const fetchArticles = async () => {
		try {
			const { result } = await request<PagingParams, RequestSuccess<{
				total: number,
				dataList: Article[]
			}>>({
				url: 'article/list',
				params: {
					pageNum,
					pageSize
				}
			})
			return result
		} catch (error) {
			requestError(error)
		}
	}

	return useQuery(['articles', pageNum], () => fetchArticles())
}

export const useComments = (id: string, pageNum: number = 1, pageSize: number = PAGE_SIZE) => {
	const fetchComments = async () => {
		try {
			const { result } = await request<{}, RequestSuccess<{
				dataList: ArticleComment[],
				total: number
			}>>({
				url: `article/comments/${id}`,
				params: {
					pageNum,
					pageSize
				}
			})
			return result
		} catch (error) {
			requestError(error)
		}
	}

	return useQuery(['comments', id, pageNum], () => fetchComments())
}
