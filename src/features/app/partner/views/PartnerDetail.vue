<script setup lang="ts">
import {useRoute} from "vue-router";
import type {PartnerDetailInterface} from "@/shared/interfaces";
import {dataPartnerById} from "@/shared/services";
import {reactive, watchEffect} from "vue";
import {useUserStore} from "@/stores/userStore";
import BtnActifNoActif from "@/components/BtnActifNoActif.vue";
import {usePartnerStore} from "@/stores/partnerStore";

const route = useRoute()
const userStore = useUserStore()
const partnerStore = usePartnerStore()


const state = reactive<{
  partner: PartnerDetailInterface | null
}>({
  partner : null

})

watchEffect(async ()=>{
  try {
    state.partner = await dataPartnerById(parseInt(route.params.partner_id as string));
  }catch (e){
    // @ts-ignore
    userStore.sendMsg(e.error, "danger");
  }
})

async function goChangeActivePartner(active_state: number){
  try {
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


async function goChangeActiveDroitPartner(gestion_active: number, gestion_name : string){
  try {
    //@ts-ignore
    const partnerId = state.partner.partner_id
    await partnerStore.changeActiveDroit(partnerId, gestion_name, gestion_active)
    //@ts-ignore
    state.partner.gestion[gestion_name] = gestion_active
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger")
  }
}


</script>
<template>
  <div v-if="state.partner">
    <div>
      <div @click="$router.go(-1)" class="btn_primary">Retour</div>
    </div>
    <div class="separator_secondary"></div>
    <div class=" d_flex flex_column justify_content_center align_items_center">
      <div>
        <img :src="state.partner.logo_url" alt="LogoPartner" id="LogoPartnerBig">
      </div>
      <h3 class="m_10">{{state.partner.partner_name}}</h3>
      <div class="d_flex justify_content_center align_items_center">
        <div v-if="userStore.currentUser.is_admin">
          <BtnActifNoActif :state="state.partner.partner_active" @changeactive="goChangeActivePartner" :name="state.partner.partner_name"/>
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
        <h5 class="mb_10">Droit :</h5>
        <table>
          <tr>
            <td>Vente de boissons :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.v_boisson" @changeactive="goChangeActiveDroitPartner" :name="'v_boisson'"/>
            </td>
            <td v-else>
              {{state.partner.gestion.v_boisson === 1 ? "Actif" : "Non-Actif"}}
            </td>
          </tr>
          <tr>
            <td>Vente de vêtements :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.v_vetement" @changeactive="goChangeActiveDroitPartner"  :name="'v_vetement'"/>
            </td>
            <td v-else>
              {{state.partner.gestion.v_vetement === 1 ? "Actif" : "Non-Actif"}}
            </td>
          </tr>
          <tr>
            <td>Cours particulier :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.c_particulier" @changeactive="goChangeActiveDroitPartner"  :name="'c_particulier'"/>
            </td>
            <td v-else>
              {{state.partner.gestion.c_particulier === 1 ? "Actif" : "Non-Actif"}}
            </td>
          </tr>
          <tr>
            <td>Cours de pilate :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.c_pilate" @changeactive="goChangeActiveDroitPartner"  :name="'c_pilate'"/>
            </td>
            <td v-else>
              {{state.partner.gestion.c_pilate === 1 ? "Actif" : "Non-Actif"}}
            </td>
          </tr>
          <tr>
            <td>Cours de crosstrainning :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.c_crosstrainning" @changeactive="goChangeActiveDroitPartner" :name="'c_crosstrainning'"/>
            </td>
            <td v-else>
              {{state.partner.gestion.c_crosstrainning === 1 ? "Actif" : "Non-Actif"}}
            </td>
          </tr>
        </table>
        <div class="mt_20">
          <h5 class="mb_10">Structure associés :</h5>
          <div v-if="state.partner.struct"
               v-for="struct in state.partner.struct"
               :key="struct.id"
               class="d_flex justify_content_center align_items_center"
          >
            <router-link :to="'/app/struct/detail/'+struct.id">{{struct.struct_name}} | {{struct.struct_active===1 ? "Actif" : "Non-Actif"}}</router-link>
          </div>
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

</style>