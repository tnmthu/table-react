import { put, takeLatest, all, call } from 'redux-saga/effects';
import { create, retrieve, update, del } from '../services/crud';
import { saveSuccessful, getEmps } from '../redux/actions';

function* fetchEmps() {
  try {
    let data = yield call(retrieve);
    yield put({ type: "EMPS_RECEIVED", json: data });
  } catch(err) {
    console.log(err);
  }
}

// function* createNewEmp(payload) {
//   try {
//     yield call(create, payload);
//     // yield call(fetchEmps);
//   } catch(err) {
//     console.log(err);
//   }
// }

// function* updateEmp(payload) {
//   try {
//     yield call(update, payload);
//   } catch(err) {
//     console.log(err);
//   }
// }

// function* deleteEmp(payload) {
//   try {
//     yield call(del, payload);
//   } catch(err) {
//     console.log(err);
//   }
// }

function* handleSave(action) {
  try {
    console.log("saga save", action);
    let adds = action.payload.filter(item => item.type === "ADD_EMP");
    let edits = action.payload.filter(item => item.type === "EDIT_EMP");
    let deletes = action.payload.filter(item => item.type === "DELETE_EMP");
    console.log("add edit del", adds, edits, deletes)
    yield all([
      ...adds.map(item => call(create, item.emp)),
      ...edits.map(item => call(update, item.emp)),
      ...deletes.map(item => call(del, item.emp.id))
    ]);

    // todo: save successful
    alert("save sucessful");
    yield put(saveSuccessful());
    yield put(getEmps());
    // reset everything
  } catch(err) {
    // todo: save failed
  }
}

// function* actionWatcher() {
//   yield takeLatest('GET_EMPS', fetchEmps);
// }

export default function* saga() {
  yield all([
    // actionWatcher(),
    yield takeLatest('CLICK_SAVE_BTN', handleSave),
    // yield takeLatest('ADD_EMP', createNewEmp),
    yield takeLatest('GET_EMPS', fetchEmps),
    // yield takeLatest('EDIT_EMP', updateEmp),
    // yield takeLatest('DELETE_EMP', deleteEmp),
  ]);
}