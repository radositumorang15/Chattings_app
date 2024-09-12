import consumer from "./consumer";

document.addEventListener('DOMContentLoaded', () => {
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
          const messagesContainer = document.getElementById('messages');
          messagesContainer.innerHTML += data.rendered_message;
          messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
        }
      }
    );

    const form = document.getElementById('message-form');
    if (form) {
      form.addEventListener('ajax:success', () => {
        console.log('Message sent successfully.');
      });

      form.addEventListener('ajax:error', () => {
        console.error('Error in form submission.');
      });
    }
  }
});

document.addEventListener("turbo:load", () => {
  const messageForm = document.getElementById('message-form');

  if (messageForm) {
    messageForm.addEventListener('ajax:success', (event) => {
      // Clear the message input after successful submission
      document.getElementById('floatingMessage').value = '';

      // Optionally, scroll to the latest message in the chat
      const messagesContainer = document.getElementById('messages');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });

    // Prevent form submission from redirecting
    messageForm.addEventListener('ajax:error', () => {
      console.error('Message failed to send');
    });
  }
});
