<script setup lang="ts">

import {useStructStore} from "@/stores/structStore";
import {useUserStore} from "@/stores/userStore";
import Struct from "@/features/app/struct/components/Struct.vue";
import Filters from "@/features/app/components/Filters.vue";
import type { FilterUpdate} from "@/shared/interfaces";


const structStore = useStructStore()
const userStore = useUserStore()

async function changeActiveStruct(struct_id: number, active_state: number){
  try {
    await structStore.changeActive(struct_id, active_state);
    const structIndex = structStore.struct.findIndex(e => e.id === struct_id);
    const name_struct = structStore.struct[structIndex].struct_name;
    const etat = active_state === 1 ? "Actif" : "Non-Actif";
    userStore.sendMsg(`${name_struct} est maintenant ${etat}`, "success");
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger");
  }
}


function UpdateFilter(updateFilter : FilterUpdate){
  structStore.updateFilter(updateFilter);
}

</script>

<template>
  <div class="container">
    <div class="d_flex justify_content_between align_items_center" id="container_sub_head">
      <Filters
          :filters="structStore.filters"
          @update-filter="UpdateFilter"
      />
      <router-link v-if="userStore.currentUser.is_admin" to="/app/struct/add" id="addPartner" class="btn_primary">Ajouter</router-link>
    </div>
    <div class="separator_secondary"></div>
    <table class="table">
      <tr>
        <th>Nom de la Structure</th>
        <th>Partenaire lié</th>
        <th>Actif ?</th>
      </tr>
      <tr
          v-for="struct in structStore.filteredStruct"
          class="m_10"
          :key="struct.id"
      >
        <Struct
            v-if="userStore.currentUser.is_admin || userStore.currentUser.id === struct.user_id"
            :data="struct" :key="struct.struct_name"
            @go-change-active-struct="changeActiveStruct"
        />
      </tr>
    </table>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/main.sass"
#addPartner
  +lg_max
    margin-top: 5px
#container_sub_head
  +lg_min
    flex-direction: row
  +lg_max
    flex-direction: column

</style>