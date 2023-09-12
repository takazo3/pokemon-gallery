import React from "react";
import "./Card.css"


function Card({ pokemon }) {

  return (
    <div className="card" >
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        <div>＊TYPE＊</div>
        {pokemon.types.map((type) => {
          return (
            <div key={type.type.name}>
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">Weight: <span>{pokemon.weight}</span></p>
        </div>
        <div className="cardData">
          <p className="title">Height: <span>{pokemon.height}</span> </p>
        </div>
        <div className="cardData">
          <p className="title2">Ability: <span>{pokemon.abilities[ 0 ].ability.name}</span></p>
        </div>
      </div>
    </div>
  );
}

export default Card;
