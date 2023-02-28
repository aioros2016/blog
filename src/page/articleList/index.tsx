/*
 * @Author: lizhigang
 * @Date: 2023-02-17 12:15:49
 * @Company: orientsec.com.cn
 * @Description: 文章列表
 */

import { Helmet } from 'react-helmet'
import React, { useEffect, useState } from 'react'
import { request, requestError } from '../../service/base'
import { RequestSuccess, PagingParams, Article } from '../../types'
import { Avatar, List, Tooltip } from 'antd'
import { HelmetProvider } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const PAGE_SIZE = 20

export const ArticleList = () => {
	const navigate = useNavigate()
	const [articles, setArticles] = useState<Article[]>([])
	const [total, setTotal] = useState(0)

	const fetchArticles = async (pageNum: number = 1, pageSize: number = PAGE_SIZE) => {
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
			console.log(result)
			if (pageNum > 1) {
				setArticles([...articles].concat([...result?.dataList || []]))
			} else {
				setArticles(result?.dataList || [])
			}
			setTotal(result?.total || 0)
		} catch (error) {
			requestError(error)
		}
	}

	useEffect(() => {
		fetchArticles()
	}, [])

	return (
		<div>
			<HelmetProvider>
				<Helmet>
					<title>文章列表</title>
					<meta name='description' content='文章列表' />
				</Helmet>
			</HelmetProvider>
			<List
				pagination={{
					position: 'bottom',
					align: 'end',
					pageSize: PAGE_SIZE,
					total,
					onChange: (page) => {
						fetchArticles(page)
					}
				}}
				dataSource={articles}
				renderItem={(item, index) => (
					<List.Item>
						<List.Item.Meta
							avatar={item.user.avatar?.url ? (
								<Tooltip placement='topLeft' title={item.user.username}>
									<Avatar src={item.user.avatar.url} onClick={() => navigate(`/userdetail/${item.user._id}`)} />
								</Tooltip>
							) : null}
							title={<a href='https://ant.design'>{item.title}</a>}
							description={<div className='content-wrapper'>{item.content}</div>}
						/>
					</List.Item>
				)}
			/>
		</div>
	)
}
