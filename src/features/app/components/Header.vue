<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "@/stores/userStore";

const router = useRouter()
const route = useRoute()

const unconnect = () => {
  const userStore = useUserStore();
  userStore.isConnected = false;
  userStore.sendMsg("Vous êtes deconnecte");
  router.push("/");
}


</script>


<template>
  <nav class="mb_20" id="nav_desktop">
    <router-link class="nav_link" :class="{underline_left_to_right : route.meta.page !== 'profil'}" to="/app/profil">Profil</router-link>
    <router-link class="nav_link"  :class="{underline_left_to_right : route.meta.page !== 'partner'}" to="/app/partner">Partenaires</router-link>
    <router-link class="nav_link"  :class="{underline_left_to_right : route.meta.page !== 'struct'}" to="/app/struct">Structures</router-link>
    <div class="nav_link underline_left_to_right" @click="unconnect">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
      </svg>
    </div>
  </nav>
</template>

<style scoped lang="sass">
@import "@/assets/main.sass"

nav
  height: 60px
  width: 100vw
  background: #556C96
  display: flex
  align-items: center
  div:last-child
    margin-left: 1fr
.nav_link
  text-decoration: none
  text-align: center
  color: $gray
  cursor: pointer
  background: none
  margin: 0 10px
  transition: all .4s
  &:hover
    color: white
.router-link-active
  color: white

</style>