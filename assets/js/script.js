// main fetch function that gets the name of all 151 pokemon only
let offset = 0;
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
    showPokemonInfo(syncedUpDataArray);
};

// function to plug in info and call for pokemon based off of names
// plug in the pokemon name to get all the data for that pokemon
function showPokemonInfo(pokemonName) {
  // console.log(pokemonName);
  // template that will plug in the parameter pokemon name
  for (var i = 0; i < pokemonName.length; i++) {
    // console.log(pokemonName[i]);
    var pokeApiCallTemplate = `https://pokeapi.co/api/v2/pokemon/${pokemonName[i]}`;
    // fetch call
    fetch(pokeApiCallTemplate)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            let pokemonArray = []
            pokemonArray.push(data)
            displayList(pokemonArray)
           useFilter(pokemonArray)
          })
    };
  };

// display the list of pokemon that was fetched along with their stats

function displayList(items) {
  let listOutput = document.querySelector(".list-output");
  console.log(items);
  if (items.length == 0) {
    listOutput.innerHTML = " ";
  } else if (items[0].id > 151) {
    var card = ` `;
  } else {
    const card = `
      <div class="container-fluid">
        <div id=${items[0].types[0].type.name} class="wrapper list-wrapper card shadow p-3 mb-5 bg-body-tertiary rounded ";>   
          <div class="info-wrapper ">
          <h1 id="pokemon-name">${items[0].name} </h1>
              <div class="stats-wrapper h25">
              <img id= "pokemon-img" class="w-100" src=${"./assets/pokemon/" + items[0].id + ".png"} alt=${items[0].name}/>
          </div>
        </div>
        <div class="stats-wrapper on-hover">
                
                <div class="hp-div info-card-div" style="width:${items[0].stats[0].base_stat}%">HP: ${items[0].stats[0].base_stat}</div>
                <div class="attack-div info-card-div" style="width:${items[0].stats[1].base_stat}%">Attack: ${items[0].stats[1].base_stat}</div>
                <div class="defense-div info-card-div" style="width:${items[0].stats[2].base_stat}%">Defense: ${items[0].stats[2].base_stat}</div>
                <div class="specialatk-div info-card-div" style="width:${items[0].stats[3].base_stat}%">Special-Attack: ${items[0].stats[3].base_stat}</div>
                <div class="specialdef-div info-card-div" style="width:${items[0].stats[4].base_stat}%">Special-Defense: ${items[0].stats[4].base_stat}</div>
                <div class="speed-div info-card-div" style="width:${items[0].stats[5].base_stat}%">speed: ${items[0].stats[5].base_stat}</div>
            </div>
      </div>


     `
    listOutput.innerHTML += card 
    
 };
    };
    
     



function useFilter (info) {
const dropDown = document.querySelectorAll('.dropdown-item')

dropDown.forEach((each, key) => {
    const value = each.getAttribute('id')
    const types = info[0].types[0].type.name
    console.log(value + "=" + types)
              
    each.addEventListener("click", () => {
        filteredData(value,types,info);
      });
  });
};

//setting up the filtered data function that will filter through the types of pokemon, ex. fire, grass, rock...
function filteredData (value, types, info) {
    let filteredArray = []
    const wrapper = document.querySelectorAll('.list-wrapper')
    wrapper.forEach(wrap => {
      const atty = wrap.getAttribute('id')
      console.log(atty)
        if( value == atty) {
           console.log("works")
            wrap.style.display = "block"
        } else if (value == "none") {
            wrap.style.display = "block"
        } else {
            wrap.style.display = "none"
        };
    })
        
    
};

// setting 
const searchBtn = document.querySelector('#search-btn')
searchBtn.addEventListener('click', searchPokemon)   
function searchPokemon (event) {
    event.preventDefault();
    const searchValue = document.querySelector('.form-control').value;
    showSinglePokemonInfo(searchValue);
};

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
      };
    })
    .then(function (data) {
      // console.log(data);
      // if statement making sure that the pokemon searched for is within the original 151
      if (data.id < 152) {
        displaySearchedPokemon(data);
      } else {
        document.querySelector("#fetched-pokemon").innerHTML =
          "pokemon not found";
      };
    });
};

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
};

// pulling the values for the left and right buttons
let leftArrow = document.querySelector("#left-arrow");
let rightArrow = document.querySelector("#right-arrow");

// adding the function for rightPagination, if button is clicked, set fetch call offset to add in 20
// and set the current HTML to be  blank, erasing all of the pokemon currently on the page
function rightPagination() {
  if (offset == 140){
    return;
  } else {
    offset += 20;
    var emptyDisplayList = [];
    displayList(emptyDisplayList);
    getAll151FetchCall(20);
    console.log(offset);
};
  };
  

// adding the function for leftPagination, if button is clicked, set fetch call offset to subtract 20
// and set the current HTML to be  blank, erasing all of the pokemon currently on the page
function leftPagination() {
  if (offset == 0) {
    return;
  } else {
    offset -= 20;
    var emptyDisplayList = [];
    displayList(emptyDisplayList);
    getAll151FetchCall(20);
    console.log(offset);
  }
};

// adding event listeners to the buttons
leftArrow.addEventListener("click", leftPagination);
rightArrow.addEventListener("click", rightPagination);

// on starting of the page, place in 20 pokemon to the call.
getAll151FetchCall(20);


