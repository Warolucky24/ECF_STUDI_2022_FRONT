<script setup lang="ts">
import z from 'zod';
import {useField, useForm} from "vee-validate";
import {toFormValidator} from "@vee-validate/zod";
import {useUserStore} from "@/stores/userStore";
import type {UserConnectInterface} from "@/shared/interfaces/UserInterface";
import {useRouter} from "vue-router";

const router = useRouter()

const required_error = {required_error : "Veuillez renseigner ce champ"}
const validationSchema = toFormValidator(
    z.object({
      email : z.string(required_error).email({message: "Email non valide"}),
      password : z.string(required_error)
    })
)
const {handleSubmit} = useForm({
  validationSchema
})

const {value : value_email, errorMessage : error_email} = useField("email")
const {value : value_password, errorMessage : error_password} = useField("password")


const tryConnect = handleSubmit( (formValues) => {
  const userStore = useUserStore()
  userStore.goConnect(formValues as UserConnectInterface)
  router.push("/app")
})

</script>


<template>
  <form class="form_connect d_flex flex_column justify_content_arround align_items_center" @submit="tryConnect">
    <h1>Page de connection</h1>
    <table>
      <tr>
        <td class="text_end">Email :</td>
        <td>
          <input
            type="email"
            v-model="value_email"
            id="email_user"
            :class="{ error_input : error_email}"
            class="input_text"
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
              class="input_text"
          >
        </td>
      </tr>
    </table>
    <button class="btn_effect mt_20">
      <div class="font"></div>
      <div class="text"><span>Se connecter</span></div>
    </button>
  </form>
  <div id="bg"></div>
</template>

<style lang="sass" scoped>
@import "@/assets/main.sass"
h1
  color: $secondary
#bg
  position: absolute
  top: 0px
  left: 0px
  width: 100vw
  height: 100vh
  background-image: url("./src/assets/img/bg_connect.jpg")
  background-repeat: no-repeat
  background-size: cover
  z-index: 1
button
  background: none
  border: none

.form_connect
  position: absolute
  z-index: 10
  padding: 20px
  border-radius: 7px
  background: $primary_2

  @include xs
    width: 100vw
    height: 100vh
    margin: auto
  @include md
  width: 50vw
  height: 50vh
  margin: 25vh 25vw
  border: 3px solid $secondary


table, td, tr
  background: transparent
table td:first-child
  text-align: end
  color: $gray
.error_input
  border-color: red
</style>