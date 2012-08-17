var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var sp = new SerialPort('/dev/tty.usbmodem1411', {
//var sp = new SerialPort('/dev/tty.usbserial-A6008iDi', {
	parser: serialport.parsers.readline("\r\n"),
	baudrate: 9600,
	databits: 8,
	stopbits: 1,
	parity: 0
});

var socketio = require('socket.io-client');
var sio  = socketio.connect('http://niccolli.node-ninja.com:3000/device');
var sio2 = socketio.connect('http://chocolate.local:3000/device');

sp.on('data', function(data){
//	console.log(data);
	sio.emit('send', data);
	sio2.emit('send', data);
});

