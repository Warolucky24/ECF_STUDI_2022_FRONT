<script setup lang="ts">
import {toFormValidator} from "@vee-validate/zod";
import z from "zod";
import {useField, useForm} from "vee-validate";
import {usePartnerStore} from "@/stores/partnerStore";
import {useUserStore} from "@/stores/userStore";
import type {PartnerInterface} from "@/shared/interfaces";

const userStore = useUserStore()
const {data} = defineProps<{
  data: PartnerInterface
}>()

const emit = defineEmits<{
  (e: "isUpdate"):void
}>()

const initialValues = {
  partner_name: data.partner_name,
  logo_url: data.logo_url,
  user_name: data.user_name
}
const validationSchema = toFormValidator(
    z.object({
      partner_name: z.string().min(3),
      logo_url: z.string().min(3),
      user_name: z.string().min(3)
    })
)

const {handleSubmit } = useForm({
  validationSchema,
  initialValues
})

const {value : value_name, errorMessage: error_name} = useField("partner_name")
const {value : value_logo, errorMessage: error_logo} = useField("logo_url")
const {value : value_name_user, errorMessage: error_name_user} = useField("user_name")

const tryUpdate = handleSubmit(async(formValues)=>{{
  try {
    const partnerStore = usePartnerStore();
    await partnerStore.updatePartner(data.id, formValues.partner_name, formValues.logo_url, data.email, formValues.user_name);
    userStore.sendMsg("Modification pris en compte", "success")
    emit("isUpdate")
  }catch (e) {
    //@ts-ignore
    userStore.sendMsg(e.error, "warning")
  }
}})


</script>


<template>
  <form @submit="tryUpdate">
    <div class="d_flex flex_column justify_content_center align_items_center">
      <div>Nom partenaire : </div>
      <div><input type="text" v-model="value_name" :class="{error_input : error_name}"></div>
    </div>
    <div class="d_flex flex_column justify_content_center align_items_center">
      <div>Logo URL :</div>
      <div><input type="text" v-model="value_logo" :class="{error_input : error_logo}"></div>
    </div>
    <div class="d_flex flex_column justify_content_center align_items_center">
      <div>Nom gérant :</div>
      <div><input type="text" v-model="value_name_user" :class="{error_input : error_name_user}"></div>
    </div>
    <div class="d_flex flex_column justify_content_center align_items_center">
      <button type="submit" class="btn_success m_5">Modifer</button>
    </div>
  </form>
</template>

<style scoped lang="sass">
@import "@/assets/main.sass"

form
  display: flex
  flex-wrap: wrap
  margin: auto
  width: 100%
  +lg_max
    justify-content: center
    align-items: center
  +lg_min
    justify-content: space-between
    align-items: center

</style>