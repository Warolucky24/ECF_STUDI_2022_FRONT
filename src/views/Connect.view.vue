<script setup lang="ts">
import z from 'zod';
import {useField, useForm} from "vee-validate";
import {toFormValidator} from "@vee-validate/zod";
import {useUserStore} from "@/stores/userStore";
import type {UserConnectInterface} from "@/shared/interfaces/UserInterface";
import {useRouter} from "vue-router";

const router = useRouter()
const userStore = useUserStore()

const initialValues = {
  user_email: "",
  user_password: "",
  souvenir: true
}

const required_error = {required_error : "Veuillez renseigner ce champ"}
const validationSchema = toFormValidator(
    z.object({
      user_email : z.string(required_error).email({message: "Email non valide"}),
      user_password : z.string(required_error),
      souvenir: z.boolean(required_error)
    })
)
const {handleSubmit} = useForm({
  validationSchema,
  initialValues
})

const {value : value_email, errorMessage : error_email} = useField("user_email")
const {value : value_password, errorMessage : error_password} = useField("user_password")
const {value : value_souvenir} = useField("souvenir")

const tryConnect = handleSubmit( async (formValues) => {
  try {
    await userStore.goConnect(formValues as UserConnectInterface);
    await router.push("/app");
  }catch (e){
    console.log(e)
  }
})

</script>


<template>
  <form
      class="z-50 fixed top-auto left-auto flex flex-col content-between h-full w-full"
      @submit="tryConnect"
  >
    <div class="flex flex-col content-between items-center h-full relative p-4 m-auto md:w-1/2 md:h-3/5 bg-sky-800 rounded-md border-indigo-400 border-2">
      <h1 class="font-bold text-3xl m-6 text-sky-900 text-center">Page de connection</h1>
      <table>
        <tr>
          <td class="text-end font-bold">Email :</td>
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
          <td class="text-end font-bold">Mot de passe :</td>
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
        <tr>
          <td>
            <input type="checkbox" v-model="value_souvenir"
                   class="w-5 h-5 bg-sky-200"
                   checked>
          </td>
          <td class="txt_white">Se souvenir de moi</td>
        </tr>
      </table>
      <button
          type="submit"
          class="bg-red-100 transition p-4 text-indigo-400 focus:outline-none"
        >
        Se connecter
      </button>
    </div>
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
  background-image: url("@/../public/img/bg_connect.jpg")
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

  +md_max
    width: 100vw
    height: 100vh
    margin: auto
  +md_min
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