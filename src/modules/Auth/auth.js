
// Реализуйте редьюсер

import { combineReducers } from 'redux';
import {handleActions} from 'redux-actions';
import {addKey} from './actions';
import {createSelector} from 'reselect';

const apiKey = handleActions({
  [addKey]: (_state, action) => action.payload
}, null);


export default combineReducers({
  apiKey
});
//Селекторы

export const getIsAuthorized = createSelector(
  state => state.auth.apiKey,
  apiKey=>apiKey
);