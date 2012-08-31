FakeScope
======================
HTML Oscilloscope for Arduino.  
Powered by Node.js, WebSocket/Socket.io and HTML5 Canvas.

Usage
----------------------
### Preparation
Server script **app.js** uses [express](http://expressjs.com/), [serialport](https://github.com/voodootikigod/node-serialport) and [Socket.IO](http://socket.io/).  
Please install these modules by following command before running the server.

	npm install

### Start the server
	node app.js

The script will start watching serial port. When the first WebSocket client appears, Arduino is reseted and start streaming.

If you want to stop the server, please type Ctrl-C.

### Open HTML
After starting the server, open [yourlocaldomain].local:3000 . You need to use the browser available WebSocket and Canvas. 

Notice
---------------------
The baudrate is set 9600bps. If you set the baudrate more faster, the time between each point is shorter a little. I think that it's enough to set 9600bps.

Gratitude
---------------------
### flotr2
[http://www.humblesoftware.com/flotr2/index](http://www.humblesoftware.com/flotr2/index)  
HTML5 graph drawing library based on Canvas. Written in JavaScript.
