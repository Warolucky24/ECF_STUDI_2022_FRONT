<script setup lang="ts">
import type {StructPartnerDetailInterface} from "@/shared/interfaces";
import {useUserStore} from "@/stores/userStore";
import {ref} from "vue";
const userStore = useUserStore()


const props = defineProps<{
  data : StructPartnerDetailInterface
}>()

const open = ref<boolean>(false)

</script>

<template>
  <div id="accordeon_header">
    <div @click="open = !open">
      <h3 class="d_flex">
        <router-link :to="'/app/struct/detail/'+data.id">{{data.struct_name}}</router-link>  | {{props.data.struct_active ? "Actif" : "Non-Actif"}}
      </h3>
    </div>
    <div v-if="open" id="accordeon_content">
      <table>
        <tr>
          <td>Vente de boissons :</td>
          <td :class="{color_red : props.data.v_boisson !== 1, color_green : props.data.v_boisson === 1}">{{props.data.v_boisson === 1 ? "Actif" : "Non-Actif"}}</td>
        </tr>
        <tr>
          <td>vente de vêtements :</td>
          <td :class="{color_red : props.data.v_vetement !== 1, color_green : props.data.v_vetement === 1}">{{props.data.v_vetement === 1 ? "Actif" : "Non-Actif"}}</td>
        </tr>
        <tr>
          <td>Cours particulier :</td>
          <td :class="{color_red : props.data.c_particulier !== 1, color_green : props.data.c_particulier === 1}">{{props.data.c_particulier === 1 ? "Actif" : "Non-Actif"}}</td>
        </tr>
        <tr>
          <td>Cours de pilate :</td>
          <td :class="{color_red : props.data.c_pilate !== 1, color_green : props.data.c_pilate === 1}">{{props.data.c_pilate === 1 ? "Actif" : "Non-Actif"}}</td>
        </tr>
        <tr>
          <td>Cours de crosstrainning :</td>
          <td :class="{color_red : props.data.c_crosstrainning !== 1, color_green : props.data.c_crosstrainning === 1}">{{props.data.c_crosstrainning === 1 ? "Actif" : "Non-Actif"}}</td>
        </tr>
      </table>
    </div>
  </div>

</template>

<style scoped lang="sass">
@import "@/assets/main.sass"

#accordeon_header
  border: 1px solid $primary_2
  padding: 5px 30px
  border-radius: 5px
  margin: 5px
  cursor: pointer
  
table
  td:first-child
    text-align: end

.color_red
  color: red
  text-align: center
.color_green
  color: green
  text-align: center

</style>