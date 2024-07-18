<script setup lang="ts">

import {Message} from "../../shared/model/message";
import {ref} from "vue";

const props = defineProps({
  message: {required: true},
})

const message = ref<Message>(props.message);

</script>

<template>
  <div class="message">
    {{ message.text }}
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/main.scss";

.message {
  color: $fontColor;
  background: $fontColorActive;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 7px;
  width: fit-content;
  margin-right: 10px;
}
</style>