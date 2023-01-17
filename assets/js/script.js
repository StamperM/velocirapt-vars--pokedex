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
        // console.log(data);
        // console.log(data.results);
        // console.log(data.results[8].name);
        })
        
        };

// loops through all the 151 names given by getAll151FetchCall and iterates through them, plugging them
// into the showPokemon info function
function displayPokemonNames (data){
    var pokemonDataArray = data.results;
    var syncedUpDataArray = [];
    // console.log(PokemonDataArray);
    for( let i = 0; i < pokemonDataArray.length; i++){
        var PokemonNames = data.results[i].name;
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
      let dataVar = data
      return pokemonArray
        
       
          })
    };
    console.log(fetch)
  };

// display the list of pokemon that was fetched along with their stats
function displayList(items) {
  let listOutput = document.querySelector(".list-output");
  
//   console.log(items);
  if (items.length == 0) {
    listOutput.innerHTML = " ";
  } else if (items.id > 151) {
    var card = ` `;
    listOutput.innerHTML += card
  } else {
    const card = `
      <div class="container-fluid parent">
        <div id=${items[0].types[0].type.name} class="wrapper list-wrapper card shadow p-3 mb-5 bg-body-tertiary rounded ";> 
        <div id=${items[0].types[0].type.name} class="wrapper list-wrapper card shadow p-3 mb-5 bg-body-tertiary rounded ";> 
          <div class="info-wrapper ">
          <h1 id="pokemon-name">${items[0].name} </h1>
              <div class="stats-wrapper h25">
              <img id= "pokemon-img" class="w-100" src=${"./assets/pokemon/" + items[0].id + ".png"} alt=${items[0].name}/>
          </div>
            <div id=${items[0].name}  class="hover-wrapper">
            <div class= "row">
            <div class="barContianer">HP:<div class="hp-div info-card-div skill" style="width:${items[0].stats[0].base_stat}%">${items[0].stats[0].base_stat}</div></div>
            <div class="barContianer">Attack: <div class="attack-div skill info-card-div" style="width:${items[0].stats[1].base_stat}%"> ${items[0].stats[1].base_stat}</div>
            <div class="barContianer">Defense:<div class="defense-div skill info-card-div" style="width:${items[0].stats[2].base_stat}%"> ${items[0].stats[2].base_stat}</div>
            <div class="barContianer">Special-Attack:<div class="specialatk-div skill info-card-div" style="width:${items[0].stats[3].base_stat}%"> ${items[0].stats[3].base_stat}</div>
            <div class="barContianer">Special-Defense:<div class="specialdef-div skill info-card-div" style="width:${items[0].stats[4].base_stat}%"> ${items[0].stats[4].base_stat}</div>
            <div class="barContianer">Speed: <div class="speed-div info-card-div skill" style="width:${items[0].stats[5].base_stat}%">${items[0].stats[5].base_stat}</div>
            <div class= "row">
            <div class="barContianer">HP:<div class="hp-div skill info-card-div" style="width:${items[0].stats[0].base_stat}%">${items[0].stats[0].base_stat}</div></div>
            <div class="barContianer">Attack: <div class="attack-div skill info-card-div" style="width:${items[0].stats[1].base_stat}%"> ${items[0].stats[1].base_stat}</div>
            <div class="barContianer">Defense:<div class="defense-div skill info-card-div" style="width:${items[0].stats[2].base_stat}%"> ${items[0].stats[2].base_stat}</div>
            <div class="barContianer">Special-Attack:<div class="specialatk-div skill info-card-div" style="width:${items[0].stats[3].base_stat}%"> ${items[0].stats[3].base_stat}</div>
            <div class="barContianer">Special-Defense:<div class="specialdef-div skill info-card-div" style="width:${items[0].stats[4].base_stat}%"> ${items[0].stats[4].base_stat}</div>
            <div class="barContianer">Speed: <div class="speed-div info-card-div skill" style="width:${items[0].stats[5].base_stat}%">${items[0].stats[5].base_stat}</div>
          </div>
        </div>
     `
    listOutput.innerHTML += card
    }
    
    
    //  newAddToTeam()
 };

    
    
     



function useFilter (info) {
const dropDown = document.querySelectorAll('.dropdown-item')

dropDown.forEach((each, key) => {
    const value = each.getAttribute('id')
    const types = info[0].types[0].type.name
    // console.log(value + "=" + types)
              
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
    <div class="wrapper card shadow p-3 mb-5 bg-body-tertiary rounded search-wrap">
        // <img class="w-100" src=${"./assets/pokemon/" + info.stats.id +".png"} alt=${"#id"}/>
        <div class="info-wrapper">
            <h1 id="pokemon-name">${info.name}</h1>
            <div class="stats-wrapper" id="pokemon-stats">
            <div class ="row">
                <div class="barContianer">HP:<div class="hp-div skill" style="width:${info.stats[0].base_stat}%"> ${info.stats[0].base_stat}</div></div>
                <div class="barContianer">Attack:<div class="attack-div skill" style="width:${info.stats[1].base_stat}%"> ${info.stats[1].base_stat}</div></div>
                <div class="barContianer">Defense:<div class="defense-div skill" style="width:${info.stats[2].base_stat}%"> ${info.stats[2].base_stat}</div></div>
                <div class="barContianer">Special-Defense:<div class="specialdef-div skill"  style="width:${info.stats[4].base_stat}%">${info.stats[4].base_stat}</div></div>
                <div class="barContianer">Speed:<div class="speed-div skill" style="width:${info.stats[5].base_stat}%"> ${info.stats[5].base_stat}</div></div>
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


// function displayCardOnHover() {
//   console.log("it works")
//   var cardWrapper = document.querySelectorAll(".list-wrapper")
//   var cardStatsWrapper = document.querySelectorAll(".hover-wrapper")
  
//   cardWrapper.forEach(element => { 
//     var targetDiv = element.target;
//     element.addEventListener("mouseover",function(){
// console.log(targetDiv);
//       cardStatsWrapper.forEach(item=>{
  
  // item.classList.remove("")
// })
//     })
//   });
// }



// adding event listeners to the buttons
leftArrow.addEventListener("click", leftPagination);
rightArrow.addEventListener("click", rightPagination);

// on starting of the page, place in 20 pokemon to the call.
getAll151FetchCall(20);



 var targetCardPhoto = [];
function addToTeam(){
    var listOutput = document.querySelector(".list-output");
    // console.log(pokemonCard);
    listOutput.addEventListener("click", function(event){
       
        console.log(event.currentTarget + " event works")
        targetCardPhoto.push(event.target.parentElement.parentElement.parentElement);
        console.log(targetCardPhoto)
        var footerDisplay =document.querySelector(".ul-team");
        var footerimage = document.createElement("IMG");
        const mappy = targetCardPhoto.map(instance => {
          
          return `<div class="mapped-div parent">${instance.innerHTML}</div>`
        })
        footerDisplay.innerHTML = mappy
        removeTeam(mappy)
    });

};
addToTeam() 
function removeTeam (info) {
  const ulTeam = document.querySelector(".panel")
  const clearBtn = document.querySelector(".clear-btn")
  var footerDisplay =document.querySelector(".ul-team");
  clearBtn.addEventListener("click", () => {
    targetCardPhoto = []
    console.log(targetCardPhoto)
    footerDisplay.innerHTML = ""
  })
  
}






const showBtn = document.querySelector('.shrink-grow-panel')
function showBattleFooter () {
  const footer = document.querySelector('.panel')
  // let pokemonList = showPokemonInfo(data)
  // console.log(pokemonList)
  const footVar = footer.getAttribute("data-show")
  console.log("works")
  if (footVar == "true") {
    footer.setAttribute("data-show", "false")
    showBtn.innerHTML = "Show Team Menu"
    console.log(footVar)
  } else {
    footer.setAttribute("data-show", "true")
    showBtn.innerHTML = "Hide Team Menu"
    console.log(footVar)
  }
}
flatpickr("#date",{
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
});

showBtn.addEventListener("click", showBattleFooter)


function init () {
  getAll151FetchCall(20);
  
  
}
init()

// on starting of the page, place in 20 pokemon to the call.
