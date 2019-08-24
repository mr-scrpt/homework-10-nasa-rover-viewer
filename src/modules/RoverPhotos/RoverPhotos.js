// Реализуйте редьюсер
// Файл с тестами RoverPhotos.test.js поможет вам в этом

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {changeSol, fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure} from './actions';
import {createSelector} from 'reselect';

const sol = handleActions({
  [changeSol]: (_state, action) => ({
    ..._state,
    currency: Math.min(Math.max(action.payload, _state.min), _state.max)
  })
}, {currency: 1, min: 1, max: 100});

const photos = handleActions({
  [fetchPhotosRequest]: () => null,
  [fetchPhotosFailure]: () => null,
  [fetchPhotosSuccess]: (_state, action) => ({
     ..._state,
    curiosity: action.payload.curiosity || {},
    opportunity: action.payload.opportunity || {},
    spirit: action.payload.spirit || {},
    }),
}, {curiosity:{}, opportunity:{}, spirit:{}});


export default combineReducers({
  sol,
  photos
});
//Селекторы
export const getSol = createSelector(
  state => state.RoverPhotos.sol,
  sol => sol
);

export const getPhotos = createSelector(
  state => state.RoverPhotos.photos,
  photos => photos
);