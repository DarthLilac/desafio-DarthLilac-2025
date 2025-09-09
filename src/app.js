import { AbrigoAnimais } from './abrigo-animais.js';

const abrigo = new AbrigoAnimais();

document.getElementById('form-abrigo').addEventListener('submit', (e) => {
  e.preventDefault();

  const brinquedosPessoa1 = document.getElementById('pessoa1').value;
  const brinquedosPessoa2 = document.getElementById('pessoa2').value;
  const ordemDosAnimais = document.getElementById('ordem').value;

  const resultado = abrigo.encontraPessoas(
    brinquedosPessoa1,
    brinquedosPessoa2,
    ordemDosAnimais
  );

  const divResultado = document.getElementById('resultado');
  divResultado.innerHTML = "<h3>Resultado final:</h3>";

  if (resultado.erro) {
    divResultado.innerHTML += `<p style="color:red;">Erro: ${resultado.erro}</p>`;
  } else {
    divResultado.innerHTML += `<pre>${JSON.stringify(resultado.lista, null, 2)}</pre>`;
  }
});
