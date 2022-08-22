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
    <router-link to="/app/profil">Profils</router-link>
    <router-link to="/app/partner">Partenaires</router-link>
    <router-link to="/app/struct">Structures</router-link>
    <div @click="unconnect">Déconnexion</div>
  </nav>
</template>

<style scoped lang="sass">
nav
  display: flex
  justify-content: space-around

  min-height: 40px

</style>