<script setup lang="ts">

import {useStructStore} from "@/stores/structStore";
import {useUserStore} from "@/stores/userStore";
import Struct from "@/features/app/struct/components/Struct.vue";

const structStore = useStructStore()
const userStore = useUserStore()

async function changeActiveStruct(struct_id: number, active_state: number){
  try {
    await structStore.changeActive(struct_id, active_state);
    const structIndex = structStore.struct.findIndex(e => e.id === struct_id);
    const name_struc = structStore.struct[structIndex].struct_name;
    const etat = active_state === 1 ? "Actif" : "Non-Actif";
    userStore.sendMsg(`${name_struc} est maintenant ${etat}`, "success");
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger");
  }
}
</script>

<template>
  <div class="container">
    <div class="d_flex justify_content_between align_items_center flex_row">
      <div>Barre de trie</div>
      <router-link to="/app/struct/add" class="btn_primary">Ajouter</router-link>
    </div>
    <div class="separator_secondary"></div>
    <table>
      <thead>
      <th>Nom de la Structure</th>
      <th>Partenaire lié</th>
      <th>Actif ?</th>
      </thead>
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