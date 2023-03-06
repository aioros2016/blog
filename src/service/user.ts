/*
 * @Author: lizhigang
 * @Date: 2023-03-04 00:25:18
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { request } from './base'

/**
 * 用户信息查询
 * @param url api url
 */
export const userInfoService = async <T>(url: string): Promise<T> => {
	try {
		return await request({ url })
	} catch (e) {
		return Promise.reject(e)
	}
}
