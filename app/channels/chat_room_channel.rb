class ChatRoomChannel < ApplicationCable::Channel
  def subscribed
    # Stream from a specific chat room based on the room's ID
    stream_from "chat_room_#{params[:chat_room_id]}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
