FakeScope
======================
HTML Oscilloscope for Arduino.  
Powered by Ruby/EventMachine, WebSocket and [flotr2](http://www.humblesoftware.com/flotr2/index)(Graph drawing library w/ Canvas).

Usage
----------------------
### Preparation
Server script **SerialServer.rb** uses [em-websocket](https://github.com/igrigorik/em-websocket) and [em-serialport](https://github.com/railsbob/em-serialport).  
Please install by following command before running the server.

	gem install em-websocket  
	gem install em-serialport

### Start the server
	ruby SerialServer.rb

The script will start watching serial port. When the first WebSocket client appears, Arduino is reseted and start streaming.

If you want to stop the server, please type Ctrl-C.

Notice
---------------------
Buffering of SerialServer.rb is poor a little. Therefore, a part of graph line will be broken because some WebSocket packets contain large value. Someday I'll be fix.

The baudrate is set 9600bps. If you set the baudrate more faster, the time between each point is shorter a little. I think that it's enough to set 9600bps.

