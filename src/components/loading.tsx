/*
 * @Author: lizhigang
 * @Date: 2023-03-06 15:58:59
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
import { Spin } from 'antd'

export const LoadingSpin = () => (
	<div className='spin-wrapper'>
		<Spin tip='Loading' size='large' />
	</div>
)
