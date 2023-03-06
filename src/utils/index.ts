/*
 * @Author: lizhigang
 * @Date: 2023-02-16 19:03:37
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { tokenKey } from '../const'
import { unAuthenticatedAction } from '../page/unAuthenticated/unAuthenticated.slice'
import { UserInfo } from '../types'
import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'

export const resetUserInfo = (dispatch: Dispatch<AnyAction>, result: UserInfo | null) => {
	localStorage.setItem(tokenKey, result?.token || '')
	dispatch(unAuthenticatedAction.setUserInfo(result))
}

export const isVoid = (value: unknown) =>
	value === undefined || value === null || value === ''

/**
 * 删除值为假的属性
 * @param obj
 * @returns {*}
 */
export const clearObject = (obj: { [key: string]: unknown }) => {
	const result = { ...obj }
	Object.keys(result).forEach((key) => {
		const value = result[key]
		if (isVoid(value)) {
			delete result[key]
		}
	})
	return result
}
/**
 * 获取url中指定键的参数值
 * @param keys
 */
export const useUrlQueryParams = <K extends string>(keys: K[]) => {
	const [searchParams] = useSearchParams()
	const setSearchParams = useSetUrlSearchParams()
	return [
		useMemo(
			() =>
				keys.reduce(
					(prev, key) => ({ ...prev, [key]: searchParams.get(key) || '' }),
					{} as { [key in K]: string }
				),
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[searchParams]
		),
		(params: Partial<{ [key in K]: unknown }>) => {
			return setSearchParams(params)
		}
	] as const
}

/**
 * 更新urlSearchParams
 */
export const useSetUrlSearchParams = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	return (params: { [key in string]: unknown }) => {
		const o = clearObject({
			...Object.fromEntries(searchParams),
			...params
		}) as URLSearchParamsInit
		return setSearchParams(o)
	}
}

export const formatDateTime = (date?: string) => {
	if (!date) return
	const dateTime = new Date(date)
	const year = dateTime.getFullYear()
	const month = (dateTime.getMonth() + 1).toString().padStart(2, '0')
	const day = dateTime.getDate().toString().padStart(2, '0')
	const hour = dateTime.getHours().toString().padStart(2, '0')
	const minutes = dateTime.getMinutes().toString().padStart(2, '0')
	const seconds = dateTime.getSeconds().toString().padStart(2, '0')
	return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}

export const reLogin = (error: AxiosResponse, dispatch: Dispatch<AnyAction>) => {
	if ([401, 402].includes(error.status)) {
		dispatch(unAuthenticatedAction.logout())
	}
}

/**
 * 解码Html实体
 * @param str Html实体
 */
export const escapeHtmlStr = (str: string) => {
	if (!str) return ''
	str = str.replace(/&amp;/g, '&')
	str = str.replace(/&lt;/g, '<')
	str = str.replace(/&gt;/g, '>')
	str = str.replace(/&quot;/g, '"')
	str = str.replace(/&#39;/g, '\'')
	str = str.replace(/<br\/>/g, '\n')
	str = str.replace(/&nbsp;/g, ' ')
	return str
}

/**
 * 字符转义
 * @param str 输入的字符串
 * @returns {*}
 */
export const escapeHtml = (str: string) => {
	if (!str) return ''
	str = str.replace(/&/g, '&amp;')
	str = str.replace(/</g, '&lt;')
	str = str.replace(/>/g, '&gt;')
	str = str.replace(/"/g, '&quot;')
	str = str.replace(/'/g, '&#39;')
	str = str.replace(/\n/g, '<br/>')
	str = str.replace(/ /g, '&nbsp;')
	return str
}
