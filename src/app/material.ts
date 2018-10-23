export class Material {

    tipoMaterial: string;
    descricao: string;
    tipoUnidade: string;
    valorUnidade: number;
}


export let TEST_MATERIALS = [
    {tipoMaterial: "tijolo", descricao: "Tijolo 6 furos", tipoUnidade: "UN", valorUnidade: "10"},
    {tipoMaterial: "cimento", descricao: "Pó para cimento Premium 20 kg", tipoUnidade: "PC", valorUnidade: "100"},
    {tipoMaterial: "cimento", descricao: "Pó para cimento 50 kg", tipoUnidade: "PC", valorUnidade: "220"}
];