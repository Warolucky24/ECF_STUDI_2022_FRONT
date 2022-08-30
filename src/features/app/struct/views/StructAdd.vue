<script setup lang="ts">

import {usePartnerStore} from "@/stores/partnerStore";
import {useField, useForm} from "vee-validate";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/userStore";
import {toFormValidator} from "@vee-validate/zod";
import z from "zod";
import {useStructStore} from "@/stores/structStore";

const router = useRouter()
const partnerStore = usePartnerStore()
const userStore = useUserStore()
const structStore = useStructStore()

const initialValues= {
  user_email: "",
  struct_name: "",
  struct_active: "1",
  partner_id : ""
}

const required_error = {required_error : "Veuillez renseigner ce champ"}
const validationSchema = toFormValidator(
    z.object({
      user_email: z.string(required_error).email(),
      struct_name: z.string(required_error).min(3),
      struct_active: z.string(required_error),
      partner_id: z.number(required_error)
    })
)

const {handleSubmit} = useForm({
  validationSchema,
  initialValues
})

const {value : value_user_email, errorMessage : error_user_email}  = useField("user_email");
const {value : value_struct_name, errorMessage : error_struct_name} = useField("struct_name");
const {value : value_struct_active, errorMessage: error_struct_active} = useField("struct_active");
const {value : value_partner_id, errorMessage : error_partner_id} = useField("partner_id");


const tryCreateStruct = handleSubmit(async (formValues) => {
  try {
    //@ts-ignore
  await structStore.addStruct(formValues);
  await userStore.sendMsg("Nouvelle structure crée ! ", "success");
  await router.push("/app/struct");
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger")
  }
})
</script>

<template>
  <form @submit="tryCreateStruct" class="d_flex flex_column justify_content_center align_items_center">
    <table>
      <tr>
        <td colspan="2">
          <select v-model="value_partner_id" class="w_100 text_center" :class="{error_input : error_partner_id}">
            <option
                v-for="partner in partnerStore.partner"
                :value="partner.id"
                :key="partner.id"
            >
              {{partner.partner_name}}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td>Nom de la Structure :</td>
        <td><input type="text" v-model="value_struct_name" :class="{error_input : error_struct_name}"></td>
      </tr>
      <tr>
        <td>Email gérant de la structure :</td>
        <td><input type="email" v-model="value_user_email" :class="{error_input : error_user_email}"></td>
      </tr>
      <tr>
        <td colspan="2">
          <select v-model="value_struct_active"  class="w_100 text_center" :class="{error_input : error_struct_active}">
            <option value="0">Non-Actif</option>
            <option value="1">Actif</option>
          </select>
        </td>
      </tr>
    </table>
    <button class="btn_effect mt_20" type="submit">
      <div class="font"></div>
      <div class="text"><span>Enregistrer</span></div>
    </button>
  </form>
</template>

<style scoped lang="sass">
@import "@/assets/main.sass"

.error_input
  border: 1px solid red
button
  background: none
  border: none
  outline: none
.btn_effect
  .font
    background: $primary_2
</style>