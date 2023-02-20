/*
 * @Author: lizhigang
 * @Date: 2023-02-16 17:33:44
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { useState } from "react";
import { Col, Row } from "antd";
import { Login } from '../../components/login';
import { Register } from "../../components/register";
import { formBaseProps } from "../../const";
import './index.scss';

interface TipProps {
  isLogin?: boolean;
  toggleHandle: () => void;
}
const Tip = ({isLogin, toggleHandle}: TipProps) => {
  return (
    <Row className="toggle-text">
      <Col span={formBaseProps.labelCol.span} />
      <Col span={formBaseProps.wrapperCol.span}>
        <a className="toggle-text" onClick={() => toggleHandle?.()}>{
          isLogin ? '注册新账号' : '已有账号？直接登录！'
        }</a>
      </Col>
    </Row>
  )
}

export const UnAuthenticated = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ?
        <Login children={<Tip isLogin={isLogin} toggleHandle={() => setIsLogin(!isLogin)} />} /> :
        <Register children={<Tip isLogin={isLogin} toggleHandle={() => setIsLogin(!isLogin)} />} />
      }
    </>
  );
}
