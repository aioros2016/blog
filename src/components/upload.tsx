/*
 * @Author: lizhigang
 * @Date: 2023-02-22 17:27:00
 * @Company: orientsec.com.cn
 * @Description: 图片上传
 */
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { FormInstance, message, Upload } from 'antd'
import type { UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import { RequestSuccess } from '../types'
import { request, requestError } from '../service/base'

export const onRequest = async (imgList: any) => {
	const formData = new FormData()
	formData.append('img', imgList)
	try {
		const { result } = await request<FormData, RequestSuccess<{ url: string; size: number; type: string }>>({
			url: 'https://static.lizhigang.cn/img/upload/tie',
			method: 'POST',
			data: formData
		})
		return Promise.resolve(result)
	} catch (error) {
		console.error(error)
		requestError(error)
	}
}

/**
 * 图片上传前
 * @param file 上传的图片
 */
const beforeUpload = (file: UploadFile) => {
	console.log(file)
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

const FileUpload = ({ form, file }: {
	form: FormInstance<any>, file?: {
		url: string;
		size: number;
		type: string;
	}
}) => {
	const fileListInit: UploadFile[] = []
	if (file) {
		fileListInit.push({
			uid: '-1',
			name: 'avatar.png',
			status: 'done',
			url: file.url,
			type: file.type,
			size: file.size
		})
	}
	const [fileList, setFileList] = useState<UploadFile[]>(fileListInit)

	/**
	 * 监听表单元素变化
	 * @param info file文件
	 */
	const handleChange: UploadProps['onChange'] = (info) => {
		const { file, fileList } = info
		if (!beforeUpload(file)) return
		setFileList([...fileList])
		form.setFieldValue('avatar', fileList)
	}

	useEffect(() => {
		form.setFieldValue('avatar', fileList)
	}, [form, fileList])

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
