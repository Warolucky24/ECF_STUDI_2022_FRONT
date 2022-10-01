export * from "./user.service"
export * from "./partner.service"
export * from "./struct.service"

export const BASE_URL1 = "http://api-ecf-studi.math-frigoriste.fr/V1";
export const BASE_URL = "http://localhost/ECF_STUDI_2022_BACK/V1";



//@ts-ignore
export const ACCESS_TOKEN = JSON.parse(localStorage.getItem("user"));

export const headerFetch = {
    "Content-type": "application/json",
    'Authorization': `Bearer ${ACCESS_TOKEN}`
}




