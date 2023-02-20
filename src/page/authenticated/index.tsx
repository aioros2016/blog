/*
 * @Author: lizhigang
 * @Date: 2023-02-17 12:19:31
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import {ArticleList} from "../articleList";
import {store} from "../../store";
import {Provider} from "react-redux";
import React from "react";

export const Authenticated = () => (
  <div className='container'>
    <Routes>
      <Route path='/articles' element={<ArticleList />} />
      <Route index element={<ArticleList />} />
    </Routes>
  </div>
)
