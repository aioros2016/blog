import React from 'react';
import { ConfigProvider, Button, Checkbox, Form, Input } from 'antd';
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import 'antd/dist/reset.css';
import './assets/sass/App.scss';
import {Provider} from "react-redux";
import {store} from "./store";
import {Home} from "./page/home";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#722ED1',
        },
      }}
    >
      <Router>
        <Provider store={store}>
          <Home />
        </Provider>
      </Router>
    </ConfigProvider>
  );
}

export default App;
