import * as actionTypes from './actionTypes';
import axios from '../../hoc/axios-orders'; //created instance of axios


export const addIngridient = (name) => {
    return {
        type: actionTypes.ADD_INGRIDIENT,
        ingridientName: name
    }
}
export const removeIngridient = (name) => {
    return {
        type: actionTypes.REMOVE_INGRIDIENT,
        ingridientName: name
    }
}

export const setIngridients = (ingridients) => {
    return {
        type: actionTypes.SET_INGRIDIENT,
        ingridients: ingridients
    }
}

export const fetchIngridientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGRIDIENTS_FAILED
    }
}

export const initIngridients = () => {
    return dispatch => {
        axios.get('https://burgershpear-default-rtdb.firebaseio.com/ingridients.json')
        .then(response => {
            dispatch(setIngridients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngridientsFailed());
        });
    }
}