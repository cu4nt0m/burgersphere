import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingridients : null,
        totalPrice: 4, 
        error: false,
        building: false
}

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 2,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGRIDIENT:
            return {
                ...state,
                ingridients: {
                    ...state.ingridients,
                    [action.ingridientName]: state.ingridients[action.ingridientName] + 1
                },
                totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName],
                building: true
            }
        case actionTypes.REMOVE_INGRIDIENT:
            return {
                ...state,
                ingridients: {
                    ...state.ingridients,
                    [action.ingridientName]: state.ingridients[action.ingridientName] - 1
                },
                totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingridientName],
                building: true
            }
        case actionTypes.SET_INGRIDIENT:
            return {
                ...state,
                //ingridients: action.ingridients,
                ingridients: {
                    salad: action.ingridients.salad,
                    bacon: action.ingridients.bacon,
                    cheese: action.ingridients.cheese,
                    meat: action.ingridients.meat
                },
                totalPrice: 4,
                error: false,
                building: false
            };
        case actionTypes.FETCH_INGRIDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;