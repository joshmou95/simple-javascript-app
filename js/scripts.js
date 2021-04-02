let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) { 
    pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
  // assigns var to ul class attribute
    let pokemonList = document.querySelector('.pokemon-list'); 
    let listItem = document.createElement('li');
    let button = document.createElement('button'); 
  // returns text content of pokemonList name
    button.innerText = pokemon.name; 
    button.classList.add('primary-button'); 
    listItem.appendChild(button); 
    pokemonList.appendChild(listItem); 
  // prints array data of button clicked to console
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    // fetch api url to response.json
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    // fetch data from detailsUrl
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add image, height, and type
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  // data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// retuns pokemonList name array inside the addListItem function

// outputs pokemonList array to console
// console.log(pokemonRepository.getAll());