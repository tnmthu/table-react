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

export function editEmp(payload) {
  return {
    type: 'EDIT_EMP',
    payload
  };
}

export function deleteEmp(payload) {
  return {
    type: 'DELETE_EMP',
    payload
  };
}