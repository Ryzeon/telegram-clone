<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {db} from "../../shared/services/firebase.ts";
import {collection, getDocs} from "firebase/firestore";
import {User} from "../../shared/model/user.ts";
import {useStore} from "vuex";


const users = ref<User[]>([]);
const usersCollection = collection(db, "users");

const store = useStore();
const loggedPhone = computed(() => store.state.userId);

const fetchUsers = async () => {
  const querySnapshot = await getDocs(usersCollection);
  querySnapshot.forEach((doc) => {
    users.value.push(doc.data() as User);
  });
};

onMounted(() => {
  fetchUsers();
});

const setUserId = (user: User) => {
  store.commit('setUserId', user.userId);
  store.dispatch('getMessages');
};

</script>

<template>
  <div class="users">
    <ul class="usersList">
      <li
          :class="{
          active: loggedPhone === user.userId
        }"
          v-for="user in users"
          :key="user.userId"
          @click="setUserId(user)"
      >
        <img :src="user.photo" width="65" height="65" alt="User photo"/>
        <section class="description">
          <div class="name">{{ user.name }}</div>
          <div class="lastMessage">Click here to join chat!.</div>
        </section>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/main.scss";

.users {
  width: 100%;

  .usersList {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 10px 0 0;

    li {
      width: 95%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      margin-bottom: 10px;
      border-radius: 7px;
      cursor: pointer;

      img {
        margin-left: 20px;
        border-radius: 50%;
      }

      .description {
        padding: 10px;
        display: flex;
        width: calc(100% - 65px);
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        .name {
          font-size: 16px;
        }

        .lastMessage {
          font-size: 14px;
        }
      }
    }

    .active {
      background: $fontColorActive;
    }
  }
}
</style>