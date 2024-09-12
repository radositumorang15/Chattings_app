class Message < ApplicationRecord
    belongs_to :chat_room
    after_create_commit { broadcast_message }
  
    def broadcast_message
      ChatRoomChannel.broadcast_to(chat_room, { username: username, content: content })
    end
  end
  