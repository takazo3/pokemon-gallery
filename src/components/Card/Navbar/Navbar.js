
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { MdCatchingPokemon } from "react-icons/md";

const Navbar = ({ pokemons, setFilteredPokemons, loading }) => {
  const [inputSearch, setInputSearch] = useState(""); // ユーザーの入力を管理
  useEffect(() => {
    const filteredPokemons = pokemons.filter((pokemon) => {
      if (inputSearch === "") {
        return true;
      } else if (pokemon.name.includes(inputSearch.toLowerCase())) {
        return true;
      }
      return false;
    });
    setFilteredPokemons(filteredPokemons);
  }, [inputSearch, pokemons, setFilteredPokemons]);


  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputSearch(inputValue); // ユーザーの入力をstateにセット

    const filteredPokemons = pokemons.filter((pokemon) => {
      if (inputValue === " ") {
        return true;
      } else if (pokemon.name.includes(inputValue.toLowerCase())) {
        return true;
      }
      return false;
    });
    setFilteredPokemons(filteredPokemons);
  };

  return (
    <>
      <nav className="nav">
        <span className="line1">Pokemon</span>
        <span className="line2">Gallery</span>
      </nav>
      <div className="input">
        <input
          type="text"
          placeholder="name"
          value={inputSearch} // ユーザーの入力をvalueにセット
          onChange={handleInputChange}
        ></input>
        <MdCatchingPokemon size={"2.5rem"} color={"red"} />
      </div>
    </>
  );
};

export default Navbar;