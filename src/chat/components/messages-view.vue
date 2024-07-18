<script setup lang="ts">

import MessageContent from "./message-content.vue";
import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore();

const messages = computed(() => store.state.messages);

</script>

<template>
<!--  <div class="horizontal-divider"></div>-->
  <div class="container-messages">
    <message-content v-for="message in messages" :message="message" :key="message.userId"/>
  </div>
</template>
<style scoped lang="scss">
@import "src/assets/main.scss";

.horizontal-divider {
  margin-top: 70px;
  width: 100%;
  height: 3px;
  background: $fontColorActive;

}
.container-messages {
  margin-left: 10px;
  margin-top: 10px;
}
</style>