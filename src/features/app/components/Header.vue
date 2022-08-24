<script setup lang="ts">
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/userStore";
import {reactive} from "vue";

const router = useRouter()

const unconnect = () => {
  const userStore = useUserStore()
  userStore.isConnected = false
  router.push("/")
}

const state = reactive<{
  open: boolean
}>({
  open : false
})

</script>


<template>
  <nav>
    <router-link class="nav_link" to="/app/profil">Profils</router-link>
    <router-link class="nav_link" to="/app/partner">Partenaires</router-link>
    <router-link class="nav_link" to="/app/struct">Structures</router-link>
    <div class="nav_link" @click="unconnect">Déconnexion</div>
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
  color: $gray
  cursor: pointer
  background: none
  padding: 10px
  transition: all .4s
  &:hover
    color: white
</style>