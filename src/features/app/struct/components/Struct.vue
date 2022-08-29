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
  <td><router-link :to="'/app/struct/detail/'+props.data.id">{{props.data.struct_name}}</router-link></td>
  <td><router-link :to="'/app/partner/detail/'+props.data.partner_id" class="d_flex justify_content_center align_items_center">
    <img :src="props.data.logo_url" alt="" id="logoPartnerMini">
    <span>{{props.data.partner_name}}</span>
  </router-link></td>
  <td v-if="userStore.currentUser.is_admin">
    <BtnActifNoActif :state="props.data.struct_active" @changeactive="goChangeActive" />
  </td>
</template>

<style scoped lang="sass">
#logoPartnerMini
  max-width: 40px
  max-height: 40px
</style>