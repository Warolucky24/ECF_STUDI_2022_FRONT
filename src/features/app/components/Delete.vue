<script setup lang="ts">

import {useUserStore} from "@/stores/userStore";

const userStore = useUserStore();
const props = defineProps<{
  id: number,
  name: string,
  type: string
}>()

const emit = defineEmits<{
  (e: "goClose"):void
}>()

async function goDelete(){
  try {
    await userStore.deletePartnerOrStruct(props.id, props.type);
    emit('goClose');
  }catch (e)
  {
    //@ts-ignore
    userStore.sendMsg(e.error, "danger")
  }




}


</script>


<template>
  <Teleport to="body">
  <div class="modal">
    <div class="modal_content d_flex flex_column justify_content_center align_items_center">
      <h3>Etes-vous sur de supprimer {{props.type=== "partner"? "le partenaire" : "la structure"}} : {{props.name}}</h3>
      <div class="d_flex m_20">
        <div class="btn_success m_5" @click="goDelete">Confirmer</div>
        <div class="btn_warning m_5" @click="emit('goClose')">Annuler</div>
      </div>
    </div>
    <div class="modal_back" @click="emit('goClose')"></div>
  </div>
  </Teleport>
</template>