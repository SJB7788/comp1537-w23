const CARD_LIMIT = 10
let currentPage = 1;
let pokemonList = []
let filterList = []

const updatePaginationDiv = (currentPage, numPages) => {
    const pagination = document.querySelector('.pagination');
    while (pagination.hasChildNodes()) {
        pagination.removeChild(pagination.firstChild)
    }

    let startPage, endPage;
    if (numPages <= 5) {
        startPage = 1;
        endPage = numPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage >= numPages - 2) {
            startPage = numPages - 4;
            endPage = numPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const paginationButton = `<button class="pagBtn btn btn-primary page ml-1 numberedButtons ${i === currentPage ? 'active' : ''}" value="${i}">${i}</button>`
        pagination.insertAdjacentHTML('beforeend', paginationButton)
    }

    if (currentPage > 1) {
        const paginationButton = `<button class="pagBtn btn btn-primary page ml-1 prevButton" value="${currentPage - 1}">Prev</button>`
        pagination.insertAdjacentHTML('afterbegin', paginationButton)
    }

    if (currentPage < numPages) {
        const paginationButton = `<button class="pagBtn btn btn-primary page ml-1 nextButton" value="${currentPage + 1}">Next</button>`
        pagination.insertAdjacentHTML('beforeend', paginationButton)
    }
}

async function showPokemonCards(beginning, ending, pokemonData) {
    const start = (beginning - 1) * ending;
    const end = beginning * ending;
    const showingStart = document.querySelector('#start')
    const showingEnd = document.querySelector('#end')
    showingStart.innerHTML = pokemonData.length < 10 ? pokemonData.length : end
    showingEnd.innerHTML = pokemonData.length

    let pokedexContainer = document.querySelector('.pokedex-container')
    while (pokedexContainer.hasChildNodes()) {
        pokedexContainer.removeChild(pokedexContainer.firstChild)
    }
    pokemonData = pokemonData.slice(start, end)
    pokemonData.forEach(async (pokemon) => {
        let res = await axios.get(pokemon.url);
        let card = `
          <h3>${res.data.name.toUpperCase()}</h3> 
          <img src="${res.data.sprites.front_default}" alt="${res.data.name}"/>
          <button type="button" id="${res.data.name}" name="pokemonBtn" class="pokemonBtn" data-toggle="modal" data-target="#pokeModal">
            More
          </button>
      `
        let pokemonCard = pokedexContainer.appendChild(document.createElement('div'))
        pokemonCard.classList.add('pokemonCard')
        pokemonCard.innerHTML = card;
    });
}


async function main() {
    //all pokemon data
    let response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=810');
    pokemonList = response.data.results;
    showPokemonCards(currentPage, CARD_LIMIT, pokemonList)

    //pokemon types button
    const typeResponse = await axios.get('https://pokeapi.co/api/v2/type');
    const types = typeResponse.data.results.map(type => type.name);
    const typeCheckboxes = types.map(type => `
      <input class="form-check-input typeCheckbox" type="checkbox" name="typeFilter" value="${type}">
      <label class="form-check-label">
        ${type}
      </label>
  `)
    const header = document.querySelector('.button-container')
    typeCheckboxes.forEach((button) => {
        let typeButton = header.appendChild(document.createElement('div'))
        typeButton.classList.add('typeButton');
        typeButton.innerHTML = button
    })

    //filter by type
    const buttons = document.querySelectorAll('.typeCheckbox');
    buttons.forEach((button) => {
        button.addEventListener('click', async () => {
            let getChecked = document.querySelectorAll('input[name="typeFilter"]:checked');
            let checkedFilter = Array.from(getChecked).map(x => x.value)
            if (checkedFilter) {
                filteredPokemons = await Promise.all(pokemonList.map(async (pokemon) => {
                    const res = await axios.get(pokemon.url)
                    const pokemonTypes = res.data.types.map(type => type.type.name)
                    return {
                        ...pokemon,
                        types: pokemonTypes
                    }
                })).then(pokemonData => {
                    return pokemonData.filter(pokemon => {
                        return checkedFilter.every(type => pokemon.types.includes(type))
                    })
                })
                filterList = filteredPokemons
                currentPage = 1
                const numPages = Math.ceil(filteredPokemons.length / CARD_LIMIT);
                updatePaginationDiv(currentPage, numPages)
                showPokemonCards(currentPage, CARD_LIMIT, filteredPokemons)
            } else {
                filterList = []
            }
        })
    })

    //show pokemon info when click button

    var popUpContainer = document.querySelector('.popUpCard');
    let pokemonButton = document.querySelectorAll('.pokemonBtn');
    pokemonButton.forEach(button => {
        button.addEventListener('click', async (event) => {
            console.log('plase');
            const pokemonName = button.id
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            const types = res.data.types.map((type) => type.type.name)
            const popUpCard = `
            <h2 class="popUpName">${res.data.name.toUpperCase()}</h2>
            <h3 class="popUpID">${res.data.id}</h3>
              <img class="popUpImage" src="${res.data.sprites.other['official-artwork'].front_default}" alt="${res.data.name}"/>
              <div class="pokemon-stats">
                <h3>Abilities</h3>
                <ul>
                  ${res.data.abilities.map((ability) => `<li>${ability.ability.name}</li>`).join('')}
                </ul>
              </div>
      
              <div class="pokemon-stats">
                <h3>Stats</h3>
                <ul>
                  ${res.data.stats.map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                </ul>
              </div>
              <div class="pokemon-stats">
                <h3>Types</h3>
                <ul>
                ${types.map((type) => `<li>${type}</li>`).join('')}
                </ul>
              </div>
              <button type="button" class="popUpButton">
                Close
               </button>
          `
            let pokemonPopUpCard = popUpContainer.appendChild(document.createElement('div'))
            pokemonPopUpCard.classList.add('pokemonCardPopUp')
            popUpContainer.style.display = 'block'
            pokemonPopUpCard.innerHTML = popUpCard;

            //close popUp when click close
            const popUpClose = document.querySelector('.popUpButton');
            popUpClose.addEventListener('click', () => {
                while (popUpContainer.hasChildNodes()) {
                    popUpContainer.removeChild(popUpContainer.firstChild)
                }
                popUpContainer.style.display = 'none'
            })
        })
    })

    let clickCount = 0
    var observer = new MutationObserver(function () {
        let pokemonButton = document.querySelectorAll('.pokemonBtn');
        console.log('change');

        pokemonButton.forEach(button => {
            button.addEventListener('click', async (event) => {
                clickCount += 1
                if (clickCount === 1) {
                    console.log('plase');
                const pokemonName = button.id
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                const types = res.data.types.map((type) => type.type.name)
                const popUpCard = `
                <h2 class="popUpName">${res.data.name.toUpperCase()}</h2>
                <h3 class="popUpID">${res.data.id}</h3>
                  <img class="popUpImage" src="${res.data.sprites.other['official-artwork'].front_default}" alt="${res.data.name}"/>
                  <div class="pokemon-stats">
                    <h3>Abilities</h3>
                    <ul>
                      ${res.data.abilities.map((ability) => `<li>${ability.ability.name}</li>`).join('')}
                    </ul>
                  </div>
          
                  <div class="pokemon-stats">
                    <h3>Stats</h3>
                    <ul>
                      ${res.data.stats.map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                    </ul>
                  </div>
                  <div class="pokemon-stats">
                    <h3>Types</h3>
                    <ul>
                    ${types.map((type) => `<li>${type}</li>`).join('')}
                    </ul>
                  </div>
                  <button type="button" class="popUpButton">
                    Close
                   </button>
              `
                let pokemonPopUpCard = popUpContainer.appendChild(document.createElement('div'))
                pokemonPopUpCard.classList.add('pokemonCardPopUp')
                popUpContainer.style.display = 'block'
                pokemonPopUpCard.innerHTML = popUpCard;
    
                //close popUp when click close
                const popUpClose = document.querySelector('.popUpButton');
                popUpClose.addEventListener('click', () => {
                    while (popUpContainer.hasChildNodes()) {
                        popUpContainer.removeChild(popUpContainer.firstChild)
                    }
                    popUpContainer.style.display = 'none'
                })
                clickCount = 0
                } else {
                    return
                }
                
            })
        })
    })

    let config = { childList: true, subtree: true };
    const pokedexContainer = document.querySelector('.pokedex-container')
    observer.observe(pokedexContainer, config);

    const numPages = Math.ceil(pokemonList.length / CARD_LIMIT);
    updatePaginationDiv(currentPage, numPages);

    $('body').on('click', ".numberedButtons, .prevButton, .nextButton", async function (e) {
        if ($(this).hasClass('numberedButtons')) {
            currentPage = Number(e.target.value)
        } else if ($(this).hasClass('prevButton')) {
            currentPage -= 1
        } else if ($(this).hasClass('nextButton')) {
            currentPage += 1
        }
        const dataToPaginate = filterList.length > 0 ? filterList : pokemonList;
        showPokemonCards(currentPage, CARD_LIMIT, dataToPaginate)

        //update pagination buttons
        const numPages = Math.ceil(dataToPaginate.length / CARD_LIMIT);
        updatePaginationDiv(currentPage, numPages);
    })

}

main()