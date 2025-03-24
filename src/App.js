import './App.css';

//components
import PokemonCard from './components/PokemonCard';
import PokemonList from './components/PokemonList';

function App() {
  const data = [
    {
      id: 1,
      name: 'Pikachu',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWdB7iiUbqK-acM9qMYdewtVr97sGQNtmlkOLRg87dWU5lecvX-pRVtfpnneH2JQ_r0xI&usqp=CAU',
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
