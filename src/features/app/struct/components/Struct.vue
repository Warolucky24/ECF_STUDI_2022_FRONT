<script setup lang="ts">
import {useUserStore} from "@/stores/userStore";
import type {StructInterface} from "@/shared/interfaces";
import BtnActifNoActif from "@/components/BtnActifNoActif.vue";


const userStore = useUserStore()

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
  <div class="d_flex justify_content_arround align_items_center card">
    <div>
      <router-link :to="'/app/struct/detail/'+props.data.id" class="link_effect">{{props.data.struct_name}}</router-link>
    </div>
    <div class="d_flex justify_content_center align_items_center">
      <div v-if="userStore.currentUser.is_admin">
        <BtnActifNoActif :state="props.data.struct_active" @changeactive="goChangeActive" :name="props.data.struct_name"/>
      </div>
      <div :class="{text_green: props.data.struct_active===1, text_red: props.data.struct_active!==1}" class="ms_5">
        {{props.data.struct_active===1 ? "Actif" : "Non-actif"}}
      </div>
    </div>
    <div class="d_flex flex_column justify_content_center align_items_center">
      <div class="m_5"><b>Partenaire :</b></div>
      <router-link :to="'/app/partner/detail/'+props.data.partner_id" class="d_flex justify_content_center align_items_center link">
        <img :src="props.data.logo_url" alt="" id="logoPartnerMini">
        <span class="ms_10">{{props.data.partner_name}}</span>
      </router-link>
    </div>
    <div class="card_etat" :class="{bg_red : props.data.struct_active!==1, bg_green : props.data.struct_active===1}"></div>
  </div>




</template>

<style scoped lang="sass">
#logoPartnerMini
  max-width: 40px
  max-height: 40px
.link
  color: black
  text-decoration: none
  transition: all .4s
  &:hover
    text-decoration: underline
</style>