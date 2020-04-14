const initialState = {
  emps: [], 
  currentEmp: {
    id: "",
    employee_name: "",
    employee_age: "",
    employee_salary: ""
  }
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
      return ;

    case 'SELECT_EMP':
      return {
        ...state,
        currentEmp: action.payload
      };

    case 'UPDATE_CURRENT_EMP':
      return {
        ...state,
        currentEmp: action.payload
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