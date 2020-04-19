import { put, takeLatest, all, call } from 'redux-saga/effects';
import { create, retrieve, update, del } from '../services/crud';
import { saveSuccessful, getEmps } from '../redux/actions';
import { message } from 'antd';

function* fetchEmps() {
  try {
    let data = yield call(retrieve);
    yield put({ type: "EMPS_RECEIVED", json: data });
  } catch(err) {
    console.log(err);
  }
}

function* handleSave(action) {
  try { // classify requests 
    let adds = action.payload.filter(item => item.type === "ADD_EMP");
    let edits = action.payload.filter(item => item.type === "EDIT_EMP");
    let deletes = action.payload.filter(item => item.type === "DELETE_EMP");
    yield all([
      ...adds.map(item => call(create, item.emp)),
      ...edits.map(item => call(update, item.emp)),
      ...deletes.map(item => call(del, item.emp.id))
    ]);

    // alert("Saved successfully.");
    yield put(saveSuccessful({saved: true, msg: "Saved successfully!"}));
    yield put(getEmps());

  } catch(err) {
    console.error(err);
    // alert("Save failed.");
    yield put(saveSuccessful({saved: false, msg: "Save failed!"}));
  }
}

export default function* saga() {
  yield all([
    yield takeLatest('CLICK_SAVE_BTN', handleSave),
    yield takeLatest('GET_EMPS', fetchEmps)
  ]);
}