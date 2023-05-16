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

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


async function createCards(numOfPairs, pokemonList) {
    const gameBoard = document.querySelector('.game-container')
    let pokemonData = pokemonList.slice(0, numOfPairs)
    pokemonData = pokemonData.flatMap(i => [i, i])
    pokemonData = shuffle(pokemonData)

    let cardNumber = 0
    for (const pokemon of pokemonData) {
        let res = await axios.get(pokemon.url);
        let card = `
        <div class="card-container">
            <img id="${res.data.name}" class="pokemon-image" src="${res.data.sprites.front_default}">
            <img id="pokeball-${cardNumber}" class="pokemon-image pokeball-image" src="./back.webp">
        </div>
        `
        gameBoard.insertAdjacentHTML('beforeend', card);
        cardNumber += 1;
    }

    gameBoard.style.width = `${150 * numOfPairs}px`
    flipCard()
}



function flipCard() {
    const pokemonCards = document.querySelectorAll('.card-container');
    console.log(pokemonCards);
    pokemonCards.forEach((pokemonCard) => {
        pokemonCard.addEventListener('click', (event) => {
            event.target.style.transform = 'scaleX(0)';
        })
    })
}

easy()