/*
 * @Author: lizhigang
 * @Date: 2023-02-16 17:33:44
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import React from "react";
import {Col, Row} from "antd";
import {Login} from '../../components/login';
import {Register} from "../../components/register";
import {formBaseProps} from "../../const";
import './index.scss';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";

interface TipProps {
  route?: string;
  replace?: boolean;
}

const Tip = ({route = '/', replace = true}: TipProps) => {
  const location = useLocation();
  const navigate = useNavigatess();
  return (
    <Row className="toggle-text">
      <Col span={formBaseProps.labelCol.span}/>
      <Col span={formBaseProps.wrapperCol.span}>
        <a className="toggle-text" onClick={() => {
          navigate(route, {replace})
        }}>{
          location.pathname === ('/' || 'login') ? '注册新账号' : '已有账号？直接登录！'
        }</a>
      </Col>
    </Row>
  )
}

export const UnAuthenticated = () => {

  return (
    <div className='container'>
      <Routes>
        <Route path='/login' element={<Login children={<Tip route="/register"/>}/>}/>
        <Route path='/register' element={<Register children={<Tip route='/login'/>}/>}/>
        <Route index element={<Login children={<Tip route="/register"/>}/>}/>
      </Routes>
    </div>
  );
}
