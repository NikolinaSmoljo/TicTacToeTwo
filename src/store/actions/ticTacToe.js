import * as actionTypes from './actionTypes';

export const initUserInput = (playerName, playerSymbol, n) => {
    return {
        type: actionTypes.INIT_USER_INPUT,
        playerName: playerName,
        playerSymbol: playerSymbol,
        n: n
    };
}