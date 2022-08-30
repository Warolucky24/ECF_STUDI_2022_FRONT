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
    const structIndex = structStore.struct.findIndex(e => e.id === struct_id);
    const name_struct = structStore.struct[structIndex].struct_name;
    const etat = gestion_active === 1 ? "Actif" : "Non-Actif";
    userStore.sendMsg(`${name_struct} est maintenant ${etat}`, "success");
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger")
  }
}


function goChangeActiveDroitStruct(gestion_active: number, gestion_name : string){
  userStore.sendMsg(` Demande de modification pour ${gestion_name} pour ${gestion_active}`,"warning");
}

</script>

<template>
  <div class="container" v-if="state.struct">
    <div>
      <router-link to="/app/struct" class="btn_primary">Retour</router-link>
    </div>
    <div class="separator_secondary"></div>
    <div class="d_flex flex_column justify_content_center align_items_center">
      <h3 class="m_10">{{state.struct.struct_name}}</h3>
      <div class="d_flex justify_content_center align_items_center">
        <div v-if="userStore.currentUser.is_admin">
          <BtnActifNoActif :state="state.struct.struct_active" @changeactive="goChangeActiveStruct" :name="state.struct.struct_name"/>
        </div>
        <div class="ms_10" :class="{color_green : state.struct.struct_id===1 , color_red : state.struct.struct_id!==1}">
          {{state.struct.struct_id===1 ? "Actif" : "Non-Actif"}}
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
            <td>Email :</td>
            <td>{{state.struct.user_email}}</td>
          </tr>
        </table>
      </div>
      <div class="m_10">
        <h5>Partner Lié :</h5>
        <router-link :to="'/app/partner/detail/'+state.struct.partner_id">{{state.struct.partner_name}}</router-link>
      </div>
      <div class="m_10">
        <h5>Droits :</h5>
        <table>
          <tr>
            <td>Vente de boissons :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.struct.gestion.v_boisson" @changeactive="goChangeActiveDroitStruct" :name="'v_boisson'"/>
            </td>
            <td v-else>
              {{state.struct.gestion.v_boisson === 1 ? "Actif" : "Non-Actif"}}
            </td>
          </tr>
          <tr>
            <td>Vente de vêtements :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.struct.gestion.v_vetement" @changeactive="goChangeActiveDroitStruct"  :name="'v_vetement'"/>
            </td>
            <td v-else>
              {{state.struct.gestion.v_vetement === 1 ? "Actif" : "Non-Actif"}}
            </td>
          </tr>
          <tr>
            <td>Cours particulier :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.struct.gestion.c_particulier" @changeactive="goChangeActiveDroitStruct"  :name="'c_particulier'"/>
            </td>
            <td v-else>
              {{state.struct.gestion.c_particulier === 1 ? "Actif" : "Non-Actif"}}
            </td>
          </tr>
          <tr>
            <td>Cours de pilate :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.struct.gestion.c_pilate" @changeactive="goChangeActiveDroitStruct"  :name="'c_pilate'"/>
            </td>
            <td v-else>
              {{state.struct.gestion.c_pilate === 1 ? "Actif" : "Non-Actif"}}
            </td>
          </tr>
          <tr>
            <td>Cours de crosstrainning :</td>
            <td v-if="userStore.currentUser.is_admin">
              <btn-actif-no-actif :state="state.struct.gestion.c_crosstrainning" @changeactive="goChangeActiveDroitStruct" :name="'c_crosstrainning'"/>
            </td>
            <td v-else>
              {{state.struct.gestion.c_crosstrainning === 1 ? "Actif" : "Non-Actif"}}
            </td>
          </tr>
        </table>
      </div>
    </div>




  </div>
</template>