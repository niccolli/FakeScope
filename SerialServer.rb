#!/usr/bin/env ruby

#require 'eventmachine'
require 'em-serialport'
require 'em-websocket'

EM.run do
	# シリアルポートを開く
	serial = EM.open_serial('/dev/tty.usbserial-A6008iDi', 9600, 8, 1, 0)
	
	# WebSocketサーバを立てる
	@channel = EM::Channel.new

	# 文字列バッファ
	@serialBuffer = ''
	serial.on_data do |data|
		@serialBuffer = @serialBuffer + data
		tempAry = @serialBuffer.split
		#puts tempAry.length
		if tempAry.length >= 2 then
			@serialBuffer = tempAry[1]
			@channel.push(tempAry[0])
		end
	end
	
	EM::WebSocket.start(:host => '0.0.0.0', :port => 8080, :debug => true) do |ws|
		ws.onopen {
			@channel.subscribe { |msg| ws.send msg }
		}
	end
end
