/*
 * @Author: lizhigang
 * @Date: 2023-02-17 15:09:46
 * @Company: orientsec.com.cn
 * @Description: 通讯层模块
 */
import axios, { AxiosError, AxiosResponse } from 'axios'
import { RequestMethods } from '../types'
import { tokenKey } from '../const'
import { message } from 'antd'

const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.lizhigang.cn/vod/' : 'http://localhost:3002/'

axios.defaults.baseURL = baseURL

const codeMessage: {
	[key: number]: string
} = {
	200: '请求成功',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '客户端异常',
	401: '未登录',
	402: '鉴权异常，令牌已过期，请重新登录',
	403: '您没有权限',
	404: '资源不存在',
	410: '请求的资源已被永久移除',
	413: '上传文件过大，请处理后重新上传',
	500: '服务器异常，请稍后再试',
	502: '网关错误。',
	503: '网站暂时维护，请稍后再试',
	504: '网关超时。'
}

axios.interceptors.request.use(function(config) {
	if (localStorage.getItem(tokenKey)) {
		config.headers.Authorization = `Bearer ${localStorage.getItem(tokenKey)}`
	}
	return config
}, function(error) {
	return Promise.reject(error)
})

// axios.interceptors.response.use(function(response) {
// 	return response
// }, function(error: AxiosError) {
// 	const { status } = error.response as AxiosResponse
// 	if (Object.keys(codeMessage).includes(status.toString())) {
// 		notification.error({
// 			message: codeMessage[status!]
// 		})
// 	}
// 	return Promise.reject(error)
// })

export const request = <T, R>({
																url,
																method = 'GET',
																params,
																data
															}: { url: string; method?: RequestMethods; params?: T; data?: T }): Promise<R> => {
	return axios({
		url,
		method,
		params,
		data
	})
		.then(res => res.data)
		.catch((e: AxiosError) => Promise.reject(e.response))
}

export const requestError = (e: unknown, msg?: string) => {
	if (msg) return message.error(msg)
	const { data } = e as AxiosResponse
	if (Array.isArray(data.error)) {
		return message.error(data?.error[0].msg || '其他错误，请稍候重试')
	}
	message.error(data?.error || '其他错误，请稍候重试')
}
