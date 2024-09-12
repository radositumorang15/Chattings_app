import consumer from "./consumer";

document.addEventListener('turbo:load', () => {
  const chatRoomElement = document.getElementById('chat-room');
  if (chatRoomElement) {
    const chatRoomId = chatRoomElement.dataset.chatRoomId;

    const chatChannel = consumer.subscriptions.create(
      { channel: "ChatRoomChannel", chat_room_id: chatRoomId },
      {
        connected() {
          console.log("Connected to the chat room.");
        },

        disconnected() {
          console.log("Disconnected from the chat room.");
        },

        received(data) {
          // This is where the new message gets added to the chat room without refreshing the page
          const messagesContainer = document.getElementById('messages');
          messagesContainer.innerHTML += data.rendered_message;
          messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
        }
      }
    );
  }
});
