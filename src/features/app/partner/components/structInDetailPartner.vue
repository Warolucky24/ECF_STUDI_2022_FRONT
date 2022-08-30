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
  <div @click="open = !open">
    <h1 class="d_flex mt_20">
      <router-link :to="'/app/struct/detail/'+data.id">{{data.struct_name}}</router-link>  | {{props.data.struct_active ? "Actif" : "Non-Actif"}}
    </h1>
  </div>
  <div v-if="open">
    <table>
      <table>
        <tr>
          <td>Vente de boissons :</td>
          <td>{{props.data.v_boisson === 1 ? "Actif" : "Non-Actif"}}</td>
        </tr>
        <tr>
          <td>vente de vêtements :</td>
          <td>{{props.data.v_vetement === 1 ? "Actif" : "Non-Actif"}}</td>
        </tr>
        <tr>
          <td>Cours particulier :</td>
          <td>{{props.data.c_particulier === 1 ? "Actif" : "Non-Actif"}}</td>
        </tr>
        <tr>
          <td>Cours de pilate :</td>
          <td>{{props.data.c_pilate === 1 ? "Actif" : "Non-Actif"}}</td>
        </tr>
        <tr>
          <td>Cours de crosstrainning :</td>
          <td>{{props.data.c_crosstrainning === 1 ? "Actif" : "Non-Actif"}}</td>
        </tr>
      </table>
    </table>
  </div>
</template>