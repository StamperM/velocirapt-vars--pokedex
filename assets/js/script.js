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
        })
        };



getAll151FetchCall(20);





    
