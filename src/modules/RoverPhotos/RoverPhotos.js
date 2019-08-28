// Реализуйте редьюсер
// Файл с тестами RoverPhotos.testComp.js поможет вам в этом

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {changeSol, fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure} from './actions';
import {createSelector} from 'reselect';

const sol = handleActions({
  [changeSol]: (_state, action) => ({
    ..._state,
    current: Math.min(Math.max(action.payload, _state.min), _state.max)
  })
}, {current: 1, min: 1, max: 100});

const photos = handleActions({

  [fetchPhotosRequest]: (_state, {payload: {name, sol}}) => ({
    ..._state, [name]:{
      ..._state[name],
      ...{[sol]: { isLoading: true, isLoaded: false, photos: []}}}
  }),

  [fetchPhotosFailure]: () => null,
  [fetchPhotosSuccess]: (_state, {payload: {name, sol,roverPhoto}}) => ({
    ..._state,
      [name]:{
        ..._state[name],
        [sol]: {isLoaded: true, isLoading: false,  ...roverPhoto}
      }
  })
}, {
      curiosity: {},
      opportunity:{},
      spirit: {}
});

export default combineReducers({
  sol,
  photos
});
//Селекторы
export const getSol = createSelector(
  state => state.roverPhotos.sol,
  sol => sol
);

export const getPhotos = (state, name, sol) =>{
  if (
    state.roverPhotos.photos[name] &&
    state.roverPhotos.photos[name][sol] &&
    state.roverPhotos.photos[name][sol].isLoaded
  ){
    return state.roverPhotos.photos[name][sol].photos;
  }else {
    return false;
  }
};


export const getRovers = () => ['curiosity', 'opportunity', 'spirit'];

