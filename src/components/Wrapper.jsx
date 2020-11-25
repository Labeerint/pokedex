import React from 'react'
import {
    changeDisplayMode,
    changeStartPosition, displayPokemons,
    fetchData,
    fetchPokemonsByTypes,
    fetchTypes, searchPokemons
} from "../redux/PokemonAction";
import Search from "./Search";
import Quantity from "./ Quantity";
import FiltersItem from "./FiltersItem";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import {useDispatch, useSelector} from "react-redux";

let selectTypes = []

const Wrapper = () => {
    const dispatch = useDispatch()
    const [currentQuantity, setCurrentQuantity] = React.useState(10)
    const pokemons = useSelector((pokemonReducer)=> pokemonReducer.pokemons)
    const filters = useSelector((pokemonReducer)=>pokemonReducer.filters)
    let activePage = useSelector((pokemonReducer)=>pokemonReducer.activePage)
    const startPosition = useSelector((pokemonReducer)=> pokemonReducer.startPosition)
    const numberOfPages = useSelector((pokemonReducer)=>pokemonReducer.numberOfPages )
    const quantity = [10, 20, 50]

    React.useEffect(()=> {
        dispatch(fetchData())
        dispatch(fetchTypes())
    },[])

    const onSelectType = (elem, type) =>{
        if(elem.current.checked){
            selectTypes.push(type)
            dispatch(changeDisplayMode('filters'))
            dispatch(fetchPokemonsByTypes(selectTypes, currentQuantity))
        }else if(selectTypes.length > 1) {
            selectTypes = selectTypes.filter(value => value !== type)
            dispatch(changeDisplayMode('filters'))
            dispatch(fetchPokemonsByTypes(selectTypes, currentQuantity))
        }else {
            selectTypes = []
            dispatch(changeDisplayMode('normal'))
            dispatch(displayPokemons(0,currentQuantity))
        }


    }

    const onSearchInput = (newSearchItem) =>{
        if(newSearchItem === ''){
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
        dispatch(displayPokemons(startPosition,newQuantity))
    }

    const nextPage = () =>{
        let currentPage = startPosition + currentQuantity
        if(startPosition >= numberOfPages*currentQuantity - currentQuantity)
            currentPage = startPosition
            dispatch(changeStartPosition(currentPage, ++activePage))
            dispatch(displayPokemons(currentPage, currentQuantity))
    }

    const previousPage = () =>{
        let currentPage = 0;
        if(startPosition !== 0){
            currentPage = startPosition - currentQuantity
        }
            dispatch(changeStartPosition(currentPage, --activePage))
            dispatch(displayPokemons(currentPage, currentQuantity))
    }

    const onPage = (newPage) =>{
        let currentPage = --newPage * currentQuantity
            dispatch(changeStartPosition(currentPage, ++newPage))
            dispatch(displayPokemons(currentPage, currentQuantity))
    }

    return (
        <div className="App">
            <div className="header">
                <h1 className="title">POKEDEX</h1>
                <Search onSearchInput={(newSearchInput)=>onSearchInput(newSearchInput)}/>
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
                        pokemons.length !== 0 && pokemons.map((item)=>{
                            return <PokemonCard key={item} name={item}/>
                        })
                    }
                </div>
            </div>
            <div className="footer">
                <Pagination onPrevious={previousPage}
                            onNext={nextPage}
                            onPage={(newPage)=>onPage(newPage)}
                            numberOfPages={numberOfPages}
                            activePage={activePage}
                />
            </div>
        </div>
    );
}

export default Wrapper