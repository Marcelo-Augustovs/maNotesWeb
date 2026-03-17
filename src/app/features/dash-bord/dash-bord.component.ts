import { AfterViewInit, Component, Input } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import Chart from 'chart.js/auto';
import { Card } from '../../../shared/models/card.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dash-bord',
  imports: [CardComponent, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './dash-bord.component.html',
  styleUrl: './dash-bord.component.scss'
})
export class DashBordComponent implements AfterViewInit {

   cardList: Card[] = [
    {
      title: "Receitas do mês",
      color: "receita",
      icon: "⬆",
      valor: "R$ 4.000,23"
    },
    {
      title: "Despesas do mês",
      color: "despesa",
      icon: "⬇",
      valor: "R$ 0,00"
    },
    {
      title: "Balanço do mês",
      color: "saldo",
      icon: "$",
      valor: "R$ 4.323,45"
    },
    {
      title: "Balanço geral",
      color: "geral",
      icon: "💰",
      valor: "R$ 10.730,43"
    }
   ]

   currentDate = new Date()

  selectedYear = this.currentDate.getFullYear()
  selectedMonth = this.currentDate.getMonth()

  months = [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
  ]

  years:number[] = []

  ngOnInit(){

    this.loadYears()

  }

  loadYears(){

    // exemplo vindo da API
    const apiYears = [2022,2023,2024]

    const currentYear = this.currentDate.getFullYear()

    const yearSet = new Set([...apiYears, currentYear])

    this.years = Array.from(yearSet).sort()

  }

  selectMonth(index:number){

    this.selectedMonth = index

    this.loadDashboard()

  }

  changeYear(){

  if(!this.years.includes(this.selectedYear)){

    this.years.push(this.selectedYear)
    this.years.sort()

  }

  this.loadDashboard()

}

previousYear(){

  this.selectedYear--

  this.changeYear()

}

nextYear(){

  this.selectedYear++

  this.changeYear()

}

  loadDashboard(){

    console.log("Ano:",this.selectedYear,"Mês:",this.selectedMonth+1)

    // chamada futura da API

  }

 
  ngAfterViewInit(): void {

    new Chart("financeChart", {

      type: 'bar',

      data: {

        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],

        datasets: [

          {
            label: 'Receitas',
            data: [1200, 1900, 3000, 500, 2000, 3200],
            backgroundColor: '#2ecc71'
          },

          {
            label: 'Despesas',
            data: [800, 1100, 1200, 400, 900, 1500],
            backgroundColor: '#e74c3c'
          }

        ]

      }

    });

  }

  showAddMenu = false

toggleAddMenu(){

  this.showAddMenu = !this.showAddMenu

}

addRevenue(){

  console.log("Nova receita")

}

addExpense(){

  console.log("Nova despesa")

}

addEvent(){

  console.log("Novo evento")

}

}
