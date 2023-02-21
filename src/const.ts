/*
 * @Author: lizhigang
 * @Date: 2023-02-16 18:31:34
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */

export const tokenKey = '__BLOG_TOKEN__';

export const formBaseProps = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

export const userToken = localStorage.getItem(tokenKey);
