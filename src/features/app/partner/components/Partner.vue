<script setup lang="ts">
import type {PartnerInterface} from "@/shared/interfaces/PartnerInterface";
import BtnActifNoActif from "@/components/BtnActifNoActif.vue";
import {useUserStore} from "@/stores/userStore";

const userStore = useUserStore()

const props = defineProps<{
  data : PartnerInterface,
}>()


const emit = defineEmits<{
  (e: "goChangeActivePartner", partner_id: number, active_state :number ):void
}>()

function goChangeActive(active_state: number, name : string){
  emit('goChangeActivePartner', props.data.id, active_state)
  console.log(name)
}

</script>

<template>
  <td><img id="imgLogo" class="m_5" :src="props.data.logo_url" alt=""></td>
    <td><router-link :to="'/app/partner/detail/'+props.data.id" class="link_effect">{{props.data.partner_name}}</router-link></td>
    <td v-if="userStore.currentUser.is_admin">
      <BtnActifNoActif :state="props.data.partner_active" @changeactive="goChangeActive" :name="props.data.partner_name"/>
    </td>
    <td v-else>
      <div>{{props.data.partner_active? "Actif" : "Non-Actif"}}</div>
    </td>
    <td>
      {{props.data.user_name}}
    </td>
    <td>
      {{props.data.email}}
    </td>
</template>

<style scoped lang="sass">
#imgLogo
  max-width: 40px
  max-height: 40px
  border: 1px solid black
  border-radius: 6px
  overflow: hidden
td
  text-align: center
</style>