import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from "./components/Card/Card.js";
import Navbar from "./components/Card/Navbar/Navbar";
function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
    const [inputSearch, setInputSearch] = useState(""); // ユーザーの入力を管理

  useEffect(() => {
    const fetchPokemonData = async () => {
      //fetch app data
      let res = await getAllPokemon(initialURL);
      //get details of each pokemon
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      // console.log(res);
      setLoading(false);
    };
    fetchPokemonData();
  }, [pokemonData]);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        // 引数に非同期関数を使うために async を追加
        let pokemonRecord = await getPokemon(pokemon.url); // 非同期でポケモンのデータを取得
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  // console.log(pokemonData);

  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const [filteredPokemons, setFilteredPokemons] = useState([]);

  return (
    <>
      <Navbar
        pokemons={pokemonData}
        setFilteredPokemons={setFilteredPokemons}
        loading={loading}
        inputSearch={inputSearch}
      />
      <div className="App">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {inputSearch !== " " && filteredPokemons.length === 0 ? (
                <h1 className="err">No Pokemon found</h1>
              ) : (
                <div className="pokemonCardContainer">
                  {filteredPokemons.map((pokemon, i) => (
                    <Card key={i} pokemon={pokemon} />
                  ))}
                </div>
              )}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>Prev</button>
              <button onClick={handleNextPage}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
