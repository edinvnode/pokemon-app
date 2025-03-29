import React, { useState, useEffect, useRef } from 'react';
import PokemonCard from './PokemonCard';

function PokemonList({ data }) {
  const [selectedPokemon, setSelectedPokemon] = useState('Pikachu');
  const [loading, setLoading] = useState(false);
  const [restartBattle, setRestartBattle] = useState(false);
  const [selectEnable, setSelectEnable] = useState(false);
  const [health1, setHealth1] = useState(100);
  const [health2, setHealth2] = useState(100);
  const [comment, setComment] = useState('Fight is about to begin.');

  const namesArr = data.map((item) => item.name);
  const imagesArr = data.map((item) => item.image);
  const [randomPokemonIdx, setRandomPokemonIdx] = useState(
    Math.floor(Math.random() * namesArr.length)
  );

  const selectedPokemonData = data.find(
    (pokemon) => pokemon.name.toLowerCase() === selectedPokemon.toLowerCase()
  );

  const selectedPokemonImage = selectedPokemonData?.image || '';

  // Create a reference for the battle div
  const battleRef = useRef(null);

  useEffect(() => {
    if (loading) {
      battle();
    }
  }, [randomPokemonIdx]);

  useEffect(() => {
    if (loading && battleRef.current) {
      battleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSelectEnable(true);
    const newIdx = Math.floor(Math.random() * namesArr.length);
    setRandomPokemonIdx(newIdx);
  };

  const handleRestart = () => {
    setLoading(false);
    setRestartBattle(false);
    setSelectedPokemon('Pikachu');
    setSelectEnable(false);
  };

  const battle = () => {
    let hp1 = 100;
    let hp2 = 100;

    const fightTurn = () => {
      if (hp1 <= 0 || hp2 <= 0) return;

      let randomHit1 = Math.floor(Math.random() * 25);
      let randomHit2 = Math.floor(Math.random() * 25);

      hp1 = Math.max(hp1 - randomHit1, 0);
      hp2 = Math.max(hp2 - randomHit2, 0);

      setHealth1(hp1);
      setHealth2(hp2);
      setComment(`${selectedPokemon} attacks with power of ${randomHit1}!`);

      setTimeout(() => {
        if (hp2 <= 0) {
          setComment(`${selectedPokemon} wins!!!`);
          setRestartBattle(true);
          return;
        }

        setComment(
          `${namesArr[randomPokemonIdx]} attacks with power of ${randomHit2}!`
        );

        setTimeout(() => {
          if (hp1 <= 0) {
            setComment(`${namesArr[randomPokemonIdx]} wins!!!`);
            setRestartBattle(true);
            return;
          }

          fightTurn();
        }, 1000);
      }, 1000);
    };

    fightTurn();
  };

  return (
    <>
      <div className="pokemons-list">
        <h2>Select Your Pokemon</h2>
        <form>
          <select
            className="pokemons"
            value={selectedPokemon}
            disabled={selectEnable}
            onChange={(e) => {
              const newSelection = e.target.value;
              setSelectedPokemon('');
              setTimeout(() => setSelectedPokemon(newSelection), 0);
            }}
          >
            {data.map((pokemon) => (
              <option key={pokemon.name} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
            disabled={selectEnable}
          >
            Select
          </button>
        </form>

        <p className="selected-pokemon">
          {selectedPokemon
            ? `You selected pokemon: ${selectedPokemon}`
            : 'Please select your pokemon'}
        </p>
        <p className="selected-pokemon">
          You random pokemon: {namesArr[randomPokemonIdx]}
        </p>
      </div>
      {restartBattle && (
        <div className="restart-battle">
          <button className="restart-button" onClick={handleRestart}>
            Restart Battle
          </button>
        </div>
      )}
      {loading && (
        <div className="pokemon-field" ref={battleRef}>
          <div className="pokemon-fight">
            <PokemonCard name={selectedPokemon} image={selectedPokemonImage} />
            <img
              alt="vs battle image"
              src="https://static.vecteezy.com/system/resources/thumbnails/028/824/564/small/vs-letters-versus-png.png"
            />
            <PokemonCard
              name={namesArr[randomPokemonIdx]}
              image={imagesArr[randomPokemonIdx]}
            />
          </div>

          <div className="pokemon-comments">
            <p className="pokemon-comment">
              {`${selectedPokemon} hit points ${health1}`}
            </p>
            <p className="pokemon-comment">{comment}</p>
            <p className="pokemon-comment">
              {`${namesArr[randomPokemonIdx]} hit points ${health2}`}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonList;
