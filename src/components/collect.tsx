/*
 * @Author: lizhigang
 * @Date: 2023-03-15 12:50:19
 * @Company: orientsec.com.cn
 * @Description: 收藏组件
 */
import { StarOutlined, StarFilled } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Badge, Tooltip } from 'antd'

export const Collect = ({
													collectCount = 0,
													hasCollected = false,
													onToggle
												}: {
	collectCount?: number;
	hasCollected?: boolean;
	onToggle: () => Promise<void>
}) => {
	const [isCollect, setIsCollect] = useState(false)

	const toggleCollect = async () => {
		await onToggle()
		setIsCollect(!isCollect)
	}

	useEffect(() => {
		setIsCollect(hasCollected)
	}, [hasCollected])

	return (
		<Badge count={collectCount}>
			<Tooltip placement='left' title={`${isCollect ? '取消' : ''}收藏`}>
				<div className='icon-wrapper' onClick={toggleCollect}>
					{
						isCollect ? <StarFilled /> : <StarOutlined />
					}
				</div>
			</Tooltip>
		</Badge>
	)
}
