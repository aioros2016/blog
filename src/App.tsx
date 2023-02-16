import React from 'react';
import { ConfigProvider, Button } from 'antd';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#722ED1',
        },
      }}
    >
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    </ConfigProvider>
  );
}

export default App;
