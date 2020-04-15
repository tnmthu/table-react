export function getEmps() {
  return {
    type: 'GET_EMPS'
  };
}

export function addEmp(payload) {
  return {
    type: 'ADD_EMP',
    payload
  };
}

export function clickAddBtn(payload) {
  return {
    type: 'CLICK_ADD_BTN',
    payload
  };
}

export function deleteEmp(payload) {
  return {
    type: 'DELETE_EMP',
    payload
  };
}

export function selectEmp(payload) {
  return {
    type: 'SELECT_EMP',
    payload
  };
}

export function unselectEmp() {
  return {
    type: 'UNSELECT_EMP'
  };
}

export function updateCurrentEmp(payload) {
  return {
    type: 'UPDATE_CURRENT_EMP',
    payload
  }
}