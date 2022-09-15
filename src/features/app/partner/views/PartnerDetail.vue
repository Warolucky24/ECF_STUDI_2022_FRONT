<script setup lang="ts">
import {useRoute} from "vue-router";
import type {PartnerDetailInterface} from "@/shared/interfaces";
import {dataPartnerById} from "@/shared/services";
import {reactive, watchEffect} from "vue";
import {useUserStore} from "@/stores/userStore";
import BtnActifNoActif from "@/components/BtnActifNoActif.vue";
import {usePartnerStore} from "@/stores/partnerStore";
import ChangeName from "@/features/app/components/ChangeName.vue";

const route = useRoute()
const userStore = useUserStore()
const partnerStore = usePartnerStore()


const state = reactive<{
  partner: PartnerDetailInterface | null,
  modalUpdateNameGerant: boolean
}>({
  partner : null,
  modalUpdateNameGerant: false

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
    const partnerId = state.partner.partner_id;
    await partnerStore.changeActiveDroit(partnerId, gestion_name, gestion_active);
    //@ts-ignore
    state.partner.gestion[gestion_name] = gestion_active;
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger");
  }
}

async function goChangeActiveUser(gestion_active: number, user_email: string){
  try {
    await userStore.updateActive(user_email, gestion_active);
    //@ts-ignore
    state.partner.user_active = gestion_active;
    const etat = gestion_active===1 ? "Actif" : "Inactif";
    userStore.sendMsg(`Le gérant est maintenant ${etat}`, "success");
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger");
  }
}

function goChangeName(name:string)
{
  //@ts-ignore
  state.partner.user_name = name
}

</script>
<template>
  <div v-if="state.partner">
    <div>
      <div @click="$router.go(-1)" class="btn_primary" id="back_btn">Retour</div>
    </div>
    <div class="separator_secondary"></div>
    <div class="d_flex flex_column justify_content_center align_items_center content">
      <div>
        <img :src="state.partner.logo_url" alt="LogoPartner" id="LogoPartnerBig">
      </div>
      <h3 class="m_10">{{state.partner.partner_name}}</h3>
      <div class="d_flex justify_content_center align_items_center">
        <div v-if="userStore.currentUser.is_admin">
          <BtnActifNoActif :state="state.partner.partner_active" @changeactive="goChangeActivePartner" :name="state.partner.partner_name"/>
        </div>
        <div class="ms_10" :class="{text_green : state.partner.partner_active===1 , text_red : state.partner.partner_active!==1}">
          {{state.partner.partner_active===1 ? "Actif" : "Inactif"}}
        </div>
      </div>
      <div class="m_10">
        <h5>Gérant :</h5>
        <table>
          <tr>
            <td>Nom : </td>
            <td>{{state.partner.user_name}}</td>
            <td>
              <div id="btn_modify" v-if="userStore.currentUser.is_admin" @click="state.modalUpdateNameGerant = !state.modalUpdateNameGerant">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
              </div>
            </td>
          </tr>
          <tr>
            <td>Mail :</td>
            <td>{{state.partner.user_email}}</td>
          </tr>
          <tr>
            <td v-if="userStore.currentUser.is_admin">
              <BtnActifNoActif :name="state.partner.user_email" :state="state.partner.user_active" @changeactive="goChangeActiveUser" />
            </td>
            <td v-else></td>
            <td>
              <span :class="{text_green : state.partner.user_active===1 , text_red : state.partner.user_active!==1}">
                {{state.partner.user_active===1 ? "Actif" : "Inactif"}}
              </span>
            </td>
          </tr>
        </table>
      </div>
      <div class="m_10">
        <h5 class="mb_10">Droits :</h5>
        <table>
          <tr>
            <td>Ventes de boissons :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.v_boisson" @changeactive="goChangeActiveDroitPartner" :name="'v_boisson'"/>
            </td>
            <td v-else :class="{text_green : state.partner.gestion.v_boisson===1 , text_red : state.partner.gestion.v_boisson!==1}">
              {{state.partner.gestion.v_boisson === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
          <tr>
            <td>Ventes de vêtements :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.v_vetement" @changeactive="goChangeActiveDroitPartner"  :name="'v_vetement'"/>
            </td>
            <td v-else :class="{text_green : state.partner.gestion.v_vetement===1 , text_red : state.partner.gestion.v_vetement!==1}">
              {{state.partner.gestion.v_vetement === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
          <tr>
            <td>Cours Particulier :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.c_particulier" @changeactive="goChangeActiveDroitPartner"  :name="'c_particulier'"/>
            </td>
            <td v-else :class="{text_green : state.partner.gestion.c_particulier===1 , text_red : state.partner.gestion.c_particulier!==1}">
              {{state.partner.gestion.c_particulier === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
          <tr>
            <td>Cours de Pilate :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.c_pilate" @changeactive="goChangeActiveDroitPartner"  :name="'c_pilate'"/>
            </td>
            <td v-else :class="{text_green : state.partner.gestion.c_pilate===1 , text_red : state.partner.gestion.c_pilate!==1}">
              {{state.partner.gestion.c_pilate === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
          <tr>
            <td>Cours de Crosstrainning :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.c_crosstrainning" @changeactive="goChangeActiveDroitPartner" :name="'c_crosstrainning'"/>
            </td>
            <td v-else :class="{text_green : state.partner.gestion.c_crosstrainning===1 , text_red : state.partner.gestion.c_crosstrainning!==1}">
              {{state.partner.gestion.c_crosstrainning === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
        </table>
        <div class="mt_20">
          <h5 class="mb_10">Structures associées :</h5>
          <div v-if="state.partner.struct"
               v-for="struct in state.partner.struct"
               :key="struct.id"
               class="d_flex justify_content_center align_items_center"
          >
            <router-link class="txt_link" :to="'/app/struct/detail/'+struct.id">{{struct.struct_name}} | {{struct.struct_active===1 ? "Actif" : "Inactive"}}</router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="state.modalUpdateNameGerant" class="modal">
      <div class="modal_content">
        <ChangeName
            :name="state.partner.user_name"
            :email="state.partner.user_email"
            @go-close="state.modalUpdateNameGerant = false"
            @is-submit="goChangeName"
        />
      </div>
      <div class="modal_back" @click="state.modalUpdateNameGerant = false"></div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/main.sass"

#LogoPartnerBig
  max-width: 100px
  max-height: 100px
  border-radius: 5px
#back_btn
  +lg_max
    width: 70vw
    margin: auto

#btn_modify
  cursor: pointer
  transition: all .4s
  &:hover
    color: green
</style>