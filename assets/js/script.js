// main fetch function that gets the name of all 151 pokemon only

let offset = 0
function getAll151FetchCall(limit){
    var pokeApiCallTemplate = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
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
    pokemonDataArray = data.results;
    syncedUpDataArray = [];
    // console.log(PokemonDataArray);
    for( let i = 0; i < pokemonDataArray.length; i++){
        PokemonNames = data.results[i].name;
        // console.log(PokemonNames);
        syncedUpDataArray.push(PokemonNames);
        // console.log(syncedUpDataArray);
       
    };
    console.log(syncedUpDataArray)
    showPokemonInfo(syncedUpDataArray);
};

// function to plug in info and call for pokemon based off of names
// plug in the pokemon name to get all the data for that pokemon
function showPokemonInfo (pokemonName) {
    // console.log(pokemonName);
    // template that will plug in the parameter pokemon name
    for( var i = 0; i < pokemonName.length; i++){
        // console.log(pokemonName[i]);
        var pokeApiCallTemplate = `https://pokeapi.co/api/v2/pokemon/${pokemonName[i]}`
    // fetch call 
    fetch(pokeApiCallTemplate)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
            
            let pokemonArray = []
            pokemonArray.push(data)
            console.log(pokemonArray)
            displayList(pokemonArray)
           
            useFilter(pokemonArray)
           
            
            
            
            return(pokemonArray);
           
             
        })
        };
    }




 

// display the list of pokemon that was fetched along with their stats
function displayList(items) {
  let listOutput = document.querySelector(".list-output");
  console.log(items);
  if (items.length == 0) {
    listOutput.innerHTML = " ";
  } else {
    card = `
     <div class="wrapper card">
         
         <div class="info-wrapper">
             <h1>${items[0].name}</h1>
             <div class="stats-wrapper">
             <img class="w-100" src=${items[0].sprites.front_default} alt=${items[0].name}/>
                 <a href="#" class="add-btn btn btn-primary">Add</a>
             </div>
         </div>
     </div>
     `;
    listOutput.innerHTML += card;
  }
}

function showStats() {}




function useFilter (info) {
const radio = document.querySelectorAll('.input-radio')

radio.forEach((each, key) => {
    const value = each.value
    const types = info[0].types[0].type.name
    console.log(value + "=" + types)
              
    each.addEventListener("click", () => {
        
        filteredData(value,types,info)
            
        })
        
        
    })
}
function filteredData (value, types, info) {
    const wrapper = document.querySelectorAll('.list-wrapper')
    if (value == types) {
        console.log("the if works")
        for (let i=0; i < wrapper.length; i++) {
            wrapper[i].style.display = "block"
        }
        
        // wrapper.forEach( wrap => {
        //     wrap.style.display = "block"})
      } else if (value != types) {
        for (let i=0; i < wrapper.length; i++) {
            wrapper[i].style.display = "none"
        }
        // wrapper.forEach( unwrap => {
        //     unwrap.style.display = "none"})
      }
}

// card for pokemon that are displayed on page load
function displayList (items) {
   const listOutput = document.querySelector('.list-output')
   const card = `
    <div id=${items[0].name} class="list-wrapper">
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


 const searchBtn = document.querySelector('#search-btn')
 searchBtn.addEventListener('click', searchPokemon)   
function searchPokemon (event) {
    event.preventDefault()
    const searchValue = document.querySelector('.form-control').value
    showSinglePokemonInfo(searchValue) 
    // console.log(searchValue)

}
// setting up the show single pokemon info
function showSinglePokemonInfo(pokemonName) {
  // template that will plug in the parameter pokemon name
  var pokeApiCallTemplate = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  // fetch call
  fetch(pokeApiCallTemplate)
    .then(function (response) {
      if (response.status == 404) {
        document.querySelector("#fetched-pokemon").innerHTML =
          "pokemon not found";
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      // console.log(data);
      // if statement making sure that the pokemon searched for is within the original 151
      if (data.id < 152) {
        displaySearchedPokemon(data);
      } else {
        document.querySelector("#fetched-pokemon").innerHTML =
          "pokemon not found";
      }
    });
}
//function setting up the display searched pokemon
function displaySearchedPokemon(info) {
  // console.log(info)
  const pokemonOutput = document.querySelector("#fetched-pokemon");
  const card = `
    <div class="wrapper">
        <img class="w-100" src=${info.sprites.front_default} alt=${info.name}/>
        <div class="info-wrapper">
            <h1>${info.name}</h1>
            <div class="stats-wrapper">
                <div class="hp-div">HP: ${info.stats[0].base_stat}</div>
                <div class="attack-div">Attack: ${info.stats[1].base_stat}</div>
                <div class="defense-div">Defense: ${info.stats[2].base_stat}</div>
                <div class="specialatk-div">Special-Attack: ${info.stats[3].base_stat}</div>
                <div class="specialdef-div">Special-Defense: ${info.stats[4].base_stat}</div>
                <div class="speed-div">speed: ${info.stats[5].base_stat}</div>
            </div>
        </div>
    </div>
    `;

  pokemonOutput.innerHTML = card;
}

// pulling the values for the left and right buttons
var leftArrow = document.getElementById("left-arrow");
var rightArrow = document.getElementById("right-arrow");
// adding the function for leftPagination
function rightPagination() {
  offset += 20;
  var emptyDisplayList = [];
  displayList(emptyDisplayList);
  getAll151FetchCall(20);
}

function leftPagination() {
  if (offset == 0 || offset == 131) {
    return;
  } else {
    offset -= 20;
    var emptyDisplayList = [];
    displayList(emptyDisplayList);
    getAll151FetchCall(20);
    console.log(offset);
  }
}
// adding event listeners to the buttons
leftArrow.addEventListener("click", leftPagination);
rightArrow.addEventListener("click", rightPagination);

// on starting of the page, place in 20 pokemon to the call.
getAll151FetchCall(20);





 // on starting of the page, place in 20 pokemon to the call. 
 getAll151FetchCall(20)

