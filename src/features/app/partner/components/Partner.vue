<script setup lang="ts">
import type {PartnerInterface} from "@/shared/interfaces/PartnerInterface";
import BtnActifNoActif from "@/components/BtnActifNoActif.vue";
import {useUserStore} from "@/stores/userStore";
import {ref} from "vue";
import Delete from "@/features/app/components/Delete.vue";

const userStore = useUserStore()
const deletePartnerBool = ref<boolean>(false)

const props = defineProps<{
  data : PartnerInterface
}>()

const emit = defineEmits<{
  (e: "goChangeActivePartner", partner_id: number, active_state :number ):void
}>()

function goChangeActive(active_state: number){
  emit('goChangeActivePartner', props.data.id, active_state)
}


</script>

<template>
  <div class="flex m-3 card">
      <div>
        <img class="m-1 rounded h-11" :src="props.data.logo_url" alt="logo">
      </div>
      <div class="flex items-center content-center">
        <router-link :to="'/app/partner/detail/'+props.data.id" class="link_effect card_title">{{props.data.partner_name}}</router-link>
      </div>
      <div class="w_75 flex content-around items-center">
        <div class="flex content-center items-center">
          <div v-if="userStore.currentUser.is_admin"><BtnActifNoActif :state="props.data.partner_active" @changeactive="goChangeActive" :name="props.data.partner_name"/></div>
          <div class="ms_10" :class="{text_red: props.data.partner_active!==1, text_green: props.data.partner_active===1}">{{props.data.partner_active? "Actif" : "Inactif"}}</div>
        </div>
        <div class="flex flex-col" id="gerant">
          <div>
            <b>Nom du gérant :</b> {{props.data.user_name}}
          </div>
          <div>
            <b>Mail du gérant :</b> {{props.data.email}}
          </div>
        </div>
      </div>

    <div v-if="userStore.currentUser.is_admin" class="d_flex justify_content_center align_items_center">
      <div id="btn_delete" class="mx_10" @click="deletePartnerBool = !deletePartnerBool">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
        </svg>
      </div>
    </div>
    <div v-if="deletePartnerBool">
      <Delete :id="props.data.id" :name="props.data.partner_name" type="partner" @go-close="deletePartnerBool = !deletePartnerBool" />
    </div>
    <div class="card_etat" :class="{bg_red : props.data.partner_active!==1, bg_green : props.data.partner_active===1}"></div>
  </div>
</template>



<style scoped lang="sass">
@import "@/assets/main.sass"

#gerant
  +lg_max
    display: none

#btn_delete
  cursor: pointer
  transition: all .4s
  &:hover
    color: red
#btn_modify
  cursor: pointer
  transition: all .4s
  &:hover
    color: green
</style>