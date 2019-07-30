import * as actionTypes from '../actions/actionTypes';

const initialState = {
    playerName: null,
    playerSymbol: null,
};

const initUserInput = ( state, action ) => {
    console.log("initUserInput", action);
    return {...state,
        playerName: action.playerName,
        playerSymbol: action.playerSymbol,
        n: action.n,
    }
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INIT_USER_INPUT: return initUserInput( state, action );
        default: return state;
    }
};

export default reducer;