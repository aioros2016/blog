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

export interface RequestSuccess<T, M = ''> {
	result?: T | null,
	code: number;
	msg?: M;
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

export interface SubmitArticle {
	title?: string;
	content?: string;
}

export interface PagingParams {
	pageNum?: number;
	pageSize?: number
}

export interface Avatar {
	url: string;
	size: number;
	type: string;
}

export interface Article {
	title?: string;
	content?: string;
	user: {
		username: string;
		avatar?: Avatar;
		_id: string;
	};
	commentCount: number;
	likeCount: number;
	disLikeCount: number;
	createAt: string,
	updateAt: string,
	_id: string,
}
