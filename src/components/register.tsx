/*
 * @Author: lizhigang
 * @Date: 2023-02-16 18:54:38
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { Button, Checkbox, Form, Input } from 'antd';
import { formBaseProps } from '../const';
import {ReactNode} from "react";

export const Register = ({children}: {children: ReactNode}) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="authenticated-wrapper">
      <h1 className="greeting-title">你好</h1>
      <Form
        name="login"
        {...formBaseProps}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
        className="form-style"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password allowClear />
        </Form.Item>

        <Form.Item style={{marginTop: '40px'}} wrapperCol={{ offset: formBaseProps.labelCol.span, span: formBaseProps.wrapperCol.span }}>
          <Button style={{marginRight: '20px'}} type="primary" htmlType="submit">
            注册
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
