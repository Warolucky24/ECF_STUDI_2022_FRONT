<script setup lang="ts">
import {useRoute} from "vue-router";
import type {PartnerDetailInterface} from "@/shared/interfaces";
import {dataPartnerById} from "@/shared/services";
import {reactive, watchEffect} from "vue";
import {useUserStore} from "@/stores/userStore";
import BtnActifNoActif from "@/components/BtnActifNoActif.vue";
import {usePartnerStore} from "@/stores/partnerStore";
import ChangeName from "@/features/app/components/ChangeName.vue";
import PartnerUpdate from "@/features/app/partner/components/PartnerUpdate.vue";

const route = useRoute()
const userStore = useUserStore()
const partnerStore = usePartnerStore()

const state = reactive<{
  partner: PartnerDetailInterface | null,
  modalUpdateNameGerant: boolean,
  modalUpdatePartner: boolean
}>({
  partner : null,
  modalUpdateNameGerant: false,
  modalUpdatePartner: false

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
    const color = active_state === 1 ? "success" : "warning";
    userStore.sendMsg(`${name_partner} est maintenant ${etat}`, color);
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
    const stateGestion = gestion_active === 1 ? "Actif" : "Inactif";
    const color = gestion_active === 1 ? "success" : "warning";
    userStore.sendMsg(`Update : ${gestion_name} est maintenant ${stateGestion}`,color)
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
    const color = gestion_active===1 ? "success" : "warning";
    userStore.sendMsg(`Le gérant est maintenant ${etat}`, color);
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger");
  }
}

function goChangeName(name:string)
{
  if (state.partner){
    state.partner.user_name = name
  }
}

function goUpdatePartner(partner_name:string, logo_url:string, user_name:string){
  if (state.partner){
    state.partner.partner_name = partner_name;
    state.partner.logo_url = logo_url;
    state.partner.user_name = user_name;
  }
}

</script>
<template>
  <div v-if="state.partner">
    <div>
      <div @click="$router.go(-1)" class="btn_primary w-full" id="back_btn">Retour</div>
    </div>
    <div class="separator_secondary"></div>
    <div class="content flex m-2">
      <div>
        <img :src="state.partner.logo_url" alt="LogoPartner" id="LogoPartnerBig" class="m-8">
      </div>
      <div class="flex flex-col items-center flex-auto">
        <div class="flex content-center items-center">
          <h1 class="m-4 font-bold text-2xl">{{state.partner.partner_name}}</h1>
          <div id="btn_modify" v-if="userStore.currentUser.is_admin" @click="state.modalUpdatePartner = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </div>
        </div>
        <div class="flex">
          <div v-if="userStore.currentUser.is_admin">
            <BtnActifNoActif :state="state.partner.partner_active" @changeactive="goChangeActivePartner" :name="state.partner.partner_name"/>
          </div>
          <div class="ml-3" :class="{text_green : state.partner.partner_active===1 , text_red : state.partner.partner_active!==1}">
            {{state.partner.partner_active===1 ? "Actif" : "Inactif"}}
          </div>
        </div>
      </div>
    </div>
    <div class="md:flex">
      <div class="md:basis-1/3">
        <div class="content m-2">
          <h5 class="font-bold">Gérant :</h5>
          <div class="flex content-center items-center pl-2">
            <div class="ml-3 mr-2"><span class="font-bold">Nom :</span> {{state.partner.user_name}}</div>
            <div id="btn_modify" v-if="userStore.currentUser.is_admin" @click="state.modalUpdateNameGerant = true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
            </div>
          </div>
          <div class="mb-2 pl-2 ml-3">
            <span class="font-bold">Mail :</span> {{state.partner.user_email}}
          </div>
          <div class="flex content-center items-center ml-3">
            <BtnActifNoActif  v-if="userStore.currentUser.is_admin" :name="state.partner.user_email" :state="state.partner.user_active" @changeactive="goChangeActiveUser" />
            <span
                class="ml-2"
                :class="{text_green : state.partner.user_active===1 , text_red : state.partner.user_active!==1}"
            >
                {{state.partner.user_active===1 ? "Actif" : "Inactif"}}
              </span>
          </div>
        </div>
        <div class="content m-2">
          <div class="mt_20">
            <h5 class="mb-1 font-bold">Structures associées :</h5>
            <div v-if="state.partner.struct"
                 v-for="struct in state.partner.struct"
                 :key="struct.id"
                 class="flex content-center items-center pl-2"
            >
              <router-link class="txt_link" :to="'/app/struct/detail/'+struct.id">{{struct.struct_name}} | {{struct.struct_active===1 ? "Actif" : "Inactive"}}</router-link>
            </div>
          </div>
        </div>
      </div>
    <div class="content md:basis-2/3 m-2">
        <h5 class="mb-5 font-bold">Droits :</h5>
        <table class="table-auto w-96 m-auto border-separate">
          <tbody>
          <tr>
            <td class="text-end pr-2">Ventes de boissons :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.v_boisson" @changeactive="goChangeActiveDroitPartner" :name="'v_boisson'"/>
            </td>
            <td v-else :class="{text_green : state.partner.gestion.v_boisson===1 , text_red : state.partner.gestion.v_boisson!==1}">
              {{state.partner.gestion.v_boisson === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
          <tr>
            <td class="text-end pr-2">Ventes de vêtements :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.v_vetement" @changeactive="goChangeActiveDroitPartner"  :name="'v_vetement'"/>
            </td>
            <td v-else :class="{text_green : state.partner.gestion.v_vetement===1 , text_red : state.partner.gestion.v_vetement!==1}">
              {{state.partner.gestion.v_vetement === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
          <tr>
            <td class="text-end pr-2">Cours Particulier :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.c_particulier" @changeactive="goChangeActiveDroitPartner"  :name="'c_particulier'"/>
            </td>
            <td v-else :class="{text_green : state.partner.gestion.c_particulier===1 , text_red : state.partner.gestion.c_particulier!==1}">
              {{state.partner.gestion.c_particulier === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
          <tr>
            <td class="text-end pr-2">Cours de Pilate :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.c_pilate" @changeactive="goChangeActiveDroitPartner"  :name="'c_pilate'"/>
            </td>
            <td v-else :class="{text_green : state.partner.gestion.c_pilate===1 , text_red : state.partner.gestion.c_pilate!==1}">
              {{state.partner.gestion.c_pilate === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
          <tr>
            <td class="text-end pr-2">Cours de Crosstrainning :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.partner.gestion.c_crosstrainning" @changeactive="goChangeActiveDroitPartner" name="c_crosstrainning"/>
            </td>
            <td v-else :class="{text_green : state.partner.gestion.c_crosstrainning===1 , text_red : state.partner.gestion.c_crosstrainning!==1}">
              {{state.partner.gestion.c_crosstrainning === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
          </tbody>
        </table>
    </div>
    <div v-if="state.modalUpdateNameGerant">
        <ChangeName
            :name="state.partner.user_name"
            :email="state.partner.user_email"
            @go-close="state.modalUpdateNameGerant = false"
            @is-submit="goChangeName"
        />
    </div>
    <div v-if="state.modalUpdatePartner">
      <PartnerUpdate
          :data="state.partner"
          @go-close="state.modalUpdatePartner = false"
          @is-submit="goUpdatePartner"
      />
    </div>
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