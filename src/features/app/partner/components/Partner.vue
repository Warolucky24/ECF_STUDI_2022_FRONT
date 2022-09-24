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
  <div class="m-3 card relative">
    <div class="flex content-around items-center flex-col md:flex-row">
      <div class="md:w-1/5 m-1 md:m-0">
        <img class="m-1 rounded h-11" :src="props.data.logo_url" alt="logo">
      </div>
      <div class="md:w-1/5 m-1 md:m-0 flex items-center content-center">
        <router-link :to="'/app/partner/detail/'+props.data.id" class="link_effect card_title">{{props.data.partner_name}}</router-link>
      </div>
      <div class="md:w-2/5 lg:1/5 m-1 md:m-0 flex content-around items-center">
        <div class="flex content-center items-center">
          <div v-if="userStore.currentUser.is_admin"><BtnActifNoActif :state="props.data.partner_active" @changeactive="goChangeActive" :name="props.data.partner_name"/></div>
          <div class="ml-1" :class="{text_red: props.data.partner_active!==1, text_green: props.data.partner_active===1}">{{props.data.partner_active? "Actif" : "Inactif"}}</div>
        </div>
      </div>
      <div class="flex flex-col w-1/5 text-center hidden lg:block">
        <div>
          <b>Nom du gérant :</b>
        </div>
        <div>
          {{props.data.user_name}}
        </div>
        <div>
          <b>Mail du gérant :</b>
        </div>
        <div>
          {{props.data.email}}
        </div>
      </div>
      <div v-if="userStore.currentUser.is_admin" class=" m-1 sm:w-1/5 absolute top-0 left-0 sm:relative">
        <div id="btn_delete" class="w-1/3 m-auto" @click="deletePartnerBool = !deletePartnerBool">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill block m-auto hover:text-red-600 transition duration-300" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="card_etat" :class="{'bg-red-600' : props.data.partner_active!==1, 'bg-emerald-500' : props.data.partner_active===1}"></div>
  </div>
  <div v-if="deletePartnerBool">
    <Delete :id="props.data.id" :name="props.data.partner_name" type="partner" @go-close="deletePartnerBool = !deletePartnerBool" />
  </div>
</template>
