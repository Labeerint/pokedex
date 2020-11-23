import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPokemons} from "./redux/PokemonAction";
import PokemonCard from "./components/PokemonCard";
import Quantity from "./components/ Quantity";
import Pagination from "./components/Pagination";

function App() {

  const dispatch = useDispatch()
    const [currentQuantity, setCurrentQuantity] = React.useState(10)
    const [step, setStep] = React.useState(10)
    const [page, setPage] = React.useState(0)

    const quantity = [10, 20, 40]


    const changeCurrentQuantity = (newQuantity) =>{
      setCurrentQuantity(newQuantity)
        setStep(newQuantity)
    }

    const nextPage = (newPage) =>{
      let currentPage = page + newPage
      console.log('newPage',currentPage)
      setPage(currentPage)
    }

    const previousPage = (newPage) =>{
      let currentPage = 0;
         if(page !== 0){
             currentPage = page - newPage
         }
        console.log('newPage',currentPage)
        setPage(currentPage)
    }

  React.useEffect(()=>{
    dispatch(fetchPokemons(currentQuantity, page))
  },[dispatch, currentQuantity, page])

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
      <div className="footer">
          <Pagination step={step}
                      onPrevious={(newPage)=>previousPage(newPage)}
                      onNext={(newPage)=>nextPage(newPage)}
          />
      </div>
    </div>
  );
}

export default App;
