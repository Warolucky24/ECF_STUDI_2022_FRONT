<script setup lang="ts">
import z from 'zod';
import {useField, useForm} from "vee-validate";
import {toFormValidator} from "@vee-validate/zod";
import {useUserStore} from "@/stores/userStore";
import type {UserInterface} from "@/shared/interfaces/UserInterface";
import {useRouter} from "vue-router";

const router = useRouter()

const required_error = {required_error : "Veuillez renseigner ce champ"}
const validationSchema = toFormValidator(
    z.object({
      email_user : z.string(required_error).email({message: "Email non valide"}),
      password_user : z.string(required_error)
    })
)
const {handleSubmit} = useForm({
  validationSchema
})

const {value : value_email, errorMessage : error_email} = useField("email_user")
const {value : value_password, errorMessage : error_password} = useField("password_user")


const tryConnect = handleSubmit( (formValues) => {
  const userStore = useUserStore()
  userStore.goConnect(formValues as UserInterface)
  router.push("/app")
})

</script>


<template>
  <form class="form_connect d_flex flex_column justify_content_center align_items_center" @submit="tryConnect">
    <table>
      <tr>
        <td class="text_end">Email :</td>
        <td>
          <input
            type="email"
            v-model="value_email"
            id="email_user"
            :class="{ error_input : error_email}"
        ></td>
      </tr>
      <tr>
        <td class="text_end">Mot de passe :</td>
        <td>
          <input
              type="password"
              v-model="value_password"
              id="password_user"
              :class="{error_input : error_password}"
          >
        </td>
      </tr>
    </table>
    <button class="btn btn_effect">
      <div class="font"></div>
      <div class="text"><span>Se connecter</span></div>
    </button>
  </form>
</template>

<style lang="sass" scoped>
@import "@/assets/main.sass"

.form_connect
  padding: 20px
  border-radius: 5px
  background: $bleu_clair
  @include xs
    width: 100vw
    height: 100vh
    margin: auto
  @include sm
  width: 85vw
  height: 60vh
  margin: 20vh 7.5vw


table, td, tr
  background: transparent

.error_input
  border-color: red
</style>