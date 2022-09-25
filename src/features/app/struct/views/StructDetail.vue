<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "@/stores/userStore";
import {reactive, watchEffect} from "vue";
import type {StructDetailInterface, StructUpdateInterface} from "@/shared/interfaces";
import {dataStructById} from "@/shared/services";
import BtnActifNoActif from "@/components/BtnActifNoActif.vue";
import {useStructStore} from "@/stores/structStore";
import ChangeName from "@/features/app/components/ChangeName.vue";
import StructUpdate from "@/features/app/struct/components/StructUpdate.vue";

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const structStore = useStructStore()

const state = reactive<{
  struct : StructDetailInterface | null,
  modalUpdateNameGerant: boolean,
  modalUpdateStruct: boolean
}>({
  struct: null,
  modalUpdateNameGerant: false,
  modalUpdateStruct: false
})

watchEffect(async  () => {
  try {
    state.struct = await dataStructById(parseInt(route.params.struct_id as string))
    //@ts-ignore
    if (state.struct.partner_user_id !== userStore.currentUser.id && state.struct.user_id !== userStore.currentUser.id && userStore.currentUser.is_admin !== 1){
      await router.push("/app");
    }
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger")
  }
})

async function goChangeActiveStruct(gestion_active: number){
  try {
    if (state.struct){
      const struct_id = state.struct.struct_id;
      await structStore.changeActive(struct_id, gestion_active);
      state.struct.struct_active = gestion_active
      const name_struct = state.struct.struct_name
      const etat = gestion_active === 1 ? "Actif" : "Non-Actif";
      const color = gestion_active === 1 ? "success" : "warning";
      userStore.sendMsg(`${name_struct} est maintenant ${etat}`, color);
    }
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
    const stateGestion = gestion_active === 1 ? "Actif" : "Inactif";
    const color = gestion_active === 1 ? "success" : "warning";
    userStore.sendMsg(`Update : ${gestion_name} est maintenant ${stateGestion}`,color)
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
    const color = gestion_active === 1 ? "success" : "warning";
    userStore.sendMsg(`Le gérant est maintenant ${etat}`, color);
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger");
  }
}

async function goChangeName(name:string)
{
  try {
    if (state.struct)
    {
      await userStore.updateName(state.struct.user_email, name)
      userStore.sendMsg("Modification pris en compte !", "success")
      state.modalUpdateNameGerant = false
      state.struct.user_name = name
    }
  } catch (e) {
    //@ts-ignore
    userStore.sendMsg(e.error, "warning")
  }

}

async function goUpdateStruct(formValues: StructUpdateInterface)
{
  try {
    if (state.struct)
    {
      const response = await structStore.updateStruct(state.struct.struct_id, formValues)
      userStore.sendMsg("Modification pris en compte !", "success")
      state.modalUpdateStruct = false
      state.struct = response
    }
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "warning")
  }
}

</script>

<template>
  <div v-if="state.struct">
    <div>
      <div @click="$router.go(-1)" class="btn_primary" id="back_btn">Retour</div>
    </div>
    <div class="separator_secondary"></div>
    <div class="content flex m-2 content-center items-center flex-col">
      <div class="flex content-center items-center">
        <h3 class="m-2 font-bold text-2xl">{{state.struct.struct_name}}</h3>
        <div id="btn_modify" v-if="userStore.currentUser.is_admin" @click="state.modalUpdateStruct = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
        </div>
      </div>
      <div class="flex content-center items-center">
        <div v-if="userStore.currentUser.is_admin || userStore.currentUser.id === state.struct.partner_user_id">
          <BtnActifNoActif :state="state.struct.struct_active" @changeactive="goChangeActiveStruct" :name="state.struct.struct_name"/>
        </div>
        <div class="ml-2" :class="{text_green : state.struct.struct_active===1 , text_red : state.struct.struct_active!==1}">
          {{state.struct.struct_active===1 ? "Actif" : "Inactive"}}
        </div>
      </div>
      <div>
        {{state.struct.struct_address}} , {{state.struct.struct_postal}} {{state.struct.struct_city}}
      </div>
    </div>
    <div class="md:flex">
      <div class="md:basis-1/3">
        <div class="content m-2">
          <h5 class="font-bold">Gérant :</h5>
          <div class="flex content-center items-center">
            <div class="ml-3">
              <span class="font-bold ">Nom :</span> {{state.struct.user_name}}
            </div>
            <div id="btn_modify" class="ml-2" v-if="userStore.currentUser.is_admin" @click="state.modalUpdateNameGerant = !state.modalUpdateNameGerant">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
            </div>
          </div>
          <div class="ml-3">
            <span class="font-bold">Mail :</span> {{state.struct.user_email}}
          </div>
          <div class="flex">
            <div v-if="userStore.currentUser.is_admin">
              <BtnActifNoActif :name="state.struct.user_email" :state="state.struct.user_active"  @changeactive="goChangeActiveUser" />
            </div>
            <div class="ml-1" :class="{text_green : state.struct.user_active===1 , text_red : state.struct.user_active!==1}">{{state.struct.user_active===1 ? "Actif" : "Inactif"}}</div>
          </div>
        </div>
        <div class="content m-2">
          <div class="m_10" v-if="userStore.currentUser.is_admin || userStore.currentUser.id === state.struct.partner_user_id">
            <h5 class="font-bold">Partenaire Lié :</h5>
            <router-link :to="'/app/partner/detail/'+state.struct.partner_id" class="txt_link ml-2">
              {{state.struct.partner_name}} | <span :class="{text_green : state.struct.partner_active===1 , text_red : state.struct.partner_active!==1}">{{state.struct.partner_active===1 ? "Actif" : "Inactif"}}</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="content m-2 md:basis-2/3">
          <h5 class="font-bold">Droits :</h5>
          <table class="table-auto m-auto border-separate">
            <tr>
              <td class="text-end pr-2">Ventes de boissons :</td>
              <td v-if="userStore.currentUser.is_admin">
                <btn-actif-no-actif :state="state.struct.gestion.v_boisson" @changeactive="goChangeActiveDroitStruct" :name="'v_boisson'"/>
              </td>
              <td v-else :class="{text_green : state.struct.gestion.v_boisson===1 , text_red : state.struct.gestion.v_boisson!==1}">
                {{state.struct.gestion.v_boisson === 1 ? "Actif" : "Inactif"}}
              </td>
            </tr>
            <tr>
              <td class="text-end pr-2">Ventes de vêtements :</td>
              <td v-if="userStore.currentUser.is_admin">
                <btn-actif-no-actif :state="state.struct.gestion.v_vetement" @changeactive="goChangeActiveDroitStruct"  :name="'v_vetement'"/>
              </td>
              <td v-else :class="{text_green : state.struct.gestion.v_vetement===1 , text_red : state.struct.gestion.v_vetement!==1}">
                {{state.struct.gestion.v_vetement === 1 ? "Actif" : "Inactif"}}
              </td>
            </tr>
            <tr>
              <td class="text-end pr-2">Cours Particulier :</td>
              <td v-if="userStore.currentUser.is_admin">
                <btn-actif-no-actif :state="state.struct.gestion.c_particulier" @changeactive="goChangeActiveDroitStruct"  :name="'c_particulier'"/>
              </td>
              <td v-else :class="{text_green : state.struct.gestion.c_particulier===1 , text_red : state.struct.gestion.c_particulier!==1}">
                {{state.struct.gestion.c_particulier === 1 ? "Actif" : "Inactif"}}
              </td>
            </tr>
            <tr>
              <td class="text-end pr-2">Cours de Pilate :</td>
              <td v-if="userStore.currentUser.is_admin">
                <btn-actif-no-actif :state="state.struct.gestion.c_pilate" @changeactive="goChangeActiveDroitStruct"  :name="'c_pilate'"/>
              </td>
              <td v-else :class="{text_green : state.struct.gestion.c_pilate===1 , text_red : state.struct.gestion.c_pilate!==1}">
                {{state.struct.gestion.c_pilate === 1 ? "Actif" : "Inactif"}}
              </td>
            </tr>
            <tr>
              <td class="text-end pr-2">Cours de Crosstrainning :</td>
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
      <div v-if="state.modalUpdateNameGerant">
      <ChangeName
          :name="state.struct.user_name"
          @go-close="state.modalUpdateNameGerant = false"
          @go-submit="goChangeName"
      />
    </div>
    <div v-if="state.modalUpdateStruct">
      <StructUpdate
        :data="state.struct"
        @go-update="goUpdateStruct"
        @go-close="state.modalUpdateStruct = false"
        />
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/main.sass"

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