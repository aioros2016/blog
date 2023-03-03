/*
 * @Author: lizhigang
 * @Date: 2023-02-17 15:09:46
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import axios, { AxiosError } from 'axios'
import { RequestError, RequestMethods } from '../types'
import { tokenKey } from '../const'
import { message } from 'antd'

const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.lizhigang.cn/vod/' : 'http://localhost:3000/'

axios.defaults.baseURL = baseURL

axios.interceptors.request.use(function(config) {
	if (localStorage.getItem(tokenKey)) {
		config.headers.Authorization = `Bearer ${localStorage.getItem(tokenKey)}`
	}
	return config
}, function(error) {
	return Promise.reject(error)
})

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
		.catch((e: AxiosError) => Promise.reject(e.response?.data))
}

export const requestError = (e: unknown, msg?: string) => {
	if (msg) return message.error(msg)
	const error = e as RequestError
	if (Array.isArray(error.error)) {
		return message.error(error?.error[0].msg || '其他错误，请稍候重试')
	}
	message.error(error?.error || '其他错误，请稍候重试')
}
