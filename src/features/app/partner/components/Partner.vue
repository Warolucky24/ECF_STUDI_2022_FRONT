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

function goChangeActive(active_state: number){
  emit('goChangeActivePartner', props.data.id, active_state)
}

</script>

<template>
  <td><img id="imgLogo" class="m_5" :src="props.data.logo_url" alt=""></td>
    <td><router-link :to="'/app/partner/detail/'+props.data.id">{{props.data.partner_name}}</router-link></td>
    <td v-if="userStore.currentUser.is_admin">
      <BtnActifNoActif :state="props.data.partner_active" @changeactive="goChangeActive" />
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
    <td v-if="userStore.currentUser.is_admin">
      <div class="btn_delete">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-file-x-fill" viewBox="0 0 16 16">
          <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6.854 6.146 8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 1 1 .708-.708z"/>
        </svg>
      </div>
    </td>

</template>

<style scoped lang="sass">
.btn_delete
  cursor: pointer
  color: red
  padding: 5px
  transition: all .4s
  &:hover
    color: #b00202
#imgLogo
  max-width: 40px
  max-height: 40px
  border: 1px solid black
  border-radius: 6px
  overflow: hidden
</style>