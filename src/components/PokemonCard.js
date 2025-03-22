import React from 'react';

function PokemonCard({ name, image }) {
  console.log(name);
  console.log(image);

  return (
    <div className="pokemon-card">
      <h2>{name}</h2>

      <img alt={name} src={image} />
    </div>
  );
}

export default PokemonCard;
