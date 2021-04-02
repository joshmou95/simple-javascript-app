let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');
  

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

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    // fetch data from detailsUrl
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add image, height, and type
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
    // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // create close button
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h3');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;

    let myImage = document.createElement('img');
    myImage.classList.add('pokemon-image');
    myImage.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(myImage);
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add('is-visible');
    });
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }  

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });
  
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  
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