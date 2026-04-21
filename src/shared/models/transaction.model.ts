export interface Transaction {
  descricao: string;
  valor: string;
  valorNum: number;
  data: string;
  categoria: string;
  tipo: 'Receita' | 'Despesa';
  pagamento: string;
}
