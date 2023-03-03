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
import { NavLink, useNavigate } from 'react-router-dom'
import { useArticle } from '../../hooks'
import { PAGE_SIZE } from '../../const'
import './index.scss'

export const ArticleList = () => {
	const [page, setPage] = useState(1)

	const { data, isLoading } = useArticle(page)

	return (
		<section className='articles-wrapper'>
			<HelmetProvider>
				<Helmet>
					<title>文章列表</title>
					<meta name='description' content='文章列表' />
				</Helmet>
			</HelmetProvider>
			<List
				style={{ minHeight: '500px' }}
				loading={isLoading}
				pagination={{
					position: 'bottom',
					align: 'end',
					pageSize: PAGE_SIZE,
					total: data?.total,
					hideOnSinglePage: true,
					onChange: (page) => setPage(page)
				}}
				dataSource={data?.dataList}
				renderItem={(item, index) => (
					<List.Item>
						<List.Item.Meta
							avatar={item.user.avatar?.url ? (
								<Tooltip placement='topLeft' title={item.user.username}>
									<NavLink to={`/userdetail/${item.user._id}`}>
										<Avatar src={item.user.avatar.url} />
									</NavLink>
								</Tooltip>
							) : null}
							title={<NavLink to={`/articles/${item._id}`}>{item.title}</NavLink>}
							description={<NavLink className='content-wrapper' to={`/articles/${item._id}`}>{item.content}</NavLink>}
						/>
					</List.Item>
				)}
			/>
		</section>
	)
}
