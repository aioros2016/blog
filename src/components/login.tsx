/*
 * @Author: lizhigang
 * @Date: 2023-02-16 17:22:55
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import {ReactNode, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { formBaseProps } from '../const';
import { useDispatch } from "react-redux";
import { message } from "antd";
import { unAuthenticatedAction } from "../page/unAuthenticated/unAuthenticated.slice";
import { request } from "../service/base";
import { RequestError, RequestSuccess, UserInfo } from "../types";

interface LoginParams {
  email: string;
  password: string;
}

export const Login = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: LoginParams) => {
    try {
      const { result } = await request<LoginParams, RequestSuccess<UserInfo>>({
        url: 'user/login',
        method: 'POST',
        data: values
      });
      localStorage.setItem('__BLOG_TOKEN__', result?.token || '');
      dispatch(unAuthenticatedAction.login(result));
      navigate("/articles");
    } catch (e) {
      console.log(e)
      const error = e as RequestError
      if (Array.isArray(error.error)) {
        return message.error(error?.error[0].msg || '其他错误，请稍候重试');
      }
      message.error(error?.error || '其他错误，请稍候重试');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="authenticated-wrapper">
      <h1 className="greeting-title">欢迎回来</h1>
      <Form
        name="login"
        {...formBaseProps}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
        className="form-style"
      >
        <Form.Item
          label="用户名"
          name="email"
          rules={[{ required: true, message: '请输入邮箱' }]}
        >
          <Input placeholder='请输入您的邮箱' allowClear />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder='请输入您的密码' allowClear />
        </Form.Item>

        <Form.Item style={{marginTop: '40px'}} wrapperCol={{ offset: formBaseProps.labelCol.span, span: formBaseProps.wrapperCol.span }}>
          <Button style={{marginRight: '20px'}} type="primary" htmlType="submit">
            登录
          </Button>
          <Button htmlType="button">
            跳过
          </Button>
        </Form.Item>
      </Form>
      {children}
    </div>
  )
}
