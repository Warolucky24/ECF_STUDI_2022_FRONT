<script setup lang="ts">
import {useUserStore} from "@/stores/userStore";
import {reactive} from "vue";
import ChangePass from "@/features/app/components/ChangePass.vue";
import ChangeName from "@/features/app/components/ChangeName.vue";
import ChangeProfil from "@/features/app/components/ChangeProfil.vue";

const userStore = useUserStore()

const state = reactive<{
  openPass: boolean,
  openName: boolean,
  openProfil: boolean

}>({
  openPass: false,
  openName: false,
  openProfil: false
})

async function goChangeName(name: string){
  try {
    await userStore.updateUser(name, "user_name")
    userStore.sendMsg("Modification pris en compte !", "success")
    userStore.currentUser.user_name = name
    state.openName = false
  }catch (e) {
    //@ts-ignore
    userStore.sendMsg(e.error, "warning")
  }
}

async function goChangeProfil(profil: string){
  try {
    await userStore.updateUser(profil, "profil_url")
    userStore.sendMsg("Modification pris en compte !", "success")
    userStore.currentUser.profil_url = profil
    state.openProfil = false
  }
  catch (e)
  {
    //@ts-ignore
    userStore.sendMsg(e.error, "warning")
  }
}
</script>


<template>
  <div class="container flex flex-col content-center items-center content">
    <h4 class="m-1 font-bold text-2xl">Bienvenue {{userStore.currentUser.user_name}}</h4>
    <div class="flex content-center w-1/5 m-2">
      <img class="rounded-md ml-auto w-full" :src="userStore.currentUser.profil_url" alt="profil_logo">
      <div @click="state.openProfil = true" class="ml-1 w-2/6" id="btn_modify">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </div>
    </div>
    <div>
      <div class="my-2">Mail : {{userStore.currentUser.email}}</div>
    </div>
    <div class="flex content-center items-center m-1">
      <div>Nom : {{userStore.currentUser.user_name}}</div>
      <div @click="state.openName = true" class="ml-2" id="btn_modify">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </div>
    </div>
    <div class="m-1">
      Administrateur : {{userStore.currentUser.is_admin ? "Oui" : "Non"}}
    </div>

    <div>
      <div @click="state.openPass = !state.openPass" id="btn_change_pass">
        <b>Changer de mot de passe</b>
      </div>

      <div v-if="state.openPass">
          <ChangePass @go-close="state.openPass = false"/>
      </div>

      <div v-if="state.openName">
          <ChangeName
              :name="userStore.currentUser.user_name"
              @go-submit="goChangeName"
              @go-close="state.openName = false"
          />
      </div>
      <div v-if="state.openProfil">
        <ChangeProfil
          :profil="userStore.currentUser.profil_url"
          @go-submit="goChangeProfil"
          @go-close="state.openProfil = false"
          />
      </div>
      <div class="need_new_pass_msg" v-if="userStore.currentUser.first_connect">
        <b>Password actuel généré automatiquement. veuillez le changer !</b>
      </div>
    </div>
  </div>

</template>

<style scoped lang="sass">
@import "@/assets/main.sass"
.error_input
  border: 1px solid red
.need_new_pass_msg
  color: red
#btn_change_pass
  text-align: center
  cursor: pointer
  transition: all .4s
  &:hover
    transform: scale(1.05)
    color: $secondary

#btn_modify
  cursor: pointer
  transition: color .4s
  &:hover
    color: $secondary
</style>