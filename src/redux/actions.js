export function getEmps() {
  return {
    type: 'GET_EMPS'
  };
}

export function clickAddBtn(payload) {
  return {
    type: 'CLICK_ADD_BTN',
    payload
  };
}

export function clickSaveBtn(payload) {
  return {
    type: 'CLICK_SAVE_BTN',
    payload
  }
}

export function clickDeleteBtn(payload) {
  return {
    type: 'CLICK_DELETE_BTN',
    payload
  };
}

export function selectCheckbox(payload) {
  return {
    type: 'SELECT_CHECKBOX',
    payload
  };
}

export function selectEmp(payload) {
  return {
    type: 'SELECT_EMP',
    payload
  };
}

export function unselectEmp(payload) {
  return {
    type: 'UNSELECT_EMP',
    payload
  };
}

export function updateCurrentEmp(payload) {
  return {
    type: 'UPDATE_CURRENT_EMP',
    payload
  };
}

export function saveSuccessful(payload) {
  return {
    type: 'SAVE_SUCCESSFUL',
    payload
  };
}