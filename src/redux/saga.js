import { put, takeLatest, all, call } from 'redux-saga/effects';

async function fetch2() {
  const res = await fetch('https://5b0f708f3c5c110014145cc9.mockapi.io/api/nexacro-demo');
  const json = await res.json();
  return json;
}

function* fetchEmps() {
  let data = yield call(fetch2);
    // fetch('https://5b0f708f3c5c110014145cc9.mockapi.io/api/nexacro-demo')
    //     .then(function() {
    //       console.log("dumaaaaaa");
    //     })
    //     .then((res) => {
    //       console.log("dumaaaaaa", res);
    //       return res.json();
    //     })
        // );

  yield put({ type: "EMPS_RECEIVED", json: data });
}
function* actionWatcher() {
  yield takeLatest('GET_EMPS', fetchEmps);
}
export default function* saga() {
   yield all([
   actionWatcher(),
   ]);
}