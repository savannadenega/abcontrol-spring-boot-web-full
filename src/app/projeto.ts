import { Obra, TEST_OBRAS } from "./obra";

export class Projeto {

    id?: number;
    nome: string;
    tipoProjeto: string;
    statusProjeto: string;
    dataInicial: Date;
    previsaoTermino: Date;
    obras: Obra[];

    constructor(nome: string, tipoProjeto: string, statusProjeto: string, dataInicial: Date, previsaoTermino: Date, id?: number) {
        this.nome = nome;
        this.tipoProjeto = tipoProjeto;
        this.statusProjeto = statusProjeto;
        this.dataInicial = dataInicial;
        this.previsaoTermino = previsaoTermino;
        this.id = id;
        this.obras = [];
    }
}


export let projeto : Projeto = new Projeto('Residencial das Flores', 'Residencial', 'Em Andamento', new Date('01/08/2018'), new Date('02/02/2019'), 101);
projeto.obras.push(TEST_OBRAS[0]);
projeto.obras.push(TEST_OBRAS[1]);

export let TEST_PROJETOS = [ projeto ];

export let ESTADOS_PROJETO = ['Pendente', 'Em Andamento', 'Parcialmente Completo', 'Completo'];

export let TIPOS_PROJETO = ['Residencial', 'Centro Comercial', 'Casa'];