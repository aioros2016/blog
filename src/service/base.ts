/*
 * @Author: lizhigang
 * @Date: 2023-02-17 15:09:46
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import axios, { AxiosError } from 'axios'
import { RequestError, RequestMethods } from '../types'
import { userToken } from '../const'
import { message } from 'antd'

const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.lizhigang.cn/vod/' : 'http://localhost:3000/'

axios.defaults.baseURL = baseURL

axios.interceptors.request.use(function(config) {
	if (userToken) {
		config.headers.Authorization = `Bearer ${userToken}`
	}
	return config
}, function(error) {
	return Promise.reject(error)
})

export const request = <T, R>({
																url,
																method = 'GET',
																data
															}: { url: string; method?: RequestMethods; data?: T }): Promise<R> => {
	return axios({
		url,
		method,
		data
	})
		.then(res => res.data)
		.catch((e: AxiosError) => Promise.reject(e.response?.data))
}

export const requestError = (e: unknown) => {
	const error = e as RequestError
	if (Array.isArray(error.error)) {
		return message.error(error?.error[0].msg || '其他错误，请稍候重试')
	}
	message.error(error?.error || '其他错误，请稍候重试')
}
