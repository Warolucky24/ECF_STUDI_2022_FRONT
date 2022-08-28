<script setup lang="ts">
import {useUserStore} from "@/stores/userStore";
import {reactive} from "vue";
import {useField, useForm} from "vee-validate";
import {toFormValidator} from "@vee-validate/zod";
import z from "zod";
const userStore = useUserStore()

const state = reactive<{
  open: boolean
}>({
  open: false
})

const validationSchema = z.object({
      password : z.string(),
      password2: z.string()
    }).refine((data) => data.password === data.password2, {
      path: ['password'],
      message: "erreur",
    });


const { handleSubmit} = useForm({
  validationSchema: toFormValidator(validationSchema)
})

const {value : pass1_value, errorMessage : pass1_error} = useField("password")
const {value : pass2_value, errorMessage : pass2_error} = useField("password2")

const tryChangePass = handleSubmit((password)=> {
  console.log(password);
  state.open = false;
  userStore.sendMsg("Mot de passe changé !", "success")
})
</script>


<template>
  <div class="container d_flex justify_content_center align_items_center flex_column">
    <h4>Bienvenue {{userStore!.currentUser.user_name}}</h4>
    <div>
      email : {{userStore!.currentUser.email}}
    </div>
    <div>
      Admin : {{userStore!.currentUser.is_admin ? "Oui" : "Non"}}
    </div>

    <div>
      <div @click="state.open = !state.open" v-if="!state.open" id="btnChangePass">
        Changer de mot de passe
      </div>
      <div v-if="state.open" class="form_open">
        <form @submit="tryChangePass">
          <table>
            <tr>
              <td>Nouveau mot de passe :</td>
              <td><input type="password" v-model="pass1_value" :class="{error_input : pass1_error}"></td>
            </tr>
            <tr>
              <td>Valider nouveau mot de passe :</td>
              <td><input type="password" v-model="pass2_value" :class="{error_input : pass2_error}"></td>
            </tr>
            <tr>
              <td><div class="btn_warning" @click="state.open = !state.open">Retour</div></td>
              <td><button class="btn_success">Changez !</button></td>
            </tr>
          </table>
        </form>
      </div>
      <div class="needNewPass" v-if="!userStore!.currentUser.first_connect">
        Password actuel générer automatiquement. veuillez le changer !
      </div>
    </div>

  </div>

</template>

<style scoped lang="sass">
.error_input
  border: 1px solid red
.needNewPass
  color: red
#btnChangePass
  text-align: center
  cursor: pointer
  transition: all .4s
  &:hover
    transform: scale(1.1)

.form_open
  animation: opacitygo ease .4s

@keyframes opacitygo
  from
    opacity: 0
  to
    opacity: 1
</style>