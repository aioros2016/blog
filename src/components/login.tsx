/*
 * @Author: lizhigang
 * @Date: 2023-02-16 17:22:55
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import {ReactNode, useState} from "react";
import {Button, Form, Input} from 'antd';
import {formBaseProps, tokenKey} from '../const';
import {useDispatch} from "react-redux";
import {message} from "antd";
import {unAuthenticatedAction} from "../page/unAuthenticated/unAuthenticated.slice";
import {request} from "../service/base";
import {RequestError, RequestSuccess, UserInfo} from "../types";
import {useNavigate} from "react-router-dom";

interface LoginParams {
  email: string;
  password: string;
}

export const Login = ({children}: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  /**
   * 提交登录
   * @param values 提交数据
   */
  const onFinish = async (values: LoginParams) => {
    try {
      setLoading(true);
      const {result} = await request<LoginParams, RequestSuccess<UserInfo>>({
        url: 'user/login',
        method: 'POST',
        data: values
      });
      localStorage.setItem(tokenKey, result?.token || '');
      navigate('/articles', {replace: true});
      dispatch(unAuthenticatedAction.login(result));
    } catch (e) {
      console.log(e)
      const error = e as RequestError
      if (Array.isArray(error.error)) {
        return message.error(error?.error[0].msg || '其他错误，请稍候重试');
      }
      message.error(error?.error || '其他错误，请稍候重试');
    } finally {
      setLoading(false);
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
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
        className="form-style"
      >
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {required: true, message: '请输入邮箱'},
            {
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: '邮箱格式不正确'
            }
          ]}
        >
          <Input placeholder='请输入您的邮箱' allowClear/>
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {required: true, message: '请输入密码'},
            // { pattern: /^\S*(?=\S{8,16})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/, message: '长度8-16位，必须包含大小写字母和数字的组合' }
          ]}
        >
          <Input.Password placeholder='请输入您的密码' allowClear/>
        </Form.Item>

        <Form.Item style={{marginTop: '40px'}}
                   wrapperCol={{offset: formBaseProps.labelCol.span, span: formBaseProps.wrapperCol.span}}>
          <Button loading={loading} style={{marginRight: '20px'}} type="primary" htmlType="submit">
            登录
          </Button>
          <Button htmlType="button" onClick={() => navigate('/articles', {replace: true})}>
            跳过
          </Button>
        </Form.Item>
      </Form>
      {children}
    </div>
  )
}
