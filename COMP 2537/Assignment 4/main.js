async function easy() {
    const numOfPairs = 3
    let matched = 0
    let leftToMatch = 3
    let numOfClicks = 0

    const gameBoard = document.querySelector('.game-container')
    let response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=50');
    pokemonList = response.data.results;
    createCards(3, pokemonList);
}

function createCards(numOfPairs, pokemonList) {
    const gameBoard = document.querySelector('.game-container')
    const numOfCards = numOfPairs * 2
    const pokemonData = pokemonList.slice(0, numOfCards)

    let cardNumber = 0
    pokemonData.forEach(async (pokemon) => {
        let res = await axios.get(pokemon.url);
        let card = `
        <div class="card-container">
            <img id="${res.data.name}" class="pokemon-image" src="${res.data.sprites.front_default}">
            <img id="pokeball-${cardNumber}" class="pokemon-image pokeball-image" src="./back.webp">
        </div>
        `
        gameBoard.insertAdjacentHTML('beforeend', card);
        cardNumber += 1
    });

    gameBoard.style.width = `${150 * numOfPairs}px`
}

easy()