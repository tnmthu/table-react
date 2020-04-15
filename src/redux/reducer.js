const initialState = {
  emps: [], 
  currentEmp: {
    "id": "",
    "employee_name": "",
    "employee_age": "",
    "employee_salary": ""
  },
  requests: [] // todo: clean request after the hullabaloo
};

function reducer(state = initialState, action) {

  switch (action.type) {
    case 'GET_EMPS':
      return {
        ...state
      };

    case 'EMPS_RECEIVED':
      return {
        ...state,
        emps: action.json
      };

    case 'ADD_EMP':
      return {
        ...state,
        currentEmp: action.payload
      };

    case 'CLICK_ADD_BTN':
      return {
        ...state,
        requests: [
          ...state.requests,
          action.payload // payload { type: ADD_EMP, newEmp }
        ],
        emps: [
          action.payload.newEmp,
          ...state.emps,
        ],
      }

    case 'SELECT_EMP':
      return {
        ...state,
        currentEmp: action.payload
      };

    case 'UPDATE_CURRENT_EMP':
      return {
        ...state,
        requests: [
          ...state.requests,
          action.payload // { type: EDIT_EMP, edited }
        ],
        currentEmp: {
          ...action.payload.edited
        },
        emps: state.emps.map(function(emp) {
          return emp.id === action.payload.edited.id ? action.payload.edited : emp;
        })
      };

    case 'UNSELECT_EMP':
      return {
        ...state,
        currentEmp: {
          id: "",
          employee_name: "",
          employee_age: "",
          employee_salary: ""
        }
      };

    default:
      return state;
  }
}

export default reducer;