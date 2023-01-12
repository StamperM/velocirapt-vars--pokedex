// main fetch function that gets the name of all 151 pokemon only
function getAll151FetchCall(limit){
    var pokeApiCallTemplate = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`
    // fetch call
    fetch(pokeApiCallTemplate)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
        // plug in to display pokemon names with the data
        displayPokemonNames(data);
        })
        };

// loops through all the 151 names given by getAll151FetchCall and iterates through them, plugging them 
// into the showPokemon info function
function displayPokemonNames (data){
    PokemonDataArray = data.results;
    for(i = 0; i < PokemonDataArray.length; i ++){
        PokemonNames = data.results[i].name;
        showPokemonInfo(PokemonNames);
    };
};

// function to plug in info and call for pokemon based off of names
// plug in the pokemon name to get all the data for that pokemon
function showPokemonInfo (pokemonName) {
    // template that will plug in the parameter pokemon name
    var pokeApiCallTemplate = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    // fetch call 
    fetch(pokeApiCallTemplate)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
            displaySearchedPokemon(data)
        })
        };



getAll151FetchCall(20);





 const searchBtn = document.querySelector('#search-btn')
 searchBtn.addEventListener('click', searchPokemon)   
function searchPokemon (event) {
    event.preventDefault()
    const searchValue = document.querySelector('.form-control').value
    showPokemonInfo(searchValue) 
    console.log(searchValue)
}
function displaySearchedPokemon (info) {
    console.log(info)
    const pokemonOutput = document.querySelector("#fetched-pokemon")
    const card = `
    <div>
    <img src=${info.sprites.front_default} alt=${info.name}/>
    <div>
    <div>
    <div>HP: ${info.stats[0].base_stat}</div>
    </div>
    </div>
    </div>
    `

    pokemonOutput.innerHTML = card
}