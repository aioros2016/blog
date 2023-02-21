/*
 * @Author: lizhigang
 * @Date: 2023-02-17 12:15:49
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import {useDispatch, useSelector} from "react-redux";
import {selectLoginState, selectUserInfoState, unAuthenticatedAction} from "../unAuthenticated/unAuthenticated.slice";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {tokenKey} from '../../const'

export const ArticleList = () => {
  const loginState = useSelector(selectLoginState);
  const userInfo = useSelector(selectUserInfoState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <div>文章列表</div>
      <div>{JSON.stringify(loginState)}</div>
      <div>{JSON.stringify(userInfo)}</div>
      <Button onClick={() => {
        dispatch(unAuthenticatedAction.logout());
        window.history.length > 1 ? navigate(-(window.history.length - 1)) : navigate('/', {replace: true});
        localStorage.removeItem(tokenKey)
      }}>登出</Button>
    </div>
  )
}
