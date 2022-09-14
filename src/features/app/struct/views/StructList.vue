<script setup lang="ts">

import {useStructStore} from "@/stores/structStore";
import {useUserStore} from "@/stores/userStore";
import Struct from "@/features/app/struct/components/Struct.vue";
import Filters from "@/features/app/components/Filters.vue";
import type { FilterUpdate} from "@/shared/interfaces";
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
          v-if="userStore.currentUser.is_admin"
          :filters="structStore.filters"
          @update-filter="UpdateFilter"
      />
      <div class="nbr_select">
        {{structStore.filteredStruct.length > 1 ? "trouvés : "+structStore.filteredStruct.length : "trouvé : "+structStore.filteredStruct.length }}
      </div>
      <div class="btn_primary" id="addPartner" @click="addStructModal = true">Ajouter</div>
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
    <div class="modal" v-if="addStructModal">
      <div class="modal_content"><StructAdd @close-modal="addStructModal = false"/></div>
      <div class="modal_back" @click="addStructModal = false"></div>
    </div>
  </div>

</template>

<style scoped lang="sass">
@import "@/assets/main.sass"
#addPartner
  background: white
  border: 1px solid $secondary
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