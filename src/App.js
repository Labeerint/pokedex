import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPokemons} from "./redux/PokemonAction";
import PokemonCard from "./components/PokemonCard";
import Quantity from "./components/ Quantity";

function App() {

  const dispatch = useDispatch()
    const [currentQuantity, setCurrentQuantity] = React.useState(10)

    const quantity = [10, 20, 40]

    console.log('currentQuantity', currentQuantity)

    const changeCurrentQuantity = (newQuantity) =>{
      setCurrentQuantity(newQuantity)
    }

  React.useEffect(()=>{
    dispatch(fetchPokemons(currentQuantity))
  },[dispatch, currentQuantity])

    const pokemons = useSelector((pokemonsReducer)=> pokemonsReducer.pokemons)
    console.log('pokemons',pokemons)

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">POKEDEX</h1>
          <Quantity quantity={quantity} currentQuantity={currentQuantity} onCahngeQuantity={(newQuantity)=>changeCurrentQuantity(newQuantity)}/>
      </div>
      <div className="home">
        <div className="filters"></div>
        <div className="pokemons">
            {
                pokemons.length !== 0 && pokemons.map((item, index)=>{
                    return <PokemonCard key={item.name} name={item.name}/>
                })
            }
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
