const chaveDeApi = "cd31863ae267407cb01212131232011";
const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", async () => {
  const cidade = document.getElementById("input-busca").value;

  if (!cidade) return;

  const dados = await buscarDadosDeClima(cidade);

  if (dados) preencherDadosNaTela(dados, cidade);
});

async function buscarDadosDeClima(cidade) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDeApi}&q=${cidade}&aqi=no&lang=pt`;
  const resposta = await fetch(apiUrl);

  console.log(resposta.status);

  if (resposta.status !== 200) {
    return;
  }

  const dados = await resposta.json();

  return dados;
}

function preencherDadosNaTela(dados, cidade) {
  const tempCelsius = dados.current.temp_c;
  const humidade = dados.current.humidity;
  const condicao = dados.current.condition.text;
  const velocidadeDoVento = dados.current.wind_kph;
  const iconeCondicao = dados.current.condition.icon;

  document.getElementById("cidade").textContent = cidade;
  document.getElementById("numero-temperatura").textContent =
    tempCelsius + " °C";
  document.getElementById("humidade").textContent = humidade + "%";
  document.getElementById("condicao").textContent = condicao;
  document.getElementById("velocidade-do-vento").textContent =
    velocidadeDoVento + " km/h";
  document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
}
