import {
    CHANGE_DISPLAY_MODE,
    CHANGE_START_POSITION,
    DISPLAY_POKEMONS,
    SEARCH_POKEMONS,
    SET_ALL_POKEMONS_DATA,
    SET_POKEMONS
} from "./constants";

const initialState = {
    pokemons: [],
    allPokemonsData: [],
    afterSearchData: [],
    displayMode: 'normal',
    startPosition: 0
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
                default:
                    pokemons = state.allPokemonsData
            }

            let currentPage = []
            console.log('reducer start position', startPosition)
            console.log('reducer quantity', quantity)


            for(let i = 0; i <quantity; ++i){
                if(pokemons[startPosition+i])
                    currentPage.push(pokemons[startPosition+i])
            }
            console.log('reducer currentPagePocemons', currentPage)

            return{
                ...state,
                pokemons: currentPage
            }
        }
        case CHANGE_DISPLAY_MODE:{
            console.log('display mode', state.displayMode)
            return {
                ...state,
                startPosition: 0,
                displayMode: action.payload
            }
        }
        case CHANGE_START_POSITION:{
            console.log('change start position', state.startPosition)
            return {
                ...state,
                startPosition: action.payload
            }
        }
        default:{
            return state
        }

    }
}

export default pokemonReducer