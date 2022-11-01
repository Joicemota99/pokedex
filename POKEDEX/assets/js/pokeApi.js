
// Objeto
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    //construção de um array
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

//Adicionando ao objeto pokeAPI
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    //converteu a lista pra json
        .then((response) => response.json())
        
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        //converteu a lista pra json
        .then((response) => response.json())
        //Pegou a lista e transformou em uma nova lista
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        //O promise é uma lista de promessas para que pegue as imagens de cada pokemon sem que faça a requisição manualmente
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}