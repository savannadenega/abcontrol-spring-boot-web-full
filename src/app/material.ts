export class Material {
    id: number;
    nomeMaterial: string;
    descricaoMaterial: string;
    tipoMaterial: string;
    valorUnidade: number;
}


export let TEST_MATERIALS :Material[] = [
    {id : 101, tipoMaterial: "tijolo", nomeMaterial: "Tijolo", descricaoMaterial: "Tijolo 6 furos",  valorUnidade: 10},
    {id : 102, tipoMaterial: "cimento", nomeMaterial: "Pó para cimento", descricaoMaterial: "Pó para cimento Premium 20 kg", valorUnidade: 100},
    {id : 103, tipoMaterial: "cimento", nomeMaterial: "Pó para cimento", descricaoMaterial: "Pó para cimento 50 kg", valorUnidade: 220}
];