# 发帖吧 - 一个将持续维护与运营的社区类技术展示型Web应用

## 关于项目

这是一个从前端到服务端完全独立开发的项目。服务端依赖于我开发的另一个项目，由于代码中含有数据库秘钥等敏感信息，所以暂时仓库未设公开。我会在最后贴上使用apifox维护的接口文档。
由于我使用cors维护了访问接口的白名单。所以请不要在apifox中选择正式环境调试接口，测试环境的话，9000端口是可以接入的。目前项目已部署上线，这是此项目的第一个大版本，将来它将持续维护与升级。

## 功能模块

- 用户注册与登录模块
- 用户信息更新模块
- 修改密码模块
- 文章发表模块
- 评论回复模块
- 我的收藏列表
- 收藏与取消收藏
- 全局模糊搜索模块
- 用户与权限管理模块

## Api文档

<a href="https://www.apifox.cn/apidoc/shared-9bce2364-95cd-4ce4-9c36-ef4e4e26de90" target="_blank">点此折跃</a>

## 线上预览

<a href="https://tie.lizhigang.cn/" target="_blank">点此折跃</a>

## 技术栈

- 数据框架：React
- Ui框架：AntDesign
- 共享状态：redux-toolkit + react-query
- 通讯层：axios
- 服务端：express + express-validator
- 用户凭证：jsonwebtoken
- 数据库：mongodb + mongoose

**以上叙述为项目所用到的主要技术栈，其余一些辅助使用的就不在此赘述**

## 安装依赖

`yarn install`

## 调试项目

`yarn start`

## 构建

`yarn build`

## 线上部署

提交代码后，至[阿里云效](https://flow.aliyun.com/my?page=1)执行自动化部署流程


