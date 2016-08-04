'use strict'

const fs = require('fs')
let tinify = require('tinify')

tinify.key = '2uSJ85HslmmX2woBc6lara705BCv0rxf'

/*let source = tinify.fromFile('../../../public/upload/Ho97c457NkTCie89_uLP.jpg')
source.toFile('../../../public/upload/tiny/Ho97c457NkTCie89_uLP.jpg')

let files = fs.readdirSync('../../../public/upload/')*/

class ImageCompress {
	constructor() {
		
	}

	compressByPath(filePath) {
		return new Promise((resolve, reject) => {
			fs.readFile(filePath, (err, sourceData) => {
				if(err) {
					reject(err)
				} else {
					tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
						if(err) reject(err)
						resolve(resultData)
					})
				}
			})
		})
	}

	writeToFile(filePath, bufferData) {
		return new Promise((resolve, reject) => {
			fs.writeFile(filePath, bufferData, err => {
				if(err) {
					reject(err)
				}
				resolve('ok')
			})
		})
	}

	imgCompTo(inputPath, outPath) {
		return new Promise((resolve, reject) => {
			this.compressByPath(inputPath).then(data => {
				this.writeToFile(outPath, data).then(data => {
					resolve(data)
				}).catch(err => {
					reject(err)
				})
			}).catch(err => {
				reject(err)
			})
		})
	}
}

module.exports = ImageCompress

/*let compImg = new ImageCompress()
console.log('compImg', compImg)
compImg.imgCompTo('../../../public/upload/Ho97c457NkTCie89_uLP.jpg', '../../../public/upload/tiny/Ho97c457NkTCie89_uLP2.jpg')
	.then(data => {
		console.log('ok?', data)
	}).catch(err => {
		console.log('err', err)
	})*/

