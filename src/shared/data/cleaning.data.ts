import { TableColumn } from "../models/table-column.model";

export const CLEANING_TABLE = {

title: "Tarefas de limpeza",

columns: <TableColumn[]>[

{ label:"Local", field:"place" },
{ label:"Tarefa", field:"task" },
{ label:"Frequência", field:"frequency" },
{ label:"Feito", field:"done", type:"checkbox" }

],

rows:[

{ place:"Cozinha", task:"Limpar fogão", frequency:"Semanal", done:false }

]

}