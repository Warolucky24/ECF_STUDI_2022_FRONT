<script setup lang="ts">
import {useRoute} from "vue-router";
import type {PartnerDetailInterface} from "@/shared/interfaces";
import {dataPartnerById} from "@/shared/services";
import {reactive, watchEffect} from "vue";
import StructInDetailPartner from "@/features/app/partner/components/structInDetailPartner.vue";
import {useUserStore} from "@/stores/userStore";
import BtnActifNoActif from "@/components/BtnActifNoActif.vue";
import {usePartnerStore} from "@/stores/partnerStore";

const route = useRoute()
const userStore = useUserStore()


const state = reactive<{
  partner: PartnerDetailInterface | null
}>({
  partner : null

})

watchEffect(async ()=>{
  try {
    state.partner = await dataPartnerById(parseInt(route.params.partner_id as string));
    console.log(state.partner)
  }catch (e){
    // @ts-ignore
    userStore.sendMsg(e.error, "danger");
  }
})

async function goChangeActivePartner(active_state: number){
  try {
    const partnerStore = usePartnerStore()
    //@ts-ignore
    const partnerId = state.partner.partner_id;
    //@ts-ignore
    await partnerStore.changeActive(partnerId, active_state);
    //@ts-ignore
    state.partner.partner_active = active_state
    const partnerIndex = partnerStore.partner.findIndex((e) => e.id === partnerId);
    const name_partner = partnerStore.partner[partnerIndex].partner_name
    const etat = active_state === 1 ? "Actif" : "Non-Actif";
    userStore.sendMsg(`${name_partner} est maintenant ${etat}`, "success");
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger");
  }
}

</script>
<template>
  <div class="container" v-if="state.partner">
    <div>
      <router-link to="/app/partner" class="btn_primary">Retour</router-link>
    </div>
    <div class="separator_secondary"></div>
    <div class=" d_flex flex_column justify_content_center align_items_center">
      <div>
        <img :src="state.partner.logo_url" alt="LogoPartner" id="LogoPartnerBig">
      </div>
      <h3 class="m_10">{{state.partner.partner_name}}</h3>
      <div class="d_flex justify_content_center align_items_center">
        <div v-if="userStore.currentUser.is_admin">
          <BtnActifNoActif :state="state.partner.partner_active" @changeactive="goChangeActivePartner" />
        </div>
        <div class="ms_10" :class="{color_green : state.partner.partner_active===1 , color_red : state.partner.partner_active!==1}">
          {{state.partner.partner_active===1 ? "Actif" : "Non-Actif"}}
        </div>
      </div>
      <div class="m_10">
        <h5>Gérant :</h5>
        <table>
          <tr>
            <td>Nom : </td>
            <td>{{state.partner.user_name}}</td>
          </tr>
          <tr>
            <td>Email :</td>
            <td>{{state.partner.user_email}}</td>
          </tr>
        </table>
      </div>
      <div class="m_10">
        <h5>Droit :</h5>
        <table>
          <tr>
            <td>Vente de boissons :</td>
            <td>
              <btn-actif-no-actif :state="state.partner.gestion.v_boisson" />
            </td>
          </tr>
          <tr>
            <td>Vente de vêtements :</td>
            <td>
              <btn-actif-no-actif :state="state.partner.gestion.v_vetement" />
            </td>
          </tr>
          <tr>
            <td>Cours particulier :</td>
            <td>
              <btn-actif-no-actif :state="state.partner.gestion.c_particulier" />
            </td>
          </tr>
          <tr>
            <td>Cours de pilate :</td>
            <td>
              <btn-actif-no-actif :state="state.partner.gestion.c_pilate" />
            </td>
          </tr>
          <tr>
            <td>Cours de crosstrainning :</td>
            <td>
              <btn-actif-no-actif :state="state.partner.gestion.c_crosstrainning" />
            </td>
          </tr>
        </table>
        <div v-if="state.partner.struct" v-for="struct in state.partner.struct" :key="struct.id">
          <struct-in-detail-partner :data="struct"/>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="sass">
#LogoPartnerBig
  max-width: 100px
  max-height: 100px
  border-radius: 5px

.color_green
  color: green
.color_red
  color: red
</style>