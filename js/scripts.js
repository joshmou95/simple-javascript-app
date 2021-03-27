
let pokemonList = [
  {name: 'Bulbasaur', height: .7, types: ['grass', 'poison']},
  {name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
  {name: 'Venusaur', height: 2, types: ['grass', 'poison']}
];

function printArrayDetails(){
for (let i = 0; i < pokemonList.length; i++){
  let name = pokemonList[i].name;
  let height = ' (height: ' + pokemonList[i].height + ') ';
    if (pokemonList[i].height >=2){
      document.write('<p>' + name + height + ' - Wow, that\'s big!</p>');
  } else {
      document.write('<p>' + name + height + '</p>');
  }
}
}
printArrayDetails();
