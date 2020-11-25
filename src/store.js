import {makeAutoObservable} from "mobx";
import axios from "axios";

class Store {
    quantity = [10, 20, 50]
    displayMode = 'normal'
    currentQuantity = 10
    allPokemonsData = []
    afterSearchData = []
    numberOfPages = 0
    startPosition = 0
    selectTypes = []
    filtersData = []
    activePage = 1
    pokemons = []
    filters = []

    constructor() {
        makeAutoObservable(this)
    }

    onSelectType = (elem, type) =>{
        if(elem.current.checked){
            this.selectTypes.push(type)
            this.displayMode = 'filters'
            this.fetchPokemonsByTypes(this.selectTypes)
        }else if(this.selectTypes.length > 1) {
            this.selectTypes = this.selectTypes.filter(value => value !== type)
            this.fetchPokemonsByTypes(this.selectTypes)
        }else {
            this.selectTypes = []
            this.displayMode ='normal'
            this.displayPokemons(0,this.currentQuantity)
        }
    }

    onSearchInput(searchRequest){
        if(searchRequest === ''){
            this.displayMode = 'normal'
            this.displayPokemons(0, this.currentQuantity)
        } else{
            this.displayMode = 'search'
            this.afterSearchData = this.allPokemonsData.filter((pokemon)=>pokemon.includes(searchRequest))
            this.displayPokemons(0, this.currentQuantity)
        }
    }

    nextPage(){
        let currentPage = this.startPosition + this.currentQuantity
        if(this.startPosition >= this.numberOfPages*this.currentQuantity - this.currentQuantity)
            currentPage = this.startPosition
        this.changePage(currentPage, 1+this.activePage)
        this.displayPokemons(currentPage, this.currentQuantity)
    }

    previousPage(){
        let currentPage = 0;
        if(this.startPosition !== 0){
            currentPage = this.startPosition - this.currentQuantity
        }
        this.changePage(currentPage, this.activePage -1)
        this.displayPokemons(currentPage, this.currentQuantity)
    }

    onPage(newPage){
        let currentPage = --newPage * this.currentQuantity
        this.changePage(currentPage, ++newPage)
        this.displayPokemons(currentPage, this.currentQuantity)
    }

    changePage(position, page){
        this.startPosition = position
        this.activePage = page
    }

    changeCurrentQuantity(newQuantity){
        this.currentQuantity = newQuantity
        this.displayPokemons(this.startPosition,newQuantity)
    }

    fetchAllPokemonsData(){
        let pokemonNames = []
         axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1050`)
            .then(({data})=>{
                data.results.forEach(pokemon => pokemonNames.push(pokemon.name))
                this.allPokemonsData = pokemonNames
            })
            .then(()=>{
                    this.activePage = 1;
                    this.displayPokemons(0,10)


            })
    }

    displayPokemons(startPos, quant){
            let pokemons;
            let currentPage = []
            switch (this.displayMode) {
                case 'search':
                    pokemons = this.afterSearchData
                    break
                case 'filters':
                    pokemons = this.filtersData
                    break
                default:
                    pokemons = this.allPokemonsData
            }

            for(let i = 0; i <this.currentQuantity; ++i){
                if(pokemons[this.startPosition+i]) {
                    currentPage.push(pokemons[this.startPosition + i])
                }
            }
                this.pokemons = currentPage
                this.numberOfPages = Math.ceil(pokemons.length/this.currentQuantity)
                this.activePage = 1+ Math.ceil(this.startPosition/this.currentQuantity)
    }

    fetchTypes(){
        axios.get(`https://pokeapi.co/api/v2/type`)
            .then(({data})=>{
                this.filters = data.results
            })
    }

    fetchPokemonsByTypes(types){
        let unique = new Set();
        types && types.forEach(type =>{
            axios.get(`https://pokeapi.co/api/v2/type/${type}`)
                .then(({data})=>{
                    for(let pok of data.pokemon)
                    {
                        unique.add(pok.pokemon.name)
                    }
                    let uniqueArr = Array.from(unique)
                    this.filtersData = uniqueArr
                    this.displayPokemons(0, this.currentQuantity)
                })
        })
    }
}
export default new Store()