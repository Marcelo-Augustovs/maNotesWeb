import { TableColumn } from "../models/table-column.model";

export const FOOD_TABLE: {

  title: string
columns: TableColumn[]
rows: any[]
} = {

title:"Lista de alimentos",

columns:[

{ label:"Item", field:"item" },
{ label:"Categoria", field:"category" },
{ label:"Quantidade", field:"quantity" },
{ label:"Comprado", field:"done", type:"checkbox" }

],

rows:[

{ item:"Arroz", category:"Grãos", quantity:"5kg", done:false }

]

}