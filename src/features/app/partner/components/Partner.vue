<script setup lang="ts">
import PartnerUpdate from "@/features/app/partner/components/PartnerUpdate.vue";
import type {PartnerInterface} from "@/shared/interfaces/PartnerInterface";
import BtnActifNoActif from "@/components/BtnActifNoActif.vue";
import {useUserStore} from "@/stores/userStore";
import {ref} from "vue";

const userStore = useUserStore()
const modifyPartnerBool = ref<boolean>(false)

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
  <div class="d_flex card">
    <template v-if="!modifyPartnerBool">
      <div>
        <img class="m_5 card_img" :src="props.data.logo_url" alt="logo">
      </div>
      <div class="w_25 d_flex align_items_center">
        <router-link :to="'/app/partner/detail/'+props.data.id" class="link_effect card_title">{{props.data.partner_name}}</router-link>
      </div>
      <div class="w_75 d_flex justify_content_arround align_items_center">
        <div class="d_flex justify_content_center align_items_center">
          <div v-if="userStore.currentUser.is_admin"><BtnActifNoActif :state="props.data.partner_active" @changeactive="goChangeActive" :name="props.data.partner_name"/></div>
          <div class="ms_10" :class="{text_red: props.data.partner_active!==1, text_green: props.data.partner_active===1}">{{props.data.partner_active? "Actif" : "Non-Actif"}}</div>
        </div>
        <div class="d_flex flex_column">
          <div>
            <b>Nom du gérant :</b> {{props.data.user_name}}
          </div>
          <div>
            <b>Mail du gérant :</b> {{props.data.email}}
          </div>
        </div>
      </div>
    </template>
    <template v-if="modifyPartnerBool">
      <PartnerUpdate :data="props.data" @is-update="modifyPartnerBool = !modifyPartnerBool"/>
    </template>

    <div v-if="userStore.currentUser.is_admin && !modifyPartnerBool" class="d_flex justify_content_center align_items_center">
      <div id="btn_modify" @click="modifyPartnerBool = !modifyPartnerBool">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </div>
    </div>
    <div class="card_etat" :class="{bg_red : props.data.partner_active!==1, bg_green : props.data.partner_active===1}"></div>
  </div>
</template>

<style scoped lang="sass">

#btn_modify
  cursor: pointer
  transition: all .4s
  &:hover
    color: green
</style>