let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Bulbasaur', height: .7, types: ['grass', 'poison']},
    {name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
    {name: 'Venusaur', height: 2, types: ['grass', 'poison']},
    {name: 'Charmander', height: .6, types: ['fire']},
    {name: 'Charmeleon', height: 1.1, types: ['fire']},
    {name: 'Charizard', height: 1.7, types: ['fire', 'flying']}
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'types'  in pokemon
    ) { 
    pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
    }

  function addListItem(pokemon) {
  // assigns var to ul class attribute
    let pokemonList = document.querySelector('.pokemon-list'); 
  // creates li element
    let listItem = document.createElement('li');
  // creates button element
    let button = document.createElement('button'); 
  // returns text content of pokemonList name
    button.innerText = pokemon.name; 
  // adds class name to button element
    button.classList.add('primary-button'); 
  // append button as a child to listItem
    listItem.appendChild(button); 
  // append listItem as child to pokemonList  
    pokemonList.appendChild(listItem); 
  // prints pokemon array data of button clicked to console
    button.addEventListener('click', function(showDetails) {
      console.log(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

// retuns pokemonList name array inside the addListItem function
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
// outputs pokemonList array to console
// console.log(pokemonRepository.getAll());