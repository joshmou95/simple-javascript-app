let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=100';

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) { 
    pokemonList.push(pokemon);
    } else {
      alert('pokemon is not correct');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
  // assigns var to ul class attribute
    let pokemonList = document.querySelector('.list-group'); 
    let listItem = document.createElement('li');
    let button = document.createElement('button'); 
  // returns text content of pokemonList name
    button.innerText = pokemon.name; 
    button.classList.add('btn', 'btn-primary'); 
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');
    listItem.classList.add('group-list-item');
    listItem.appendChild(button); 
    pokemonList.appendChild(listItem); 
  // prints array data of button clicked to console
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  async function loadList() {
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    // fetch data from detailsUrl
    const response = await fetch(url);
    try {
      const details = await response.json();
      // Now we add image, height, and type
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.type = details.types;
    } catch(e) {
      console.error(e);
    };
  }

  async function  showDetails(pokemon) {
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');

    // Clear all existing modal content
    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    await loadDetails(pokemon);
    let titleElement = document.createElement('h3');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;

    // let typeElement = document.createElement('p');
    // typeElement.innerText = pokemon.type;

    let myImage = document.createElement('img');
    myImage.classList.add('pokemon-image');
    myImage.src = pokemon.imageUrl;

    modalTitle.appendChild(titleElement);
    modalBody.appendChild(contentElement);
    // modalBody.appendChild(typeElement);
    modalBody.appendChild(myImage);

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