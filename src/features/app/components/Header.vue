<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "@/stores/userStore";
import {defaultUser} from "@/shared/interfaces";
import {reactive} from "vue";

const router = useRouter()
const route = useRoute()
const userStore = useUserStore();

const un_connect = () => {
  userStore.isConnected = false;
  userStore.currentUser = defaultUser;
  localStorage.removeItem("user");
  userStore.sendMsg("Vous êtes maintenant deconnecte", "danger");
  router.push("/");
}

const state = reactive<{
  dropUser: boolean,
}>({
  dropUser: false
})


</script>


<template>
  <nav class="mb_20" id="nav_desktop">
    <div v-if="userStore.currentUser.is_admin">
      <router-link class="nav_link" :class="{underline_left_to_right : route.meta.page !== 'dash'}" to="/app/dashboard">Dashboard</router-link>
    </div>
    <router-link class="nav_link"  :class="{underline_left_to_right : route.meta.page !== 'partner'}" to="/app/partner">Partenaires</router-link>
    <router-link class="nav_link"  :class="{underline_left_to_right : route.meta.page !== 'struct'}" to="/app/struct">Structures</router-link>

    <div id="img_user" @click="state.dropUser = !state.dropUser">
      <div class="d_flex justify_content_around align_items_center">
        <div class="txt_white me_10 txt_user">{{userStore.currentUser.user_name}}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
      </div>
      <div class="dropdown_user" v-if="state.dropUser">
        <router-link to="/app/profil">Profil</router-link>
        <a href="#" @click="un_connect">Déconnexion</a>
      </div>
    </div>

  </nav>
</template>

<style scoped lang="sass">
@import "@/assets/main.sass"

nav
  height: 60px
  width: 100vw
  background: $primary
  display: flex
  align-items: center


.nav_link
  text-decoration: none
  text-align: center
  color: $gray
  cursor: pointer
  background: none
  margin: 0 10px
  transition: all .4s
  display: flex
  justify-content: start
  align-items: center
  &:hover
    color: white
.router-link-active
  color: white

.txt_user
  +md_max
    display: none

#img_user
  cursor: pointer
  position: relative
  margin-left: auto
  margin-right: 15px

  svg
    color: white

  .dropdown_user
    position: absolute
    display: flex
    flex-direction: column
    right: 5px
    top: 45px
    border: 1px solid $secondary
    background: $primary
    min-width: 150px
    padding: 10px 15px
    text-align: end
    border-radius: 5px 5px
    &:hover
      color: $secondary
    a
      color: white
      padding: 4px
      text-decoration: none
      transition: all .4s
      &:hover
        color: $secondary


</style>