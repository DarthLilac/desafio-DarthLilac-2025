import animais from "./lista-animais.js";

class AbrigoAnimais {
    constructor() {
        const brinquedos = animais.flatMap(animal => animal.brinquedos);
        this.brinquedosValidos = new Set(brinquedos);
    }

    validarEntrada(itens) {
        const itensArray = itens.split(',').map(item => item.trim().toUpperCase());
        const itensUnicos = new Set(itensArray);

        if (itensUnicos.size !== itensArray.length) {
            return 'Brinquedo inválido';
        }

        for (const brinquedo of itensArray) {
            if (!this.brinquedosValidos.has(brinquedo)) {
                return 'Brinquedo inválido';
            }
        }
        return null;
    }

    verificarAdocao(animal, brinquedosPessoaStr) {
        const brinquedosAnimal = animal.brinquedos;
        const brinquedosDaPessoa = brinquedosPessoaStr.split(',').map(item => item.trim().toUpperCase());

        if (animal.nome === 'Loco') {
            const entradaBrinquedos = new Set(brinquedosDaPessoa);
            return brinquedosAnimal.every(brinquedo => entradaBrinquedos.has(brinquedo));
        }

        let indexAnimal = 0;
        for (const brinquedo of brinquedosDaPessoa) {
            if (indexAnimal < brinquedosAnimal.length && brinquedo === brinquedosAnimal[indexAnimal]) {
                indexAnimal++;
            }
        }
        return indexAnimal === brinquedosAnimal.length;
    }

    brinquedoConsumido(brinquedosAnimal, brinquedosConsumidos) {
        return brinquedosAnimal.some(brinquedo => brinquedosConsumidos.has(brinquedo));
    }

    ordenarAdotados(lista) {
        return lista.sort((a, b) => {
            const nomeA = a.split(' - ')[0];
            const nomeB = b.split(' - ')[0];
            return nomeA.localeCompare(nomeB);
        });
    }

    encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
        const erro1 = this.validarEntrada(brinquedosPessoa1);
        if (erro1) return { erro: erro1 };

        const erro2 = this.validarEntrada(brinquedosPessoa2);
        if (erro2) return { erro: erro2 };

        const ordemAnimaisArray = ordemAnimais.split(',').map(nome => nome.trim());
        const nomesValidos = new Set(animais.map(a => a.nome));
        const nomesEntrada = new Set(ordemAnimaisArray);

        if (nomesEntrada.size !== ordemAnimaisArray.length) {
            return { erro: 'Animal inválido' };
        }

        for (const nome of ordemAnimaisArray) {
            if (!nomesValidos.has(nome)) {
                 const nomesValidosLower = new Set([...nomesValidos].map(n => n.toLowerCase()));
                 if (!nomesValidosLower.has(nome.toLowerCase())) {
                    return { erro: 'Animal inválido' };
                 }
            }
        }

        let animaisAdotados = [];
        let adotadosP1 = 0;
        let adotadosP2 = 0;
        const brinquedosConsumidosP1 = new Set();
        const brinquedosConsumidosP2 = new Set();
        
        const casosNormais = ordemAnimaisArray.filter(nome => nome.toLowerCase() !== 'loco');
        const casoLoco = ordemAnimaisArray.some(nome => nome.toLowerCase() === 'loco');

        for (const nomeAnimal of casosNormais) {
            const animal = animais.find(a => a.nome.toLowerCase() === nomeAnimal.toLowerCase());
            if (!animal) continue;

            const p1PodeAdotar = this.verificarAdocao(animal, brinquedosPessoa1);
            const p2PodeAdotar = this.verificarAdocao(animal, brinquedosPessoa2);

            const p1PodeUsarBrinquedos = animal.especie !== 'gato' || !this.brinquedoConsumido(animal.brinquedos, brinquedosConsumidosP1);
            const p2PodeUsarBrinquedos = animal.especie !== 'gato' || !this.brinquedoConsumido(animal.brinquedos, brinquedosConsumidosP2);

            const p1Apto = p1PodeAdotar && adotadosP1 < 3 && p1PodeUsarBrinquedos;
            const p2Apto = p2PodeAdotar && adotadosP2 < 3 && p2PodeUsarBrinquedos;
            
            let resultadoAdocao = '';

            if (p1Apto && p2Apto) {
                resultadoAdocao = `${animal.nome} - abrigo`;
            } 
            else if (p1Apto) {
                resultadoAdocao = `${animal.nome} - pessoa 1`;
                adotadosP1++;
                animal.brinquedos.forEach(b => brinquedosConsumidosP1.add(b));
            } 
            else if (p2Apto) {
                resultadoAdocao = `${animal.nome} - pessoa 2`;
                adotadosP2++;
                animal.brinquedos.forEach(b => brinquedosConsumidosP2.add(b));
            } 
            else {
                resultadoAdocao = `${animal.nome} - abrigo`;
            }

            animaisAdotados.push(resultadoAdocao);
        }
        
        if (casoLoco) {
            const animal = animais.find(a => a.nome === 'Loco');

            const p1PodeComBrinquedos = this.verificarAdocao(animal, brinquedosPessoa1);
            const p2PodeComBrinquedos = this.verificarAdocao(animal, brinquedosPessoa2);

            const p1AptoParaLoco = p1PodeComBrinquedos && adotadosP1 < 3 && adotadosP1 > 0;
            const p2AptoParaLoco = p2PodeComBrinquedos && adotadosP2 < 3 && adotadosP2 > 0;

            let resultadoAdocao = '';
            if (p1AptoParaLoco && p2AptoParaLoco) {
                resultadoAdocao = `${animal.nome} - abrigo`;
            } 
            else if (p1AptoParaLoco) {
                resultadoAdocao = `${animal.nome} - pessoa 1`;
                adotadosP1++;
            } 
            else if (p2AptoParaLoco) {
                resultadoAdocao = `${animal.nome} - pessoa 2`;
                adotadosP2++;
            } 
            else {
                resultadoAdocao = `${animal.nome} - abrigo`;
            }
            animaisAdotados.push(resultadoAdocao);
        }

        return { lista: this.ordenarAdotados(animaisAdotados), erro: null };
    }
}

export { AbrigoAnimais as AbrigoAnimais };