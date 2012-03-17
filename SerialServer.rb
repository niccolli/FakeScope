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
		# バッファに流し込む
		@serialBuffer = @serialBuffer + data
		# 改行で分割
		tempAry = @serialBuffer.split
		# 改行が含まれていたら
		if tempAry.length >= 2 then
			# 改行の手前はWebSocketへ
			@channel.push(tempAry[0])
			# 改行の後ろはバッファに戻す
			@serialBuffer = tempAry[1]
		end
	end
	
	EM::WebSocket.start(:host => '0.0.0.0', :port => 8080, :debug => true) do |ws|
		ws.onopen {
			sid = @channel.subscribe { |msg| ws.send msg }
			# 切断時の処理に接続時のIDが必要になるのでここで
			ws.onclose {
				@channel.unsubscribe(sid)
			}
		}
	end
end
