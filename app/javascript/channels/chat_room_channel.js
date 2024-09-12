import { createConsumer } from "@rails/actioncable";

const consumer = createConsumer("/cable");

document.addEventListener('turbo:load', () => {
  const chatRoomElement = document.getElementById('chat-room');
  if (chatRoomElement) {
    const chatRoomId = chatRoomElement.dataset.chatRoomId;

    consumer.subscriptions.create(
      { channel: "ChatRoomChannel", chat_room_id: chatRoomId },
      {
        connected() {
          console.log("Connected to the chat room.");
        },

        disconnected() {
          console.log("Disconnected from the chat room.");
        },

        received(data) {
          const messagesContainer = document.getElementById('messages');
          messagesContainer.insertAdjacentHTML('beforeend', data.rendered_message);
          messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
        }
      }
    );
  }
});
