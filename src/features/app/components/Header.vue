<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "@/stores/userStore";

const router = useRouter()
const route = useRoute()

const unconnect = () => {
  const userStore = useUserStore()
  userStore.isConnected = false
  router.push("/")
}


</script>


<template>
  <nav class="mb_20" id="nav_desktop">
    <router-link class="nav_link" :class="{underline_left_to_right : route.meta.page !== 'profil'}" to="/app/profil">Profil</router-link>
    <router-link class="nav_link"  :class="{underline_left_to_right : route.meta.page !== 'partner'}" to="/app/partner">Partenaires</router-link>
    <router-link class="nav_link"  :class="{underline_left_to_right : route.meta.page !== 'struct'}" to="/app/struct">Structures</router-link>
    <div class="nav_link underline_left_to_right" @click="unconnect">Déconnexion</div>
  </nav>
</template>

<style scoped lang="sass">
@import "@/assets/main.sass"

nav
  height: 80px
  width: 100vw
  background: #556C96
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
  &:hover
    color: white
.router-link-active
  color: white

</style>