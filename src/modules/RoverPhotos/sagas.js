// Реализуйте саги
import {takeLatest, take,select, put, call, fork} from 'redux-saga/effects';
import {changeSol, fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure} from './actions';
import {getPhotos} from './api';
import {getIsAuthorized, addKey} from '../Auth';
import {getRovers} from "./RoverPhotos";

function* fetchWatcher() {
  yield takeLatest(fetchPhotosRequest, fetchDataFlow);
}

export function* fetchDataFlow(action) {
  const rovers = yield select(getRovers);
  const apiKey = yield select(getIsAuthorized);
  const res = {};
  while (true){
    const sol = action.payload;

    for(let rover of rovers){
      const roverPhoto = yield call(getPhotos, apiKey, rover, sol);
      res[rover] = {[sol] : {isLoading: false, ...roverPhoto, isLoaded: true}}

    }
    yield put(fetchPhotosSuccess(res));
  }


 /* const sol = action.payload;
  try{
    const apiKey = yield select(getIsAuthorized);
    const curiosityPhoto = yield call(getPhotos, apiKey, 'curiosity', sol);
    const opportunityPhoto = yield call(getPhotos, apiKey, 'opportunity', sol);
    const spiritPhoto = yield call(getPhotos, apiKey, 'spirit', sol);

    const res = {
      curiosity: {[sol] : {isLoading: false, ...curiosityPhoto, isLoaded: true}},
      opportunity: {[sol] :{isLoading: false, ...opportunityPhoto, isLoaded: true}},
      spirit: {[sol] :{isLoading: false, ...spiritPhoto, isLoaded: true}}
    };
    yield put(fetchPhotosSuccess(res));
  }catch (e) {

  }*/
}

export default function*() {
  yield fork(fetchWatcher);
}