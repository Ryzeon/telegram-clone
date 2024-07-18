<script setup lang="ts">

</script>

<template>
  <div class="search">
    <input type="text" placeholder="Search..." class="input-search"/>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/main.scss";

.search {
  margin-top: 10px;
  input[type=text] {
    padding: 10px;
    width: 90%;
    background: $backgroundColorMessages;
    border: none;
    outline: none;
    color: $fontColor;
    &::placeholder {
      color: $fontColor;
    }
  }
}
</style>