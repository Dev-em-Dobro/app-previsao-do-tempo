const chaveDeApi = "d97c2c60a040471a986221219230611";

async function buscarDadosDeClima(cidade) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDeApi}&q=${cidade ? cidade : "Porto Alegre"}&lang=pt`;
  const resposta = await fetch(apiUrl);
  const dados = await resposta.json();

  return dados; 
}

document.querySelector(".btn-busca").addEventListener("click", async () => {
    const cidade = document.getElementById("busca").value;
    const dados = await buscarDadosDeClima(cidade);
    preencherDadosNaTela(dados, cidade);
});

function preencherDadosNaTela(dados, cidade){
    const tempCelsius = dados.current.temp_c;
    const humidade = dados.current.humidity;
    const condicao = dados.current.condition.text;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao =  dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidade;
    document.getElementById("numero-temperatura").textContent = tempCelsius + " °C";
    document.getElementById("humidade").textContent = humidade + "%";
    document.getElementById("condicao").textContent = condicao;
    document.getElementById("velocidade-do-vento").textContent = velocidadeDoVento + " km/h";
    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
    
    document.getElementById("container").classList.add(dados.current.condition.text)


}

