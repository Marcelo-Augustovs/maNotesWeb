export const CLEANING_TABLE = {

title: "Tarefas de limpeza",

columns: [

{label:"Local", field:"place"},
{label:"Tarefa", field:"task"},
{label:"Frequência", field:"frequency"},
{label:"Feito", field:"done", type:"checkbox"}

],

rows:[

{place:"Cozinha", task:"Limpar fogão", frequency:"Semanal", done:false},
{place:"Banheiro", task:"Limpar pia", frequency:"Semanal", done:false},
{place:"Sala", task:"Tirar pó", frequency:"Semanal", done:false}

]

}