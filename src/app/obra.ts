export class Obra {
    idObra: number;
    nome: string;
    tipoObra: string;
    statusObra: string;
    dataInicial: Date;
    previsaoTermino: Date;
}

export let tipoObras : string[] = ["Construção - Casa", "Construção - Prédio", "Reforma - Casa", "Reforma - Apartamento"];

export let statusObras : string[] = ["Pendente", "Em andamento", "Concluída"];

export let TEST_OBRAS : Obra[] = [
    {idObra: 101, nome: "Prédio Av. Paulista, 321", tipoObra: "Construção - Prédio", statusObra : "Em Andamento", dataInicial: new Date("08/01/2018"), previsaoTermino: new Date("12/01/2018")},
    {idObra: 102, nome: "Triplex Guarujá", tipoObra: "Reforma - Apartamento", statusObra : "Pendente", dataInicial: new Date("12/08/2018"), previsaoTermino: new Date("02/01/2019")}
];