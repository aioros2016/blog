/*
 * @Author: lizhigang
 * @Date: 2023-02-17 12:19:31
 * @Company: orientsec.com.cn
 * @Description: 已登录组件
 */
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { ArticleList } from '../articleList'
import { UserDetail } from '../userDetail'
import { BlogHeader } from '../../components/header'
import { useSelector } from 'react-redux'
import { selectUserInfoState } from '../unAuthenticated/unAuthenticated.slice'

export const Authenticated = () => {
	const userInfo = useSelector(selectUserInfoState)

	return (
		<>
			<Router>
				<BlogHeader userInfo={userInfo} />
				<Routes>
					<Route path='/articles' element={<ArticleList />} />
					<Route path='/userdetail/:userId' element={<UserDetail />} />
					<Route index element={<ArticleList />} />
				</Routes>
			</Router>
		</>
	)
}
