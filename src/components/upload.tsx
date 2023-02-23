/*
 * @Author: lizhigang
 * @Date: 2023-02-22 17:27:00
 * @Company: orientsec.com.cn
 * @Description: 图片上传
 */
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { FormInstance, message, Upload } from 'antd'
import type { UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'

/**
 * 图片上传前
 * @param file 上传的图片
 */
const beforeUpload = (file: UploadFile) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
	if (!isJpgOrPng) {
		message.error('只支持上传JPG/PNG格式的图片')
	}
	const isLt500 = !file.size ? false : file.size / 1024 / 1024 < 0.5
	if (!isLt500) {
		message.error('图片必须小于500k')
	}
	return isJpgOrPng && isLt500
}

const FileUpload = ({ form }: { form: FormInstance<any> }) => {
	const [fileList, setFileList] = useState<UploadFile[]>([])

	/**
	 * 监听表单元素变化
	 * @param info file文件
	 */
	const handleChange: UploadProps['onChange'] = (info) => {
		const { file, fileList } = info
		console.log(fileList)
		if (!beforeUpload(file)) return
		setFileList([...fileList])
		form.setFieldValue('avatar', fileList)
	}

	/**
	 * 选取图片按钮
	 */
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	)
	return (
		<>
			<Upload
				accept='image/png, image/jpeg'
				maxCount={1}
				listType='picture-circle'
				fileList={fileList}
				onChange={handleChange}
				beforeUpload={() => false}
				onPreview={() => {
					message.warning('暂不支持预览')
					return false
				}}
			>
				{fileList.length >= 1 ? null : uploadButton}
			</Upload>
		</>
	)
}

export default FileUpload
