<script setup lang="ts">

import {useStructStore} from "@/stores/structStore";
import {useUserStore} from "@/stores/userStore";
import Struct from "@/features/app/struct/components/Struct.vue";
import Filters from "@/features/app/components/Filters.vue";
import type {FilterUpdate, StructAddInterface} from "@/shared/interfaces";
import StructAdd from "@/features/app/struct/components/StructAdd.vue";
import {ref} from "vue";


const structStore = useStructStore()
const userStore = useUserStore()
const addStructModal = ref<boolean>(false)

async function changeActiveStruct(struct_id: number, active_state: number){
  try {
    await structStore.changeActive(struct_id, active_state);
    const structIndex = structStore.struct.findIndex(e => e.id === struct_id);
    const name_struct = structStore.struct[structIndex].struct_name;
    const etat = active_state === 1 ? "Actif" : "Non-Actif";
    const color = active_state === 1 ? "success" : "warning";
    userStore.sendMsg(`${name_struct} est maintenant ${etat}`, color);
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
    <div class="flex content-between items-center" id="container_sub_head">
      <Filters
          v-if="userStore.currentUser.is_admin"
          :filters="structStore.filters"
          @update-filter="UpdateFilter"
      />
      <div class="nbr_select grow">
        {{structStore.filteredStruct.length > 1 ? "trouvés : "+structStore.filteredStruct.length : "trouvé : "+structStore.filteredStruct.length }}
      </div>
      <div class="btn_primary" id="addStruct" @click="addStructModal = true">Ajouter</div>
    </div>
    <div class="separator_secondary"></div>
      <div
          v-for="struct in structStore.filteredStruct"
          class="m_10"
          :key="struct.id"
      >
        <Struct
            v-if="userStore.currentUser.is_admin || userStore.currentUser.id === struct.user_id || userStore.currentUser.id === struct.partner_user_id"
            :data="struct" :key="struct.struct_name"
            @go-change-active-struct="changeActiveStruct"
        />
      </div>
    <div v-if="addStructModal">
      <StructAdd @close-modal="addStructModal = false"/>
    </div>
  </div>

</template>

<style scoped lang="sass">
@import "@/assets/main.sass"
#addStruct
  background: white
  border: 1px solid #075985
  box-shadow: $boxShadow
  &:hover
    box-shadow: -4px 2px 7px 0px rgba(0, 0, 0, 0.25)
  +lg_max
    margin-top: 5px
#container_sub_head
  +lg_min
    flex-direction: row
  +lg_max
    flex-direction: column

</style>