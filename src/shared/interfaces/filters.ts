export type Etat = "all" | "Actif" | "Non-actif"

export interface FilterInterface{
    search: string,
    etat: Etat
}

export interface FilterUpdate{
    search?: string,
    etat?: Etat,
}

export const DEFAULT_FILTER: FilterInterface = {
    search:"",
    etat: "all"
}