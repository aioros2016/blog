/*
 * @Author: lizhigang
 * @Date: 2023-03-15 14:00:19
 * @Company: orientsec.com.cn
 * @Description: 我的收藏
 */

import React, { useEffect, useState } from 'react'
import { request, requestError } from '../../service/base'
import { Article, RequestSuccess } from '../../types'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import { PAGE_SIZE } from '../../const'
import { Avatar, List, Tooltip } from 'antd'
import { NavLink } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

export const MyCollect = () => {
	const [page, setPage] = useState(1)
	const [articles, setArticles] = useState<Article[]>([])
	const [total, setTotal] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	/**
	 * 我的收藏查询
	 */
	const fetchMyCollects = async () => {
		setIsLoading(true)
		try {
			const { result } = await request<{}, RequestSuccess<{
				dataList: Article[];
				total: number
			}>>({
				url: `article/myCollects/`,
				params: {
					pageNum: page,
					pageSize: PAGE_SIZE
				}
			})
			setArticles(result!.dataList)
			setTotal(result!.total)
		} catch (error) {
			requestError(error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchMyCollects()
	}, [])

	return (
		<section>
			<HelmetProvider>
				<Helmet>
					<title>我的收藏</title>
					<meta name='description' content='我的收藏' />
				</Helmet>
			</HelmetProvider>
			<div className='page-title'>
				<h1>我的收藏</h1>
			</div>
			<List
				style={{ minHeight: '500px' }}
				loading={isLoading}
				pagination={{
					position: 'bottom',
					align: 'end',
					pageSize: PAGE_SIZE,
					total: total,
					hideOnSinglePage: true,
					onChange: (page) => setPage(page)
				}}
				dataSource={articles}
				renderItem={(item, index) => (
					<List.Item>
						<List.Item.Meta
							avatar={(
								<Tooltip placement='topLeft' title={item.user.username}>
									<NavLink to={`/userdetail/${item.user._id}`}>
										{
											item.user.avatar?.url ?
												<Avatar src={item.user.avatar.url} /> :
												<Avatar icon={<UserOutlined />} />
										}
									</NavLink>
								</Tooltip>
							)}
							title={<NavLink to={`/articles/${item._id}`} dangerouslySetInnerHTML={{
								__html: item.title ?? ''
							}} />}
							description={<NavLink className='content-wrapper' to={`/articles/${item._id}`} dangerouslySetInnerHTML={{
								__html: item.content ?? ''
							}} />}
						/>
					</List.Item>
				)}
			/>
		</section>
	)
}
