class MessagesController < ApplicationController
  def create
    @chat_room = ChatRoom.find(params[:chat_room_id])
    @message = @chat_room.messages.new(message_params)
  
    if @message.save
      # Broadcast the message to the chat room
      rendered_message = render_to_string(partial: 'messages/message', locals: { message: @message })
      ActionCable.server.broadcast "chat_room_#{@chat_room.id}_channel", { rendered_message: rendered_message }
      
      # Set a success flash message
      flash[:notice] = "Message successfully added!"
      
      # Redirect back to the chat room to show the success message
      redirect_to chat_room_path(@chat_room)
    else
      render json: { error: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :username)
  end
end
