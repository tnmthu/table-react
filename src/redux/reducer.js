const initialState = {
  emps: [], 
  currentEmp: {
    "key": "",
    "id": "",
    "employee_name": "",
    "employee_age": "",
    "employee_salary": "",
    "classes": ""
  },
  selectedRows: [],
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
        // emps: action.json,
        emps: action.json.map(function({profile_image, classes, ...others}) {
          return others.key === "" ? {key: others.key, classes: "", ...others} : {key: others.id, classes: "", ...others};
        })
      };

    case 'CLICK_ADD_BTN':
      return {
        ...state,
        requests: [
          ...state.requests,
          action.payload // payload { type: ADD_EMP, newEmp }
        ],
        emps: [
          action.payload.emp,
          ...state.emps,
        ],
        currentEmp: initialState.currentEmp
      }
    
    case 'CLICK_DELETE_BTN':
      console.log("clcik del btn", state.emps, action.payload)
      return {
        ...state,
        requests: [
          ...state.requests,
          action.payload // { type: DELETE_EMP, payload }
        ],
        emps: state.emps.map(function(emp) {
          return emp.key === action.payload.emp.key ? action.payload.emp : emp;
        }),
        selectedRows: initialState.selectedRows
      };

    case 'CLICK_SAVE_BTN':
      return {
        ...state,
        requests: [
          ...action.payload
        ]
      };// initialstate

    case 'SELECT_CHECKBOX':
      return {
        ...state,
        selectedRows: [
          ...action.payload,
        ]
      }

    case 'SELECT_EMP':
      return {
        ...state,
        currentEmp: action.payload,
        emps: state.emps.map(function(emp) {
          return emp.key === action.payload.key ? action.payload : emp;
        })
      };

    case 'UNSELECT_EMP':
      return {
        ...state,
        currentEmp: {
          id: "",
          employee_name: "",
          employee_age: "",
          employee_salary: "",
          classes: ""
        },
        emps: state.emps.map(function(emp) {
          return emp.key === action.payload.key ? action.payload : emp;
        })
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
          return emp.key == action.payload.edited.key ? action.payload.edited : emp;
        })
      };

    case 'SAVE_SUCCESSFUL':
      console.log("inital state", initialState)
      return {
        ...initialState
      };

    default:
      return state;
  }
}

export default reducer;