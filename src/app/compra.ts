import {Material, m3, m2} from './material';

export class Compra {
    id: number;
    nome: string;
    dataCompra: Date;
    nomeFornecedor : string;
    emailFornecedor: string;
    itens : OrdemCompra[];

    constructor(id : number, nome: string, dataCompra: Date, nomeFornecedor: string, emailFornecedor: string) { 
        this.id = id;
        this.nome = nome;
        this.dataCompra = dataCompra;
        this.nomeFornecedor = nomeFornecedor;
        this.emailFornecedor = emailFornecedor; 
        this.itens = [];
    }  
     
    getValorTotal() : number {
        let total = 0;
        for (let oc of this.itens) {
            total += oc.preco;
        }
        return total;
    }
}

export class OrdemCompra {
    quantidade: number;
    preco: number;
    material: Material;

    constructor(quantidade: number, material : Material) {
        this.quantidade = quantidade;
        if (material) {
            this.preco = material.valorUnidade * quantidade;
            this.material = material;
        } else {
            this.preco = 0;
            this.material = undefined;
        }
        
    }

    updatePrice() : void {
        this.preco = this.material.valorUnidade * this.quantidade;
    }

    static clone(oc: OrdemCompra) : OrdemCompra {
        return new OrdemCompra(oc.quantidade, oc.material);
    }
}

let c1 = new Compra(101, 'Compra test', new Date('11/05/2018'), 'Teste', 'dummy@fornecedor.com.br');
c1.itens.push(new OrdemCompra(2, m3));
c1.itens.push(new OrdemCompra(4, m2));


export let TEST_COMPRAS : Compra[] = [
    c1
];