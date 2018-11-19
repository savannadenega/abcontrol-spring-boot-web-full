import {Material, m3, m2} from './material';

export class Compra {
    id: number;
    nomeCompra: string;
    dataCompra: Date;
    razaoSocialFornecedor : string;
    emailFornecedor: string;
    estadoCompra: string;
    ordemMaterial : OrdemCompra[];

    constructor(id : number, nomeCompra: string, dataCompra: Date, razaoSocialFornecedor: string, emailFornecedor: string, estadoCompra: string) { 
        this.id = id;
        this.nomeCompra = nomeCompra;
        this.dataCompra = dataCompra;
        this.razaoSocialFornecedor = razaoSocialFornecedor;
        this.emailFornecedor = emailFornecedor; 
        this.estadoCompra = estadoCompra;
        this.ordemMaterial = [];
    }  
     
}

export class OrdemCompra {
    id: number;
    quantidadeMaterial: number;
    material? : Material;
    idMaterial: number;

    constructor(quantidadeMaterial: number, material : Material) {
        this.quantidadeMaterial = quantidadeMaterial;
        if (material) {
          this.idMaterial = material.id;
          this.material = material;
        } 
        
    }

    static clone(oc: OrdemCompra) : OrdemCompra {
        return new OrdemCompra(oc.quantidadeMaterial, oc.material);
    }
}

let c1 = new Compra(101, 'Compra test', new Date('11/05/2018'), 'Teste', 'dummy@fornecedor.com.br', "PENDENTE");
c1.ordemMaterial.push(new OrdemCompra(2, m3));
c1.ordemMaterial.push(new OrdemCompra(4, m2));

export let ESTADOS_COMPRA = ["PENDENTE", "ENVIADO", "FINALIZADO"];

export let TEST_COMPRAS : Compra[] = [
    c1
];