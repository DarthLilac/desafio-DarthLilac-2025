import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,APITO', 
      'RATO,NOVELO', 'Rex');

      expect(resultado.erro).toBe('Brinquedo inválido');
      expect(resultado.lista).toBeFalsy();
  });

  test('Brinquedo duplicado deve ser inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,RATO',
      'BOLA',
      'Rex'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Deve mandar animal para abrigo quando ambos puderem adotar', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA','RATO,BOLA', 'Rex');

      expect(resultado.erro).toBeFalsy();
      expect(resultado.lista).toEqual(['Rex - abrigo']);
  });

  test('Loco deve ser adotado com companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO,BOLA','NOVELO', 'Rex,Loco');
      
    expect(resultado.erro).toBeFalsy();
    expect(resultado.lista).toEqual(['Loco - pessoa 1', 'Rex - pessoa 1']);
  });

  test('Loco não deve ser adotado se estiver sozinho', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO',
      'SKATE,RATO',
      'Loco'
    );
    expect(resultado.lista).toEqual(['Loco - abrigo']);
  });

  test('Lista final deve estar em ordem alfabética', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE',
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE',
      'Bebe,Rex,Fofo,Mimi,Bola'
    );
    const listaOrdenada = [...resultado.lista].sort((a, b) => a.localeCompare(b));
    expect(resultado.lista).toEqual(listaOrdenada);
  });

});