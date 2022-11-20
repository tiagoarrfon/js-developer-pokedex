const pokemonList = document.getElementById('pokemonList')
const sectionPoke = document.querySelector('.content')
const showModal = document.querySelector('.modal-content')
const loadMoreButton = document.getElementById('loadMoreButton')
const btnClose = document.querySelector('.bt-close')

const maxRecords = 151
const limit = 12
let offset = 0;

function closeModal() {
    showModal.style.display = 'none'
    sectionPoke.classList.remove("open-modal");
}

function setColor(num){
    if (num <= 20) {
        return "linear-gradient(to right, #a91c1c, #a91c1c, #bd5e10);"
    }else if(num > 20 && num <= 30){
        return "linear-gradient(to right, #a91c1c, #a91c1c, #cbbf10);"
    }
     else if(num > 30 && num <= 60){
        return "linear-gradient(to right,#cbbf10, #9b9324, #4a9b4a);"
    }else if(num > 60 && num <= 70){
        return "linear-gradient(to right, #f6cf0d,  #28a928e8, #28a928e8);"
    }else if(num > 60){
        return "linear-gradient(to right, #287228, #0fda0fe8);"
    }
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="getDetails(event)">
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

function showDetails(pokemon) {
    showModal.style.display = 'block'
    return `
    <div class="modal">
    <span class="bt-close" onclick="closeModal()">X</span>
    <div id="modal-details">
        <div class="modal-img ${pokemon.type}"><img src="${pokemon.gif}"
        alt="${pokemon.name}">
        <div class="name-poke">${pokemon.name}</div>
            <span class="number-poke">#${pokemon.number}</span>
        </div>
        ${pokemon.stats.map((stat) => `
        <div class="modal-poke-details">
        <span class="detail-name">${stat['stat']['name']}</span>
        <div class="container">
            <div class="progress-bar" style="width: ${stat['base_stat']}%; background-image: ${setColor(stat['base_stat'])};"></div>
        </div>
    </div>
        `).join('')}
    </div>
</div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function getDetails(event) {
    pokeApi.getDetails(event).then((pokemon = []) => {
        const newModal = showDetails(pokemon)
        showModal.innerHTML += newModal
        sectionPoke.classList.add("open-modal");
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
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