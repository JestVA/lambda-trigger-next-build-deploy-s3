const s3 = require('s3')
const client = s3.createClient();
const uploader = client.uploadDir({
	localDir: 'out',
	s3Params: { Bucket: "next-lambda-demo"}
})

uploader.on('error', function (err) {
	console.log(err)
})

uploader.on('end', function() {
	console.log('Complete')
})

uploader.on('fileUploadStart', function(localFilePath, s3Key) {
	console.log('Uploading' + localFilePath)
})

uploader.on('fileUploadEnd', function(localFilePath, s3Key){
	console.log('Uploaded', localFilePath)
})