import React from 'react'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import './assets/sass/App.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { store } from './store'
import { Home } from './page/home'

const queryClient = new QueryClient()

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
				<QueryClientProvider client={queryClient}>
					<Home />
				</QueryClientProvider>
			</Provider>
		</ConfigProvider>
	)
}

export default App
