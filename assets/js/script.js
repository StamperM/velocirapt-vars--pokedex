// main fetch function that gets the name of all 151 pokemon only
let offset = 0; 
//plugs in the limit parameter 20 on page load, and calls for pokemon names. 
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
    var pokemonDataArray = data.results;
    var syncedUpDataArray = [];
    for( let i = 0; i < pokemonDataArray.length; i++){
         var PokemonNames = data.results[i].name;
        syncedUpDataArray.push(PokemonNames);
      };
    showPokemonInfo(syncedUpDataArray);
  };

// function to plug in info and call for pokemon based off of names
// plug in the pokemon name to get all the data for that pokemon
 function showPokemonInfo(pokemonName) {
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
            let pokemonArray = [];
            pokemonArray.push(data);
            displayList(pokemonArray);
          })
    };
    
  };
  
// display the list of pokemon that was fetched along with their stats
function displayList(items) {
  let listOutput = document.querySelector(".list-output");
  
  if (items.length == 0) {
    listOutput.innerHTML = " ";
  } else if (items[0].id > 151) {
    var card = ` `;
    listOutput.innerHTML += card
  } else {
    const card = `
      <div class="container-fluid parent">
        <div id=${items[0].types[0].type.name} class="wrapper list-wrapper card shadow p-3 mb-5 bg-body-tertiary rounded ";> 
          <div class="info-wrapper ">
            <h1 id="pokemon-name">${items[0].name} </h1>
              <div class="stats-wrapper h25">
              <img id= "pokemon-img" class="w-100" src="./assets/pokemon/${items[0].id}.png" alt=${items[0].name}/>
              </div>
          </div>
          <div id=${items[0].name}  class="hover-wrapper">
            <div class= "row rando-row">
              <div class="barContianer">HP:<div class="hp-div skill info-card-div" style="width:${items[0].stats[0].base_stat}%">${items[0].stats[0].base_stat}</div></div>
              <div class="barContianer">Attack: <div class="attack-div skill info-card-div" style="width:${items[0].stats[1].base_stat}%"> ${items[0].stats[1].base_stat}</div></div>
              <div class="barContianer">Defense:<div class="defense-div skill info-card-div" style="width:${items[0].stats[2].base_stat}%"> ${items[0].stats[2].base_stat}</div></div>
              <div class="barContianer">Special-Attack:<div class="specialatk-div skill info-card-div" style="width:${items[0].stats[3].base_stat}%"> ${items[0].stats[3].base_stat}</div></div>
              <div class="barContianer">Special-Defense:<div class="specialdef-div skill info-card-div" style="width:${items[0].stats[4].base_stat}%"> ${items[0].stats[4].base_stat}</div></div>
              <div class="barContianer">Speed: <div class="speed-div info-card-div skill" style="width:${items[0].stats[5].base_stat}%">${items[0].stats[5].base_stat}</div></div>
            </div>
            <button class="add-to-team-btn">Add to Team</button>
        </div>
      </div>
     `
    listOutput.innerHTML += card 
  };
};

// listening for the dropdown menu, selecting the dropdown items
function useFilter () {
const dropDown = document.querySelector('#fighting-type-dropdown');

// when the dropdown menu for fighting types are clicked, grab the id of what was clicked
// and call filtered data with that plugged in as an argument
dropDown.addEventListener("click", function(event){
   var dropDownID = event.target.id;
  filteredData(dropDownID)
})
};

//setting up the filtered data function that will filter through the types of pokemon, ex. fire, grass, rock...
function filteredData (value) {
    const wrapper = document.querySelectorAll('.list-wrapper')
    wrapper.forEach(wrap => {
      const atty = wrap.getAttribute('id')
      
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

// when the search button is clicked, the value in the search bar is plugged
// into the showsinglepokemoninfo function and called. 
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
      // if statement making sure that the pokemon searched for is within the original 151
      if (data.id < 152) {
        displaySearchedPokemon(data);
      } else {
        document.querySelector("#fetched-pokemon").innerHTML =
          "pokemon not found";
      };
    });
};

//function setting up the display searched pokemon, it will make a section under the header inner HTML
// equal the information grabbed from the pokemon
function displaySearchedPokemon(info) {
  const pokemonOutput = document.querySelector("#fetched-pokemon");
  console.log(info);
  const card = `
    <div class="wrapper card shadow p-3 mb-5 bg-body-tertiary rounded search-wrap">
         <img class="w-100" src=${"./assets/pokemon/" + info.id + ".png"} alt=${"#id"}/>
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
    `
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

// setting up the variable targetCardPhoto for when we click on add to team button on the card,
// it adds it to this array
var targetCardPhoto = [];
 
// when we click on add to team button on the card,
// it adds it to the array targetCardPhoto, it also prevents adding more than 6 cards
function addToTeam(){
    var listOutput = document.querySelector(".list-output");
    listOutput.addEventListener("click", function(event){
       
        console.log(event.target.className + " event works");
    if (event.target.className == "add-to-team-btn") {
      if (targetCardPhoto.length < 6 ) {
          targetCardPhoto.push(event.target.parentElement.parentElement.parentElement);
        } else {
           return;
        }
      } else {
        console.log("missed button");
      };
        // looking for the footer display at the bottom
        var footerDisplay =document.querySelector(".ul-team");
        // displays everything in the array at the footer
        const mappy = targetCardPhoto.map(instance => {
          return `<div class="mapped-div parent container">${instance.innerHTML}</div>`
        }).join('')
        footerDisplay.innerHTML = mappy;
        removeTeam(mappy);
    });

};
// calling the add to team function
addToTeam();
// adding a remove button to the footer to subtract cards from team before saving
function removeTeam () {
  const clearBtn = document.querySelector(".clear-btn");
  var footerDisplay =document.querySelector(".ul-team");
  clearBtn.addEventListener("click", () => {
    targetCardPhoto = [];
    console.log(targetCardPhoto);
    footerDisplay.innerHTML = "";
  });
};

// looking for the add team button
const addTeamBtn = document.querySelector(".add-team-btn");
// when the add team button is clicked in the footer, it will save team to storage
addTeamBtn.addEventListener('click', saveTeamToStorage);
// saves team to storage, makes a modal pop up
function saveTeamToStorage () {
  const dropDown = document.querySelector(".team-dropdown");
  const modal = document.querySelector('.modal');
  let dropValue = dropDown.innerHTML;
  var footerDisplay =document.querySelector(".panel-footer");
  const modalList = document.querySelector('.modal-list');
  let dateDisplay = document.querySelector("#date");
  const pTag = document.querySelector(".date-picked");

  // sets a message out to the side of the date picker for the battle date
  let selectedDate = dateDisplay.value;
  pTag.innerHTML = "Battle Date: " + selectedDate;

  // sets the team value name and the inner HTML of the footer to local storage.
  localStorage.setItem(`${dropValue}`, JSON.stringify(footerDisplay.innerHTML));
  footerDisplay.innerHTML = "Team Saved!";
  targetCardPhoto = [];
  modal.classList.add('active');
  modalList.innerHTML = JSON.parse(localStorage.getItem(`${dropValue}`));
  showModalInfo();
};

// looking for the close button, when clicked, it will pop up or down the footer menu
const closeBtn = document.querySelector('.close-btn');
const modal = document.querySelector('.modal');
closeBtn.addEventListener("click", () => {
  modal.classList.remove('active');
});

// when modal pops up, shows the date at the top
function showModalInfo () {
  const date = document.querySelector('#date');
  const modalSpan = document.querySelector('.modal-span');
  modalSpan.innerHTML = date.value;
};

// get team list, pulls the team sets from local storage based off of value clicked in top
// dropdown menu
function getTeamList () {
  const dropDown = document.querySelector(".team-button");
  const setTeam = document.querySelectorAll('.new-dropdown-item');
  setTeam.forEach(each => {
    each.addEventListener('click', (event) => {
      event.preventDefault();
      let value = each.innerHTML;
      console.log(value);
      dropDown.innerHTML = value;
      getFromStorage(value);
    });
  });
};

// calling the get team list function
getTeamList();

// takes the values pulled from getteam list and pulls things from local storage, 
// setting them to equal to the previous inner HTML
function getFromStorage (value) {
  var footerDisplay = document.querySelector(".panel-footer");
  let dateDisplay = document.querySelector("#date");
  const pTag = document.querySelector(".date-picked");
  let selectedDate = dateDisplay.value;
  pTag.innerHTML = "Date picked: " + selectedDate;
  console.log(JSON.parse(localStorage.getItem(`${value}`)));
  footerDisplay.innerHTML = JSON.parse(localStorage.getItem(`${value}`));
  dateDisplay.placeholder = selectedDate;
  console.log(dateDisplay.placeholder);
}

// set team list, getting the inner values of the team dropdown at the bottom of the page when clicked
function setTeamList () {
  const dropDown = document.querySelector(".team-dropdown");
  const setTeam = document.querySelectorAll('.team-setter');
  setTeam.forEach(each => {
    each.addEventListener('click', () => {
      let value = each.innerHTML;
      dropDown.innerHTML = value;
    });
  });
};
setTeamList();

//show team menu button closing and opening the footer when clicked
const showBtn = document.querySelector('.shrink-grow-panel');
function showBattleFooter () {
  const footer = document.querySelector('.panel');
  const footVar = footer.getAttribute("data-show");
  
  if (footVar == "true") {
    footer.setAttribute("data-show", "false");
    showBtn.innerHTML = "Show Team Menu";
    console.log(footVar);
  } else {
    footer.setAttribute("data-show", "true");
    showBtn.innerHTML = "Hide Team Menu";
    console.log(footVar);
  };
};
flatpickr("#date",{
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
});

// calling the show battle footer when clicked
showBtn.addEventListener("click", showBattleFooter);
useFilter();

// on starting of the page, place in 20 pokemon to the call.
getAll151FetchCall(20);
  
  


