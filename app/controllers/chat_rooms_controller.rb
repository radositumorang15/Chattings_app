class ChatRoomsController < ApplicationController
  before_action :set_chat_room, only: [:show, :destroy]

  def index
    @chat_rooms = ChatRoom.all
    @chat_room = ChatRoom.new # Ini penting agar form_with dapat bekerja
  end

  def show
    @room = @chat_room.name
  end

  def show
    @chat_room = ChatRoom.find(params[:id])
    @messages = @chat_room.messages.order(created_at: :asc)
    @username = session[:username] ||= Faker::Name.first_name # Save random username in session
  end

  def create
    @chat_room = ChatRoom.new(chat_room_params)
    if @chat_room.save
      redirect_to chat_room_path(@chat_room), notice: 'Chat room was successfully created.'
    else
      @chat_rooms = ChatRoom.all
      render :index
    end
  end

  def destroy
    @chat_room.destroy
    redirect_to chat_rooms_path, notice: 'Chat room was successfully deleted.'
  end

  private

  def set_chat_room
    @chat_room = ChatRoom.find(params[:id])
  end

  def chat_room_params
    params.require(:chat_room).permit(:name)
  end
end
