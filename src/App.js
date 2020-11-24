import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    changeDisplayMode, changeStartPosition,
    displayPokemons,
    fetchData,
    fetchPokemons, fetchPokemonsByTypes, fetchTypes,
    searchPokemons,
    vydacha
} from "./redux/PokemonAction";
import PokemonCard from "./components/PokemonCard";
import Quantity from "./components/ Quantity";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import pokemonReducer from "./redux/PokemonReducer";
import FiltersItem from "./components/FiltersItem";

let selectTypes = []

function App() {

  const dispatch = useDispatch()
    const [currentQuantity, setCurrentQuantity] = React.useState(10)
    const [step, setStep] = React.useState(10)
    const [searchItem, setSearchItem] = React.useState('')
    const [currentType, setCurrentType] = React.useState([])
    const startPosition = useSelector((pokemonReducer)=> pokemonReducer.startPosition)
    const quantity = [10, 20, 50]

    React.useEffect(()=> {
        dispatch(fetchData())
        dispatch(fetchTypes())
    },[])

    const onSelectType = (elem, type) =>{
      // let newArr = []
      if(elem.current.checked){
            selectTypes.push(type)
            console.log('selectTypes', selectTypes)
            dispatch(fetchPokemonsByTypes(selectTypes, currentQuantity))
            dispatch(changeStartPosition(0))
            // newArr = [...currentType,type]
            // setCurrentType(newArr)

      }else if(selectTypes.length > 1) {
          selectTypes = selectTypes.filter(value => value !== type)
          console.log('222', selectTypes)
          dispatch(fetchPokemonsByTypes(selectTypes, currentQuantity))
          dispatch(changeStartPosition(0))
      }else {
            selectTypes = selectTypes.filter(value => value !== type)
            dispatch(changeStartPosition(0))
            dispatch(changeDisplayMode('normal'))
            dispatch(displayPokemons(0,currentQuantity))
        }


    }

    const onSearchInput = (newSearchItem) =>{
      console.log(newSearchItem)
        setSearchItem(newSearchItem)
      if(newSearchItem === ''){
          dispatch(changeStartPosition(0))
          dispatch(changeDisplayMode('normal'))
          dispatch(displayPokemons(0,currentQuantity))
      } else{
          dispatch(changeDisplayMode('search'))
          dispatch(searchPokemons(newSearchItem))
          dispatch(displayPokemons(0,currentQuantity))
      }
    }

    const changeCurrentQuantity = (newQuantity) =>{
      setCurrentQuantity(newQuantity)
        setStep(newQuantity)
        dispatch(displayPokemons(startPosition,newQuantity))
    }

    const nextPage = (newPage) =>{
      let currentPage = startPosition + newPage
      console.log('new start position', currentPage)
        dispatch(changeStartPosition(currentPage))
        dispatch(displayPokemons(currentPage, currentQuantity))
    }

    const previousPage = (newPage) =>{
      let currentPage = 0;
         if(startPosition !== 0){
             currentPage = startPosition - newPage
         }
        console.log('new start position', currentPage)
        dispatch(changeStartPosition(currentPage))
        dispatch(displayPokemons(currentPage, currentQuantity))
    }



  // React.useEffect(()=>{
  //   dispatch(fetchPokemons(currentQuantity, page))
  // },[dispatch, currentQuantity, page])

    const pokemons = useSelector((pokemonReducer)=> pokemonReducer.pokemons)
    const filters = useSelector((pokemonReducer)=>pokemonReducer.filters)
    console.log('filters', filters)
    // const afterSearchData = useSelector((pokemonReducer)=>pokemonReducer.afterSearchData)
    // console.log('afterSearchData', afterSearchData)

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">POKEDEX</h1>
          <Search searchItem={searchItem}
                  onSearchInput={(newSearchInput)=>onSearchInput(newSearchInput)}/>
          <Quantity quantity={quantity}
                    currentQuantity={currentQuantity}
                    onCahngeQuantity={(newQuantity)=>changeCurrentQuantity(newQuantity)}/>
      </div>
      <div className="home">
        <div className="filters">
            {
                filters.length !== 0 &&
                    filters.map(filter => <FiltersItem onSelectType={(elem, type)=>onSelectType(elem, type)} key={filter.name} name={filter.name} />)
            }
        </div>
        <div className="pokemons">
            {
                pokemons.length !== 0 && pokemons.map((item, index)=>{
                        return <PokemonCard key={item.name ? item.name : item} name={item.name ? item.name : item}/>
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
