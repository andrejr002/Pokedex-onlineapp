var weatherConfig = {
  key: "6da10f70d7e30d82211fbed52159a0b3",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric",
};

// chamando os elementos do html no javascript
const cityLabel = document.querySelector(".city");
const container_img = document.querySelector(".container-img");
const container_temp = document.querySelector(".container-temp");
const temp_number = document.querySelector(".container-temp div");
const temp_unit = document.querySelector(".container-temp span");
const weather_t = document.querySelector(".weather");
const search_input = document.querySelector(".form-control");
const search_button = document.querySelector(".btn");
const low_high = document.querySelector(".low-high");

search_button.addEventListener("click", function () {
  buscandoCidades(search_input.value);
});

search_button.addEventListener("click", function () {
  buscandoCidades(search_input.value);
});

search_input.addEventListener("keypress", enter);
function enter(event) {
  key = event.keyCode;
  if (key === 13) {
    buscandoCidades(search_input.value);
  }
}

//Definindo 'city' através do campo de pesquisa");

function buscandoCidades(city) {
  let weatherEndpoint = `${weatherConfig.base}weather?q=${city}&lang=${weatherConfig.lang}&units=${weatherConfig.units}&APPID=${weatherConfig.key}`;

  fetch(weatherEndpoint)
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`http error: status ${response.status}`); 
        // se a requisição na barra de pesquisa não poder ser concluida, a mensagem de erro vai catch
      }
      return response.json();
    })
    .then(function (weatherData) {
      let temperatura = weatherData.main.temp;
      printarInformacoesClima(weatherData);
      let pokemonType = pokemonPorTemperatura(temperatura);
      carregarDadosPokemons(pokemonType);
    })
    .catch((error) => {
      alert(error.message);
    });
}
function printarInformacoesClima(weatherData) {
  cityLabel.innerText = `${weatherData.name}, ${weatherData.sys.country}`;

  let iconName = weatherData.weather[0].icon;
  container_img.innerHTML = `<img src="./assets/icons/${iconName}.png">`;

  let temperature = weatherData.main.temp;
  temp_number.innerHTML = temperature;
  temp_unit.innerHTML = `°c`;

  weather_tempo = weatherData.weather[0].description;
  weather_t.innerText = capitalizeFirstLetter(weather_tempo);

  low_high.innerText = `${Math.round(
    weatherData.main.temp_min
  )}°c / ${Math.round(weatherData.main.temp_max)}°c`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function carregarDadosPokemons(pokemonType) {
  let pokemonEndpoint = `https://pokeapi.co/api/v2/type/${pokemonType}/`;

  fetch(pokemonEndpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (pokemonData) {
      return printarPokemons(pokemonData);
    })
    .catch((_result) => console.error("Erro na API de Pokemon"));
}

function printarPokemons(pokemonData) {
  let pokemons = pokemonData.pokemon.map((pokemon) => {
    let pokemonUrl = pokemon.pokemon.url;
    let values = pokemonUrl.split("/");
    let id = values[6];

    return {
      name: pokemon.pokemon.name,
      id: id,
      sprite: `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/${id}.png`,
      type: pokemonData.name,
    };
  });
  geradorHTML(pokemons);
}

function geradorHTML(pokemons) {
  let html = "";
  pokemons.forEach((pokemon) => {
    html += `
        <li class= "card ${pokemon.type}">
        <img class="card__imagem" alt="${pokemon.name}" src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/${pokemon.id}.png" />
        <h2 class= "card__titulo">${pokemon.id}. ${pokemon.name}</h2>
        <p class="card__descricao">${pokemon.type}</p>
        </li>
              `;
  });

  inserirCardsPokemons(html);
}

function inserirCardsPokemons(html) {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = html;
};

function pokemonPorTemperatura(temperature) {
  if (temperature >= 33) return "fire";
  if (temperature >= 27) return "rock";
  if (temperature >= 23) return "bug";
  if (temperature >= 15) return "ground";
  if (temperature >= 12) return "grass";
  if (temperature >= 5) return "water";
  if (temperature <= 4) return "ice";
}
