/*
 * @Author: lizhigang
 * @Date: 2023-03-01 17:20:12
 * @Company: orientsec.com.cn
 * @Description: 文章详情
 */
import { Avatar, List, Tooltip } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { request, requestError } from '../../service/base'
import { Article, RequestSuccess } from '../../types'
import './index.scss'
import { formatDateTime } from '../../utils'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import { PAGE_SIZE } from '../../const'
import { NavLink } from 'react-router-dom'
import { useComments } from '../../hooks'
import { UserOutlined } from '@ant-design/icons'

export const ArticleDetail = () => {
	const params = useParams()
	const [detail, setDetail] = useState<Article | null>(null)
	const [page, setPage] = useState(1)

	const fetchArticle = useCallback(async () => {
		try {
			const { result } = await request<{}, RequestSuccess<Article>>({
				url: `article/detail/${params.id}`
			})
			setDetail(result!)
		} catch (error) {
			requestError(error)
		}
	}, [params.id])

	const { isLoading, data } = useComments(params.id!, page)

	// const fetchArticleComments = useCallback(async () => {
	// 	try {
	// 		const { result } = await request<{}, RequestSuccess<{
	// 			dataList: ArticleComment[],
	// 			total: number
	// 		}>>({
	// 			url: `article/comments/${params.id}`
	// 		})
	// 		setComments(result?.dataList || [])
	// 		setTotal(result?.total || 0)
	// 	} catch (error) {
	// 		requestError(error)
	// 	}
	// }, [params.id])

	useEffect(() => {
		fetchArticle()
		// fetchArticleComments()
	}, [params, fetchArticle])

	return (
		<div className='article-detail'>
			<HelmetProvider>
				<Helmet>
					<title>{detail?.title}</title>
					<meta name='description' content='文章详情' />
				</Helmet>
			</HelmetProvider>
			<section className='article-wrapper'>
				<div className='left-column'>
					<NavLink to={`/userdetail/${detail?.user._id}`}>
						{detail?.user.avatar?.url && (
							<Avatar style={{ marginBottom: '15px' }} size={100} src={detail?.user.avatar?.url} />
						)}
						<Tooltip placement='bottom' title={detail?.user.username} arrow={true}>
							<div className='author'>{detail?.user.username}</div>
						</Tooltip>
					</NavLink>
				</div>
				<div className='right-column'>
					<article className='article'>
						{detail?.title && (
							<h1 className='article-title'>{detail?.title}</h1>
						)}
						{detail?.content && (
							<div className='article-content'>{detail?.content}</div>
						)}
						<div className='bottom-bar'>发表于：{formatDateTime(detail?.createAt)}</div>
					</article>
				</div>
			</section>
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
					<List.Item className='comment'>
						<List.Item.Meta
							avatar={(
								<NavLink to={`/userdetail/${item.user._id}`}>
									{item.user.avatar?.url ? (
										<Avatar style={{ marginBottom: '15px' }} size={100} src={item.user.avatar.url} />
									) : (
										<Avatar style={{ marginBottom: '15px' }} size={100} icon={<UserOutlined />} />
									)}
									<Tooltip placement='bottom' title={item?.user.username} arrow={true}>
										<div className='author'>{item?.user.username}</div>
									</Tooltip>
								</NavLink>
							)}
							description={<div className='comment-item'>
								<div className='comment-content'>{item.content}</div>
								<div className='bottom-bar'>评论于：{formatDateTime(item?.createAt)}</div>
							</div>}
						/>
					</List.Item>
				)}
			/>
		</div>
	)
}