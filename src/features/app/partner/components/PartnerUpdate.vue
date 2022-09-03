<script setup lang="ts">
import {toFormValidator} from "@vee-validate/zod";
import z from "zod";
import {useField, useForm} from "vee-validate";
import {usePartnerStore} from "@/stores/partnerStore";
import {useUserStore} from "@/stores/userStore";

const userStore = useUserStore()
const props = defineProps<{
  partner_id: number,
  partner_name: string,
  logo_url: string
}>()

const emit = defineEmits<{
  (e: "isUpdate"):void
}>()

const initialValues = {
  partner_name: props.partner_name,
  logo_url: props.logo_url
}
const validationSchema = toFormValidator(
    z.object({
      partner_name: z.string().min(3),
      logo_url: z.string().min(3)
    })
)

const {handleSubmit } = useForm({
  validationSchema,
  initialValues
})

const {value : value_name, errorMessage: error_name} = useField("partner_name")
const {value : value_logo, errorMessage: error_logo} = useField("logo_url")

const tryUpdate = handleSubmit(async(formValues)=>{{
  try {
    const partnerStore = usePartnerStore();
    await partnerStore.updatePartner(props.partner_id, formValues.partner_name, formValues.logo_url);
    userStore.sendMsg("Modification pris en compte", "success")
    emit("isUpdate")
  }catch (e) {
    //@ts-ignore
userStore.sendMsg(e.error, "warning")
  }
}})


</script>


<template>
  <form class="d_flex justify_content_center align_items_center" @submit="tryUpdate">
    <div>
      Nom partenaire : <input type="text" v-model="value_name" :class="{error_input : error_name}">
    </div>
    <div>
      Logo URL : <input type="text" v-model="value_logo" :class="{error_input : error_logo}">
    </div>
    <div class="d_flex flex_column justify_content_center align_items_center">
      <button type="submit" class="btn_success mx_20">Modifer</button>
    </div>
  </form>
</template>