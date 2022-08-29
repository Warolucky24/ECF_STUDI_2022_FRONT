<script setup lang="ts">

import type {StructPartnerDetailInterface} from "@/shared/interfaces";
import {ref} from "vue";

defineProps<{
  data : StructPartnerDetailInterface
}>()
const active = ref<boolean>(false)

</script>

<template>
  <div>
    <h1 @click="active = !active">{{data.struct_name}}  | {{data.struct_active ? "Actif" : "Non-Actif"}}</h1>
  </div>
  <div v-if="active">
    <table>
      <table>
        <tr>
          <td>Vente de boissons :</td>
          <td>{{data.v_boisson}}</td>
        </tr>
        <tr>
          <td>vente de vêtements :</td>
          <td>{{data.v_vetement}}</td>
        </tr>
        <tr>
          <td>Cours particulier :</td>
          <td>{{data.c_particulier}}</td>
        </tr>
        <tr>
          <td>Cours de pilate :</td>
          <td>{{data.c_pilate}}</td>
        </tr>
        <tr>
          <td>Cours de crosstrainning :</td>
          <td>{{data.c_crosstrainning}}</td>
        </tr>
      </table>
    </table>
  </div>
</template>