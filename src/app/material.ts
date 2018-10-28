export class Material {
    id: string;
    tipoMaterial: string;
    descricao: string;
    tipoUnidade: string;
    valorUnidade: number;
}


export let TEST_MATERIALS :Material[] = [
    {id : 'TJL001', tipoMaterial: "tijolo", descricao: "Tijolo 6 furos", tipoUnidade: "UN", valorUnidade: 10},
    {id : 'CMT001', tipoMaterial: "cimento", descricao: "Pó para cimento Premium 20 kg", tipoUnidade: "PC", valorUnidade: 100},
    {id : 'CMT002', tipoMaterial: "cimento", descricao: "Pó para cimento 50 kg", tipoUnidade: "PC", valorUnidade: 220}
];