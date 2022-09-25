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
  partner_id : "",
  user_name : "",
  struct_address: "",
  struct_city : "",
  struct_postal: 2400
}
const emit = defineEmits<{
  (e: "closeModal"):void
}>()

const required_error = {required_error : "Veuillez renseigner ce champ"}
const validationSchema = toFormValidator(
    z.object({
      user_email: z.string(required_error).email(),
      struct_name: z.string(required_error).min(3),
      struct_active: z.string(required_error),
      partner_id: z.number(required_error),
      user_name: z.string(required_error).min(3),
      struct_address: z.string(required_error).min(5),
      struct_city: z.string(required_error).min(3),
      struct_postal: z.number(required_error).min(0)
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
const {value : value_user_name, errorMessage : error_user_name} = useField('user_name');
const {value : value_struct_address, errorMessage : error_struct_address} = useField('struct_address');
const {value : value_struct_city, errorMessage : error_struct_city} = useField('struct_city');
const {value : value_struct_postal, errorMessage : error_struct_postal} = useField('struct_postal');

const tryCreateStruct = handleSubmit(async (formValues) => {
  try {
    //@ts-ignore
  await structStore.addStruct(formValues);
  await userStore.sendMsg("Nouvelle structure crée ! ", "success");
  emit('closeModal');
  }catch (e){
    //@ts-ignore
    userStore.sendMsg(e.error, "danger")
  }
})
</script>

<template>
  <Teleport to="body">
    <div class=" bg-gray-600 bg-opacity-30 overflow-x-hidden fixed top-0 right-0 z-50 w-full h-full justify-center items-center">
      <div class="relative p-4  m-auto ms:w-3/4 md:w-3/5 lg:w-1/2">
        <div class="relative bg-sky-800 rounded-lg shadow">
          <button @click="emit('closeModal')" class="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-6 text-center">
            <form @submit="tryCreateStruct" class="flex flex-col content-center items-center h-auto p-5" id="form">
              <table>
                <tr>
                  <td colspan="2" class="text-white text-2xl font-bold p-1">Lier un partenaire :</td>
                </tr>
                <tr>
                  <td colspan="2">
                    <select v-model="value_partner_id" class="w-full text-center" :class="{error_input : error_partner_id}">
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
                  <td colspan="2" class="text-white text-2xl font-bold p-2">Structure :</td>
                </tr>
                <tr>
                  <td class="text-end text-white">Nom :</td>
                  <td><input type="text" v-model="value_struct_name" :class="{error_input : error_struct_name}"></td>
                </tr>
                <tr>
                  <td colspan="2">
                    <select v-model="value_struct_active"  class="w-full text-center" :class="{error_input : error_struct_active}">
                      <option value="0">Inactive</option>
                      <option value="1">Actif</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td class="text-end text-white">Adresse :</td>
                  <td><input type="text" v-model="value_struct_address" :class="{error_input : error_struct_address}"></td>
                </tr>
                <tr>
                  <td class="text-end text-white">Code postal :</td>
                  <td><input type="number" v-model="value_struct_postal" :class="{error_input : error_struct_postal}"></td>
                </tr>
                <tr>
                  <td class="text-end text-white">Ville :</td>
                  <td><input type="text" v-model="value_struct_city" :class="{error_input : error_struct_city}"></td>
                </tr>
                <tr>
                  <td colspan="2" class="text-2xl font-bold p-2 text-white">Gérant :</td>
                </tr>
                <tr>
                  <td class="text-end text-white">Mail :</td>
                  <td><input type="email" v-model="value_user_email" :class="{error_input : error_user_email}"></td>
                </tr>
                <tr>
                  <td class="text-end text-white">Nom :</td>
                  <td><input type="text" v-model="value_user_name" :class="{error_input : error_user_name}"></td>
                </tr>
              </table>
              <button class="btn_effect mt-5" type="submit">
                <div class="font bg-slate-200"></div>
                <div class="text text-indigo-400"><span>Enregistrer</span></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
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
    background: #0c4a6e
</style>