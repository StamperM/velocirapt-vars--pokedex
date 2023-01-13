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
        // console.log(data);
        })
        };

// loops through all the 151 names given by getAll151FetchCall and iterates through them, plugging them 
// into the showPokemon info function
function displayPokemonNames (data){
    PokemonDataArray = data.results;
    for(i = 0; i < PokemonDataArray.length; i ++){
        PokemonNames = data.results[i].name;
        // console.log(PokemonNames);
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
            // console.log(data);
            let pokemonArray = []
            pokemonArray.push(data)
            console.log(pokemonArray)
            displayList(pokemonArray)
        })
        };
 
// display the list of pokemon that was fetched along with their stats
function displayList (items) {
    const listOutput = document.querySelector('.list-output')
    const card = `
     <div class="wrapper">
         <img class="w-25" src=${items[0].sprites.front_default} alt=${items[0].name}/>
         <div class="info-wrapper">
             <h1>${items[0].name}</h1>
             <div class="stats-wrapper">
                 <div class="hp-div">HP: ${items[0].stats[0].base_stat}</div>
                 <div class="attack-div">Attack: ${items[0].stats[1].base_stat}</div>
                 <div class="defense-div">Defense: ${items[0].stats[2].base_stat}</div>
                 <div class="specialatk-div">Special-Attack: ${items[0].stats[3].base_stat}</div>
                 <div class="specialdef-div">Special-Defense: ${items[0].stats[4].base_stat}</div>
                 <div class="speed-div">speed: ${items[0].stats[5].base_stat}</div>
             </div>
         </div>
     </div>
     `
    listOutput.innerHTML += card
 }
     
 // on starting of the page, place in 20 pokemon to the call. 
getAll151FetchCall(20);

const searchBtn = document.querySelector('#search-btn')
 searchBtn.addEventListener('click', searchPokemon)   
function searchPokemon (event) {
    event.preventDefault()
    const searchValue = document.querySelector('.form-control').value
    showPokemonInfo(searchValue) 
    // console.log(searchValue)
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