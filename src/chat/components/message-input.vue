<script setup lang="ts">

import {ref} from "vue";
import {useStore} from "vuex";
import {collection, addDoc} from "firebase/firestore";
import {db} from "../../shared/services/firebase.ts";

const text = ref<string>('');
const emojiPickerKey = ref(0); // Clave para forzar el re-renderizado


const onChangeText = (newText: string) => {
  text.value = newText;
}

const onSelect = (emoji: string) => {
  text.value += emoji;
}

const store = useStore();
const messageCollection = collection(db, 'messages');

const sendMessage = async () => {
  try {
    const message = {
      userId: store.state.userId,
      text: text.value,
      type: 'text',
      date: new Date().getTime().toString(),
    };
    await addDoc(messageCollection, message);
    text.value = '';
    emojiPickerKey.value++;
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
</script>

<template>
  <div class="input-message-container">
    <emoji-picker :key="emojiPickerKey" class="input-message" picker-type="input" @select="onSelect" @update:text="onChangeText" />

    <button @click="sendMessage">Send</button>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/main.scss";

// style for input msg, in the bottom of the page, with a small botton to send with > icon
.input-message-container {
  display: flex;
  align-items: center;
  padding: 10px;
  background: $backgroundColorMessages;

  // pos in the bottom of the page
  position: fixed;
  bottom: 0;
  width: 65%;

  .input-message {
    width: 85%;
    padding: 10px;
    border-radius: 5px;
  }

  button {
    background: $fontColorActive;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
}
</style>