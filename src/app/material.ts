export class Material {
    id: number;
    nomeMaterial: string;
    descricaoMaterial: string;
    tipoMaterial: string;
    valorUnidade: number;

    constructor(nomeMaterial : string, descricaoMaterial: string, tipoMaterial: string, valorUnidade: number, id? : number) {
        this.id = id;
        this.nomeMaterial = nomeMaterial;
        this.descricaoMaterial = descricaoMaterial;
        this.tipoMaterial = tipoMaterial;
        this.valorUnidade = valorUnidade;
    }

}

export let m1 = new Material('Tijolo', 'Tijolo 6 furos', 'tijolo', 10, 101);
export let m2 = new Material('Pó para cimento', 'Pó para cimento Premium 20 kg', 'cimento', 150, 102);
export let m3 = new Material('Pó para cimento', 'Pó para cimento 50 kg', 'cimento', 200, 103);


export let TEST_MATERIALS :Material[] = [ m1, m2, m3 ];