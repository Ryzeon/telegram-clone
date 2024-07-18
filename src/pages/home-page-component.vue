<script setup lang="ts">

import LogoutComponent from "../iam/components/logout-component.vue";
import SearchComponent from "../chat/components/search-component.vue";
import UserViewComponent from "../chat/components/user-view-component.vue";
import MessagesView from "../chat/components/messages-view.vue";
import MessageInput from "../chat/components/message-input.vue";
import {onMounted} from "vue";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../shared/services/firebase.ts";
import {useStore} from "vuex";

const store = useStore();


onMounted(() => {
  const messagesCollection = collection(db, "messages");
  onSnapshot(messagesCollection, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        store.dispatch('getMessages');

      }
    });
  });
});
</script>

<template>
  <div class="home">
    <section class="container-users">
      <SearchComponent/>
      <UserViewComponent/>
    </section>
    <section class="messages">
      <MessagesView/>
      <MessageInput/>
      <LogoutComponent/>
    </section>
  </div>
</template>


<style scoped lang="scss">

@import "src/assets/main.scss";

.home {
  background: $backgroundColor;
  width: 100%;
  height: 100vh;
  color: $fontColor;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  .container-users {
    width: 35%;
    display: flex;
    flex-direction: column;
  }

  .messages {
    width: 65%;
    background: $backgroundColorMessages;
    height: 100vh;
  }
}
</style>