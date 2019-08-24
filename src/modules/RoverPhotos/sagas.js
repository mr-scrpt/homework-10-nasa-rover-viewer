// Реализуйте саги
import {takeLatest, select, put, call, fork} from 'redux-saga/effects';
import {changeSol, fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure} from './actions';
import {getPhotos} from './api';
import {getIsAuthorized} from '../Auth';

function* fetchWatcher() {
  yield takeLatest(fetchPhotosRequest, fetchDataFlow);
}

export function* fetchDataFlow(action) {
  const sol = action.payload;
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

  }
}

export default function*() {
  yield fork(fetchWatcher);
}