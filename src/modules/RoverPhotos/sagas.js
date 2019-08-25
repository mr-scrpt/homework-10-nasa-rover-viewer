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

  const sol = action.payload;

  for(let rover of rovers){
    const roverPhoto = yield call(getPhotos, apiKey, rover, sol);
    res[rover] = {[sol] : {isLoading: false, ...roverPhoto, isLoaded: true}}
  }

  yield put(fetchPhotosSuccess(res));

}

export default function*() {
  yield fork(fetchWatcher);
}