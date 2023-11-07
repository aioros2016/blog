/*
 * @Author: lizhigang
 * @Date: 2023-02-16 12:26:13
 * @Company: orientsec.com.cn
 * @Description: 文件描述
 */
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
	devServer: {
		port: 9000
	},
	optimization: {
		minimize: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						pure_funcs: ['console.log']
					}
				}
			})
		]
	}
}
