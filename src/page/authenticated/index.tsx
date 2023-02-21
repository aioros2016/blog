/*
 * @Author: lizhigang
 * @Date: 2023-02-17 12:19:31
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { Route, Routes } from 'react-router-dom'
import { ArticleList } from '../articleList'

export const Authenticated = () => (
	<div className='container'>
		<Routes>
			<Route path='/articles' element={<ArticleList />} />
			<Route index element={<ArticleList />} />
		</Routes>
	</div>
)
