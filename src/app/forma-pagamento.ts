export class FormaPagamento {
    id:number;
    formaPagamento: string;
    descricaoPagamento: string;
    valorPagamento: number;

}

export const TEST_FORMAS_PG : FormaPagamento[] = [
    {id: 101, formaPagamento: 'À vista - Dinheiro', descricaoPagamento : 'À vista - Dinheiro - até 5% desconto', valorPagamento: 1500},
    {id: 102, formaPagamento: 'Boleto', descricaoPagamento : 'Boleto Bancário', valorPagamento: 30000}
];