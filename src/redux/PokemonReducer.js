import {
    CHANGE_DISPLAY_MODE,
    CHANGE_START_POSITION,
    DISPLAY_POKEMONS, EXPAND_NUMBER_OF_PAGES,
    SEARCH_POKEMONS,
    SET_ALL_POKEMONS_DATA, SET_FILTERS,
    SET_POKEMONS, SET_POKEMONS_BY_TYPES
} from "./constants";

const initialState = {
    pokemons: [],
    allPokemonsData: [],
    afterSearchData: [],
    displayMode: 'normal',
    startPosition: 0,
    filters: [],
    filtersData: [],
    numberOfPages: 0,
    activePage: 1
}



const pokemonReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_POKEMONS:{
            return {
                ...state,
                pokemons: action.payload
            }
        }
        case SET_ALL_POKEMONS_DATA:{
            console.log('сработал редюсер', action.payload)
            return {
                ...state,
                allPokemonsData: action.payload
            }
        }
        case SEARCH_POKEMONS:{
            let filtration = state.allPokemonsData.filter((pokemon)=>pokemon.name.includes(action.payload))
            console.log('filtration', filtration)
            return {
                ...state,
                afterSearchData: filtration
            }
        }
        case DISPLAY_POKEMONS:{
            const startPosition = action.payload.startPosition
            const quantity = action.payload.quantity
            let pokemons;

            switch (state.displayMode) {
                case 'search':
                    pokemons = state.afterSearchData
                    break
                case 'filters':
                    pokemons = state.filtersData
                    break
                default:
                    pokemons = state.allPokemonsData
            }



            let currentPage = []
            console.log('reducer start position', startPosition)
            console.log('reducer quantity', quantity)
            console.log('display mode', state.displayMode)


            for(let i = 0; i <quantity; ++i){
                if(pokemons[startPosition+i]) {
                    if (pokemons[startPosition+i].name)
                        currentPage.push(pokemons[startPosition + i])
                    else
                        currentPage.push(pokemons[startPosition + i])
                }
            }
            console.log('reducer currentPagePocemons', currentPage)

            return{
                ...state,
                pokemons: currentPage,
                numberOfPages: Math.ceil(pokemons.length/quantity),
                activePage: 1+ Math.ceil(startPosition/quantity)
            }
        }
        case CHANGE_DISPLAY_MODE:{
            console.log('display mode', state.displayMode)
            return {
                ...state,
                startPosition: 0,
                activePage: 1,
                displayMode: action.payload
            }
        }
        case CHANGE_START_POSITION:{
            console.log('change start position', state.startPosition)
            return {
                ...state,
                startPosition: action.payload.startPosition,
                activePage: action.payload.activePage
            }
        }
        case SET_FILTERS:{
            return {
                ...state,
                filters: action.payload

            }
        }
        case SET_POKEMONS_BY_TYPES:{
            // console.log('отфильтрованные покесоны в редюсере', action.payload)
            return {
                ...state,
                filtersData: action.payload
            }
        }
        default:{
            return state
        }

    }
}

export default pokemonReducer