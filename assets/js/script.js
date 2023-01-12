//going to use this for search bar
function getIndividualStats () {
    var pokeApiCallTemplate = `https://pokeapi.co/api/v2/pokemon/ditto`
    
    fetch(pokeApiCallTemplate)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            // console.log(data);
        //    let pokemonData = data;
        
            
        })
        } 
//add this to an event listener
getIndividualStats()
// main fetch function
function fetchCall(){
    var pokeApiCallTemplate = "https://pokeapi.co/api/v2/pokemon/?limit=151"
    
    fetch(pokeApiCallTemplate)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            
        //    let pokemonData = data;
        consoleData(data)
        displayPokemonNames(data);
        //  showPokemonInfo(data)   
        })
        } 





fetchCall();
function consoleData(stuff) {
    console.log(stuff)
}


function displayPokemonNames (data){
    PokemonDataArray = data.results;
    for(i = 0; i < PokemonDataArray.length; i ++){
        PokemonNames = data.results[i].name;
        showPokemonInfo(PokemonNames);

    }
   
}

function showPokemonInfo (p) {
    
        var pokeApiCallTemplate = `https://pokeapi.co/api/v2/pokemon/${p}`
    
    fetch(pokeApiCallTemplate)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
        //    let pokemonData = data;
        
            
        })
        } 
    
