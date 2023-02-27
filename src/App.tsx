import React from 'react'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import './assets/sass/App.scss'
import { Provider } from 'react-redux'
import { store } from './store'
import { Home } from './page/home'

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#722ED1'
				}
			}}
		>
			<Provider store={store}>
				<Home />
			</Provider>
		</ConfigProvider>
	)
}

export default App
