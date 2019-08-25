// Реализуйте саги
import {takeLatest,takeEvery, take,select, put, call, fork} from 'redux-saga/effects';
import {changeSol, fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure} from './actions';
import {getPhotos} from './api';
import {getIsAuthorized, addKey} from '../Auth';
import {getRovers} from "./RoverPhotos";

function* fetchWatcher() {
  yield takeLatest(fetchPhotosRequest, fetchDataFlow);

}


export function* fetchDataFlow(action) {
  const {payload: {key, name, sol}} = action;
  const roverPhoto = yield call(getPhotos, key, name, sol);

  yield put(fetchPhotosSuccess({name, roverPhoto, sol}));

}

export default function*() {
  yield fork(fetchWatcher);
}