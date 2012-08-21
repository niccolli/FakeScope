// サーバの設定
// Configuration of the Web server
var express = require('express');
var app = express();
app.configure(function(){
	app.use(express.static('static'));
	app.use(express.logger());
	app.use(express.bodyParser());
});

app.get('/', function(req, res){
	res.send('Hello World');
});


var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

// シリアルポートの設定
// Configuration of serial port
var sp = new SerialPort('/dev/tty.usbmodem1411', {
//var sp = new SerialPort('/dev/tty.usbserial-A6008iDi', {
	parser: serialport.parsers.readline("\r\n"),
	baudrate: 9600,
	databits: 8,
	stopbits: 1,
});

var socketio = require('socket.io'),
	http = require('http'),
	server = http.createServer(app),
	sio = socketio.listen(server);

server.listen(3000);
console.log('Listening on port 3000');

sio.on('connection', function(socket){
	// シリアルポートにデータが来たときに
	// Arrived the data on serial port
	sp.on('data', function(data){
		//console.log(data);
		socket.emit('push', data);
	});
});
