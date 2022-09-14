<script setup lang="ts">

import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/userStore";
import {reactive, watchEffect} from "vue";
import type {StructDetailInterface} from "@/shared/interfaces";
import {dataStructById} from "@/shared/services";
import BtnActifNoActif from "@/components/BtnActifNoActif.vue";
import {useStructStore} from "@/stores/structStore";

const route = useRoute()
const userStore = useUserStore()
const structStore = useStructStore()
const state = reactive<{
  struct : StructDetailInterface | null
}>({
  struct: null
})

watchEffect(async  () => {
  try {
    state.struct = await dataStructById(parseInt(route.params.struct_id as string))
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger")
  }
})

async function goChangeActiveStruct(gestion_active: number, gestion_name : string){
  try {
    //@ts-ignore
    const struct_id = state.struct.struct_id;
    await structStore.changeActive(struct_id, gestion_active);
    //@ts-ignore
    state.struct.struct_active = gestion_active
    //@ts-ignore
    const name_struct = state.struct.struct_name
    const etat = gestion_active === 1 ? "Actif" : "Non-Actif";
    userStore.sendMsg(`${name_struct} est maintenant ${etat}`, "success");
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger")
  }
}


async function goChangeActiveDroitStruct(gestion_active: number, gestion_name : string){
  try {
    //@ts-ignore
    const struct_id = state.struct.struct_id;
    await structStore.changeDroitActive(struct_id, gestion_name,gestion_active);
    //@ts-ignore
    state.struct.gestion[gestion_name] = gestion_active
  }catch (e) {
    //@ts-ignore
    userStore.sendMsg(e.error, "warning")
  }
}

async function goChangeActiveUser(gestion_active: number, user_email: string){
  try {
    await userStore.updateActive(user_email, gestion_active);
    //@ts-ignore
    state.struct.user_active = gestion_active;
    const etat = gestion_active===1 ? "Actif" : "Inactif";
    userStore.sendMsg(`L gérant est maintenant ${etat}`, "success");
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger");
  }
}

</script>

<template>
  <div class="container" v-if="state.struct">
    <div>
      <div @click="$router.go(-1)" class="btn_primary" id="back_btn">Retour</div>
    </div>
    <div class="separator_secondary"></div>
    <div class="d_flex flex_column justify_content_center align_items_center content">
      <h3 class="m_10">{{state.struct.struct_name}}</h3>
      <div class="d_flex justify_content_center align_items_center">
        <div v-if="userStore.currentUser.is_admin || userStore.currentUser.id === state.struct.partner_user_id">
          <BtnActifNoActif :state="state.struct.struct_active" @changeactive="goChangeActiveStruct" :name="state.struct.struct_name"/>
        </div>
        <div class="ms_10" :class="{text_green : state.struct.struct_active===1 , color_red : state.struct.struct_active!==1}">
          {{state.struct.struct_active===1 ? "Actif" : "Inactive"}}
        </div>
      </div>
      <div class="m_10">
        <h5>Gérant :</h5>
        <table>
          <tr>
            <td>Nom :</td>
            <td>{{state.struct.user_name}}</td>
          </tr>
          <tr>
            <td>Mail :</td>
            <td>{{state.struct.user_email}}</td>
          </tr>
          <tr>
            <td v-if="userStore.currentUser.is_admin">
              <BtnActifNoActif :name="state.struct.user_email" :state="state.struct.user_active"  @changeactive="goChangeActiveUser" />
            </td>
            <td :class="{text_green : state.struct.user_active===1 , text_red : state.struct.user_active!==1}">{{state.struct.user_active===1 ? "Actif" : "Inactif"}}</td>
          </tr>
        </table>
      </div>
      <div class="m_10" v-if="userStore.currentUser.is_admin || userStore.currentUser.id === state.struct.partner_user_id">
        <h5>Partenaire Lié :</h5>
        <router-link :to="'/app/partner/detail/'+state.struct.partner_id" class="txt_link">
          {{state.struct.partner_name}} | <span :class="{text_green : state.struct.partner_active===1 , text_red : state.struct.partner_active!==1}">{{state.struct.partner_active===1 ? "Actif" : "Inactif"}}</span>
        </router-link>
      </div>
      <div class="m_10">
        <h5>Droits :</h5>
        <table>
          <tr>
            <td>Ventes de boissons :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.struct.gestion.v_boisson" @changeactive="goChangeActiveDroitStruct" :name="'v_boisson'"/>
            </td>
            <td v-else :class="{text_green : state.struct.gestion.v_boisson===1 , text_red : state.struct.gestion.v_boisson!==1}">
              {{state.struct.gestion.v_boisson === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
          <tr>
            <td>Ventes de vêtements :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.struct.gestion.v_vetement" @changeactive="goChangeActiveDroitStruct"  :name="'v_vetement'"/>
            </td>
            <td v-else :class="{text_green : state.struct.gestion.v_vetement===1 , text_red : state.struct.gestion.v_vetement!==1}">
              {{state.struct.gestion.v_vetement === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
          <tr>
            <td>Cours Particulier :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.struct.gestion.c_particulier" @changeactive="goChangeActiveDroitStruct"  :name="'c_particulier'"/>
            </td>
            <td v-else :class="{text_green : state.struct.gestion.c_particulier===1 , text_red : state.struct.gestion.c_particulier!==1}">
              {{state.struct.gestion.c_particulier === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
          <tr>
            <td>Cours de Pilate :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.struct.gestion.c_pilate" @changeactive="goChangeActiveDroitStruct"  :name="'c_pilate'"/>
            </td>
            <td v-else :class="{text_green : state.struct.gestion.c_pilate===1 , text_red : state.struct.gestion.c_pilate!==1}">
              {{state.struct.gestion.c_pilate === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
          <tr>
            <td>Cours de Crosstrainning :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.struct.gestion.c_crosstrainning" @changeactive="goChangeActiveDroitStruct" :name="'c_crosstrainning'"/>
            </td>
            <td v-else :class="{text_green : state.struct.gestion.c_crosstrainning===1 , text_red : state.struct.gestion.c_crosstrainning!==1}">
              {{state.struct.gestion.c_crosstrainning === 1 ? "Actif" : "Inactif"}}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/main.sass"

#back_btn
  +lg_max
    width: 70vw
    margin: auto

</style>