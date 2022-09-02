<script setup lang="ts">
import {useField, useForm} from "vee-validate";
import {usePartnerStore} from "@/stores/partnerStore";
import {toFormValidator} from "@vee-validate/zod";
import z from "zod";
import {useUserStore} from "@/stores/userStore";

const partnerStore = usePartnerStore();
const useStore = useUserStore()

const initialValues = {
  partner_name: "",
  partner_active: "1",
  user_email: ""
}

const emit = defineEmits<{
  (e: "closeModal"):void
}>()

const required_error = {required_error: "Veuillez renseigner ce champ"}
const validationSchema = toFormValidator(
    z.object({
      partner_name: z.string(required_error).min(3),
      partner_active: z.string(required_error),
      user_email: z.string(required_error).email()
    })
)
const {handleSubmit} = useForm({
  validationSchema,
  initialValues
})

const {value : partner_name , errorMessage : partner_error } = useField("partner_name");
const {value : partner_active, errorMessage : partner_active_error} = useField('partner_active')
const {value : user_email, errorMessage : user_email_error } = useField("user_email")

const tryCreatePartner = handleSubmit(async (formValues) => {
  try {
      await partnerStore.addPartner(formValues);
      useStore.sendMsg("Nouveau partenaire crée !", "success");
      emit("closeModal");
  }catch (e){
    // @ts-ignore
    useStore.sendMsg(e.error, "warning")
  }
})
</script>

<template>
  <div class="d_flex justify_content_center align_items_center" id="form">
    <form @submit="tryCreatePartner" class="d_flex flex_column justify_content_center align_items_center">
      <table>
        <tr>
          <td>Nom du partenaire :</td>
          <td><input type="text" v-model="partner_name" :class="{error_input : partner_error}"></td>
        </tr>
        <tr>
          <td colspan="2">
            <select v-model="partner_active"  class="w_100 text_center" :class="{error_input : partner_active_error}">
              <option value="0">Non-Actif</option>
              <option value="1">Actif</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Email du compte partenaire :</td>
          <td><input type="email" v-model="user_email" :class="{error_input : user_email_error}"></td>
        </tr>
      </table>
      <button class="btn_effect mt_20" type="submit">
        <div class="font"></div>
        <div class="text"><span>Enregistrer</span></div>
      </button>
    </form>
  </div>

</template>

<style scoped lang="sass">
@import "@/assets/main.sass"

#form
  min-height: 400px
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