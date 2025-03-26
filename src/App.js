import './App.css';

//components
import PokemonCard from './components/PokemonCard';
import PokemonList from './components/PokemonList';

function App() {
  const data = [
    {
      id: 1,
      name: 'Pikachu',
      image: 'https://img.pokemondb.net/artwork/avif/pikachu.avif',
    },
    {
      id: 2,
      name: 'Bulbasaur',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full//001.png',
    },
    {
      id: 3,
      name: 'Charmander',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full//004.png',
    },
    {
      id: 4,
      name: 'Squirtle',
      image:
        'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png',
    },
    {
      id: 5,
      name: 'Pidgeot',
      image: 'https://dextraneous.blog/wp-content/uploads/2019/08/016.png',
    },
    {
      id: 6,
      name: 'Rattata',
      image: 'https://img.pokemondb.net/artwork/avif/rattata.avif',
    },
    {
      id: 7,
      name: 'Butterfree',
      image: 'https://img.pokemondb.net/artwork/avif/butterfree.avif',
    },
    {
      id: 8,
      name: 'Ekens',
      image: 'https://img.pokemondb.net/artwork/avif/ekans.avif',
    },
    {
      id: 9,
      name: 'Vulpix',
      image: 'https://img.pokemondb.net/artwork/avif/vulpix.avif',
    },
  ];

  return (
    <div className="App">
      <h1>Pokemon App</h1>
      <div className="container">
        {data.map((pokemon) => (
          <PokemonCard
            name={pokemon.name}
            image={pokemon.image}
            key={pokemon.id}
          />
        ))}
      </div>
      <PokemonList data={data} />
    </div>
  );
}

export default App;
