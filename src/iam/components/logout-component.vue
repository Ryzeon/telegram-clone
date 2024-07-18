<script setup lang="ts">
import {useRouter} from "vue-router";
import {inject} from "vue";
import {IStorage} from "../../shared/plugins/interface/istorage.ts";

const router = useRouter();
const storage = inject<IStorage>('storage');

const logout = () => {
  storage?.removeItem('token');
  router.push({name: 'login'});
}

</script>

<template>
  <div class="logout">
    <button @click="logout"
        class="button-logout">Logout</button>
  </div>
</template>

<style scoped lang="scss">
.logout {
  position: fixed;
  bottom: 10px;
  left: 10px;

  .button-logout {
    background-color: #f44336;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 20px;
  }
}
</style>