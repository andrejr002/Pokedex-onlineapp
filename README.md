# Pokedex-onlineapp


tecnologias usadas : HTML , Css, Javascript, bootstrap, Font-awesome

Iniciei declarando a variável var weatherconfig para obter informações da api de temperatura e logo apois fiz a chamada das querys para que meus eventos javascritp tenham acesso ao html.

Em seguida na Function buscandoCidades vai requisitar da API através do fetch para retornar uma promesse e retornando a resposta em json e depois retornando ela mesma para outra function setada como"weatherData" para que possa usar os parametros dentro da api.

a variável let weatherEndpoint foi feita para enxugar o caminho da url

na function printarInformacoesClima usa o resultado da api para passar o elemento do javascript em conjunto do innerText e innerHTML (para saber que não é só texto e sim uma tag do html)

na function carregarDadosPokemons uso da mesma linha de raciocínio utilizada para obter os resultados da api de temperatura requisantando através do fetch e retornando o resultado json

na function printarPokemons com os dados do "pokemondata" faço a separação dos pokemons através do "map" para obter os pokemons em uma lista nova por nomes, tipos e id e dando saida atravez do "geradorhtml"

na function geradorHTML com as informações dos pokemons é gerado através do forEach um "loop" com a estrutura dos card com as informações do pokemon

na function inserirCardsPokemons é onde fica a querys da chamada dos cards pokemon no html

na function pokemonPorTemperatura fica as variáveis de condições de temperatura que cada pokemon deve possuir, sendo assim apois pesquisar a cidade o elemento do pokemon retornado estará nessas condições
