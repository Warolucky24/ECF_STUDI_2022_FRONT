<script setup lang="ts">
import Partner from "@/features/app/partner/components/Partner.vue";
import {usePartnerStore} from "@/stores/partnerStore";
import {useUserStore} from "@/stores/userStore";
import {useRouter} from "vue-router";
import type {FilterUpdate} from "@/shared/interfaces";
import Filters from "@/features/app/components/Filters.vue";
import PartnerAdd from "@/features/app/partner/components/PartnerAdd.vue";
import {ref} from "vue";

const partnerStore = usePartnerStore();
const userStore = useUserStore();
const router = useRouter()
const addPartner = ref<boolean>(false)

async function changeActivePartner(partner_id: number, active_state: number){
  try {
    await partnerStore.changeActive(partner_id, active_state);
    const partnerIndex = partnerStore.partner.findIndex((e) => e.id === partner_id);
    const name_partner = partnerStore.partner[partnerIndex].partner_name
    const etat = active_state === 1 ? "Actif" : "Non-Actif";
    const color = active_state === 1 ? "success" : "warning";
    userStore.sendMsg(`${name_partner} est maintenant ${etat}`, color);
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger");
  }
}

function UpdateFilter(updateFilter : FilterUpdate){
  partnerStore.updateFilter(updateFilter);
}

</script>

<template>
  <div>
    <div class="d_flex justify_content_between align_items_center" id="container_sub_head">
      <Filters
          v-if="userStore.currentUser.is_admin"
          :filters="partnerStore.filters"
          @update-filter="UpdateFilter"
      />
      <div class="nbr_select">
        {{partnerStore.filteredPartner.length > 1 ? "Trouvés : "+partnerStore.filteredPartner.length : "Trouvé : "+partnerStore.filteredPartner.length}}
      </div>
      <div class="btn_primary" id="addPartner" @click="addPartner= true">Ajouter</div>
    </div>
    <div class="separator_secondary"></div>
        <div
            v-for="partner in partnerStore.filteredPartner"
            class="m_10"
            :key="partner.id"
        >
          <Partner
              v-if="userStore.currentUser.is_admin || userStore.currentUser.id === partner.user_id"
              :data="partner" :key="partner.partner_name"
              @go-change-active-partner="changeActivePartner"
          />
        </div>
    <div class="modal" v-if="addPartner">
      <div class="modal_content"><PartnerAdd  @close-modal="addPartner = false"/></div>
      <div class="modal_back" @click="addPartner = false"></div>
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