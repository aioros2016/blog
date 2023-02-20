/*
 * @Author: lizhigang
 * @Date: 2023-02-17 12:15:49
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectLoginState, selectUserInfoState, unAuthenticatedAction} from "../unAuthenticated/unAuthenticated.slice";
import {Button} from "antd";

export const ArticleList = () => {
  const loginState = useSelector(selectLoginState);
  const userInfo = useSelector(selectUserInfoState);
  const dispatch = useDispatch()

  return (
    <div>
      <div>文章列表</div>
      <div>{JSON.stringify(loginState)}</div>
      <div>{JSON.stringify(userInfo)}</div>
      <Button onClick={() => {
        dispatch(unAuthenticatedAction.logout());
        localStorage.removeItem('__BLOG_TOKEN__')
      }}>登出</Button>
    </div>
  )
}
