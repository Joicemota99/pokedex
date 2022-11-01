const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

//Conversão da API pro HTML
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}


// Utilizando o método MAP
function loadPokemonItens(offset, limit) {

    //Chama uma lista vazia de pokemons
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        //Converteu a lista de pokemons (Igual o for, só que organizado), para cada pokemon transformou a lista em strings
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        // Juntando agora para concatenar as strings para ser um novo html
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

// Evento de clicar no botão
loadMoreButton.addEventListener('click', () => {
    //Vai acrescentar mais itens
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})