/*
 * @Author: lizhigang
 * @Date: 2023-02-17 15:49:59
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */

export interface RequestError extends Error {
	error?: string | {
		location: string;
		msg: string;
		param: string;
		value: string;
	}[];
}

export interface RequestSuccess<T> {
	result?: T | null,
	code: number;
	message?: string;
}

export type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface UserInfo {
	username: string;
	age: number;
	email: string;
	mobile: string;
	avatar?: {
		url: string;
		size: number;
		type: string;
	};
	fans: number;
	channelDes?: string;
	createAt: string;
	updateAt: string;
	token?: string;
	_id: string;
}
