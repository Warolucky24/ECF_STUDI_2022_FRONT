<script setup lang="ts">
import {usePartnerStore} from "@/stores/partnerStore";
import {useStructStore} from "@/stores/structStore";

const partnerStore = usePartnerStore()
const structStore = useStructStore()

const nbrPartnerActif = partnerStore.partner.filter(e => e.partner_active === 1).length
const nbrPartnerInactif = partnerStore.partner.filter(e => e.partner_active === 0).length
const nbrStructActif = structStore.struct.filter(e => e.struct_active === 1).length
const nbrStructInactive = structStore.struct.filter(e => e.struct_active === 0).length

</script>

<template>
  <div class="flex content-center items-center">
    <div class="card_dash">
      <div class="card_content">
        <div>{{partnerStore.partner.length}}</div>
        <div>Partenaires</div>
      </div>
      <div class="card_footer">
        <div>{{nbrPartnerActif}} Actifs</div>
        <div class="separator_card"></div>
        <div>{{nbrPartnerInactif}} inactifs</div>
      </div>
    </div>

    <div class="card_dash">
      <div class="card_content">
        <div>{{structStore.struct.length}}</div>
        <div>Structures</div>
      </div>
      <div class="card_footer">
        <div>{{nbrStructActif}} Actifs</div>
        <div class="separator_card"></div>
        <div>{{nbrStructInactive}} Inactives</div>
      </div>
    </div>
  </div>
  <div class="content m-2">
    <h1 class="font-bold">Historique :</h1>
    <div>19:12/12 : update user ....</div>
    <div>19:12/12 : update user ....</div>
    <div>19:12/12 : update user ....</div>
    <div>19:12/12 : update user ....</div>
    <div>19:12/12 : update user ....</div>
  </div>
</template>


<style scoped lang="sass">
@import "@/assets/main.sass"

.card_dash
  cursor: pointer
  border: 1px solid #818cf8
  background: white
  width: 350px
  height: 250px
  border-radius: 6px
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.25)
  margin: 10px
  overflow: hidden
  color: #818cf8
  transition: all .4s
  &:hover
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.50)

  .card_content
    font-size: 1.6em
    font-weight: bolder
    height: 200px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    div:first-child
      margin-bottom: 5px
  .card_footer
    height: 50px
    background: #e0f2fe
    display: flex
    justify-content: space-around
    align-items: center
    font-weight: bold
    div
      width: calc(350px / 3  - 2px)
      text-align: center
    .separator_card
      background: #818cf8
      width: 2px
      height: 30px

</style>