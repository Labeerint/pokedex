import React from 'react';
import store from "../store";
import Search from "./Search";
import Quantity from "./ Quantity";
import Pagination from "./Pagination";
import FiltersItem from "./FiltersItem";
import PokemonCard from "./PokemonCard";
import {observer} from 'mobx-react-lite';


const Wrapper = observer(()=> {
    const pokemons = store.pokemons
    const filters = store.filters

    React.useEffect(()=> {
        store.fetchAllPokemonsData()
        store.fetchTypes()
    },[])

    return (
        <div className="App">
            <div className="header">
                <h1 className="title">POKEDEX</h1>
                <Search />
                <Quantity />
            </div>
            <div className="home">
                <div className="filters">
                    {
                        filters.length !== 0 &&
                        filters.map(filter => <FiltersItem key={filter.name} name={filter.name} />)
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
                <Pagination />
            </div>
        </div>
    );
})

export default Wrapper