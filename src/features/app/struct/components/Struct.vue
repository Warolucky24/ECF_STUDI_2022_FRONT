<script setup lang="ts">
import {useUserStore} from "@/stores/userStore";
import type {StructInterface} from "@/shared/interfaces";
import BtnActifNoActif from "@/components/BtnActifNoActif.vue";
import {ref} from "vue";
import StructUpdate from "@/features/app/struct/components/StructUpdate.vue";
import Delete from "@/features/app/components/Delete.vue";


const userStore = useUserStore()
const modifyStructBool = ref<boolean>(false)
const deleteStructBool = ref<boolean>(false)

const props = defineProps<{
  data :StructInterface
}>()

const emit = defineEmits<{
  (e: "goChangeActiveStruct", struct_id: number, active_state:number):void
}>()

function goChangeActive(active_state:number){
  emit('goChangeActiveStruct', props.data.id, active_state)
}
</script>


<template>
  <div class="d_flex card justify_content_between align_items_center">
    <template v-if="!modifyStructBool">
      <div class="w_25 d_flex align_items_center">
        <router-link :to="'/app/struct/detail/'+props.data.id" class="link_effect">{{props.data.struct_name}}</router-link>
      </div>
      <div class="d_flex justify_content_center align_items_center">
        <div v-if="userStore.currentUser.is_admin">
          <BtnActifNoActif :state="props.data.struct_active" @changeactive="goChangeActive" :name="props.data.struct_name"/>
        </div>
        <div :class="{text_green: props.data.struct_active===1, text_red: props.data.struct_active!==1}" class="ms_5">
          {{props.data.struct_active===1 ? "Actif" : "Inactive"}}
        </div>
      </div>
      <div id="hide_mobil" class="d_flex justify_content_arround w_100 align_items_center">
        <div class="d_flex flex_column justify_content_arround align_items_center">
          <div class="m_5"><b>Partenaire :</b></div>
          <router-link :to="'/app/partner/detail/'+props.data.partner_id" class="d_flex justify_content_center align_items_center link">
            <img :src="props.data.logo_url" alt="" class="card_img">
            <span class="ms_10">{{props.data.partner_name}}</span>
          </router-link>
        </div>
        <div class="d_flex flex_column justify_content_center align_items_center">
          <div><b>Nom gérant :</b></div>
          <div>{{props.data.user_name}}</div>
          <div><b>Mail :</b></div>
          <div>{{props.data.email}}</div>
        </div>
      </div>
    </template>
    <template v-if="modifyStructBool">
      <StructUpdate :struct="props.data" @is-update="modifyStructBool = !modifyStructBool" />
    </template>
    <div v-if="userStore.currentUser.is_admin && !modifyStructBool" class="d_flex justify_content_center align_items_center">
      <div id="btn_modify" @click="modifyStructBool = !modifyStructBool">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </div>
      <div id="btn_delete" class="mx_10" @click="deleteStructBool = !deleteStructBool">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
        </svg>
      </div>
      <div v-if="deleteStructBool">
        <Delete :id="props.data.id" :name="props.data.struct_name" type="struct" @go-close="deleteStructBool= !deleteStructBool" />
      </div>
    </div>
    <div class="card_etat" :class="{bg_red : props.data.struct_active!==1, bg_green : props.data.struct_active===1}"></div>
  </div>




</template>

<style scoped lang="sass">
@import "@/assets/main.sass"
.link
  color: black
  text-decoration: none
  transition: all .4s
  &:hover
    text-decoration: underline
#btn_modify
  cursor: pointer
  transition: all .4s
  &:hover
    color: green
#btn_delete
  cursor: pointer
  transition: all .4s
  &:hover
    color: red

#hide_mobil
  +lg_max
    display: none
</style>