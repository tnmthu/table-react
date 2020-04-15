import { put, takeLatest, all, call } from 'redux-saga/effects';
import {create, retrieve, update, del } from '../services/crud';

function* fetchEmps() {
  try {
    let data = yield call(retrieve);
    yield put({ type: "EMPS_RECEIVED", json: data });
  } catch(err) {
    console.log(err);
  }
}

function* createNewEmp(payload) {
  try {
    yield call(create, payload);
    // yield call(fetchEmps);
  } catch(err) {
    console.log(err);
  }
}

function* updateEmp(payload) {
  try {
    yield call(update, payload);
  } catch(err) {
    console.log(err);
  }
}

function* deleteEmp(payload) {
  try {
    yield call(del, payload);
  } catch(err) {
    console.log(err);
  }
}

// function* actionWatcher() {
//   yield takeLatest('GET_EMPS', fetchEmps);
// }

export default function* saga() {
  yield all([
    // actionWatcher(),
    yield takeLatest('ADD_EMP', createNewEmp),
    yield takeLatest('GET_EMPS', fetchEmps),
    yield takeLatest('EDIT_EMP', updateEmp),
    yield takeLatest('DELETE_EMP', deleteEmp),
  ]);
}