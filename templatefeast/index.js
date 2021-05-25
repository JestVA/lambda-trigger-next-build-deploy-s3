const spawn = require('child_process').spawn;
exports.handler = function(event, context) {
	console.log("Starting build");
	console.log({event, context});
	const build = spawn('bash', ['build.sh'])
	
	build.stdout.on('data', function (data) {
		console.log('stdout: ' + data.toString());
	});
    
	build.stderr.on('data', function (data) {
		console.log('stderr: ' + data.toString());
	});
    
	build.on('exit', function (code) {
		console.log('child process exited with code ' + code.toString());
	});
}