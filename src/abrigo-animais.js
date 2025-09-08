const ANIMAIS = [
    { nome: 'Rex', especie: 'cao', brinquedos: ['RATO', 'BOLA'] },
    { nome: 'Mimi', especie: 'gato', brinquedos: ['BOLA', 'LASER'] },
    { nome: 'Fofo', especie: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
    { nome: 'Zero', especie: 'gato', brinquedos: ['RATO', 'BOLA'] },
    { nome: 'Bola', especie: 'cao', brinquedos: ['CAIXA', 'NOVELO'] },
    { nome: 'Bebe', especie: 'cao', brinquedos: ['LASER', 'RATO', 'BOLA'] },
    { nome: 'Loco', especie: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
];

class AbrigoAnimais {
    constructor() {
        const brinquedos = ANIMAIS.flatMap(animal => animal.brinquedos);
        this._brinquedosValidos = new Set(brinquedos);
    }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
  }
}

export { AbrigoAnimais as AbrigoAnimais };