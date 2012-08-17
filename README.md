FakeScope
======================
HTML Oscilloscope for Arduino.  
Powered by Node.js, WebSocket/Socket.io and HTML5 Canvas.

Usage
----------------------
### Preparation
Server script **SerialServer.js** uses [em-websocket](https://github.com/igrigorik/em-websocket) and [em-serialport](https://github.com/railsbob/em-serialport).  
Please install by following command before running the server.

	npm install

### Start the server
	node SerialServer.js

The script will start watching serial port. When the first WebSocket client appears, Arduino is reseted and start streaming.

If you want to stop the server, please type Ctrl-C.

### Open HTML
	open graph.html

After starting the server, open graph.html. You need to use the browser available WebSocket and Canvas. 

Notice
---------------------
Buffering of SerialServer.rb is poor a little. Therefore, a part of graph line will be broken because some WebSocket packets contain large value. Someday I'll be fix.

The baudrate is set 9600bps. If you set the baudrate more faster, the time between each point is shorter a little. I think that it's enough to set 9600bps.

Gratitude
---------------------
### em-serialport
[https://github.com/railsbob/em-serialport](https://github.com/railsbob/em-serialport)  
Serial-Communication extention for EventMachine.
### em-websocket
[https://github.com/igrigorik/em-websocket](https://github.com/igrigorik/em-websocket)  
WebSocket support extention for EventMachine.
### flotr2
[http://www.humblesoftware.com/flotr2/index](http://www.humblesoftware.com/flotr2/index)  
HTML5 graph drawing library based on Canvas. Written in JavaScript.
