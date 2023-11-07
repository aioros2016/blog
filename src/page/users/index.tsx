/*
 * @Author: lizhigang
 * @Date: 2023-03-08 21:00:15
 * @Company: orientsec.com.cn
 * @Description: 用户列表
 */
import type { ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, DatePicker, Popconfirm, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { request, requestError } from '../../service/base'
import { AuthInfo, RequestSuccess, UserInfo } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfoState } from '../unAuthenticated/unAuthenticated.slice'
import { resetUserInfo } from '../../utils'

const { RangePicker } = DatePicker

export const Users = () => {
	const dispatch = useDispatch()
	const storeUserInfo = useSelector(selectUserInfoState)
	const [userList, setUserList] = useState<UserInfo[]>([])
	const [total, setTotal] = useState(0)
	const [authList, setAuthList] = useState<AuthInfo[]>([])
	const [currentAuth, setCurrentAuth] = useState(0)
	const [pageNum, setPageNum] = useState(1)
	const [loading, setLoading] = useState(false)

	const AuthSelect = (auth: AuthInfo) => (
		<Select
			defaultValue={auth.auth}
			style={{ width: 120 }}
			onChange={auth => setCurrentAuth(auth)}
			options={authList.map(item => (
				{ value: item.auth, label: item.name }
			))}
		/>
	)

	const columns: ProColumns<UserInfo>[] = [
		{
			title: '用户ID',
			width: 160,
			dataIndex: '_id'
		},
		{
			title: '用户名',
			width: 60,
			dataIndex: 'username',
			ellipsis: true,
			search: false
		},
		{
			title: '权限',
			width: 60,
			dataIndex: 'auth',
			search: false,
			render: (e, userInfo) => {
				return <span>{userInfo.auth?.name}</span>
			}
		},
		{
			title: '邮箱',
			width: 120,
			dataIndex: 'email'
		},
		{
			title: '手机号',
			width: 80,
			dataIndex: 'mobile'
		},
		{
			title: '年龄',
			width: 60,
			dataIndex: 'age',
			search: false
		},
		{
			title: '创建时间',
			width: 80,
			key: 'since',
			dataIndex: 'createAt',
			valueType: 'date',
			// sorter: (a, b) => a.createdAt - b.createdAt,
			renderFormItem: () => {
				return <RangePicker />
			}
		},
		{
			title: '操作',
			width: 80,
			key: 'option',
			valueType: 'option',
			fixed: 'right',
			render: (e, userInfo) => [
				<Popconfirm
					key='auth'
					placement='topRight'
					title='权限变更'
					description={() => AuthSelect(userInfo.auth)}
					onConfirm={() => changeAuth(userInfo._id)}
					okButtonProps={{ loading }}
					okText='确认'
					cancelText='取消'
				>
					<Button type='link'>权限</Button>
				</Popconfirm>,
				<Popconfirm
					key='remove'
					placement='topRight'
					title='确定要移除该用户吗？'
					onConfirm={() => deleteUser(userInfo._id)}
					okButtonProps={{ loading }}
					okText='确认'
					cancelText='取消'
				>
					<Button type='link'>移除</Button>
				</Popconfirm>
			]
		}
	]

	/**
	 * 用户列表查询
	 */
	const fetchUsers = async () => {
		try {
			setLoading(true)
			const { result } = await request<any, RequestSuccess<{
				dataList: UserInfo[];
				total: number
			}>>({
				url: 'user/list',
				params: {
					pageSize: 10,
					pageNum
				}
			})
			setUserList(result?.dataList || [])
			setTotal(result?.total || 0)
		} catch (error) {
			requestError(error)
		} finally {
			setLoading(false)
		}
	}

	/**
	 * 权限列表查询
	 */
	const fetchAuthoritys = async () => {
		try {
			const { result } = await request<any, RequestSuccess<any>>({
				url: 'auth/list'
			})
			console.log(result)
			setAuthList(result)
		} catch (error) {
			requestError(error)
		}
	}

	/**
	 * 移除用户
	 * @param id 用户Id
	 */
	const deleteUser = async (id: string) => {
		try {
			setLoading(true)
			await request<{}, RequestSuccess<'移除用户成功'>>({
				url: `user/delete/${id}`,
				method: 'DELETE'
			})
			fetchUsers()
		} catch (error) {
			requestError(error)
		} finally {
			setLoading(false)
		}
	}

	/**
	 * 用户权限变更
	 * @param id 用户Id
	 */
	const changeAuth = async (id: string) => {
		try {
			setLoading(true)
			const { result } = await request<{}, RequestSuccess<UserInfo>>({
				url: `auth/update/${id}`,
				method: 'POST',
				data: {
					auth: currentAuth
				}
			})
			if (result?.token) {
				resetUserInfo(dispatch, result!)
			}
			fetchUsers()
		} catch (error) {
			requestError(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!storeUserInfo?.auth || storeUserInfo?.auth?.auth < 99) {
			return
		}
		fetchUsers()
		fetchAuthoritys()
	}, [])

	useEffect(() => {
		fetchUsers()
	}, [pageNum])

	return (
		<>
			<ProTable<UserInfo>
				style={{ marginTop: '30px' }}
				columns={columns}
				dataSource={userList}
				scroll={{ x: 700 }}
				options={false}
				search={false}
				pagination={{
					pageSize: 10,
					onChange: (page) => setPageNum(page),
					total
				}}
				rowKey='_id'
			/>
		</>

	)
}
